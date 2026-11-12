import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('junta classes e ignora valores falsos', () => {
    expect(cn('px-4', false, null, undefined, 'py-2')).toBe('px-4 py-2');
  });

  it('a última classe vence em conflitos de tokens', () => {
    expect(cn('bg-primary', 'bg-danger')).toBe('bg-danger');
    expect(cn('px-4', 'px-5')).toBe('px-5');
    expect(cn('rounded-md', 'rounded-full')).toBe('rounded-full');
    expect(cn('h-control-md', 'h-control-lg')).toBe('h-control-lg');
  });

  it('mantém tamanho de texto e cor de texto juntos', () => {
    expect(cn('text-body', 'text-on-primary')).toBe('text-body text-on-primary');
    expect(cn('text-label', 'text-small')).toBe('text-small');
    expect(cn('text-ink', 'text-ink-muted')).toBe('text-ink-muted');
  });
});
