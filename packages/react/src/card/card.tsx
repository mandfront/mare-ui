import { cloneElement, type ComponentPropsWithRef, type ReactElement } from 'react';

import { cn } from '../lib/cn';

type DivProps = Omit<ComponentPropsWithRef<'div'>, 'className'> & { className?: string };

/** Agrupa conteúdo relacionado. Monte com as partes: CardHeader, CardBody e CardFooter. */
export function Card({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card"
      {...props}
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-line bg-surface-raised text-ink shadow-(--shadow-sm)',
        className,
      )}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-header"
      {...props}
      className={cn('flex flex-col gap-1 px-5 pt-5', className)}
    />
  );
}

export interface CardTitleProps extends Omit<ComponentPropsWithRef<'h3'>, 'className'> {
  className?: string;
  /**
   * Troca o elemento do título, para encaixar na hierarquia de títulos da página.
   * Padrão: `<h3>`. Exemplo: `render={<h2 />}`.
   */
  render?: ReactElement<Record<string, unknown>>;
}

export function CardTitle({ className, render, ...props }: CardTitleProps) {
  const titleProps = {
    'data-slot': 'card-title',
    ...props,
    className: cn('text-h3 text-ink', className),
  };

  // Sem hooks de propósito: o Card inteiro pode ser renderizado no servidor.
  // eslint-disable-next-line jsx-a11y/heading-has-content -- o conteúdo vem em props.children
  return render ? cloneElement(render, titleProps) : <h3 {...titleProps} />;
}

export function CardDescription({
  className,
  ...props
}: Omit<ComponentPropsWithRef<'p'>, 'className'> & { className?: string }) {
  return (
    <p
      data-slot="card-description"
      {...props}
      className={cn('text-small text-ink-muted', className)}
    />
  );
}

export function CardBody({ className, ...props }: DivProps) {
  return <div data-slot="card-body" {...props} className={cn('px-5 py-4 text-body', className)} />;
}

export function CardFooter({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-footer"
      {...props}
      className={cn(
        'flex items-center justify-end gap-3 border-t border-line px-5 py-4',
        className,
      )}
    />
  );
}
