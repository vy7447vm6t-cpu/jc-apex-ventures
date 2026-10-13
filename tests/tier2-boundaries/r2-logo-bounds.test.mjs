import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, PUBLIC_LOGOS, fileExists, readFileSafe, readBinarySafe } from '../helpers/project-paths.mjs';
import path from 'node:path';

test({
  id: 'T2_R2_01',
  tier: 'tier2',
  feature: 'r2',
  title: 'R2 Boundary: Logo.tsx defines default fallback width and height dimensions',
  fn: () => {
    const code = readFileSafe(PATHS.logo);
    assert(code !== null, 'Logo.tsx must exist');
    // Must handle width = 40 or default values in function signature or props
    const hasDefaultProps = /width\s*=\s*\d+/i.test(code) || /height\s*=\s*\d+/i.test(code) || /width\s*:\s*\d+/i.test(code);
    assert(hasDefaultProps, 'Logo.tsx must specify default fallback dimensions for safe rendering');
  },
});

test({
  id: 'T2_R2_02',
  tier: 'tier2',
  feature: 'r2',
  title: 'R2 Boundary: Logo.tsx SVG viewBox attribute preservation',
  fn: () => {
    const code = readFileSafe(PATHS.logo);
    assert(code !== null, 'Logo.tsx must exist');
    const viewBoxMatch = code.match(/viewBox="([^"]+)"/i);
    assert(viewBoxMatch !== null, 'Logo SVG must define viewBox for responsive scaling');
    const parts = viewBoxMatch[1].trim().split(/\s+/);
    assertEqual(parts.length, 4, 'viewBox must consist of 4 numeric components (minX, minY, width, height)');
  },
});

test({
  id: 'T2_R2_03',
  tier: 'tier2',
  feature: 'r2',
  title: 'R2 Boundary: DivisionLogos component implements fallback for unrecognized division slug',
  fn: () => {
    const code = readFileSafe(PATHS.divisionLogos);
    assert(code !== null, 'DivisionLogos.tsx must exist');
    // Switch statement or record lookup must have default fallback
    const hasDefaultFallback = /default:/i.test(code) || /\|\|\s*null/i.test(code) || /\|\|\s*<Logo/i.test(code);
    assert(hasDefaultFallback, 'DivisionLogos must include default fallback branch for unknown slugs');
  },
});

test({
  id: 'T2_R2_04',
  tier: 'tier2',
  feature: 'r2',
  title: 'R2 Boundary: eMudran authentic mark PNG has 8-bit RGBA color type (byte 25 == 6)',
  fn: () => {
    const assetPath = path.join(PUBLIC_LOGOS, '00003033-eMudran_Business_Card_p1_img_0_X5.png');
    assert(fileExists(assetPath), 'eMudran logo asset must exist');
    const bytes = readBinarySafe(assetPath);
    // In PNG IHDR chunk, byte 24 is bit depth, byte 25 is color type (6 = RGBA with alpha channel)
    const colorType = bytes[25];
    assertEqual(colorType, 6, 'eMudran PNG must have Color Type 6 (RGBA) for transparent liquid glass compositing');
  },
});

test({
  id: 'T2_R2_05',
  tier: 'tier2',
  feature: 'r2',
  title: 'R2 Boundary: TVASTA authentic gold card image is high resolution (>1000px width)',
  fn: () => {
    const assetPath = path.join(PUBLIC_LOGOS, '00003034-TVASTA Business Card_p1_img_0_FormXob.73321509b2ffc0b3df216bb95ab2c419.jpg');
    assert(fileExists(assetPath), 'TVASTA logo asset must exist');
    const bytes = readBinarySafe(assetPath);
    // Scan SOF0 marker (0xFF, 0xC0) to extract dimensions
    let width = 0;
    for (let i = 0; i < bytes.length - 8; i++) {
      if (bytes[i] === 0xff && (bytes[i + 1] === 0xc0 || bytes[i + 1] === 0xc2)) {
        // height is bytes[i+5..i+6], width is bytes[i+7..i+8]
        width = (bytes[i + 7] << 8) | bytes[i + 8];
        break;
      }
    }
    assert(width >= 1000, `TVASTA logo must be high-resolution (>=1000px width, found: ${width}px)`);
  },
});

test({
  id: 'T2_R2_06',
  tier: 'tier2',
  feature: 'r2',
  title: 'R2 Boundary: SVG path coordinates in Logo.tsx contain zero NaN or undefined values',
  fn: () => {
    const code = readFileSafe(PATHS.logo);
    assert(code !== null, 'Logo.tsx must exist');
    assert(!code.includes('NaN'), 'Logo.tsx SVG coordinates must not contain NaN');
    assert(!code.includes('undefined'), 'Logo.tsx SVG attributes must not contain undefined');
  },
});
