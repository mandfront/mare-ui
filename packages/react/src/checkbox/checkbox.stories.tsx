import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Formulário/Checkbox',
  id: 'formulario-checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Receber novidades por e-mail', onCheckedChange: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Escolha independente, que vale ao enviar o formulário. O rótulo inteiro é clicável. Para algo que vale na hora, sem botão de salvar, use o Switch.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
  play: async ({ args, canvas }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Receber novidades por e-mail' });
    await userEvent.click(canvas.getByText('Receber novidades por e-mail'));
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  },
};

const Estados = () => (
  <div className="flex flex-col gap-3">
    <Checkbox label="Desmarcado" />
    <Checkbox label="Marcado" defaultChecked />
    <Checkbox label="Parte dos itens" indeterminate />
    <Checkbox label="Indisponível" disabled />
  </div>
);

export const Todos: Story = { name: 'Estados', render: Estados };

export const Teclado: Story = {
  name: 'Uso pelo teclado',
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Receber novidades por e-mail' });
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await expect(getComputedStyle(checkbox).outlineStyle).toBe('solid');
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
  },
};

export const TemaEscuro: Story = {
  name: 'Tema escuro',
  globals: { theme: 'dark' },
  render: Estados,
};

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  render: Estados,
};
