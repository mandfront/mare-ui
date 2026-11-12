import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Button, buttonVariants } from './button';

const meta = {
  title: 'Ações/Button',
  // id sem acento, para URLs limpas: /docs/acoes-button--docs
  id: 'acoes-button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Publicar versão',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'soft', 'ghost', 'danger'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Dispara uma ação. Use `primary` no máximo uma vez por tela, para a ação principal; o resto é `secondary`, `soft` ou `ghost`. `danger` só para ações destrutivas, de preferência confirmadas num diálogo. O texto começa com um verbo: "Publicar versão", não "OK".',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primario: Story = {
  name: 'Primário',
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Publicar versão' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        Publicar versão
      </Button>
      <Button {...args} variant="secondary">
        Ver no Storybook
      </Button>
      <Button {...args} variant="soft">
        Duplicar
      </Button>
      <Button {...args} variant="ghost">
        Cancelar
      </Button>
      <Button {...args} variant="danger">
        Excluir
      </Button>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Pequeno
      </Button>
      <Button {...args} size="md">
        Médio
      </Button>
      <Button {...args} size="lg">
        Grande
      </Button>
    </div>
  ),
};

export const Carregando: Story = {
  args: {
    loading: true,
    children: 'Salvando',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bloqueia o clique e anuncia `aria-busy`, mas continua focável: quem usa teclado não perde a posição enquanto a ação termina.',
      },
    },
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Salvando' });
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const Desabilitado: Story = {
  args: {
    disabled: true,
    children: 'Indisponível',
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Indisponível' });
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).toBeDisabled();
  },
};

export const Teclado: Story = {
  name: 'Uso pelo teclado',
  parameters: {
    docs: {
      description: {
        story:
          'Tab leva o foco ao botão, com anel de foco visível; Enter e Espaço disparam a ação.',
      },
    },
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Publicar versão' });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    // O anel de foco precisa estar visível de verdade, não só o foco no DOM.
    const { outlineStyle, outlineWidth } = getComputedStyle(button);
    await expect(outlineStyle).toBe('solid');
    await expect(outlineWidth).toBe('2px');
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const ComoLink: Story = {
  name: 'Como link',
  parameters: {
    docs: {
      description: {
        story:
          'Para navegar, aplique `buttonVariants` a um `<a>`: a aparência é de botão, mas leitores de tela continuam anunciando um link.',
      },
    },
  },
  render: () => (
    <a href="#planos" className={buttonVariants({ variant: 'secondary' })}>
      Ver planos
    </a>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Ver planos' })).toHaveAttribute(
      'href',
      '#planos',
    );
  },
};

export const TemaEscuro: Story = {
  name: 'Tema escuro',
  globals: { theme: 'dark' },
  parameters: {
    docs: {
      description: {
        story:
          'As mesmas variantes no tema escuro. O teste de acessibilidade confere o contraste aqui também.',
      },
    },
  },
  render: Variantes.render,
};

export const MarcaMarego: Story = {
  name: 'Marca Marego',
  globals: { brand: 'marego' },
  parameters: {
    docs: {
      description: {
        story: 'Mesmo componente, outra marca: só os tokens mudam.',
      },
    },
  },
  render: Variantes.render,
};
