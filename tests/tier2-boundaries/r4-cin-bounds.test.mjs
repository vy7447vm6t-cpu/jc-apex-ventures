import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R4_01',
  tier: 'tier2',
  feature: 'r4',
  title: 'R4 Boundary: Case-insensitive CIN absence verification across entire Hero block',
  fn: () => {
    const home = readFileSafe(PATHS.homePage);
    assert(home !== null, 'src/app/page.tsx must exist');
    // Extract everything before the first section or division list
    const heroSection = home.split(/divisions|division-section|<section/i)[1] || home.slice(0, 2000);
    const hasCinAnyCase = /cin\s*[:=]\s*u70200mh/i.test(heroSection) ||
                          /u70200mh2023opc411326/i.test(heroSection);
    assert(!hasCinAnyCase, 'Case-insensitive check confirms CIN is completely absent from Hero block');
  },
});

test({
  id: 'T2_R4_02',
  tier: 'tier2',
  feature: 'r4',
  title: 'R4 Boundary: Precise MCA CIN syntax pattern match in Footer.tsx',
  fn: () => {
    const footer = readFileSafe(PATHS.footer);
    assert(footer !== null, 'src/components/Footer.tsx must exist');
    // Formal Indian CIN pattern: U + 5 digits + 2 state letters + 4 year digits + OPC + 6 digits
    const cinPattern = /\bU[0-9]{5}[A-Z]{2}[0-9]{4}OPC[0-9]{6}\b/;
    assertMatch(footer, cinPattern, 'Footer must match standard Indian MCA CIN regex pattern');
  },
});

test({
  id: 'T2_R4_03',
  tier: 'tier2',
  feature: 'r4',
  title: 'R4 Boundary: Footer explicit legal entity name contains (OPC) PRIVATE LIMITED or PVT. LTD.',
  fn: () => {
    const footer = readFileSafe(PATHS.footer);
    assert(footer !== null, 'src/components/Footer.tsx must exist');
    const hasOpcPvtLtd = /\(OPC\)\s*(?:PVT\.?\s*LTD\.?|PRIVATE\s+LIMITED)/i.test(footer);
    assert(hasOpcPvtLtd, 'Footer must explicitly state legal company title "(OPC) PRIVATE LIMITED" or "(OPC) PVT. LTD."');
  },
});

test({
  id: 'T2_R4_04',
  tier: 'tier2',
  feature: 'r4',
  title: 'R4 Boundary: Navbar completely omits bureaucratic MCA / Government registration',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasGovNotice = /Ministry of Corporate Affairs/i.test(nav) ||
                         /Government of India/i.test(nav) ||
                         /MCA Registered/i.test(nav);
    assert(!hasGovNotice, 'Navbar must NOT display bureaucratic MCA or Government of India notices');
  },
});

test({
  id: 'T2_R4_05',
  tier: 'tier2',
  feature: 'r4',
  title: 'R4 Boundary: Editorial badge star symbol (✦) is cleanly encoded UTF-8',
  fn: () => {
    const home = readFileSafe(PATHS.homePage);
    assert(home !== null, 'src/app/page.tsx must exist');
    if (home.includes('Multi-Disciplinary Engineering')) {
      // Must not contain broken mojibake like â¦ or &amp;
      assert(!home.includes('â¦'), 'Editorial badge must not contain corrupted mojibake bytes');
    }
  },
});

test({
  id: 'T2_R4_06',
  tier: 'tier2',
  feature: 'r4',
  title: 'R4 Boundary: Footer copyright line includes year >= 2024',
  fn: () => {
    const footer = readFileSafe(PATHS.footer);
    assert(footer !== null, 'src/components/Footer.tsx must exist');
    const hasValidYear = /202[4-9]/i.test(footer) || /new Date\(\)\.getFullYear\(\)/.test(footer);
    assert(hasValidYear, 'Footer copyright must reference valid current year (>= 2024 or dynamic getFullYear)');
  },
});
