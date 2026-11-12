import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const meta = {
  title: 'Status/Badge',
  id: 'status-badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Publicado' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Uma ou duas palavras de status. O tom tem significado, nunca é enfeite, e o texto sempre diz o status: a cor sozinha não basta para quem não distingue cores.',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão', args: { children: 'Rascunho' } };

const Todos = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Rascunho</Badge>
    <Badge tone="primary">Novo</Badge>
    <Badge tone="success">Publicado</Badge>
    <Badge tone="warning">Em revisão</Badge>
    <Badge tone="danger">Com erro</Badge>
  </div>
);

export const Tons: Story = { render: Todos };

export const TemaEscuro: Story = { name: 'Tema escuro', globals: { theme: 'dark' }, render: Todos };

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  render: Todos,
};
