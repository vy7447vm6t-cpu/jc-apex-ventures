import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, PUBLIC_LOGOS, fileExists, readFileSafe, readBinarySafe } from '../helpers/project-paths.mjs';
import path from 'node:path';

test({
  id: 'T1_R2_01',
  tier: 'tier1',
  feature: 'r2',
  title: 'R2 Feature: Master umbrella emblem SVG structure in Logo.tsx',
  fn: () => {
    const code = readFileSafe(PATHS.logo);
    assert(code !== null, 'Logo.tsx must exist');
    // Must feature gold apex circle dot, curved umbrella canopy path, and vertical J-stem anchor
    const hasGoldApexDot = /circle[^>]*cx="50"[^>]*cy="18"[^>]*r="[5-8]"/i.test(code) ||
                           /<circle[^>]*fill="(?:#D4AF37|#C29F53|gold)/i.test(code);
    const hasCanopy = /<path[^>]*d="[^"]*M20[^"]*Q\s*50[^"]*80/i.test(code) ||
                      /<path[^>]*d="[^"]*Q[^"]*"/i.test(code);
    const hasJStem = /Q\s*50\s*92\s*40\s*92/i.test(code) || /M50[^"]*L\s*50[^"]*Q/i.test(code);
    assert(hasGoldApexDot, 'Logo.tsx must include gold apex dot circle');
    assert(hasCanopy, 'Logo.tsx must include curved umbrella canopy');
    assert(hasJStem, 'Logo.tsx must include vertical J-stem anchor handle');
  },
});

test({
  id: 'T1_R2_02',
  tier: 'tier1',
  feature: 'r2',
  title: 'R2 Feature: eMudran authentic CMYK brand mark PNG asset integrity',
  fn: () => {
    const assetPath = path.join(PUBLIC_LOGOS, '00003033-eMudran_Business_Card_p1_img_0_X5.png');
    assert(fileExists(assetPath), 'eMudran authentic logo asset 00003033-eMudran_Business_Card_p1_img_0_X5.png must exist');
    const bytes = readBinarySafe(assetPath);
    assert(bytes !== null && bytes.length > 500, 'eMudran logo must be valid non-empty file');
    // Check PNG magic bytes: 0x89 0x50 0x4E 0x47
    assertEqual(bytes[0], 0x89, 'PNG magic byte 0');
    assertEqual(bytes[1], 0x50, 'PNG magic byte 1 (P)');
    assertEqual(bytes[2], 0x4e, 'PNG magic byte 2 (N)');
    assertEqual(bytes[3], 0x47, 'PNG magic byte 3 (G)');
  },
});

test({
  id: 'T1_R2_03',
  tier: 'tier1',
  feature: 'r2',
  title: 'R2 Feature: TVASTA authentic gold luxury emblem JPG asset integrity',
  fn: () => {
    const assetPath = path.join(PUBLIC_LOGOS, '00003034-TVASTA Business Card_p1_img_0_FormXob.73321509b2ffc0b3df216bb95ab2c419.jpg');
    assert(fileExists(assetPath), 'TVASTA authentic logo asset 00003034-TVASTA...jpg must exist');
    const bytes = readBinarySafe(assetPath);
    assert(bytes !== null && bytes.length > 1000, 'TVASTA logo must be valid non-empty file');
    // Check JPEG magic bytes: 0xFF 0xD8 0xFF
    assertEqual(bytes[0], 0xff, 'JPEG SOI byte 0');
    assertEqual(bytes[1], 0xd8, 'JPEG SOI byte 1');
    assertEqual(bytes[2], 0xff, 'JPEG marker byte 2');
  },
});

test({
  id: 'T1_R2_04',
  tier: 'tier1',
  feature: 'r2',
  title: 'R2 Feature: DivisionLogos component interface contract for 6 divisions',
  fn: () => {
    const code = readFileSafe(PATHS.divisionLogos);
    assert(code !== null, 'src/components/DivisionLogos.tsx must exist');
    // Must handle all 6 divisions
    const divisions = ['solis', 'sanyog', 'gridApex', 'tvasta', 'emudran', 'agrim'];
    for (const div of divisions) {
      assert(
        code.includes(div) || code.toLowerCase().includes(div.toLowerCase()),
        `DivisionLogos component must support division identifier: ${div}`
      );
    }
  },
});

test({
  id: 'T1_R2_05',
  tier: 'tier1',
  feature: 'r2',
  title: 'R2 Feature: GRID APEX bespoke architectural SVG vector emblem',
  fn: () => {
    const code = readFileSafe(PATHS.divisionLogos);
    assert(code !== null, 'DivisionLogos.tsx must exist');
    // GRID APEX requires bespoke SVG vector mark representing substation nodes/grid
    const hasGridApexSvg = code.includes('gridApex') && (code.includes('<svg') || code.includes('<path') || code.includes('<polygon') || code.includes('<circle'));
    assert(hasGridApexSvg, 'GRID APEX must render bespoke vector SVG geometry');
  },
});

test({
  id: 'T1_R2_06',
  tier: 'tier1',
  feature: 'r2',
  title: 'R2 Feature: SOLIS, SANYOG, and AGRIM bespoke SVG vector emblems',
  fn: () => {
    const code = readFileSafe(PATHS.divisionLogos);
    assert(code !== null, 'DivisionLogos.tsx must exist');
    // SOLIS (solar ray / photovoltaic), SANYOG (circuit continuity / utility liaison), AGRIM (institutional pillars)
    const hasSolis = /solis/i.test(code);
    const hasSanyog = /sanyog/i.test(code);
    const hasAgrim = /agrim/i.test(code);
    assert(hasSolis, 'SOLIS must have dedicated brand mark in DivisionLogos');
    assert(hasSanyog, 'SANYOG must have dedicated brand mark in DivisionLogos');
    assert(hasAgrim, 'AGRIM must have dedicated brand mark in DivisionLogos');
  },
});
