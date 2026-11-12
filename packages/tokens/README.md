# @mare-ui/tokens

Design tokens do Maré UI: cores, tipografia, espaçamento, raios, sombras e durações. A fonte é JSON no formato do [Design Tokens Community Group](https://www.designtokens.org/tr/2025.10/) (versão 2025.10), compilado com [Style Dictionary](https://styledictionary.com).

```bash
npm install @mare-ui/tokens
```

## Camadas

```text
src/
├─ primitives/palette.tokens.json   # 1. primitivos: a paleta crua
├─ base/                            #    escalas sem variação por tema
│  ├─ scale.tokens.json             #    espaçamento, raios, durações
│  └─ typography.tokens.json        #    famílias e estilos de texto
├─ themes/                          # 2. semânticos: o significado de cada cor
│  ├─ light.tokens.json             #    tema padrão, define todos os tokens
│  └─ dark.tokens.json              #    sobrescreve o que muda
└─ brands/                          # 3. marcas: sobrescrevem os semânticos
   ├─ marego.tokens.json
   └─ cliente.tokens.json
```

Os componentes usam só os tokens semânticos (`color-primary`, `color-surface`). Os primitivos (`palette.teal.550`) existem para os semânticos apontarem para eles e não viram variáveis CSS.

As marcas `marego` e `cliente` são exemplos, com cores provisórias, e por enquanto só têm versão clara.

## O que o build gera

`pnpm build` escreve em `dist/`:

| Arquivo       | Para quê                                                                   |
| ------------- | -------------------------------------------------------------------------- |
| `tokens.css`  | Variáveis CSS puras, para qualquer projeto                                 |
| `theme.css`   | Tema do Tailwind CSS v4 (`@theme`), que gera utilitários como `bg-primary` |
| `index.js`    | Valores finais por tema, com tipos (`TokenName`, `ThemeName`)              |
| `tokens.json` | Os mesmos valores em JSON, para outras ferramentas                         |

## Uso

Com Tailwind CSS v4:

```css
@import 'tailwindcss';
@import '@mare-ui/tokens/theme.css';
```

```html
<button class="bg-primary text-on-primary rounded-md px-4 text-label">Publicar versão</button>
```

O tema zera as cores, espaçamentos, raios, fontes, tamanhos de texto e sombras padrão do Tailwind: `bg-primary` existe, `bg-red-500` e `p-5` fora da escala não.

Sem Tailwind:

```css
@import '@mare-ui/tokens/tokens.css';

.card {
  background: var(--color-surface-raised);
  border-radius: var(--radius-lg);
  padding: var(--spacing-5);
}
```

## Temas e marcas

O tema claro vale por padrão. Para trocar, defina um atributo em qualquer elemento, normalmente o `<html>`:

```html
<html data-theme="dark"></html>
```

Para uma marca:

```html
<html data-brand="marego"></html>
```

## Limitações conhecidas

- **Sombras no Tailwind:** os utilitários `shadow-sm` e `shadow-lg` fixam o valor do tema claro no build. Para a sombra acompanhar o tema, use `shadow-(--shadow-sm)`.
- **Classes fora da escala somem sem aviso:** como o tema zera a escala numérica do Tailwind, uma classe como `p-9` ou `inset-1` não é gerada e o estilo simplesmente não aparece, sem erro no build. Use só os passos da escala (`0` a `8` e `control-*`) e confira o resultado no Storybook.
- **Durações:** o Tailwind não tem namespace de tema para duração. Use `duration-(--duration-fast)`.

## Acessibilidade

Os testes (`pnpm test`) calculam o contraste de 22 pares de cores em cada tema e marca: 4.5:1 para texto e 3:1 para bordas de controles e anel de foco (WCAG 2.2 AA). Um token novo que quebre um desses pares falha no CI.

## Adicionar ou alterar um token

1. Edite o arquivo `.tokens.json` da camada certa. Cores novas entram primeiro na paleta e depois em um token semântico que aponta para ela.
2. Se o token é uma cor de texto ou de fundo, acrescente o par em `test/tokens.test.js`.
3. Rode `pnpm build && pnpm test`.
