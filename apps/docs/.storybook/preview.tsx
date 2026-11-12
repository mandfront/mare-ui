import { definePreview } from '@storybook/react-vite';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';

import './preview.css';

const themes = { light: 'Claro', dark: 'Escuro' } as const;
const brands = { mare: 'Maré', marego: 'Marego (exemplo)', cliente: 'Cliente (exemplo)' } as const;

export default definePreview({
  addons: [addonDocs(), addonA11y()],
  globalTypes: {
    theme: {
      description: 'Tema',
      toolbar: {
        title: 'Tema',
        icon: 'contrast',
        items: Object.entries(themes).map(([value, title]) => ({ value, title })),
        dynamicTitle: true,
      },
    },
    brand: {
      description: 'Marca',
      toolbar: {
        title: 'Marca',
        icon: 'paintbrush',
        items: Object.entries(brands).map(([value, title]) => ({ value, title })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    brand: 'mare',
  },
  decorators: [
    (Story, { globals }) => {
      const root = document.documentElement;
      root.dataset.theme = String(globals.theme);
      if (globals.brand === 'mare') delete root.dataset.brand;
      else root.dataset.brand = String(globals.brand);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    a11y: {
      // Uma violação de acessibilidade (axe) faz o teste da história falhar.
      test: 'error',
    },
  },
});
