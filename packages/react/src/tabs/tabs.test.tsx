import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tabs, TabsList, TabsPanel, TabsTab } from './tabs';

function Instalacao(props: { onValueChange?: (value: string) => void; disabledMcp?: boolean }) {
  return (
    <Tabs defaultValue="npm" onValueChange={props.onValueChange}>
      <TabsList aria-label="Formas de instalar">
        <TabsTab value="npm">npm</TabsTab>
        <TabsTab value="registry">Registry</TabsTab>
        <TabsTab value="mcp" disabled={props.disabledMcp}>
          MCP
        </TabsTab>
      </TabsList>
      <TabsPanel value="npm">pnpm add @mare-ui/react</TabsPanel>
      <TabsPanel value="registry">npx shadcn add mandfront/mare-ui/button</TabsPanel>
      <TabsPanel value="mcp">Agentes leem os componentes pelo Storybook.</TabsPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('liga abas e painéis com os papéis corretos', () => {
    render(<Instalacao />);

    expect(screen.getByRole('tablist', { name: 'Formas de instalar' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'npm' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'npm' })).toHaveTextContent(
      'pnpm add @mare-ui/react',
    );
  });

  it('troca de painel com clique e avisa o novo valor', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Instalacao onValueChange={onValueChange} />);

    await user.click(screen.getByRole('tab', { name: 'Registry' }));

    expect(screen.getByRole('tab', { name: 'Registry' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Registry' })).toBeVisible();
    expect(onValueChange).toHaveBeenCalledWith('registry');
  });

  it('as setas movem o foco e só a aba ativa entra no Tab', async () => {
    const user = userEvent.setup();
    render(<Instalacao />);

    await user.tab();
    expect(screen.getByRole('tab', { name: 'npm' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Registry' })).toHaveFocus();

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'MCP' })).toHaveFocus();
  });

  it('aba desabilitada não é ativada', async () => {
    const user = userEvent.setup();
    render(<Instalacao disabledMcp />);

    await user.click(screen.getByRole('tab', { name: 'MCP' }));

    expect(screen.getByRole('tab', { name: 'npm' })).toHaveAttribute('aria-selected', 'true');
  });
});
