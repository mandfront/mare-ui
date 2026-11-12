import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

const pages = [
  { path: '/', brand: 'Maré Passeios' },
  { path: '/marego', brand: 'Marego' },
];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

/**
 * Clicar antes da hidratação não faz nada, e o teste falha de forma
 * intermitente. Espera o React assumir a página (os elementos ganham as
 * propriedades internas do React) antes de interagir.
 */
async function gotoHydrated(page: Page, path: string) {
  await page.goto(path);
  await page.waitForFunction(() => {
    const tab = document.querySelector('[role="tab"]');
    return tab !== null && Object.keys(tab).some((key) => key.startsWith('__reactFiber'));
  });
}

for (const { path, brand } of pages) {
  test.describe(`landing ${path}`, () => {
    test('o HTML do servidor já traz o texto dos gatilhos', async ({ request }) => {
      // Regressão: os filhos dos gatilhos se perdiam em Server Components.
      const html = await (await request.get(path)).text();
      expect(html).toContain(brand);
      expect(html).toContain('>Reservar<');
      expect(html).toContain('>Cancelar uma reserva<');
    });

    test('carrega sem erros no console', async ({ page }) => {
      const errors = collectErrors(page);
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.waitForLoadState('networkidle');
      expect(errors).toEqual([]);
    });

    test('não tem violações de acessibilidade (axe)', async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}

test('Dialog de reserva abre, recebe foco e fecha com Escape', async ({ page }) => {
  await gotoHydrated(page, '/');
  await page.getByRole('button', { name: 'Reservar' }).first().click();
  const dialog = page.getByRole('dialog', { name: /Reservar: Escuna/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox', { name: 'Nome completo' })).toBeVisible();
  const whatsapp = dialog.getByRole('switch', { name: 'Avisar também pelo WhatsApp' });
  await whatsapp.click();
  await expect(whatsapp).toBeChecked();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('AlertDialog só fecha por uma ação explícita', async ({ page }) => {
  await gotoHydrated(page, '/');
  await page.getByRole('button', { name: 'Cancelar uma reserva' }).click();
  const dialog = page.getByRole('alertdialog', { name: 'Cancelar a reserva?' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Manter reserva' }).click();
  await expect(dialog).toBeHidden();
});

test('Tabs e Checkbox respondem ao clique', async ({ page }) => {
  await gotoHydrated(page, '/');
  const tarde = page.getByRole('tab', { name: 'Tarde' });
  await tarde.click();
  await expect(tarde).toHaveAttribute('aria-selected', 'true');
  // Durante a transição, o painel anterior ainda existe (inerte); por isso o
  // painel é buscado pelo nome da aba.
  await expect(page.getByRole('tabpanel', { name: 'Tarde' })).toContainText('Monte Serrat');
  const checkbox = page.getByRole('checkbox', { name: /Aceito receber/ });
  await checkbox.click();
  await expect(checkbox).toBeChecked();
});

test('a marca Marego troca só os tokens', async ({ page }) => {
  const primary = (path: string) =>
    page
      .goto(path)
      .then(() =>
        page
          .getByRole('link', { name: 'Ver passeios' })
          .evaluate((el) => getComputedStyle(el).backgroundColor),
      );
  const mare = await primary('/');
  const marego = await primary('/marego');
  expect(marego).toBe('rgb(184, 66, 15)');
  expect(mare).not.toBe(marego);
});
