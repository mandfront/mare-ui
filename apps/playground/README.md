# playground

Landing de exemplo em Next.js (App Router) montada só com componentes do Maré UI. É um site fictício de passeios pela Baixada Santista.

- `/` usa a marca padrão; `/marego` usa a marca de exemplo Marego. O código da página é o mesmo: só os tokens mudam.
- A página inteira é um Server Component, sem `"use client"`.
- O Tailwind do app gera os utilitários dos componentes a partir do pacote publicado (veja [`app/globals.css`](app/globals.css)).

## Testes

`pnpm test` sobe o build de produção e roda o Playwright no Chromium. Os testes verificam:

- se o HTML que sai do servidor já traz o texto dos gatilhos;
- se as páginas carregam sem erros no console;
- se o axe não encontra violações de acessibilidade;
- se Dialog, AlertDialog, Tabs, Checkbox e Switch respondem no navegador;
- se a marca Marego troca a cor primária.

```bash
pnpm --filter playground dev    # http://localhost:3100
pnpm --filter playground test
```
