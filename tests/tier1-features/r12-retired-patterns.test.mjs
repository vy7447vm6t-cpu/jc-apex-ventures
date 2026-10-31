import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, SRC_DIR, COMPONENTS_DIR, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import { HOME_SECTION_FILES, readAll } from '../helpers/brand-source.mjs';
import fs from 'node:fs';
import path from 'node:path';

// Brand guidelines 2.8: retired components, patterns and wording.
const RETIRED = [
  'Clippy', 'StudioCADViewer', 'GroundedRecognition', 'AuthorityLogos', 'AnimatedCounter', 'IPadCursor', 'NetworkGraph',
  'InteractiveTabbedMonograph', 'DivisionLogos', 'react-bits/DepthCarousel', 'react-bits/OptionWheel', 'react-bits/ScrollExpand',
  'react-bits/HoloCard', 'react-bits/ParticleText', 'react-bits/ShapeWaves', 'react-bits/ScrollStack', 'react-bits/GlowCursor',
  'react-bits/MicroSlats', 'react-bits/PatternWaves', 'react-bits/FluxLines', 'react-bits/GridScan', 'react-bits/InfiniteSpiral',
  'react-bits/MagicBento', 'react-bits/TargetCursor', 'react-bits/LogoLoop', 'react-bits/FlexCarousel', 'react-bits/LineSidebar',
  'react-bits/FaultyTerminal', 'react-bits/CrtWarp', 'react-bits/TechText', 'react-bits/ElectricBorder', 'react-bits/GradientASCII',
  'react-bits/SvgPathAnimator', 'SpotlightCard',
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
  title: 'R12 Feature: Retired components are deleted and nothing imports them',
  fn: () => {
    const all = sourceFiles(SRC_DIR).map((f) => readFileSafe(f)).join('\n');
    for (const name of RETIRED) {
      assert(!fileExists(path.join(COMPONENTS_DIR, `${name}.tsx`)), `${name}.tsx must be deleted`);
      const bare = name.split('/').pop();
      assert(!new RegExp(`import[^;]*\\b${bare}\\b[^;]*from`).test(all), `No file may import ${bare}`);
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
