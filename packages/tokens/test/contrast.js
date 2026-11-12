/** Luminância relativa de uma cor `#rrggbb` (WCAG 2.2). */
function luminance(hex) {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) throw new Error(`Cor fora do formato #rrggbb: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((start) => {
    const channel = Number.parseInt(match[1].slice(start, start + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Razão de contraste entre duas cores `#rrggbb` (WCAG 2.2), de 1 a 21. */
export function contrastRatio(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}
