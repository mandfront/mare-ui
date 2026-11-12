import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { resolveThemes, themes } from './resolve.js';

const dist = new URL('../dist/', import.meta.url);
// Atenção: o texto do cabeçalho não pode conter a sequência que fecha comentário em CSS.
const header =
  '/* Maré UI — gerado a partir dos arquivos .tokens.json em src. Não edite à mão. */\n';

const declarations = (tokens, indent = '  ') =>
  Object.entries(tokens)
    .map(([name, value]) => `${indent}--${name}: ${value};`)
    .join('\n');

/** Só os tokens cujo valor difere do tema claro. */
const diff = (tokens, reference) =>
  Object.fromEntries(Object.entries(tokens).filter(([name, value]) => reference[name] !== value));

function overrideBlocks(resolved) {
  return Object.entries(themes)
    .filter(([name]) => name !== 'light')
    .map(([name, { selector, colorScheme }]) => {
      const scheme = colorScheme === 'light' ? '' : `  color-scheme: ${colorScheme};\n`;
      return `${selector} {\n${scheme}${declarations(diff(resolved[name], resolved.light))}\n}`;
    })
    .join('\n\n');
}

/** CSS puro: variáveis no `:root` e um bloco por tema ou marca. */
function tokensCss(resolved) {
  const { selector, colorScheme } = themes.light;
  return `${header}
${selector} {
  color-scheme: ${colorScheme};
${declarations(resolved.light)}
}

${overrideBlocks(resolved)}
`;
}

/**
 * Tema do Tailwind v4. Os namespaces são zerados antes, para que só existam
 * utilitários dos tokens do sistema (`bg-primary` existe, `bg-red-500` não).
 */
function themeCss(resolved) {
  const namespaces = ['color', 'spacing', 'radius', 'font', 'text', 'shadow'];
  const reset = namespaces.map((namespace) => `  --${namespace}-*: initial;`).join('\n');
  return `${header}
@theme static {
${reset}

${declarations(resolved.light)}
}

/* Tema claro explícito, para uma região clara dentro de uma escura. */
[data-theme='light'] {
  color-scheme: light;
${declarations(resolved.light)}
}

${overrideBlocks(resolved)}
`;
}

function indexJs(resolved) {
  return `${header}
export const tokens = ${JSON.stringify(resolved, null, 2)};

export const themeNames = ${JSON.stringify(Object.keys(resolved))};

export const tokenNames = ${JSON.stringify(Object.keys(resolved.light))};
`;
}

function indexDts(resolved) {
  const union = (values) => values.map((value) => `  | '${value}'`).join('\n');
  return `${header}
/** Temas e marcas disponíveis. */
export type ThemeName =
${union(Object.keys(resolved))};

/** Nome de um token, igual ao da variável CSS sem o \`--\`. */
export type TokenName =
${union(Object.keys(resolved.light))};

/** Valor CSS final de cada token, por tema. */
export declare const tokens: Readonly<Record<ThemeName, Readonly<Record<TokenName, string>>>>;

export declare const themeNames: readonly ThemeName[];

export declare const tokenNames: readonly TokenName[];
`;
}

const resolved = await resolveThemes();

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const files = {
  'tokens.css': tokensCss(resolved),
  'theme.css': themeCss(resolved),
  'index.js': indexJs(resolved),
  'index.d.ts': indexDts(resolved),
  'tokens.json': `${JSON.stringify(resolved, null, 2)}\n`,
};

for (const [name, content] of Object.entries(files)) {
  await writeFile(new URL(name, dist), content);
}

const count = Object.keys(resolved.light).length;
console.log(
  `${String(count)} tokens × ${String(Object.keys(resolved).length)} temas → ${fileURLToPath(dist)}`,
);
