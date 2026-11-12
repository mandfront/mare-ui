import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './dialog';

function ExcluirRascunho({ onConfirm = vi.fn() }) {
  return (
    <Dialog>
      <DialogTrigger>Excluir rascunho</DialogTrigger>
      <DialogContent>
        <DialogTitle>Excluir este rascunho?</DialogTitle>
        <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
        <DialogFooter>
          <DialogClose>Cancelar</DialogClose>
          <Button variant="danger" onClick={onConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('fica fechado até clicar no gatilho', async () => {
    const user = userEvent.setup();
    render(<ExcluirRascunho />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Excluir rascunho' }));

    const dialog = await screen.findByRole('dialog', { name: 'Excluir este rascunho?' });
    expect(dialog).toHaveAccessibleDescription('Esta ação não pode ser desfeita.');
  });

  it('Esc fecha e devolve o foco ao gatilho', async () => {
    const user = userEvent.setup();
    render(<ExcluirRascunho />);

    const trigger = screen.getByRole('button', { name: 'Excluir rascunho' });
    await user.click(trigger);
    await screen.findByRole('dialog');
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it('o botão de fechar fecha o diálogo', async () => {
    const user = userEvent.setup();
    render(<ExcluirRascunho />);

    await user.click(screen.getByRole('button', { name: 'Excluir rascunho' }));
    await user.click(await screen.findByRole('button', { name: 'Cancelar' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('pode ser controlado', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Controlado</DialogTitle>
          <DialogClose>Fechar</DialogClose>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByRole('button', { name: 'Fechar' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('dialog', { name: 'Controlado' })).toBeInTheDocument();
  });
});
