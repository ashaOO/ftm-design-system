import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const tokens = JSON.parse(readFileSync(join(root, 'src/tokens/tokens.json'), 'utf8'));
const tokensCss = readFileSync(join(root, 'src/tokens/tokens.css'), 'utf8');

const allowed = new Set(
  [...Object.values(tokens.color).map((c) => c.value), ...Object.entries(tokens.shade).filter(([k]) => !k.startsWith('$')).map(([, v]) => v)].map((h) => h.toLowerCase()),
);

const compDir = join(root, 'src/components');
const componentCss = (existsSync(compDir) ? readdirSync(compDir) : []).flatMap((dir) =>
  readdirSync(join(compDir, dir))
    .filter((f) => f.endsWith('.css'))
    .map((f) => ({ file: `${dir}/${f}`, css: readFileSync(join(compDir, dir, f), 'utf8') })),
);

describe('design tokens', () => {
  it('every colour token in tokens.json exists as a CSS variable', () => {
    for (const name of Object.keys(tokens.color)) {
      expect(tokensCss, `--ftm-${name} missing`).toContain(`--ftm-${name}:`);
    }
  });

  it('component CSS only uses approved hex values', () => {
    for (const { file, css } of componentCss) {
      const hexes = css.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
      for (const h of hexes) expect(allowed.has(h.toLowerCase()), `${file} uses unapproved colour ${h}`).toBe(true);
    }
  });

  it('decision colours are only used by decision, pill and card components', () => {
    const reserved = ['--ftm-mint', '--ftm-coral', '--ftm-freeze'];
    const allowedFiles = ['DecisionButton', 'Pill', 'GlassCard'];
    for (const { file, css } of componentCss) {
      if (allowedFiles.some((a) => file.startsWith(a))) continue;
      for (const r of reserved) expect(css.includes(`var(${r}`), `${file} uses reserved ${r}`).toBe(false);
    }
  });
});
