import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

function Exemplo({ title = <CardTitle>Passeio de escuna</CardTitle> }) {
  return (
    <Card aria-labelledby="titulo">
      <CardHeader>
        {title}
        <CardDescription>Ilha Porchat · 2h</CardDescription>
      </CardHeader>
      <CardBody>Saída às 9h.</CardBody>
      <CardFooter>Ações</CardFooter>
    </Card>
  );
}

describe('Card', () => {
  it('monta as partes na ordem, cada uma com seu data-slot', () => {
    const { container } = render(<Exemplo />);

    const slots = [...container.querySelectorAll('[data-slot]')].map((element) =>
      element.getAttribute('data-slot'),
    );
    expect(slots).toEqual([
      'card',
      'card-header',
      'card-title',
      'card-description',
      'card-body',
      'card-footer',
    ]);
  });

  it('o título é um h3 por padrão', () => {
    render(<Exemplo />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'Passeio de escuna' }),
    ).toBeInTheDocument();
  });

  it('o título pode virar outro nível de cabeçalho com render', () => {
    render(
      <Exemplo
        title={
          // eslint-disable-next-line jsx-a11y/heading-has-content -- o texto vem do children do CardTitle
          <CardTitle render={<h2 />} id="titulo">
            Passeio de escuna
          </CardTitle>
        }
      />,
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'Passeio de escuna' });
    expect(heading).toHaveAttribute('data-slot', 'card-title');
    expect(heading).toHaveAttribute('id', 'titulo');
    expect(heading.className).toContain('text-h3');
  });

  it('mescla className em cada parte', () => {
    render(
      <Card className="rounded-sm" data-testid="card">
        <CardBody className="px-4" data-testid="body" />
      </Card>,
    );

    expect(screen.getByTestId('card').className).toContain('rounded-sm');
    expect(screen.getByTestId('card').className).not.toContain('rounded-lg');
    expect(screen.getByTestId('body').className).toContain('px-4');
    expect(screen.getByTestId('body').className).not.toContain('px-5');
  });
});
