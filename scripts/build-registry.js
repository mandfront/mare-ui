import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Gera o registry.json (registry shadcn no GitHub) a partir das pastas de
 * componentes, para a lista nunca ficar diferente do código.
 *
 *   node scripts/build-registry.js          escreve o arquivo
 *   node scripts/build-registry.js --check  falha se o arquivo estiver desatualizado
 */
const repo = 'mandfront/mare-ui';
const sourceDir = 'packages/react/src';
const targetDir = '~/components/mare-ui';
const root = new URL('../', import.meta.url);
const output = new URL('registry.json', root);

const items = {
  lib: ['Utilitários', 'cn (junta classes conhecendo os tokens) e o anel de foco do sistema.'],
  alert: ['Alert', 'Mensagem na própria página, sem bloquear.'],
  avatar: ['Avatar', 'Pessoa ou marca, com foto ou iniciais.'],
  badge: ['Badge', 'Uma ou duas palavras de status.'],
  button: ['Button', 'Dispara uma ação. Variantes, tamanhos e estado de carregamento.'],
  card: ['Card', 'Agrupa conteúdo relacionado, montado por partes.'],
  checkbox: ['Checkbox', 'Escolha independente que vale ao enviar o formulário.'],
  dialog: ['Dialog', 'Dialog e AlertDialog: interrompem o fluxo para uma decisão.'],
  switch: ['Switch', 'Liga ou desliga algo que vale na hora.'],
  tabs: ['Tabs', 'Alterna entre vistas do mesmo conteúdo.'],
  'text-field': ['TextField', 'Campo de texto com rótulo, dica e erro acessíveis.'],
  'visually-hidden': ['VisuallyHidden', 'Texto só para leitores de tela.'],
};

const isSource = (file) => /\.tsx?$/.test(file) && !/\.(test|stories)\./.test(file);

/** Nome do pacote npm de um import: `@base-ui/react/button` → `@base-ui/react`. */
const packageName = (specifier) =>
  specifier.split('/', specifier.startsWith('@') ? 2 : 1).join('/');

async function buildItem(name, [title, description]) {
  const dir = new URL(`${sourceDir}/${name}/`, root);
  const files = (await readdir(dir)).filter(isSource).sort();
  const dependencies = new Set();
  const registryDependencies = new Set();

  for (const file of files) {
    const code = await readFile(new URL(file, dir), 'utf8');
    for (const [, specifier] of code.matchAll(/from '([^']+)'/g)) {
      if (specifier.startsWith('./')) continue;
      if (specifier.startsWith('../'))
        registryDependencies.add(`${repo}/${specifier.split('/')[1]}`);
      else if (specifier !== 'react') dependencies.add(packageName(specifier));
    }
  }

  return {
    name,
    type: 'registry:item',
    title,
    description,
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
    files: files.map((file) => ({
      path: `${sourceDir}/${name}/${file}`,
      type: 'registry:file',
      target: `${targetDir}/${name}/${file}`,
    })),
  };
}

const folders = (await readdir(new URL(`${sourceDir}/`, root), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const undocumented = folders.filter((folder) => !(folder in items));
if (undocumented.length > 0) {
  console.error(
    `Pastas sem título e descrição em scripts/build-registry.js: ${undocumented.join(', ')}`,
  );
  process.exit(1);
}

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'mare-ui',
  homepage: 'https://docs-rosy-two-80.vercel.app',
  items: await Promise.all(Object.entries(items).map(([name, info]) => buildItem(name, info))),
};
const content = `${JSON.stringify(registry, null, 2)}\n`;

if (process.argv.includes('--check')) {
  const current = await readFile(output, 'utf8').catch(() => '');
  if (current !== content) {
    console.error(
      'registry.json está desatualizado. Rode `pnpm registry` e faça commit do resultado.',
    );
    process.exit(1);
  }
  console.log('registry.json está em dia.');
} else {
  await writeFile(output, content);
  console.log(`registry.json: ${String(registry.items.length)} itens → ${fileURLToPath(output)}`);
}
