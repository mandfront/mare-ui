import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import '../globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export type Brand = 'mare' | 'marego';

/**
 * O atributo data-brand fica no <html> para que também os elementos levados ao
 * fim do <body> (como o Dialog) recebam os tokens da marca.
 */
export function RootHtml({ brand, children }: { brand: Brand; children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-brand={brand === 'mare' ? undefined : brand}
      className={`${jakarta.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
