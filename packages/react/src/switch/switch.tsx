import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import { focusRing } from '../lib/focus-ring';

export interface SwitchProps {
  /** O que fica ligado ("Tema escuro"), não a ação ("Ativar tema escuro"). */
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  /** Classes do contêiner (chave e rótulo). */
  className?: string;
}

/** Liga ou desliga algo que vale na hora, sem botão de salvar. */
export function Switch({ label, className, onCheckedChange, ...props }: SwitchProps) {
  return (
    <label
      data-slot="switch"
      className={cn(
        'inline-flex cursor-pointer items-center gap-3 text-body text-ink select-none',
        'has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50',
        className,
      )}
    >
      <BaseSwitch.Root
        {...props}
        onCheckedChange={(checked) => onCheckedChange?.(checked)}
        className={cn(
          'flex h-5 w-control-md shrink-0 items-center rounded-full bg-surface-sunken px-1 inset-ring-2 inset-ring-line-strong',
          'transition-colors duration-(--duration-fast) motion-reduce:transition-none',
          'data-checked:bg-primary data-checked:inset-ring-primary',
          focusRing,
        )}
      >
        <BaseSwitch.Thumb
          className={cn(
            'size-4 rounded-full bg-ink-muted',
            'transition-transform duration-(--duration-fast) motion-reduce:transition-none',
            'data-checked:translate-x-4 data-checked:bg-on-primary',
          )}
        />
      </BaseSwitch.Root>
      {label}
    </label>
  );
}
