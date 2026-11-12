import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('tem o rótulo como nome acessível e começa desmarcado', () => {
    render(<Checkbox label="Receber novidades" />);

    expect(screen.getByRole('checkbox', { name: 'Receber novidades' })).not.toBeChecked();
  });

  it('marca e desmarca com clique na caixa ou no rótulo', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn<(checked: boolean) => void>();
    render(<Checkbox label="Receber novidades" onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Receber novidades' });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(screen.getByText('Receber novidades'));
    expect(checkbox).not.toBeChecked();
    expect(onCheckedChange.mock.calls.map(([checked]) => checked)).toEqual([true, false]);
  });

  it('alterna com Espaço pelo teclado', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Aceito os termos" />);

    await user.tab();
    await user.keyboard(' ');

    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos' });
    expect(checkbox).toHaveFocus();
    expect(checkbox).toBeChecked();
  });

  it('respeita defaultChecked e o estado misto', () => {
    render(
      <>
        <Checkbox label="Marcado" defaultChecked />
        <Checkbox label="Todos" indeterminate />
      </>,
    );

    expect(screen.getByRole('checkbox', { name: 'Marcado' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Todos' })).toBePartiallyChecked();
  });

  it('desabilitado não muda', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Indisponível" disabled />);

    const checkbox = screen.getByRole('checkbox', { name: 'Indisponível' });
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
  });
});
