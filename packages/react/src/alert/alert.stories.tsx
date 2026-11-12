import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from './alert';

const meta = {
  title: 'Feedback/Alert',
  id: 'feedback-alert',
  component: Alert,
  tags: ['autodocs'],
  args: { title: 'Nova versão disponível', children: 'A 0.3.0 traz o componente Tabs.' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Mensagem na própria página, sem bloquear. O título diz o que aconteceu; o texto diz o que fazer. `danger` é anunciado na hora por leitores de tela (`role="alert"`); os outros tons, sem interromper (`role="status"`).',
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Informativo: Story = {};

const Tons = () => (
  <div className="flex flex-col gap-3">
    <Alert title="Nova versão disponível">A 0.3.0 traz o componente Tabs.</Alert>
    <Alert tone="success" title="Publicado no npm" />
    <Alert tone="warning" title="Contraste baixo">
      O token coral não deve ser usado em texto.
    </Alert>
    <Alert tone="danger" title="Falha no CI">
      O teste de acessibilidade do Dialog falhou.
    </Alert>
  </div>
);

export const Todos: Story = { name: 'Tons', render: Tons };

export const TemaEscuro: Story = { name: 'Tema escuro', globals: { theme: 'dark' }, render: Tons };

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  render: Tons,
};
