import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import { focusRing } from '../lib/focus-ring';

export interface TabsProps {
  /** Aba ativa, quando controlado. */
  value?: string;
  /** Aba ativa inicial, quando não controlado. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children?: ReactNode;
}

/**
 * Alterna entre vistas do mesmo conteúdo. Teclado: setas para trocar de aba,
 * Home e End para a primeira e a última. Monte com TabsList, TabsTab e TabsPanel.
 */
export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root data-slot="tabs" {...props} className={cn('flex flex-col', className)} />;
}

export interface TabsListProps {
  /** Nome acessível da lista de abas, quando não há um título visível que a descreva. */
  'aria-label'?: string;
  className?: string;
  children?: ReactNode;
}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      {...props}
      className={cn('inline-flex w-fit gap-1 rounded-md bg-surface-sunken p-1', className)}
    />
  );
}

export interface TabsTabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function TabsTab({ className, ...props }: TabsTabProps) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-tab"
      {...props}
      className={cn(
        'h-6 cursor-pointer rounded-sm px-3 text-label whitespace-nowrap text-ink-muted',
        'transition-colors duration-(--duration-fast) motion-reduce:transition-none',
        'not-data-disabled:hover:text-ink',
        'data-active:bg-surface-raised data-active:text-ink data-active:shadow-(--shadow-sm)',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        focusRing,
        className,
      )}
    />
  );
}

export interface TabsPanelProps {
  value: string;
  /** Mantém o painel no DOM mesmo quando inativo (por exemplo, para não perder um formulário). */
  keepMounted?: boolean;
  className?: string;
  children?: ReactNode;
}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-panel"
      {...props}
      className={cn('rounded-sm pt-4 text-body text-ink', focusRing, className)}
    />
  );
}
