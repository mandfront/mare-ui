import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './switch';

describe('Switch', () => {
  it('tem papel switch com o rótulo como nome', () => {
    render(<Switch label="Tema escuro" />);

    expect(screen.getByRole('switch', { name: 'Tema escuro' })).not.toBeChecked();
  });

  it('liga com clique na chave ou no rótulo e avisa a mudança', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Tema escuro" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', { name: 'Tema escuro' });
    await user.click(control);
    expect(control).toBeChecked();

    await user.click(screen.getByText('Tema escuro'));
    expect(control).not.toBeChecked();
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]]);
  });

  it('alterna pelo teclado', async () => {
    const user = userEvent.setup();
    render(<Switch label="Notificações" />);

    await user.tab();
    await user.keyboard(' ');

    expect(screen.getByRole('switch', { name: 'Notificações' })).toBeChecked();
  });

  it('pode ser controlado', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Tema escuro" checked onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', { name: 'Tema escuro' });
    await user.click(control);

    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(control).toBeChecked();
  });

  it('desabilitado não muda', async () => {
    const user = userEvent.setup();
    render(<Switch label="Indisponível" disabled />);

    const control = screen.getByRole('switch', { name: 'Indisponível' });
    await user.click(control);

    expect(control).not.toBeChecked();
  });
});
