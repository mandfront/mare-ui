# 0001 — Registrar decisões de arquitetura

- Status: Aceita
- Data: 2026-11-12

## Contexto

Um design system acumula escolhas que não aparecem no código: por que esta biblioteca e não aquela, por que este formato de token. Sem registro, cada escolha precisa ser redescoberta ou rediscutida.

## Decisão

Registrar cada decisão estrutural em um arquivo curto em `docs/decisions`, numerado em sequência, no formato contexto, decisão, alternativas e consequências.

## Alternativas consideradas

- **Só o README:** mistura o estado atual com o histórico e cresce sem controle.
- **Wiki ou ferramenta externa:** sai do fluxo de revisão por pull request e perde o vínculo com o código.

## Consequências

- Toda mudança de rumo passa por pull request, como o código.
- Quem chega ao projeto entende o porquê lendo uma pasta.
- Registros aceitos não são reescritos; uma nova decisão substitui a antiga e aponta para ela.
