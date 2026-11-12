import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button, buttonVariants } from './button';

describe('Button', () => {
  it('renderiza um botão com nome acessível e type="button" por padrão', () => {
    render(<Button>Publicar versão</Button>);

    const button = screen.getByRole('button', { name: 'Publicar versão' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-slot', 'button');
  });

  it('respeita um type explícito', () => {
    render(<Button type="submit">Enviar</Button>);

    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'submit');
  });

  it('dispara onClick com clique, Enter e Espaço', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);

    await user.click(screen.getByRole('button', { name: 'Salvar' }));
    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('desabilitado: não dispara onClick e sai da ordem de tabulação', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Excluir
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Excluir' });
    await user.click(button);
    await user.tab();

    expect(onClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(button).not.toHaveFocus();
  });

  describe('carregando', () => {
    it('anuncia aria-busy e bloqueia o clique', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Salvando
        </Button>,
      );

      const button = screen.getByRole('button', { name: 'Salvando' });
      await user.click(button);

      expect(onClick).not.toHaveBeenCalled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('data-loading');
    });

    it('continua focável para não perder o foco do teclado', async () => {
      const user = userEvent.setup();
      render(<Button loading>Salvando</Button>);

      await user.tab();

      expect(screen.getByRole('button', { name: 'Salvando' })).toHaveFocus();
    });

    it('mostra um indicador escondido de leitores de tela', () => {
      render(<Button loading>Salvando</Button>);

      const button = screen.getByRole('button', { name: 'Salvando' });
      const spinner = button.querySelector('[data-slot="button-spinner"]');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('buttonVariants dá a aparência de botão a um link, sem mudar a semântica', () => {
    render(
      <a href="/planos" className={buttonVariants({ variant: 'secondary' })}>
        Ver planos
      </a>,
    );

    const link = screen.getByRole('link', { name: 'Ver planos' });
    expect(link).toHaveAttribute('href', '/planos');
    expect(link.className).toContain('bg-surface-raised');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('aplica a variante e o tamanho pedidos', () => {
    render(
      <Button variant="danger" size="lg">
        Excluir conta
      </Button>,
    );

    const { className } = screen.getByRole('button', { name: 'Excluir conta' });
    expect(className).toContain('bg-danger');
    expect(className).toContain('h-control-lg');
  });

  it('className de quem usa vence o do componente em conflito', () => {
    render(<Button className="rounded-full">Pílula</Button>);

    const { className } = screen.getByRole('button', { name: 'Pílula' });
    expect(className).toContain('rounded-full');
    expect(className).not.toContain('rounded-md');
  });

  it('repassa a ref para o elemento', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Com ref</Button>);

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Com ref' }));
  });
});
