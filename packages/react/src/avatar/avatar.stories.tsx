import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Avatar } from './avatar';

const meta = {
  title: 'Status/Avatar',
  id: 'status-avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Amanda Caraça' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Representa uma pessoa ou marca. Sem foto, ou enquanto ela carrega, mostra as iniciais. O `name` é obrigatório: vira o nome acessível.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Iniciais: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Amanda Caraça' })).toHaveTextContent('AC');
  },
};

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};

export const TemaEscuro: Story = {
  name: 'Tema escuro',
  globals: { theme: 'dark' },
  render: Tamanhos.render,
};
