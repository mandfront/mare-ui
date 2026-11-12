import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '../lib/cn';

export const alertVariants = cva('flex gap-3 rounded-md p-4 text-ink', {
  variants: {
    tone: {
      info: 'bg-primary-soft [--alert-mark:var(--color-primary)]',
      success: 'bg-success-soft [--alert-mark:var(--color-success)]',
      warning: 'bg-warning-soft [--alert-mark:var(--color-warning)]',
      danger: 'bg-danger-soft [--alert-mark:var(--color-danger)]',
    },
  },
  defaultVariants: {
    tone: 'info',
  },
});

export interface AlertProps
  extends
    Omit<ComponentPropsWithRef<'div'>, 'className' | 'title'>,
    VariantProps<typeof alertVariants> {
  /** O que aconteceu. */
  title?: ReactNode;
  /** O que fazer a respeito, quando houver. */
  children?: ReactNode;
  className?: string;
}

/**
 * Mensagem na própria página, sem bloquear a pessoa. `danger` é anunciado na
 * hora por leitores de tela (`role="alert"`); os outros tons, com educação
 * (`role="status"`), sem interromper.
 */
export function Alert({ tone, title, children, className, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role={tone === 'danger' ? 'alert' : 'status'}
      {...props}
      className={cn(alertVariants({ tone }), className)}
    >
      <span aria-hidden="true" className="w-1 shrink-0 rounded-full bg-(--alert-mark)" />
      <div className="flex flex-col gap-1">
        {title ? <p className="text-label text-ink">{title}</p> : null}
        {children ? <div className="text-small text-ink">{children}</div> : null}
      </div>
    </div>
  );
}
