import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import { focusRing } from '../lib/focus-ring';

export interface CheckboxProps {
  /** Texto clicável ao lado da caixa. */
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Estado misto, para um "selecionar todos" com parte dos itens marcados. */
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  /** Classes do contêiner (caixa e rótulo). */
  className?: string;
}

/**
 * Escolha independente, ligada ou desligada, que vale ao enviar o formulário.
 * Para algo que vale na hora, use Switch.
 */
export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label
      data-slot="checkbox"
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 text-body text-ink select-none',
        'has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50',
        className,
      )}
    >
      <BaseCheckbox.Root
        {...props}
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-sm border-2 border-line-strong bg-surface-raised text-on-primary',
          'transition-colors duration-(--duration-fast) motion-reduce:transition-none',
          'data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary',
          focusRing,
        )}
      >
        {/* Os dois desenhos ficam no DOM e o CSS escolhe qual mostrar, sem função de render. */}
        <BaseCheckbox.Indicator
          keepMounted
          className="flex data-unchecked:not-data-indeterminate:invisible"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="M3.5 8.5l3 3 6-7" className="in-data-indeterminate:hidden" />
            <path d="M4 8h8" className="hidden in-data-indeterminate:block" />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label}
    </label>
  );
}
