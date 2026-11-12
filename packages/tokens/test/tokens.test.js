import { describe, expect, it } from 'vitest';

import { resolveThemes, themes } from '../scripts/resolve.js';
import { contrastRatio } from './contrast.js';

const resolved = await resolveThemes();
const themeNames = Object.keys(themes);

/** Texto sobre fundo: mínimo de 4.5:1 (WCAG 2.2 AA). */
const textPairs = [
  ['ink', 'surface'],
  ['ink', 'surface-raised'],
  ['ink', 'surface-sunken'],
  ['ink-muted', 'surface'],
  ['ink-muted', 'surface-raised'],
  ['ink-muted', 'surface-sunken'],
  ['on-primary', 'primary'],
  ['on-primary', 'primary-hover'],
  ['primary-strong', 'primary-soft'],
  ['primary', 'surface-raised'],
  ['on-status', 'success'],
  ['on-status', 'warning'],
  ['on-status', 'danger'],
  ['danger', 'surface-raised'],
  ['ink', 'primary-soft'],
  ['ink', 'success-soft'],
  ['ink', 'warning-soft'],
  ['ink', 'danger-soft'],
];

/** Bordas de controles e anel de foco: mínimo de 3:1 (WCAG 2.2, 1.4.11). */
const nonTextPairs = [
  ['line-strong', 'surface'],
  ['line-strong', 'surface-raised'],
  ['focus', 'surface'],
  ['focus', 'surface-raised'],
];

describe('estrutura', () => {
  it('todos os temas definem exatamente os mesmos tokens', () => {
    const reference = Object.keys(resolved.light).sort();
    for (const theme of themeNames) {
      expect(Object.keys(resolved[theme]).sort(), theme).toEqual(reference);
    }
  });

  it('nenhum valor fica com referência por resolver', () => {
    for (const theme of themeNames) {
      for (const [name, value] of Object.entries(resolved[theme])) {
        expect(value, `${theme} → ${name}`).not.toMatch(/[{}]|undefined|\[object/);
      }
    }
  });

  it('os primitivos da paleta não viram variáveis', () => {
    expect(Object.keys(resolved.light).filter((name) => name.startsWith('palette'))).toEqual([]);
  });
});

describe.each(themeNames)('contraste no tema %s', (theme) => {
  const color = (name) => resolved[theme][`color-${name}`];

  it.each(textPairs)('texto %s sobre %s tem pelo menos 4.5:1', (foreground, background) => {
    expect(contrastRatio(color(foreground), color(background))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(nonTextPairs)('%s sobre %s tem pelo menos 3:1', (foreground, background) => {
    expect(contrastRatio(color(foreground), color(background))).toBeGreaterThanOrEqual(3);
  });
});
