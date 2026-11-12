# 0003 — Base UI como camada de comportamento

- Status: Aceita
- Data: 2026-11-12

## Contexto

Componentes como Dialog, Tabs e Select exigem gerenciamento de foco, navegação por teclado e atributos ARIA corretos. Reimplementar isso é a maior fonte de bugs de acessibilidade em bibliotecas próprias.

## Decisão

Usar o [Base UI](https://base-ui.com) como camada de comportamento, sem estilo, nos componentes interativos. O Maré UI cuida do visual, dos tokens e da API pública. Componentes simples (Badge, Card) continuam sendo HTML semântico puro.

O pacote exige React 19, o que permite receber `ref` como prop comum, sem `forwardRef`.

## Alternativas consideradas

- **Radix Primitives:** maduro e muito adotado, mas com ritmo de evolução menor; o Base UI vem de parte da mesma equipe e é a base padrão atual do shadcn/ui.
- **React Aria Components:** o mais rigoroso em acessibilidade e internacionalização, com API mais verbosa. Fica como referência para comparar comportamento.
- **Implementar do zero:** controle total, mas custo alto e risco de regressões de acessibilidade.

## Consequências

- O comportamento acessível vem testado de uma biblioteca mantida; os testes do Maré UI focam no que o projeto acrescenta.
- A API pública não expõe tipos do Base UI diretamente, para que a troca da camada de baixo continue possível.
- React 18 não é suportado.
