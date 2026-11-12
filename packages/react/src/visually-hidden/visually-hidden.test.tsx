import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { VisuallyHidden } from './visually-hidden';

describe('VisuallyHidden', () => {
  it('dá nome acessível a um controle sem texto visível', () => {
    render(
      <button type="button">
        <VisuallyHidden>Fechar</VisuallyHidden>
      </button>,
    );

    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
  });

  it('tira o conteúdo do fluxo visual sem removê-lo do DOM', () => {
    render(<VisuallyHidden>Carregando</VisuallyHidden>);

    expect(screen.getByText('Carregando')).toHaveStyle({
      position: 'absolute',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    });
  });

  it('repassa atributos e mescla o style recebido', () => {
    render(
      <VisuallyHidden id="dica" style={{ color: 'red' }}>
        Dica
      </VisuallyHidden>,
    );

    const element = screen.getByText('Dica');
    expect(element).toHaveAttribute('id', 'dica');
    expect(element).toHaveStyle({ color: 'rgb(255, 0, 0)', position: 'absolute' });
  });
});
