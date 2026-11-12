import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { Button, type ButtonProps } from '../button';
import { cn } from '../lib/cn';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

/**
 * Interrompe o fluxo para uma decisão. Use pouco. O foco vai para o diálogo ao
 * abrir e volta para quem abriu ao fechar; Esc e clique fora fecham.
 * Monte com DialogTrigger, DialogContent, DialogTitle, DialogDescription,
 * DialogFooter e DialogClose.
 */
export function Dialog({ onOpenChange, ...props }: DialogProps) {
  return (
    <BaseDialog.Root
      {...props}
      onOpenChange={(open) => {
        onOpenChange?.(open);
      }}
    />
  );
}

/** Botão que abre o diálogo. Aceita as mesmas props visuais do Button. */
export function DialogTrigger({
  variant = 'secondary',
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseDialog.Trigger
      {...props}
      render={<Button variant={variant} size={size} className={className} />}
    >
      {children}
    </BaseDialog.Trigger>
  );
}

/** Botão que fecha o diálogo. Por padrão, `ghost`. */
export function DialogClose({
  variant = 'ghost',
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseDialog.Close
      {...props}
      render={<Button variant={variant} size={size} className={className} />}
    >
      {children}
    </BaseDialog.Close>
  );
}

export interface DialogContentProps {
  className?: string;
  children?: ReactNode;
}

/** A caixa do diálogo, com o fundo escurecido por trás. */
export function DialogContent({ className, children }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        data-slot="dialog-backdrop"
        className={cn(
          'fixed inset-0 bg-overlay',
          'transition-opacity duration-(--duration-base) motion-reduce:transition-none',
          'data-ending-style:opacity-0 data-starting-style:opacity-0',
        )}
      />
      <BaseDialog.Popup
        data-slot="dialog"
        className={cn(
          'fixed inset-x-4 top-1/2 mx-auto flex max-w-md -translate-y-1/2 flex-col gap-3',
          'rounded-lg bg-surface-raised p-5 text-ink shadow-(--shadow-lg) outline-none',
          'transition-[opacity,translate] duration-(--duration-base) ease-out motion-reduce:transition-none',
          'data-ending-style:opacity-0 data-starting-style:translate-y-[calc(-50%+var(--spacing-2))] data-starting-style:opacity-0',
          className,
        )}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogTitle({
  className,
  ...props
}: Omit<ComponentPropsWithRef<'h2'>, 'className'> & { className?: string }) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      {...props}
      className={cn('text-h3 text-ink', className)}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: Omit<ComponentPropsWithRef<'p'>, 'className'> & { className?: string }) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      {...props}
      className={cn('text-body text-ink-muted', className)}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: Omit<ComponentPropsWithRef<'div'>, 'className'> & { className?: string }) {
  return (
    <div
      data-slot="dialog-footer"
      {...props}
      className={cn('mt-2 flex justify-end gap-3', className)}
    />
  );
}
