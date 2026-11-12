// Server Component: nenhuma linha deste arquivo roda no navegador.
import {
  Alert,
  AlertDialog,
  AlertDialogTrigger,
  Avatar,
  Badge,
  Button,
  buttonVariants,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TextField,
} from '@mare-ui/react';

import type { Brand } from './root-html';

const brands = {
  mare: { name: 'Maré Passeios', other: { href: '/marego', label: 'Ver com a marca Marego' } },
  marego: { name: 'Marego', other: { href: '/', label: 'Ver com a marca Maré' } },
} as const;

const passeios = [
  {
    title: 'Escuna pela Ilha Porchat',
    description: 'São Vicente · 2h · saída às 9h',
    badges: [
      <Badge key="vagas" tone="success">
        Vagas abertas
      </Badge>,
      <Badge key="familia">Família</Badge>,
    ],
  },
  {
    title: 'Bondinho do Monte Serrat',
    description: 'Santos · 1h30 · saídas de hora em hora',
    badges: [
      <Badge key="novo" tone="primary">
        Novo
      </Badge>,
      <Badge key="vista">Vista da cidade</Badge>,
    ],
  },
  {
    title: 'Pôr do sol no Canto do Forte',
    description: 'Praia Grande · 1h · saída às 17h',
    badges: [
      <Badge key="poucas" tone="warning">
        Últimas vagas
      </Badge>,
    ],
  },
];

function ReservarDialog({ passeio }: { passeio: string }) {
  return (
    <Dialog>
      <DialogTrigger variant="primary" size="sm">
        Reservar
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Reservar: {passeio}</DialogTitle>
        <DialogDescription>A confirmação chega por e-mail em até um dia útil.</DialogDescription>
        <TextField label="Nome completo" autoComplete="name" />
        <TextField label="E-mail" type="email" autoComplete="email" />
        <Switch label="Avisar também pelo WhatsApp" />
        <DialogFooter>
          <DialogClose>Cancelar</DialogClose>
          <Button>Confirmar reserva</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Landing({ brand }: { brand: Brand }) {
  const { name, other } = brands[brand];

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line bg-surface-raised">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <p className="text-h3 text-ink">{name}</p>
          <nav aria-label="Principal" className="flex flex-wrap items-center gap-2">
            <a href="#passeios" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
              Passeios
            </a>
            <a href="#roteiros" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
              Roteiros
            </a>
            <a href={other.href} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
              {other.label}
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-5 py-8">
        <section aria-labelledby="titulo" className="flex flex-col items-start gap-5">
          <Badge tone="primary">Exemplo do Maré UI</Badge>
          <h1 id="titulo" className="max-w-3xl text-display text-ink md:text-display-xl">
            Passeios pela Baixada Santista
          </h1>
          <p className="max-w-2xl text-body-lg text-ink-muted">
            Escolha um passeio, reserve em dois minutos e receba a confirmação por e-mail. Sem
            cadastro.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#passeios" className={buttonVariants({ size: 'lg' })}>
              Ver passeios
            </a>
            <AlertDialog>
              <AlertDialogTrigger variant="ghost" size="lg">
                Cancelar uma reserva
              </AlertDialogTrigger>
              <DialogContent>
                <DialogTitle>Cancelar a reserva?</DialogTitle>
                <DialogDescription>
                  A vaga volta a ficar disponível para outras pessoas. Esta ação não pode ser
                  desfeita.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose>Manter reserva</DialogClose>
                  <Button variant="danger">Cancelar reserva</Button>
                </DialogFooter>
              </DialogContent>
            </AlertDialog>
          </div>
        </section>

        <Alert title="Página de exemplo">
          Montada só com componentes do Maré UI e renderizada no servidor. Os passeios e as reservas
          são fictícios.
        </Alert>

        <section id="passeios" aria-labelledby="passeios-titulo" className="flex flex-col gap-5">
          <h2 id="passeios-titulo" className="text-h2 text-ink">
            Passeios desta semana
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {passeios.map((passeio) => (
              <Card key={passeio.title}>
                <CardHeader>
                  <CardTitle>{passeio.title}</CardTitle>
                  <CardDescription>{passeio.description}</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">{passeio.badges}</div>
                </CardBody>
                <CardFooter>
                  <ReservarDialog passeio={passeio.title} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="roteiros" aria-labelledby="roteiros-titulo" className="flex flex-col gap-5">
          <h2 id="roteiros-titulo" className="text-h2 text-ink">
            Roteiros sugeridos
          </h2>
          <Tabs defaultValue="manha">
            <TabsList aria-label="Período do dia">
              <TabsTab value="manha">Manhã</TabsTab>
              <TabsTab value="tarde">Tarde</TabsTab>
              <TabsTab value="noite">Noite</TabsTab>
            </TabsList>
            <TabsPanel value="manha">
              Escuna pela Ilha Porchat e almoço no centro de São Vicente.
            </TabsPanel>
            <TabsPanel value="tarde">
              Bondinho do Monte Serrat e caminhada pelo centro histórico de Santos.
            </TabsPanel>
            <TabsPanel value="noite">Pôr do sol no Canto do Forte e jantar na orla.</TabsPanel>
          </Tabs>
        </section>

        <section
          aria-labelledby="novidades-titulo"
          className="grid gap-5 rounded-lg border border-line bg-surface-raised p-5 md:grid-cols-2"
        >
          <div className="flex flex-col gap-3">
            <h2 id="novidades-titulo" className="text-h2 text-ink">
              Novidades por e-mail
            </h2>
            <p className="text-body text-ink-muted">
              Um e-mail por mês com os passeios novos. Quem escreve é a nossa guia:
            </p>
            <div className="flex items-center gap-3">
              <Avatar name="Marina Costa" />
              <p className="text-label text-ink">Marina Costa, guia</p>
            </div>
          </div>
          <form className="flex flex-col gap-4" action="#novidades-titulo">
            <TextField label="E-mail" type="email" name="email" placeholder="nome@exemplo.com" />
            <Checkbox label={`Aceito receber e-mails da ${name}`} />
            <div>
              <Button type="submit">Quero receber</Button>
            </div>
          </form>
        </section>
      </main>

      <footer className="border-t border-line py-5">
        <p className="mx-auto max-w-5xl px-5 text-small text-ink-muted">
          Exemplo de uso do{' '}
          <a className="text-primary underline" href="https://github.com/mandfront/mare-ui">
            Maré UI
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
