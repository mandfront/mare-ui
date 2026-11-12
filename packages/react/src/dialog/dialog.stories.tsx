import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';

import { Button } from '../button';
import { TextField } from '../text-field';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta = {
  title: 'Feedback/Dialog',
  id: 'feedback-dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Interrompe o fluxo para uma decisão; use pouco. O título é uma pergunta e o botão de confirmar repete o verbo ("Excluir"), nunca "Sim". O foco entra no diálogo ao abrir e volta ao gatilho ao fechar; Esc e clique fora fecham.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const ExcluirRascunho = () => (
  <Dialog>
    <DialogTrigger>Excluir rascunho</DialogTrigger>
    <DialogContent>
      <DialogTitle>Excluir este rascunho?</DialogTitle>
      <DialogDescription>
        O rascunho some para todo o time. Esta ação não pode ser desfeita.
      </DialogDescription>
      <DialogFooter>
        <DialogClose>Cancelar</DialogClose>
        <Button variant="danger">Excluir</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Confirmacao: Story = {
  name: 'Confirmação destrutiva',
  render: ExcluirRascunho,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Excluir rascunho' });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Excluir este rascunho?' });
    // Espera a transição de abertura terminar (o diálogo nasce com opacidade 0).
    await waitFor(() => expect(dialog).toBeVisible());
    // O fundo escurecido cobre a tela inteira.
    const backdrop = document.querySelector('[data-slot="dialog-backdrop"]');
    await expect(backdrop?.getBoundingClientRect().width).toBe(window.innerWidth);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};

export const ComFormulario: Story = {
  name: 'Com formulário',
  render: () => (
    <Dialog>
      <DialogTrigger variant="primary">Nova marca</DialogTrigger>
      <DialogContent>
        <DialogTitle>Nova marca</DialogTitle>
        <DialogDescription>A marca ganha um tema próprio a partir dos tokens.</DialogDescription>
        <TextField label="Nome da marca" placeholder="Ex.: Marego" />
        <DialogFooter>
          <DialogClose>Cancelar</DialogClose>
          <Button>Criar marca</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Nova marca' }));
    const input = await screen.findByRole('textbox', { name: 'Nome da marca' });
    await waitFor(() => expect(input).toHaveFocus());
  },
};

const Aberto = () => (
  <Dialog defaultOpen>
    <DialogContent>
      <DialogTitle>Excluir este rascunho?</DialogTitle>
      <DialogDescription>
        O rascunho some para todo o time. Esta ação não pode ser desfeita.
      </DialogDescription>
      <DialogFooter>
        <DialogClose>Cancelar</DialogClose>
        <Button variant="danger">Excluir</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const TemaEscuro: Story = {
  name: 'Tema escuro',
  globals: { theme: 'dark' },
  parameters: { layout: 'fullscreen' },
  render: Aberto,
};

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  parameters: { layout: 'fullscreen' },
  render: Aberto,
};
