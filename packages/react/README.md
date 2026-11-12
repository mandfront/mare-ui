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

### Com Tailwind no projeto

Se o app já usa Tailwind CSS v4, não importe o `styles.css`. Importe o tema dos tokens e aponte o Tailwind para o código publicado dos componentes, para gerar os utilitários deles junto com os do app:

```css
@import 'tailwindcss';
@import '@mare-ui/tokens/theme.css';
@source '../node_modules/@mare-ui/react/dist';
```

Assim existe uma só cópia do tema e das classes. O [app de exemplo](../../apps/playground) usa essa configuração.

## Componentes

| Componente       | Para quê                                                       |
| ---------------- | -------------------------------------------------------------- |
| `Avatar`         | Pessoa ou marca, com foto ou iniciais.                         |
| `Badge`          | Uma ou duas palavras de status.                                |
| `Button`         | Dispara uma ação. Variantes, tamanhos, estado de carregamento. |
| `Alert`          | Mensagem na página, sem bloquear.                              |
| `AlertDialog`    | Confirmação de ação destrutiva; não fecha com clique fora.     |
| `Card`           | Agrupa conteúdo relacionado, montado por partes.               |
| `Checkbox`       | Escolha independente que vale ao enviar o formulário.          |
| `Dialog`         | Interrompe o fluxo para uma decisão.                           |
| `Switch`         | Liga ou desliga algo que vale na hora.                         |
| `Tabs`           | Alterna entre vistas do mesmo conteúdo.                        |
| `TextField`      | Campo de texto com rótulo, dica e erro acessíveis.             |
| `VisuallyHidden` | Texto só para leitores de tela.                                |

Utilitários: `buttonVariants` (aparência de botão para links) e `cn` (junta classes e resolve conflitos de Tailwind conhecendo os nomes dos tokens).

A documentação completa, com exemplos interativos, está no [Storybook](https://docs-rosy-two-80.vercel.app).

## Server Components

Todos os componentes podem ser usados direto num componente de servidor do Next.js, sem `"use client"`. `buttonVariants`, `badgeVariants` e `cn` também podem ser chamados no servidor. O estado e a interação ficam no Base UI ([ADR 0009](../../docs/decisions/0009-server-components-sem-use-client.md)). O [app de exemplo](../../apps/playground) em Next.js confirma isso a cada PR: a página inteira é renderizada no servidor e testada no navegador com Playwright.

## Estrutura de um componente

```text
src/button/
├─ button.tsx           # componente e variantes (CVA)
├─ button.test.tsx      # testes unitários (Vitest + Testing Library)
├─ button.stories.tsx   # histórias do Storybook, também rodadas como testes no navegador
└─ index.ts             # exports públicos
```
