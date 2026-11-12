# 0002 — Monorepo com pnpm e Turborepo

- Status: Aceita
- Data: 2026-11-12

## Contexto

O projeto tem partes que evoluem juntas mas são publicadas separadamente: os tokens, os componentes React, a documentação (Storybook) e um app de exemplo. Uma mudança de token precisa ser testada nos componentes no mesmo pull request.

## Decisão

Um único repositório com workspaces do pnpm (`packages/*` e `apps/*`) e Turborepo para orquestrar e cachear `build`, `lint`, `typecheck` e `test`.

Regras de dependência no `pnpm-workspace.yaml`:

- `minimumReleaseAge` de 3 dias: versões recém-publicadas não são instaladas, o que reduz a exposição a pacotes comprometidos.
- `allowBuilds` explícito: scripts de instalação só rodam para pacotes aprovados.

## Alternativas consideradas

- **Repositórios separados:** versionamento independente, mas uma mudança que cruza tokens e componentes vira dois pull requests e duas publicações coordenadas à mão.
- **npm ou Yarn workspaces:** funcionam, mas o pnpm é mais rígido com dependências não declaradas e traz as proteções de cadeia de suprimentos acima.
- **Nx:** mais recursos do que o projeto precisa neste tamanho.

## Consequências

- Um `pnpm check` valida o repositório inteiro, local e no CI.
- O pnpm é fixado pelo campo `packageManager` e instalado via Corepack.
- Pacotes novos entram como uma pasta em `packages/` ou `apps/`, sem configuração extra.
