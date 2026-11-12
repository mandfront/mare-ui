import { tokenNames } from '@mare-ui/tokens';
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** Sufixos dos tokens de um namespace do tema: `color-ink` → `ink`. */
function namesIn(namespace: string): string[] {
  const prefix = `${namespace}-`;
  return tokenNames
    .filter((name) => name.startsWith(prefix) && !name.includes('--'))
    .map((name) => name.slice(prefix.length));
}

/**
 * O tailwind-merge precisa conhecer os nomes do tema para saber que
 * `text-body` (tamanho) e `text-ink` (cor) não se anulam, e que
 * `bg-primary` e `bg-danger` sim.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: namesIn('color'),
      text: namesIn('text'),
      spacing: namesIn('spacing'),
      radius: namesIn('radius'),
      shadow: namesIn('shadow'),
      font: namesIn('font'),
    },
  },
});

/** Junta classes condicionais e resolve conflitos do Tailwind (a última vence). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
