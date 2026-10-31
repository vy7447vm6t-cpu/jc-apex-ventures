import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, PROJECT_ROOT, APP_DIR, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import path from 'node:path';

const SLUGS = ['grid-apex', 'solis', 'sanyog', 'tvasta', 'emudran', 'agrim'];
const content = () => readFileSafe(PATHS.divisionsContent) || '';

/** The text of one division's object in divisions.ts. */
function divisionBlock(slug) {
  const code = content();
  const start = code.indexOf(`slug: '${slug}'`);
  const next = code.indexOf('\nexport const', start);
  return code.slice(start, next === -1 ? undefined : next);
}

/** [line, covers] pairs from an array literal, with either quote style. */
function pairs(code) {
  return [...code.matchAll(/\[\s*(['"])(.*?)\1\s*,\s*(['"])(.*?)\3\s*\]/g)].map((m) => [m[2], m[4]]);
}

test({
  id: 'T1_R13_01',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: Each division page lists the same services as its PDF profile, word for word',
  fn: () => {
    for (const slug of SLUGS) {
      const pdf = readFileSafe(path.join(PROJECT_ROOT, 'profiles', `${slug}.mjs`)) || '';
      const pdfBlock = /_SERVICES = \[([\s\S]*?)\n\];/.exec(pdf);
      assert(pdfBlock, `profiles/${slug}.mjs must export its services`);
      const siteBlock = /services: \[([\s\S]*?)\n  \],/.exec(divisionBlock(slug));
      assert(siteBlock, `${slug} must list its services`);
      assertEqual(JSON.stringify(pairs(siteBlock[1])), JSON.stringify(pairs(pdfBlock[1])), `${slug} services must match the PDF`);
    }
  },
});

test({
  id: 'T1_R13_02',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: The Director proof line shows on electrical, solar and finance pages, not on interiors or print',
  fn: () => {
    const expected = { 'grid-apex': true, solis: true, sanyog: true, agrim: true, tvasta: false, emudran: false };
    for (const [slug, show] of Object.entries(expected)) {
      assertIncludes(divisionBlock(slug), `showProofLine: ${show}`, `${slug} must set showProofLine: ${show}`);
    }
  },
});

test({
  id: 'T1_R13_03',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: Every division page has a process, real questions, cross-division links and a licensed hero photo',
  fn: () => {
    const photos = readFileSafe(path.join(PROJECT_ROOT, 'src', 'content', 'photos.ts')) || '';
    for (const slug of SLUGS) {
      const block = divisionBlock(slug);
      const steps = (block.match(/\{ title: '/g) || []).length;
      const questions = (block.match(/\bq: '/g) || []).length;
      assert(steps >= 4, `${slug} needs at least four process steps`);
      assert(questions >= 3, `${slug} needs at least three questions`);
      assert(/joins: \[\s*\[/.test(block), `${slug} must say which divisions join a project`);
      const hero = /heroPhoto: '([^']+)'/.exec(block);
      assert(hero && photos.includes(`'${hero[1]}': { src:`), `${slug} hero photo must be a licensed photo in photos.ts`);
    }
  },
});

test({
  id: 'T1_R13_04',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: Division routes render the template only, with no page-specific case studies',
  fn: () => {
    for (const slug of SLUGS) {
      const page = readFileSafe(path.join(APP_DIR, slug, 'page.tsx')) || '';
      assert(page.split('\n').length <= 15, `/${slug} must be a thin wrapper around DivisionPage`);
      assert(/return <DivisionPage data=\{\w+\} \/>;/.test(page), `/${slug} must render DivisionPage`);
    }
  },
});

test({
  id: 'T1_R13_05',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: Division copy does not describe associates or name unconfirmed team members',
  fn: () => {
    const code = content();
    assert(!/\bpartners?\b/i.test(code), 'Associates and partners are not described (guidelines 5.2)');
    for (const name of ['Bakshi', 'Navale', 'Parmar', 'Akshata', 'Shabnam']) {
      assert(!code.includes(name), `Tvasta team names are unconfirmed: ${name}`);
    }
  },
});

test({
  id: 'T1_R13_06',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: Track-record sections read the hotel list and creative credits from track-record.ts',
  fn: () => {
    const page = readFileSafe(PATHS.divisionPage) || '';
    assertIncludes(page, "clientGroups().find((g) => g.id === 'hospitality')", 'Hotels must come from the track record');
    assertIncludes(page, "clientGroups().find((g) => g.id === 'creative')", 'Creative credits must come from the track record');
    assertIncludes(page, 'Photographs show the properties, not our installations.', 'Hotel photos must say they show the properties only');
    assertIncludes(page, 'creative.attributionLine', 'Creative credits must carry their attribution line');
  },
});

test({
  id: 'T1_R13_07',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: Solis keeps its own guidelines: black, Sun Yellow and greys, Instrument Sans, yellow never as text',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    const start = css.indexOf('.solis-canvas {');
    const theme = css.slice(start, css.indexOf('}', start));
    assert(start > -1, 'globals.css must define .solis-canvas');
    assertIncludes(theme, '--eyebrow-rule: #FFC85A', 'The sun bar above headings is Sun Yellow');
    assertIncludes(theme, '--color-accent: #111111', 'Accent text on Solis is Ink, because yellow fails contrast as text');
    assert(!/#1E3FD8|#38BDF8|#F59E0B/i.test(theme), 'The cobalt, cyan and amber of the old Solis page are gone');
    assert(!/(?<![\w-])color:\s*['"]?#FFC85A/i.test(css + (readFileSafe(PATHS.divisionPage) || '')), 'Sun Yellow is a fill, never a text colour (Solis guidelines 2.3)');
    const layout = readFileSafe(PATHS.solisLayout) || '';
    assertIncludes(layout, 'instrument-sans-latin-400-normal.woff2', 'Solis body text is set in Instrument Sans');
    assert(fileExists(path.join(APP_DIR, 'solis', 'fonts', 'LICENSE-instrument-sans.txt')), 'The font licence ships with the font');
  },
});

test({
  id: 'T1_R13_08',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: Solis proof comes from the track record: the plants chart, the equipment line and the pergola proposal',
  fn: () => {
    const plants = readFileSafe(PATHS.solarPlants) || '';
    assertIncludes(plants, "trackRecord('solis')", 'The plants chart reads the completed Solis plants');
    assertIncludes(plants, 'ATTRIBUTION_LINES.director', 'The plants carry the Director attribution line');
    assertIncludes(plants, 'aria-expanded={isOpen}', 'Each plant opens in place');
    const block = divisionBlock('solis');
    assertIncludes(block, "blocks: [{ kind: 'plants' }]", 'Solis proof is the plants chart');
    assert(/Tata Power Solar systems on \$\{formatCount\(plantsWithEquipment\.length\)\}/.test(block), 'The equipment line is counted from the track record');
    const page = readFileSafe(PATHS.divisionPage) || '';
    assertIncludes(page, "p.kind === 'proposal' && isShowable(p.proof.status)", 'Only showable proposals appear, with their status note');
  },
});

test({
  id: 'T1_R13_09',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: The terrace comparison uses our own drawings and the diagram draws itself, with a phone layout',
  fn: () => {
    const page = readFileSafe(PATHS.divisionPage) || '';
    for (const file of ['terrace-low-frames.svg', 'terrace-pergola.svg']) {
      assertIncludes(page, `/images/solis/${file}`, `The comparison must use ${file}`);
      assert(fileExists(path.join(PROJECT_ROOT, 'public', 'images', 'solis', file)), `${file} must exist`);
    }
    assertIncludes(page, 'Drawings for illustration, not to scale.', 'The drawings say what they are');
    assert(!/solis_terrace_lounge|solar-rooftop-array|solis_canopy_page1/.test(page), 'Photos without a recorded source are not used');
    const home = readFileSafe(PATHS.homePage) || '';
    assert(!home.includes('BeforeAfterSlider'), 'The comparison moved from the home page to Solis');
    const sld = readFileSafe(PATHS.onGridDiagram) || '';
    assert(sld.includes('pathLength={1}') && sld.includes('sld-tall'), 'Lines draw themselves, and phones get a vertical diagram');
  },
});

test({
  id: 'T1_R13_10',
  tier: 'tier1',
  feature: 'r13',
  title: 'R13 Feature: The solar estimator is labelled illustrative and makes no unverified equipment claims',
  fn: () => {
    const calc = readFileSafe(PATHS.solarCalculator) || '';
    for (const claim of ['Tier-1', '150 km/h', 'IP65', '80 microns', 'Class II SPD', '10-12 ft', '10 to 12 ft', 'Accelerated Depreciation']) {
      assert(!calc.includes(claim), `"${claim}" is not a confirmed claim`);
    }
    assertIncludes(calc, 'Illustrative estimate', 'The estimate says it is illustrative');
    assertIncludes(calc, 'The subsidy depends on the scheme rules at the time of application.', 'The subsidy is not promised');
    const form = readFileSafe(PATHS.siteEnquiryForm) || '';
    assertIncludes(form, "fetch('/api/contact'", 'The form also sends a copy to /api/contact');
    assertIncludes(form, 'mailto:${to}', 'The form opens the email app with the message written out');
  },
});
