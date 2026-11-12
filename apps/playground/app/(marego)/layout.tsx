import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { RootHtml } from '../_components/root-html';

export const metadata: Metadata = {
  title: 'Marego · exemplo do Maré UI',
  description: 'A mesma landing com a marca de exemplo Marego: só os tokens mudam.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RootHtml brand="marego">{children}</RootHtml>;
}
