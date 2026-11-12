# 0005 — Tokens no formato DTCG com Style Dictionary

- Status: Aceita
- Data: 2026-11-12

## Contexto

Cores, tipografia, espaçamento e raios precisam de uma única fonte, lida por código, por ferramentas de design e por agentes de IA, e precisam servir a várias marcas sobre a mesma base.

## Decisão

Escrever os tokens em JSON no formato do [Design Tokens Community Group](https://www.designtokens.org/tr/2025.10/) (versão estável 2025.10) e compilar com Style Dictionary para variáveis CSS, o `@theme` do Tailwind e tipos TypeScript.

Os tokens têm três camadas:

1. **Primitivos:** a paleta e as escalas cruas. Não são usados diretamente pelos componentes.
2. **Semânticos:** o significado (`surface`, `ink`, `primary`). É o que os componentes consomem.
3. **Marcas e temas:** cada marca aponta os semânticos para outros primitivos.

## Alternativas consideradas

- **Tokens escritos direto em CSS:** simples, mas sem validação, sem tipos e sem interoperabilidade com ferramentas de design.
- **Formato próprio em TypeScript:** tipado, mas fora do padrão que Figma, Tokens Studio e Style Dictionary já leem.

## Consequências

- Uma marca nova é um arquivo de tokens, sem tocar nos componentes.
- O contraste de cada par texto e fundo é verificado por teste em todos os temas.
- Existe uma etapa de build entre o JSON e o CSS, executada pelo Turborepo antes dos componentes.
