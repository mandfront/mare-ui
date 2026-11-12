import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Badge } from '../badge';
import { Button } from '../button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = {
  title: 'Layout/Card',
  id: 'layout-card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Agrupa conteúdo relacionado. A API é por composição: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardBody` e `CardFooter`. No máximo uma ação primária no rodapé. O título é um `<h3>` por padrão; use `render={<h2 />}` para encaixar na hierarquia da página.',
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const Passeio = () => (
  <Card className="w-80">
    <CardHeader>
      <CardTitle>Passeio de escuna</CardTitle>
      <CardDescription>Ilha Porchat · 2h · saída às 9h</CardDescription>
    </CardHeader>
    <CardBody>
      <div className="flex gap-2">
        <Badge tone="success">Vagas abertas</Badge>
        <Badge>Família</Badge>
      </div>
    </CardBody>
    <CardFooter>
      <Button variant="ghost" size="sm">
        Detalhes
      </Button>
      <Button size="sm">Reservar</Button>
    </CardFooter>
  </Card>
);

export const Completo: Story = {
  render: Passeio,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Passeio de escuna' })).toBeVisible();
  },
};

export const SoConteudo: Story = {
  name: 'Só conteúdo',
  render: () => (
    <Card className="w-80">
      <CardBody>Cards podem ter só o corpo, para blocos simples de texto.</CardBody>
    </Card>
  ),
};

export const TemaEscuro: Story = {
  name: 'Tema escuro',
  globals: { theme: 'dark' },
  render: Passeio,
};

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  render: Passeio,
};
