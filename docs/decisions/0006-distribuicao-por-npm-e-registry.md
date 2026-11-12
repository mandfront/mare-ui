# 0006 — Distribuição por npm e registry shadcn

- Status: Aceita
- Data: 2026-11-12

## Contexto

Há dois perfis de consumo. Produtos que querem receber correções com uma atualização de versão, e projetos que precisam adaptar o componente e preferem ter o código dentro do próprio repositório.

## Decisão

Publicar pelos dois canais a partir do mesmo código:

- **npm:** `@mare-ui/tokens` e `@mare-ui/react`, versionados com SemVer e publicados pelo CI com proveniência (Trusted Publishing, sem token de longa duração).
- **Registry shadcn:** um `registry.json` na raiz, para instalar componentes como código-fonte com a CLI do shadcn.

A documentação é um Storybook publicado a cada merge, com o servidor MCP ativo para que agentes de IA consultem componentes, props e exemplos.

## Alternativas consideradas

- **Só npm:** mais simples de manter, mas quem precisa adaptar um componente fica limitado às props.
- **Só registry:** dá controle total a quem consome, mas correções não chegam sozinhas.

## Consequências

- Os componentes precisam funcionar tanto compilados quanto copiados, o que restringe dependências internas entre arquivos.
- Os pacotes ficam marcados como privados até a primeira versão, para evitar publicação acidental.
