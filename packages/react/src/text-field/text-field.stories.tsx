import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { TextField } from './text-field';

const meta = {
  title: 'Formulário/TextField',
  id: 'formulario-text-field',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Nome da marca', placeholder: 'Ex.: Marego', hint: 'Aparece no topo do site.' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de texto com rótulo sempre visível; o placeholder é exemplo, nunca rótulo. A dica explica o formato; o erro substitui a dica e diz como corrigir. Dica e erro já chegam ligados ao campo para leitores de tela. Altura de 48px e fonte de 16px, que evita o zoom automático no iOS.',
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ComDica: Story = {
  name: 'Com dica',
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Nome da marca' });
    await userEvent.type(input, 'Marego');
    await expect(input).toHaveValue('Marego');
  },
};

export const ComErro: Story = {
  name: 'Com erro',
  args: {
    label: 'E-mail',
    type: 'email',
    defaultValue: 'contato@exemplo',
    hint: undefined,
    error: 'Digite um e-mail válido, como nome@empresa.com.',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'E-mail' });
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription(
      'Digite um e-mail válido, como nome@empresa.com.',
    );
  },
};

export const Desabilitado: Story = {
  args: { label: 'Código do cupom', disabled: true, hint: undefined, placeholder: 'Indisponível' },
};

export const Teclado: Story = {
  name: 'Uso pelo teclado',
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Nome da marca' });
    await userEvent.tab();
    await expect(input).toHaveFocus();
    await expect(getComputedStyle(input).outlineStyle).toBe('solid');
  },
};

const Ambos = () => (
  <div className="flex flex-col gap-4">
    <TextField label="Nome da marca" placeholder="Ex.: Marego" hint="Aparece no topo do site." />
    <TextField
      label="E-mail"
      defaultValue="contato@exemplo"
      error="Digite um e-mail válido, como nome@empresa.com."
    />
  </div>
);

export const TemaEscuro: Story = { name: 'Tema escuro', globals: { theme: 'dark' }, render: Ambos };

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  render: Ambos,
};
