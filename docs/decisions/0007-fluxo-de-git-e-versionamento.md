# 0007 — Fluxo de Git, commits e versionamento

- Status: Aceita
- Data: 2026-11-12

## Contexto

O histórico do repositório é parte da documentação: precisa mostrar o que mudou, por quê e em qual versão, e cada versão publicada precisa ser rastreável até os commits.

## Decisão

- **Branches:** GitHub Flow. Um `main` sempre publicável e branches curtas com o tipo como prefixo (`feat/`, `fix/`, `docs/`).
- **Proteção do `main`:** sem push direto; merge só por pull request, com os checks do CI obrigatórios e histórico linear (squash).
- **Commits:** Conventional Commits, validados no hook `commit-msg` (lefthook + commitlint) e de novo no CI, que também valida o título do pull request.
- **Versionamento:** SemVer com Changesets. Cada pull request que altera um pacote publicado descreve a mudança; o CI abre o pull request de release e publica.
- **Dependências:** Dependabot semanal, com ações do GitHub fixadas por SHA.

## Alternativas consideradas

- **Git Flow (`develop`, branches de release):** útil para vários ambientes e versões mantidas em paralelo, o que não é o caso; acrescenta merges sem benefício.
- **semantic-release:** publica direto a partir dos commits, sem a etapa de revisar o texto do changelog antes da release.
- **Merge commits:** preservam cada commit da branch, mas poluem o histórico do `main`.

## Consequências

- Cada linha do histórico do `main` corresponde a um pull request revisado e com CI verde.
- O changelog é escrito por quem fez a mudança, no momento da mudança.
- A regra vale também para a mantenedora: não há atalho para o `main`.
