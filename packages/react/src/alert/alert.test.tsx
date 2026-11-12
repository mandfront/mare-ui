import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert } from './alert';

describe('Alert', () => {
  it('informativo usa role status e mostra título e texto', () => {
    render(<Alert title="Nova versão disponível">A 0.3.0 traz o componente Tabs.</Alert>);

    const alert = screen.getByRole('status');
    expect(alert).toHaveTextContent('Nova versão disponível');
    expect(alert).toHaveTextContent('A 0.3.0 traz o componente Tabs.');
  });

  it('danger usa role alert, para ser anunciado na hora', () => {
    render(<Alert tone="danger" title="Falha no CI" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Falha no CI');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it.each(['info', 'success', 'warning'] as const)('%s usa role status', (tone) => {
    render(<Alert tone={tone} title="Mensagem" />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('a marca lateral é decorativa', () => {
    const { container } = render(<Alert title="Publicado no npm" />);

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
