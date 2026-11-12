# 0008 — Release por pull request de versão, com publicação automática

- Status: Aceita (ajusta a [0007](0007-fluxo-de-git-e-versionamento.md) no ponto de versionamento)
- Data: 2026-11-12

## Contexto

A 0007 previa que o CI abrisse sozinho o pull request de release. Na prática, um pull request aberto pelo token padrão do GitHub Actions não dispara outros workflows, então os checks obrigatórios do `main` nunca rodariam nele e o merge ficaria bloqueado. Contornar isso exige um token pessoal ou um GitHub App guardado como segredo.

## Decisão

- O pull request de versão é aberto por uma pessoa: `pnpm changeset version` numa branch `chore/release-x.y.z`, que consome os changesets, atualiza as versões e os `CHANGELOG.md`. Ele passa pelo CI e pela revisão como qualquer outro.
- A publicação é automática: a cada merge no `main`, o workflow `release.yml` publica no npm os pacotes cuja versão ainda não existe lá, cria as tags e as releases no GitHub.
- A autenticação no npm usa Trusted Publishing (OIDC): não há token de publicação guardado no repositório, e os pacotes saem com atestado de proveniência.
- O workflow só roda com a variável `NPM_PUBLISH` definida como `true` no repositório, para não falhar antes de a organização no npm existir.

## Alternativas consideradas

- **Token pessoal ou GitHub App para o bot abrir o pull request:** automatiza um passo de um comando, ao custo de um segredo de longa duração com permissão de escrita.
- **Publicar à mão:** sem proveniência e dependente da máquina de quem publica.

## Consequências

- Nenhum segredo de longa duração no repositório.
- O texto do changelog é revisado no pull request de versão antes de ir a público.
- A primeira publicação de cada pacote é manual, porque o npm só permite configurar o Trusted Publishing de um pacote que já existe. O passo a passo está em [`docs/publicacao.md`](../publicacao.md).
