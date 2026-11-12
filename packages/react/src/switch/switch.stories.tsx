import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Switch } from './switch';

const meta = {
  title: 'Formulário/Switch',
  id: 'formulario-switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Tema escuro', onCheckedChange: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Liga ou desliga algo que vale na hora. O rótulo diz o que fica ligado ("Tema escuro"), não a ação. Para escolhas que só valem ao enviar um formulário, use o Checkbox.',
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
  play: async ({ args, canvas }) => {
    const control = canvas.getByRole('switch', { name: 'Tema escuro' });
    await userEvent.click(control);
    await expect(control).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  },
};

const Estados = () => (
  <div className="flex flex-col gap-3">
    <Switch label="Desligado" />
    <Switch label="Ligado" defaultChecked />
    <Switch label="Indisponível" disabled />
  </div>
);

export const Todos: Story = { name: 'Estados', render: Estados };

export const Teclado: Story = {
  name: 'Uso pelo teclado',
  play: async ({ canvas }) => {
    const control = canvas.getByRole('switch', { name: 'Tema escuro' });
    await userEvent.tab();
    await expect(control).toHaveFocus();
    await expect(getComputedStyle(control).outlineStyle).toBe('solid');
    await userEvent.keyboard(' ');
    await expect(control).toBeChecked();
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
