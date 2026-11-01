import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, SRC_DIR, COMPONENTS_DIR, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import { HOME_SECTION_FILES, readAll } from '../helpers/brand-source.mjs';
import fs from 'node:fs';
import path from 'node:path';

// Brand guidelines 2.8: retired components, patterns and wording.
// The user asked for the components back (1 November 2026). These are on pages now, with real content.
const PLACED = [
  'Clippy', 'AnimatedCounter', 'NetworkGraph', 'SpotlightCard', 'react-bits/ScrollStack', 'react-bits/LogoLoop',
  'react-bits/MagicBento', 'react-bits/LineSidebar', 'react-bits/ElectricBorder', 'react-bits/TechText', 'react-bits/MicroSlats',
  'react-bits/PatternWaves', 'react-bits/GridScan', 'react-bits/ShapeWaves', 'react-bits/GradientASCII', 'react-bits/TargetCursor',
  'react-bits/AccordionGallery', 'react-bits/SpecularButton',
];

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(tsx?|css)$/.test(entry.name) ? [full] : [];
  });
}

test({
  id: 'T1_R12_01',
  tier: 'tier1',
  feature: 'r12',
  title: 'R12 Feature: The restored components are placed with real content, on flat surfaces',
  fn: () => {
    const files = sourceFiles(SRC_DIR);
    const others = (self) => files.filter((f) => !f.endsWith(self)).map((f) => readFileSafe(f)).join('\n');
    for (const name of PLACED) {
      const file = `${name}.tsx`;
      assert(fileExists(path.join(COMPONENTS_DIR, file)), `${file} must exist`);
      const bare = name.split('/').pop();
      assert(new RegExp(`\\b${bare}\\b`).test(others(file)), `${bare} must be used on a page`);
    }
    for (const name of ['react-bits/ScrollStack', 'react-bits/MagicBento', 'react-bits/LogoLoop', 'SpotlightCard']) {
      const code = readFileSafe(path.join(COMPONENTS_DIR, `${name}.tsx`)) ?? '';
      assert(!/backdrop-blur|backdropFilter|ios-liquid-glass|glass-panel/.test(code), `${name} must not use glass blur`);
    }
  },
});

test({
  id: 'T1_R12_02',
  tier: 'tier1',
  feature: 'r12',
  title: 'R12 Feature: The office address says Tower 1 everywhere',
  fn: () => {
    for (const file of sourceFiles(SRC_DIR)) {
      assert(!/Tower 2/i.test(readFileSafe(file)), `${path.relative(SRC_DIR, file)} must not say Tower 2`);
    }
    assertIncludes(readFileSafe(PATHS.layoutTsx) ?? '', 'Tower 1, One International Centre', 'Schema address must say Tower 1');
    assertIncludes(readFileSafe(PATHS.footer) ?? '', 'Tower 1', 'Footer address must say Tower 1');
  },
});

test({
  id: 'T1_R12_03',
  tier: 'tier1',
  feature: 'r12',
  title: 'R12 Feature: Photo captions sit below photos, never floating on them',
  fn: () => {
    for (const file of sourceFiles(path.join(SRC_DIR, 'app')).concat(sourceFiles(COMPONENTS_DIR))) {
      if (!file.endsWith('.tsx')) continue;
      assert(!readFileSafe(file).includes('className="editorial-pill"'), `${path.relative(SRC_DIR, file)} must not float labels on photos`);
    }
    assertIncludes(readFileSafe(PATHS.divisionPage) ?? '', '<figcaption className="photo-caption">', 'Division photos carry captions below');
  },
});

test({
  id: 'T1_R12_04',
  tier: 'tier1',
  feature: 'r12',
  title: 'R12 Feature: Rebuilt sections use no glass blur, glow or pill badges',
  fn: () => {
    const files = HOME_SECTION_FILES.concat([PATHS.groundedHero, PATHS.divisionPage, PATHS.navbar, PATHS.clientMarquee]);
    for (const file of files) {
      const code = readFileSafe(file) ?? '';
      const name = path.basename(file);
      assert(!/backdrop-?filter|backdrop-blur/i.test(code), `${name} must not use glass blur`);
      assert(!/boxShadow: [`'"]0 0 \d/.test(code), `${name} must not use glow shadows`);
    }
  },
});

test({
  id: 'T1_R12_05',
  tier: 'tier1',
  feature: 'r12',
  title: 'R12 Feature: Retired jargon is gone from the shared components and home page',
  fn: () => {
    const code = readAll(HOME_SECTION_FILES.concat([PATHS.groundedHero, PATHS.divisionPage, PATHS.navbar, PATHS.footer]));
    for (const word of ['dossier', 'specimen', 'ledger', 'telemetry', 'consortium', 'monograph', 'protocol']) {
      assert(!new RegExp(`\\b${word}`, 'i').test(code.replace(/banking-sanction-dossier\.jpg/g, '')), `"${word}" is retired (guidelines 4.2)`);
    }
  },
});

test({
  id: 'T1_R12_06',
  tier: 'tier1',
  feature: 'r12',
  title: 'R12 Feature: Public pages do not describe how site work is subcontracted',
  fn: () => {
    const code = readAll([PATHS.footer, PATHS.navbar, PATHS.homePage, PATHS.groundedProcess, PATHS.groundedWhy, PATHS.divisionPage]);
    assert(!/vetted|licensed partners|subcontract/i.test(code), 'Execution arrangements are not described in public material (guidelines 5.2)');
  },
});
