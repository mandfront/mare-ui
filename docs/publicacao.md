# Publicação

Como uma mudança vira uma versão no npm. A decisão por trás deste fluxo está na [ADR 0008](decisions/0008-release-por-pr-de-versao.md).

## No dia a dia

1. **Em todo pull request que muda um pacote**, rode `pnpm changeset`, escolha os pacotes e o tipo de versão, e escreva uma frase para o changelog. O arquivo gerado em `.changeset/` entra no mesmo pull request.

   | Tipo  | Quando                                             |
   | ----- | -------------------------------------------------- |
   | patch | Correção que não muda a API                        |
   | minor | Componente, prop ou token novo                     |
   | major | Mudança que quebra quem já usa (a partir da 1.0.0) |

   Enquanto a versão for `0.x`, mudanças que quebram entram como minor.

2. **Para lançar**, abra um pull request de versão:

   ```bash
   git switch -c chore/release-0.2.0
   pnpm changeset version   # consome os changesets, atualiza versões e CHANGELOG.md
   pnpm install             # atualiza o lockfile
   git commit -am "chore: versão 0.2.0"
   ```

3. **No merge**, o workflow `release.yml` publica no npm o que ainda não está lá, cria as tags e as releases no GitHub.

## Configuração inicial (uma vez)

O workflow de release fica desligado até estes passos serem feitos.

1. Criar a organização `mare-ui` em [npmjs.com](https://www.npmjs.com/org/create), no plano gratuito.
2. Publicar a primeira versão à mão, porque o npm só aceita configurar o Trusted Publishing de um pacote que já existe:

   ```bash
   npm login
   pnpm install && pnpm build
   pnpm changeset publish
   git push origin --tags
   ```

3. No npm, em cada pacote (`@mare-ui/tokens` e `@mare-ui/react`): **Settings → Trusted Publisher → GitHub Actions**, com organização `mandfront`, repositório `mare-ui` e workflow `release.yml`.
4. No GitHub: **Settings → Secrets and variables → Actions → Variables**, criar `NPM_PUBLISH` com o valor `true`.

A partir daí, toda versão sai pelo CI, sem token salvo e com atestado de proveniência.

## Registry shadcn

O `registry.json` da raiz é gerado por `pnpm registry` a partir das pastas de componentes; o CI falha se ele estiver desatualizado. Para instalar um componente como código-fonte:

```bash
pnpm dlx shadcn@latest add mandfront/mare-ui/button
```

Os arquivos vão para `components/mare-ui/`. Os componentes instalados assim dependem do `@mare-ui/tokens` publicado no npm e do tema importado no CSS do projeto:

```css
@import 'tailwindcss';
@import '@mare-ui/tokens/theme.css';
```
