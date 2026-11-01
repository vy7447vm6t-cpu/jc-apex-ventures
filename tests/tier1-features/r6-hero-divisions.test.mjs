import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, APP_DIR, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import { HOME_SECTION_FILES, oneLiners, readAll } from '../helpers/brand-source.mjs';
import path from 'node:path';

const ROUTES = ['grid-apex', 'solis', 'sanyog', 'tvasta', 'emudran', 'agrim'];

test({
  id: 'T1_R6_01',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Home page renders the hero and its seven sections in order',
  fn: () => {
    const home = readFileSafe(PATHS.homePage);
    assert(home !== null, 'src/app/page.tsx must exist');
    const order = ['<GroundedHero', '<GroundedWhy', '<GroundedProjectTrack', '<GroundedServices', '<GroundedAffiliations', '<GroundedProcess', '<GroundedCalculators', '<GroundedCTA'];
    let last = -1;
    for (const marker of order) {
      const at = home.indexOf(marker);
      assert(at > last, `Home page must render ${marker} after the previous section`);
      last = at;
    }
  },
});

test({
  id: 'T1_R6_02',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Hero lists the six divisions, each linking to an existing page',
  fn: () => {
    const hero = readFileSafe(PATHS.groundedHero);
    assert(hero !== null, 'GroundedHero.tsx must exist');
    for (const route of ROUTES) {
      assertIncludes(hero, `href: '/${route}'`, `Hero must link to /${route}`);
      assert(fileExists(path.join(APP_DIR, route, 'page.tsx')), `Route /${route} must exist`);
    }
    assertIncludes(hero, '<ClientMarquee', 'Hero must carry the client marquee');
  },
});

test({
  id: 'T1_R6_03',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Division one-liners on the website match the PDF profiles word for word',
  fn: () => {
    const site = readFileSafe(PATHS.messaging);
    const pdf = readFileSafe(PATHS.profilesLib);
    assert(site !== null && pdf !== null, 'messaging.ts and profiles/lib.mjs must exist');
    const siteLines = Object.values(oneLiners(site.replace('DIVISION_ONE_LINERS', 'ONE_LINERS')));
    const pdfLines = Object.values(oneLiners(pdf));
    assertEqual(siteLines.length, 6, 'messaging.ts must define six one-liners');
    assertEqual([...siteLines].sort().join('|'), [...pdfLines].sort().join('|'), 'Website and PDF one-liners must be identical');
  },
});

test({
  id: 'T1_R6_04',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Home section numbers run 1 to 7 without gaps or repeats',
  fn: () => {
    const code = readAll(HOME_SECTION_FILES);
    const numbers = [...code.matchAll(/<SectionEyebrow number=\{(\d+)\}/g)].map((m) => Number(m[1])).sort((a, b) => a - b);
    assertEqual(numbers.join(','), '1,2,3,4,5,6,7', 'Home sections must be numbered 1 to 7 once each');
  },
});

test({
  id: 'T1_R6_05',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Clients and projects read from the track record and show only showable projects',
  fn: () => {
    const code = readFileSafe(PATHS.groundedProjectTrack);
    const map = readFileSafe(PATHS.workMap) || '';
    assert(code !== null, 'GroundedProjectTrack.tsx must exist');
    assertIncludes(code, "from '@/content/track-record'", 'Clients and projects must read from src/content/track-record.ts');
    assertIncludes(map, "trackRecord('solis')", 'Completed plants must come from trackRecord()');
    assertIncludes(map, 'isShowable(p.proof.status)', 'Proposals must pass isShowable');
    assertIncludes(code, 'ATTRIBUTION_LINES.director', 'The section must carry the attribution line');
  },
});

test({
  id: 'T1_R6_06',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Unconfirmed figures stay off the home page',
  fn: () => {
    const code = readAll(HOME_SECTION_FILES.concat([PATHS.groundedHero]));
    assert(!code.includes('140+'), '"140+" is unconfirmed (proof register) and must not appear on the home page');
    assert(!/Class-A/i.test(code), '"Class-A" is marked do-not-use');
    assertIncludes(readFileSafe(PATHS.groundedWhy) ?? '', 'keyFacts()', '"Our why" must read its figures from keyFacts()');
  },
});
