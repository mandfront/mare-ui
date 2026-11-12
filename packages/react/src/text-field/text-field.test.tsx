import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { TextField } from './text-field';

describe('TextField', () => {
  it('liga o rótulo ao campo', () => {
    render(<TextField label="Nome da marca" />);

    expect(screen.getByRole('textbox', { name: 'Nome da marca' })).toBeInTheDocument();
  });

  it('clicar no rótulo foca o campo', async () => {
    const user = userEvent.setup();
    render(<TextField label="Nome da marca" />);

    await user.click(screen.getByText('Nome da marca'));

    expect(screen.getByRole('textbox', { name: 'Nome da marca' })).toHaveFocus();
  });

  it('a dica descreve o campo', () => {
    render(<TextField label="Nome da marca" hint="Aparece no topo do site." />);

    expect(screen.getByRole('textbox', { name: 'Nome da marca' })).toHaveAccessibleDescription(
      'Aparece no topo do site.',
    );
  });

  it('o erro marca o campo como inválido, descreve o campo e substitui a dica', () => {
    render(
      <TextField
        label="E-mail"
        hint="Usado só para avisos."
        error="Digite um e-mail válido, como nome@empresa.com."
      />,
    );

    const input = screen.getByRole('textbox', { name: 'E-mail' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Digite um e-mail válido, como nome@empresa.com.');
    expect(screen.queryByText('Usado só para avisos.')).not.toBeInTheDocument();
  });

  it('repassa props do input e a ref', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <TextField
        ref={ref}
        label="E-mail"
        type="email"
        name="email"
        placeholder="nome@empresa.com"
        onChange={onChange}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'E-mail' });
    await user.type(input, 'oi');

    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveValue('oi');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('desabilitado não recebe texto', async () => {
    const user = userEvent.setup();
    render(<TextField label="Código" disabled />);

    const input = screen.getByRole('textbox', { name: 'Código' });
    await user.type(input, 'abc');

    expect(input).toBeDisabled();
    expect(input).toHaveValue('');
  });
});
