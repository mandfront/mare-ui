# Changesets

Cada pull request que muda um pacote publicado (`@mare-ui/tokens` ou `@mare-ui/react`) inclui um arquivo nesta pasta dizendo quais pacotes mudam, o tipo de versão (patch, minor ou major) e uma frase para o changelog.

```bash
pnpm changeset
```

O passo a passo de uma release está em [`docs/publicacao.md`](../docs/publicacao.md).
