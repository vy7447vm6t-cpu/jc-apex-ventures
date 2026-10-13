import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, PUBLIC_IMAGES, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import path from 'node:path';

test({
  id: 'T1_R6_01',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Cinematic Hero editorial headline and center-aligned layout',
  fn: () => {
    const home = readFileSafe(PATHS.homePage);
    assert(home !== null, 'src/app/page.tsx must exist');
    // Center-aligned editorial layout
    const isCenterAligned = /text-center/i.test(home) || /items-center/i.test(home);
    assert(isCenterAligned, 'Homepage hero must feature center-aligned editorial layout');
  },
});

test({
  id: 'T1_R6_02',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Architectural facade background image asset integrity',
  fn: () => {
    const facadeAsset1 = path.join(PUBLIC_IMAGES, 'hero-architectural-facade.jpg');
    const facadeAsset2 = path.join(PUBLIC_IMAGES, 'one-international-centre.jpg');
    assert(fileExists(facadeAsset1) || fileExists(facadeAsset2), 'Architectural facade background image asset must exist in public/images/');
  },
});

test({
  id: 'T1_R6_03',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: InteractiveTabbedMonograph component exists and exports properly',
  fn: () => {
    const exists = fileExists(PATHS.interactiveTabbedMonograph);
    assert(exists, 'src/components/InteractiveTabbedMonograph.tsx must exist');
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    const hasDefaultExport = /export\s+default\s+function\s+InteractiveTabbedMonograph/i.test(code) ||
                            /export\s+default\s+InteractiveTabbedMonograph/i.test(code);
    assert(hasDefaultExport, 'InteractiveTabbedMonograph must be default exported');
  },
});

test({
  id: 'T1_R6_04',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Monograph left-rail switcher covers all 6 divisions',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    const divisions = ['solis', 'sanyog', 'grid', 'tvasta', 'emudran', 'agrim'];
    for (const div of divisions) {
      assert(
        code.toLowerCase().includes(div),
        `Monograph left rail must include division: ${div}`
      );
    }
  },
});

test({
  id: 'T1_R6_05',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Monograph displays leadership credentials and regulatory dossiers',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph) || '';
    const divisionsData = readFileSafe(PATHS.divisionsContent) || '';
    const combined = code + ' ' + divisionsData;
    // Must feature key associate dossiers: utility network (BEST/AEML/Tata Power/MSEDCL), Manish Ajgaonkar, Hemangi Patil
    const hasUtilities = /BEST/i.test(combined) || /MSEDCL/i.test(combined) || /Tata Power/i.test(combined);
    const hasCreativePartners = /Ajgaonkar/i.test(combined) || /Patil/i.test(combined);
    assert(hasUtilities, 'Monograph/content must reference institutional utility affiliations');
    assert(hasCreativePartners, 'Monograph/content must reference production & design leadership partners');
  },
});

test({
  id: 'T1_R6_06',
  tier: 'tier1',
  feature: 'r6',
  title: 'R6 Feature: Monograph viewport provides direct jump links to division pages',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    // Must contain Link or anchor to division routes
    const hasJumpLink = /href=\{?`?\/(?:solis|sanyog|grid-apex|tvasta|emudran|agrim)/i.test(code) ||
                        /Link[^>]*href/i.test(code);
    assert(hasJumpLink, 'Monograph viewport must provide direct jump links to dedicated division routes');
  },
});
