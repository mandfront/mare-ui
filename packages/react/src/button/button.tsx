import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '../lib/cn';
import { focusRing } from '../lib/focus-ring';

export const buttonVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap select-none',
    'rounded-md border border-transparent font-sans font-semibold',
    'transition-colors duration-(--duration-fast) ease-out motion-reduce:transition-none',
    focusRing,
    'data-disabled:cursor-not-allowed data-disabled:not-data-loading:opacity-50',
    'data-loading:cursor-progress',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-on-primary shadow-(--shadow-sm) not-data-disabled:hover:bg-primary-hover',
        secondary:
          'border-line-strong bg-surface-raised text-ink not-data-disabled:hover:bg-surface-sunken',
        soft: 'bg-primary-soft text-primary-strong not-data-disabled:hover:bg-primary-soft/70',
        ghost: 'bg-transparent text-ink not-data-disabled:hover:bg-surface-sunken',
        danger: 'bg-danger text-on-status not-data-disabled:hover:bg-danger/90',
      },
      size: {
        sm: 'h-control-sm px-3 text-small font-semibold',
        md: 'h-control-md px-4 text-label',
        lg: 'h-control-lg px-5 text-body font-semibold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'className'>, ButtonVariantProps {
  /** Classes extras. Em conflito com as do componente, as daqui vencem. */
  className?: string;
  /**
   * Mostra um indicador de carregamento. O botão fica desabilitado para clique,
   * mas continua focável e anuncia `aria-busy`, para não perder o foco do teclado.
   */
  loading?: boolean;
}

/**
 * Dispara uma ação. Use `primary` no máximo uma vez por tela; `danger` só para
 * ações destrutivas.
 *
 * Para navegar, use um link com a aparência de botão, que mantém a semântica
 * de link para leitores de tela:
 *
 * ```tsx
 * <a href="/planos" className={buttonVariants({ variant: 'secondary' })}>Ver planos</a>
 * ```
 */
export function Button({
  variant,
  size,
  loading = false,
  disabled = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      {...props}
      type={type}
      disabled={disabled || loading}
      focusableWhenDisabled={loading}
      aria-busy={loading || undefined}
      data-loading={loading ? '' : undefined}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {loading ? (
        <span
          aria-hidden="true"
          data-slot="button-spinner"
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
        />
      ) : null}
      {children}
    </BaseButton>
  );
}
