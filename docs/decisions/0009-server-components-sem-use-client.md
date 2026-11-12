# 0009 — Compatibilidade com Server Components sem `"use client"`

- Status: Aceita
- Data: 2026-11-12

## Contexto

Os produtos que vão consumir o sistema usam o App Router do Next.js, onde componentes são de servidor por padrão. Um componente de servidor não pode usar hooks nem passar funções para um componente de cliente. O pacote é publicado como um único arquivo, e o bundler não preserva a diretiva `"use client"` de cada módulo.

## Decisão

Os componentes do Maré UI não usam hooks nem criam funções para passar adiante. Todo estado e toda interação ficam no Base UI, cujos módulos já são marcados como `"use client"`. Os componentes do Maré UI são só composição e classes, e por isso rodam tanto no servidor quanto no cliente, sem diretiva.

Regras que decorrem disso:

- Callbacks (`onCheckedChange`, `onValueChange`, `onOpenChange`) são repassados direto ao Base UI, sem função intermediária.
- Variações visuais por estado usam atributos `data-*` e CSS, não funções de render.
- Quando um componente é passado como `render` de uma parte do Base UI, o conteúdo vai dentro do elemento (`render={<Button>{children}</Button>}`). Num componente de servidor esse elemento já chega renderizado, e filhos passados por fora seriam descartados.

## Alternativas consideradas

- **`"use client"` no arquivo de entrada:** simples, mas transforma tudo em componente de cliente, inclusive Card, Badge e Alert, e impede chamar `buttonVariants` e `cn` no servidor.
- **Dois pontos de entrada (componentes e funções puras):** resolve o caso das funções, mas mantém os componentes estáticos no cliente e complica o import.
- **Publicar um arquivo por módulo, preservando as diretivas:** depende de comportamento do bundler que não é garantido.

## Consequências

- Card, Badge, Alert, Avatar e VisuallyHidden não enviam JavaScript próprio ao navegador quando usados no servidor.
- `buttonVariants`, `badgeVariants` e `cn` podem ser chamados em componentes de servidor.
- Os callbacks recebem também o segundo argumento do Base UI (detalhes do evento), que não faz parte do contrato do Maré UI.
- Um componente futuro que precise de hook próprio obriga a rever esta decisão.
- A compatibilidade foi verificada com um app Next.js 16 que renderiza todos os componentes num componente de servidor; esse app deve entrar no repositório como `apps/playground`, para a verificação passar a rodar no CI.
