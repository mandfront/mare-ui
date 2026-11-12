# 0004 — Estilo com Tailwind CSS v4 e CVA

- Status: Aceita
- Data: 2026-11-12

## Contexto

O sistema precisa trocar de marca e de tema em tempo de execução, funcionar com React Server Components e poder ser distribuído também como código-fonte (registry), não só como pacote compilado.

## Decisão

Estilizar com Tailwind CSS v4, com os tokens declarados em CSS pelo `@theme`, e definir variantes com [CVA](https://cva.style) (class-variance-authority), que gera os tipos de `variant` e `size`.

## Alternativas consideradas

- **CSS-in-JS em tempo de execução (Styled Components, Emotion):** exige runtime no cliente e não funciona em Server Components sem adaptações.
- **CSS Modules com variáveis CSS:** sem custo de runtime e sem dependência, mas não é o formato esperado pelo registry shadcn, o que fecharia um dos canais de distribuição.
- **vanilla-extract ou Panda CSS:** tipagem forte, porém ecossistema menor e mais uma etapa de build para quem consome.

## Consequências

- Tokens viram variáveis CSS nativas e utilitários ao mesmo tempo (`bg-primary` e `var(--color-primary)`).
- Trocar de marca ou tema é mudar um atributo no HTML; nenhum componente é recompilado.
- Quem consome pelo pacote npm recebe CSS compilado; quem consome pelo registry precisa de Tailwind v4 no projeto.
- Uma regra de lint impede valores de cor fixos nos componentes.
