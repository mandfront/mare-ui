import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '../lib/cn';

export const badgeVariants = cva(
  'inline-flex h-5 shrink-0 items-center gap-1 rounded-sm px-2 text-caption font-semibold whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'bg-surface-sunken text-ink inset-ring inset-ring-line',
        primary: 'bg-primary-soft text-primary-strong',
        success: 'bg-success-soft text-ink',
        warning: 'bg-warning-soft text-ink',
        danger: 'bg-danger-soft text-ink',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export interface BadgeProps
  extends Omit<ComponentPropsWithRef<'span'>, 'className'>, VariantProps<typeof badgeVariants> {
  className?: string;
}

/**
 * Uma ou duas palavras de status. O tom tem significado (verde é publicado,
 * amarelo é em revisão, vermelho é erro), nunca é enfeite, e o texto sempre
 * diz o status: a cor sozinha não basta.
 */
export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span data-slot="badge" {...props} className={cn(badgeVariants({ tone }), className)} />;
}
