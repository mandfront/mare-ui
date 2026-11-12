# Maré UI

[![CI](https://github.com/mandfront/mare-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/mandfront/mare-ui/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/storybook-docs-0e6670.svg)](https://docs-rosy-two-80.vercel.app)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-0e6670.svg)](LICENSE)

**[Documentação e exemplos no Storybook](https://docs-rosy-two-80.vercel.app)**

Design system multi-marca: uma base única de design tokens e componentes React acessíveis que servem a várias marcas ao mesmo tempo. Trocar de marca é trocar valores de tokens, nunca reescrever componentes.

> **Em construção.** Fundação, [design tokens](packages/tokens), Storybook e os primeiros [componentes](packages/react) estão prontos. Os demais entram nas próximas etapas do [roteiro](#roteiro).

## Princípios

1. **Token antes de tudo.** Nenhum componente usa cor, espaço ou fonte fixos.
2. **Acessível por padrão.** Contraste mínimo de 4.5:1 para texto, foco de teclado sempre visível, nada depende só de cor.
3. **Composição em vez de configuração.** Partes pequenas no lugar de componentes cheios de props.
4. **Movimento com função.** Animação curta, só para comunicar estado, desligada com `prefers-reduced-motion`.
5. **Pronto para pessoas e agentes.** Documentação, tipos e Storybook com MCP, para que uma IA monte telas sem inventar props.

## Estrutura

```text
mare-ui/
├─ packages/
│  ├─ tokens/        # design tokens (formato W3C/DTCG)
│  └─ react/         # componentes React
├─ apps/
│  └─ docs/          # Storybook: documentação, testes no navegador e MCP
├─ docs/decisions/   # registros de decisões de arquitetura (ADRs)
└─ .github/          # CI, templates de PR e de issue
```

## Tecnologias

| Área          | Escolha                                                       | Decisão                                                             |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| Monorepo      | pnpm workspaces + Turborepo                                   | [0002](docs/decisions/0002-monorepo-com-pnpm-e-turborepo.md)        |
| Comportamento | Base UI                                                       | [0003](docs/decisions/0003-base-ui-como-camada-de-comportamento.md) |
| Estilo        | Tailwind CSS v4 + CVA                                         | [0004](docs/decisions/0004-estilo-com-tailwind-v4-e-cva.md)         |
| Tokens        | JSON no formato DTCG + Style Dictionary                       | [0005](docs/decisions/0005-tokens-no-formato-dtcg.md)               |
| Distribuição  | npm + registry shadcn + Storybook com MCP                     | [0006](docs/decisions/0006-distribuicao-por-npm-e-registry.md)      |
| Fluxo         | GitHub Flow, Conventional Commits, Changesets                 | [0007](docs/decisions/0007-fluxo-de-git-e-versionamento.md)         |
| Qualidade     | TypeScript estrito, ESLint, Prettier, Vitest, Testing Library | [CONTRIBUTING](CONTRIBUTING.md)                                     |

## Rodar localmente

Requisitos: Node 22.12 ou mais novo e pnpm via Corepack.

```bash
corepack enable pnpm
pnpm install
pnpm check   # formato, lint, tipos, testes e build
```

## Roteiro

- [x] Fundação: monorepo, lint, tipos, testes, hooks de Git, CI e decisões registradas
- [x] Tokens: formato DTCG, Style Dictionary, temas claro e escuro e marcas, com contraste testado
- [x] Storybook com testes de interação, acessibilidade e MCP
- [ ] Componentes: Button, Badge, Card, Avatar, TextField, Checkbox e Switch prontos; Tabs, Alert e Dialog a seguir
- [ ] Primeira versão no npm e no registry shadcn
- [ ] App de exemplo montado só com o design system

## Contribuir

Veja o [CONTRIBUTING](CONTRIBUTING.md). As decisões de arquitetura estão em [`docs/decisions`](docs/decisions).

## Licença

[MIT](LICENSE) © Amanda Caraça
