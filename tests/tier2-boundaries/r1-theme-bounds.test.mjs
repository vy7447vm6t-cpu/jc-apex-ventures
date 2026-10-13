import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertInRange } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

// Calculate relative luminance for WCAG contrast ratio
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  const parseHex = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parseHex(hex1);
  const [r2, g2, b2] = parseHex(hex2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

test({
  id: 'T2_R1_01',
  tier: 'tier2',
  feature: 'r1',
  title: 'R1 Boundary: Mathematical contrast ratio of display text (#FFFFFF) over dark canvas (#0A0D10)',
  fn: () => {
    const ratio = getContrastRatio('#FFFFFF', '#0A0D10');
    // WCAG AAA requires ratio >= 7.0:1 for normal text
    assert(
      ratio >= 15.0,
      `Pure white over #0A0D10 must exceed 15:1 contrast (calculated: ${ratio.toFixed(2)})`
    );
  },
});

test({
  id: 'T2_R1_02',
  tier: 'tier2',
  feature: 'r1',
  title: 'R1 Boundary: Mathematical contrast ratio of warm ivory body (#E8E4DA) over elevated panel (#11151A)',
  fn: () => {
    const ratio = getContrastRatio('#E8E4DA', '#11151A');
    // WCAG AAA requires >= 7.0:1
    assert(
      ratio >= 10.0,
      `Warm ivory over #11151A must provide exceptional legibility >= 10:1 (calculated: ${ratio.toFixed(2)})`
    );
  },
});

test({
  id: 'T2_R1_03',
  tier: 'tier2',
  feature: 'r1',
  title: 'R1 Boundary: Liquid glass blur radius bounded to architectural range (16px to 32px)',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    const blurMatch = css.match(/blur\(\s*(\d+)px\s*\)/);
    if (blurMatch) {
      const radius = parseInt(blurMatch[1], 10);
      assertInRange(radius, 16, 32, 'Liquid glass blur radius must be in refined architectural range 16px - 32px');
    }
  },
});

test({
  id: 'T2_R1_04',
  tier: 'tier2',
  feature: 'r1',
  title: 'R1 Boundary: Liquid glass saturation boost bounded to 150% - 200%',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    const satMatch = css.match(/saturate\(\s*(\d+)%\s*\)/);
    if (satMatch) {
      const sat = parseInt(satMatch[1], 10);
      assertInRange(sat, 150, 200, 'Backdrop saturation boost must be bounded between 150% and 200%');
    }
  },
});

test({
  id: 'T2_R1_05',
  tier: 'tier2',
  feature: 'r1',
  title: 'R1 Boundary: Gold specular border opacity is subtle (0.20 to 0.40), not glaring',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    const borderMatch = css.match(/rgba\(\s*194,\s*159,\s*83,\s*([0-9\.]+)\s*\)/);
    if (borderMatch) {
      const alpha = parseFloat(borderMatch[1]);
      assertInRange(alpha, 0.20, 0.40, 'Gold border opacity must be subtle between 0.20 and 0.40');
    }
  },
});

test({
  id: 'T2_R1_06',
  tier: 'tier2',
  feature: 'r1',
  title: 'R1 Boundary: Absence of un-tokenized pure white surface background in page layouts',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    // Must not have global card or container with background: #ffffff or background-color: #fff
    const hasRawWhiteCardBg = /\.card\s*\{[^}]*background(?:-color)?:\s*#(?:fff|ffffff);/i.test(css) ||
                              /\.panel\s*\{[^}]*background(?:-color)?:\s*#(?:fff|ffffff);/i.test(css);
    assert(!hasRawWhiteCardBg, 'Page panels must not declare raw white (#fff) background');
  },
});
