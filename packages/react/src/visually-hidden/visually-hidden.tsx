import type { ComponentPropsWithRef, CSSProperties } from 'react';

const visuallyHiddenStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  borderWidth: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
};

export type VisuallyHiddenProps = ComponentPropsWithRef<'span'>;

/**
 * Esconde o conteúdo da tela, mas o mantém disponível para leitores de tela.
 * Use para dar nome acessível a controles que só têm ícone.
 */
export function VisuallyHidden({ style, ...props }: VisuallyHiddenProps) {
  return (
    <span data-slot="visually-hidden" {...props} style={{ ...visuallyHiddenStyle, ...style }} />
  );
}
