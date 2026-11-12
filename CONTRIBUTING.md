# Como contribuir

Todo código entra no `main` por pull request com o CI verde, inclusive o da mantenedora.

## Preparar o ambiente

Requisitos: Node 22.12 ou mais novo (o projeto usa a versão do `.nvmrc`) e pnpm via Corepack.

```bash
corepack enable pnpm
pnpm install
```

O `pnpm install` também instala os hooks de Git (lefthook).

## Comandos

| Comando          | O que faz                                                  |
| ---------------- | ---------------------------------------------------------- |
| `pnpm check`     | Tudo o que o CI roda: formato, lint, tipos, testes e build |
| `pnpm lint`      | ESLint em todos os pacotes                                 |
| `pnpm typecheck` | TypeScript em modo estrito                                 |
| `pnpm test`      | Testes unitários (Vitest + Testing Library)                |
| `pnpm build`     | Build dos pacotes                                          |
| `pnpm format`    | Formata o repositório com Prettier                         |

## Fluxo de trabalho

1. Crie uma branch curta a partir do `main`, com o tipo como prefixo: `feat/dialog-focus-trap`, `fix/button-loading-width`, `docs/tokens-camadas`.
2. Faça commits pequenos no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat(button): adiciona estado loading`. O hook `commit-msg` valida a mensagem.
3. Abra o pull request. O título segue o mesmo padrão, porque vira o commit do squash.
4. O CI precisa passar: formatação, lint, tipos, testes, build e mensagens de commit.
5. O merge é sempre por squash, para manter o histórico do `main` linear.

Tipos aceitos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`, `style`, `revert`. O escopo é o componente ou a área: `button`, `tokens`, `deps`.

## Regras de código

- TypeScript estrito, sem `any`.
- Nenhum valor fixo de cor, espaço ou fonte: use tokens. Se o token não existe, proponha o token.
- Composição em vez de configuração: partes pequenas no lugar de componentes com muitas props.
- Todo componente funciona por teclado e tem teste do comportamento que a pessoa usuária percebe.
- Uma pasta por componente, com o código, o teste e o `index.ts`.

## Decisões de arquitetura

Decisões que afetam a estrutura do projeto ficam registradas em [`docs/decisions`](docs/decisions). Para propor uma mudança de rumo, abra um PR com um novo registro.
