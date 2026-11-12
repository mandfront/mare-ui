import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar, getInitials } from './avatar';

describe('getInitials', () => {
  it.each([
    ['Amanda Caraça', 'AC'],
    ['  amanda   de souza caraça ', 'AC'],
    ['Marego', 'M'],
    ['érica', 'É'],
    ['', ''],
  ])('%j → %j', (name, initials) => {
    expect(getInitials(name)).toBe(initials);
  });
});

describe('Avatar', () => {
  it('é uma imagem com o nome como nome acessível', () => {
    render(<Avatar name="Amanda Caraça" />);

    expect(screen.getByRole('img', { name: 'Amanda Caraça' })).toHaveAttribute(
      'data-slot',
      'avatar',
    );
  });

  it('mostra as iniciais escondidas de leitores de tela', () => {
    render(<Avatar name="Amanda Caraça" />);

    const initials = screen.getByText('AC');
    expect(initials).toHaveAttribute('aria-hidden', 'true');
  });

  it('enquanto a foto não carrega, mostra as iniciais', () => {
    render(<Avatar name="Amanda Caraça" src="/foto.jpg" />);

    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('aplica o tamanho pedido', () => {
    render(<Avatar name="Marego" size="lg" />);

    expect(screen.getByRole('img', { name: 'Marego' }).className).toContain('size-7');
  });
});
