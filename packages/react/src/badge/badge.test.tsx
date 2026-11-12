import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './badge';

describe('Badge', () => {
  it('mostra o texto do status', () => {
    render(<Badge>Publicado</Badge>);

    expect(screen.getByText('Publicado')).toHaveAttribute('data-slot', 'badge');
  });

  it('usa o tom neutro por padrão', () => {
    render(<Badge>Rascunho</Badge>);

    expect(screen.getByText('Rascunho').className).toContain('bg-surface-sunken');
  });

  it('aplica o tom pedido', () => {
    render(<Badge tone="danger">Com erro</Badge>);

    expect(screen.getByText('Com erro').className).toContain('bg-danger-soft');
  });

  it('repassa atributos e mescla className', () => {
    render(
      <Badge id="status" className="rounded-full">
        Novo
      </Badge>,
    );

    const badge = screen.getByText('Novo');
    expect(badge).toHaveAttribute('id', 'status');
    expect(badge.className).toContain('rounded-full');
    expect(badge.className).not.toContain('rounded-sm');
  });
});
