import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';

import { cn } from '../lib/cn';

export const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft align-middle font-bold text-primary-strong select-none',
  {
    variants: {
      size: {
        sm: 'size-6 text-caption font-bold',
        md: 'size-control-md text-small font-bold',
        lg: 'size-7 text-body font-bold',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/** Iniciais do primeiro e do último nome: "Amanda Caraça" → "AC". */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words.at(0)?.charAt(0) ?? '';
  const last = words.length > 1 ? (words.at(-1)?.charAt(0) ?? '') : '';
  return (first + last).toLocaleUpperCase('pt-BR');
}

export interface AvatarProps
  extends
    Omit<ComponentPropsWithRef<'span'>, 'className' | 'children'>,
    VariantProps<typeof avatarVariants> {
  /** Nome da pessoa ou marca. Vira o nome acessível e as iniciais de reserva. */
  name: string;
  /** Foto. Enquanto carrega, ou se falhar, aparecem as iniciais. */
  src?: string;
  className?: string;
}

/** Representa uma pessoa ou marca, com foto ou iniciais. */
export function Avatar({ name, src, size, className, ...props }: AvatarProps) {
  return (
    <BaseAvatar.Root
      data-slot="avatar"
      role="img"
      aria-label={name}
      {...props}
      className={cn(avatarVariants({ size }), className)}
    >
      {src ? <BaseAvatar.Image src={src} alt="" className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback aria-hidden="true">{getInitials(name)}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
