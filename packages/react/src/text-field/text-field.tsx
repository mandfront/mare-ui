import { Field } from '@base-ui/react/field';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '../lib/cn';
import { focusRing } from '../lib/focus-ring';

export interface TextFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'className'> {
  /** Rótulo sempre visível. O placeholder é exemplo, nunca rótulo. */
  label: string;
  /** Explica o formato esperado. Some quando há erro. */
  hint?: string;
  /** Mensagem de erro: diz o que fazer, como "Digite um e-mail válido, como nome@empresa.com". */
  error?: string;
  /** Classes do contêiner (rótulo, campo e mensagens). */
  className?: string;
}

/**
 * Campo de texto com rótulo, dica e erro já ligados ao campo para leitores de
 * tela (`aria-describedby`, `aria-invalid`). A `ref` vai para o `<input>`.
 */
export function TextField({ label, hint, error, className, disabled, ...props }: TextFieldProps) {
  const invalid = Boolean(error);

  return (
    <Field.Root
      invalid={invalid}
      disabled={disabled}
      data-slot="text-field"
      className={cn('flex flex-col gap-1', className)}
    >
      <Field.Label className="text-label text-ink data-disabled:text-ink-muted">
        {label}
      </Field.Label>
      <Field.Control
        {...props}
        className={cn(
          'h-control-lg w-full min-w-0 rounded-md border border-line-strong bg-surface-raised px-3 text-body text-ink',
          'transition-colors duration-(--duration-fast) motion-reduce:transition-none',
          'placeholder:text-ink-muted not-data-disabled:hover:border-ink-muted',
          focusRing,
          'data-invalid:border-danger data-invalid:inset-ring data-invalid:inset-ring-danger',
          'data-disabled:cursor-not-allowed data-disabled:bg-surface-sunken data-disabled:text-ink-muted',
        )}
      />
      {invalid ? (
        <Field.Error match className="text-small font-medium text-danger">
          {error}
        </Field.Error>
      ) : hint ? (
        <Field.Description className="text-small text-ink-muted">{hint}</Field.Description>
      ) : null}
    </Field.Root>
  );
}
