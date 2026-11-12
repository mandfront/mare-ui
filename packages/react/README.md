# @mare-ui/react

Componentes React acessíveis do Maré UI. Comportamento e acessibilidade vêm do [Base UI](https://base-ui.com); o visual vem dos [tokens](../tokens), aplicados com Tailwind CSS v4 e variantes tipadas com CVA.

> Pacote ainda não publicado no npm. Requer React 19.

## Uso

```tsx
import '@mare-ui/react/styles.css';
import { Button } from '@mare-ui/react';

export function Exemplo() {
  return <Button>Publicar versão</Button>;
}
```

O `styles.css` já traz os tokens, os temas e as marcas, e só os utilitários que os componentes usam. Ele não inclui o reset do Tailwind, para não alterar o resto da página.

## Componentes

| Componente       | Para quê                                                       |
| ---------------- | -------------------------------------------------------------- |
| `Button`         | Dispara uma ação. Variantes, tamanhos, estado de carregamento. |
| `VisuallyHidden` | Texto só para leitores de tela.                                |

Utilitários: `buttonVariants` (aparência de botão para links) e `cn` (junta classes e resolve conflitos de Tailwind conhecendo os nomes dos tokens).

A documentação completa, com exemplos interativos, está no Storybook (`pnpm --filter docs dev`).

## Estrutura de um componente

```text
src/button/
├─ button.tsx           # componente e variantes (CVA)
├─ button.test.tsx      # testes unitários (Vitest + Testing Library)
├─ button.stories.tsx   # histórias do Storybook, também rodadas como testes no navegador
└─ index.ts             # exports públicos
```
