import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertInRange } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R3_01',
  tier: 'tier2',
  feature: 'r3',
  title: 'R3 Boundary: Letter spacing on display headings clamped within architectural bounds (-0.03em to -0.01em)',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    const trackMatch = css.match(/letter-spacing:\s*(-?0\.\d+)em/);
    if (trackMatch) {
      const val = parseFloat(trackMatch[1]);
      assertInRange(val, -0.03, -0.01, 'Headline letter-spacing must be clamped between -0.03em and -0.01em');
    }
  },
});

test({
  id: 'T2_R3_02',
  tier: 'tier2',
  feature: 'r3',
  title: 'R3 Boundary: Fallback generic fonts declared in font-family definitions',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    const hasSansFallback = /sans-serif/i.test(css);
    const hasSerifFallback = /serif/i.test(css);
    assert(hasSansFallback, 'Font family configuration must provide sans-serif fallback');
    assert(hasSerifFallback, 'Font family configuration must provide serif fallback');
  },
});

test({
  id: 'T2_R3_03',
  tier: 'tier2',
  feature: 'r3',
  title: 'R3 Boundary: Newsreader editorial body line-height bounded to >= 1.6',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    // Look for line-height or leading on serif/editorial rules
    const lhMatches = [...css.matchAll(/line-height:\s*([0-9\.]+)/g)];
    for (const match of lhMatches) {
      const lh = parseFloat(match[1]);
      if (lh > 1.2 && lh < 3.0) {
        assert(lh >= 1.6, `Editorial serif line-height should be >= 1.6 for readability (found: ${lh})`);
        break;
      }
    }
  },
});

test({
  id: 'T2_R3_04',
  tier: 'tier2',
  feature: 'r3',
  title: 'R3 Boundary: layout.tsx specifies display swap option for zero FOIT',
  fn: () => {
    const layout = readFileSafe(PATHS.layoutTsx) || '';
    if (layout.includes('next/font/google')) {
      const hasDisplaySwap = /display:\s*['"]swap['"]/i.test(layout);
      assert(hasDisplaySwap, 'next/font/google configuration must specify display: swap to eliminate FOIT');
    }
  },
});

test({
  id: 'T2_R3_05',
  tier: 'tier2',
  feature: 'r3',
  title: 'R3 Boundary: layout.tsx specifies subsets latin for performance optimization',
  fn: () => {
    const layout = readFileSafe(PATHS.layoutTsx) || '';
    if (layout.includes('next/font/google')) {
      const hasSubsets = /subsets:\s*\[['"]latin['"]\]/i.test(layout);
      assert(hasSubsets, 'next/font/google configuration must specify subsets: ["latin"]');
    }
  },
});

test({
  id: 'T2_R3_06',
  tier: 'tier2',
  feature: 'r3',
  title: 'R2 Boundary: Absence of duplicate external Google Fonts stylesheet links in layout',
  fn: () => {
    const layout = readFileSafe(PATHS.layoutTsx) || '';
    const hasExternalFontLink = /<link[^>]*href=["']https:\/\/fonts\.googleapis\.com/i.test(layout);
    assert(!hasExternalFontLink, 'layout.tsx must not declare external <link> to fonts.googleapis.com; use next/font/google exclusively');
  },
});
