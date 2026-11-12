import { fileURLToPath } from 'node:url';

import StyleDictionary from 'style-dictionary';

const src = (path) => fileURLToPath(new URL(`../src/${path}`, import.meta.url));

/** Arquivos comuns a todos os temas: paleta, escalas, tipografia e o tema claro (o padrão). */
const base = [
  'primitives/palette.tokens.json',
  'base/scale.tokens.json',
  'base/typography.tokens.json',
  'themes/light.tokens.json',
].map(src);

/**
 * Temas e marcas. Cada um é o tema claro mais os arquivos que o sobrescrevem.
 * `selector` é onde as variáveis CSS são aplicadas.
 */
export const themes = {
  light: { selector: ":root, [data-theme='light']", colorScheme: 'light', overrides: [] },
  dark: {
    selector: "[data-theme='dark']",
    colorScheme: 'dark',
    overrides: ['themes/dark.tokens.json'],
  },
  marego: {
    selector: "[data-brand='marego']",
    colorScheme: 'light',
    overrides: ['brands/marego.tokens.json'],
  },
  cliente: {
    selector: "[data-brand='cliente']",
    colorScheme: 'light',
    overrides: ['brands/cliente.tokens.json'],
  },
};

const typographyProps = {
  fontSize: '',
  lineHeight: '--line-height',
  fontWeight: '--font-weight',
  letterSpacing: '--letter-spacing',
};

/**
 * Nome da variável CSS de um token, nos namespaces do Tailwind v4
 * (`--color-*`, `--spacing-*`, `--text-*`...). Devolve `null` para o que não vira variável.
 */
function variableName(path) {
  const [group, name, prop] = path;
  if (group === 'palette') return null;
  if (group === 'text') {
    const suffix = typographyProps[prop];
    return suffix === undefined ? null : `text-${name}${suffix}`;
  }
  return path.join('-');
}

/**
 * Resolve um tema: devolve um mapa `nome da variável → valor CSS`, com as
 * referências já substituídas pelos valores finais.
 */
async function resolveTheme(overrides) {
  const sd = new StyleDictionary({
    include: base,
    source: overrides.map(src),
    expand: { include: ['typography'] },
    log: { verbosity: 'silent', warnings: 'error', errors: { brokenReferences: 'throw' } },
    platforms: { css: { transformGroup: 'css' } },
  });
  const { allTokens } = await sd.getPlatformTokens('css');

  const entries = [];
  for (const token of allTokens) {
    const name = variableName(token.path);
    if (name !== null) entries.push([name, String(token.$value)]);
  }
  return Object.fromEntries(entries);
}

/** Resolve todos os temas e marcas: `{ light: {...}, dark: {...}, ... }`. */
export async function resolveThemes() {
  const resolved = {};
  for (const [name, { overrides }] of Object.entries(themes)) {
    resolved[name] = await resolveTheme(overrides);
  }
  return resolved;
}
