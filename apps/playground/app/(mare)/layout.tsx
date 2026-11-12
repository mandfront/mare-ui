import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { RootHtml } from '../_components/root-html';

export const metadata: Metadata = {
  title: 'Maré Passeios · exemplo do Maré UI',
  description: 'Landing de exemplo montada só com componentes do Maré UI.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RootHtml brand="mare">{children}</RootHtml>;
}
