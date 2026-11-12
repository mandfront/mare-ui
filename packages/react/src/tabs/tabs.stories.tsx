import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { Tabs, TabsList, TabsPanel, TabsTab } from './tabs';

const meta = {
  title: 'Navegação/Tabs',
  id: 'navegacao-tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Alterna entre vistas do mesmo conteúdo. Rótulos curtos, de uma ou duas palavras. Teclado: setas trocam de aba, Home e End vão para a primeira e a última, e só a aba ativa entra no Tab. Para navegar entre páginas, use links, não Tabs.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const Instalacao = () => (
  <Tabs defaultValue="npm" className="w-96">
    <TabsList aria-label="Formas de instalar">
      <TabsTab value="npm">npm</TabsTab>
      <TabsTab value="registry">Registry</TabsTab>
      <TabsTab value="mcp">MCP</TabsTab>
    </TabsList>
    <TabsPanel value="npm">
      <code className="font-mono text-code">pnpm add @mare-ui/react</code>
    </TabsPanel>
    <TabsPanel value="registry">
      <code className="font-mono text-code">npx shadcn add mandfront/mare-ui/button</code>
    </TabsPanel>
    <TabsPanel value="mcp">Agentes de IA leem os componentes pelo Storybook.</TabsPanel>
  </Tabs>
);

export const Padrao: Story = {
  name: 'Padrão',
  render: Instalacao,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('tab', { name: 'Registry' }));
    await expect(canvas.getByRole('tab', { name: 'Registry' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  },
};

export const Teclado: Story = {
  name: 'Uso pelo teclado',
  render: Instalacao,
  play: async ({ canvas }) => {
    await userEvent.tab();
    const npm = canvas.getByRole('tab', { name: 'npm' });
    await expect(npm).toHaveFocus();
    await expect(getComputedStyle(npm).outlineStyle).toBe('solid');
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Registry' })).toHaveFocus();
  },
};

export const TemaEscuro: Story = {
  name: 'Tema escuro',
  globals: { theme: 'dark' },
  render: Instalacao,
};

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  render: Instalacao,
};
