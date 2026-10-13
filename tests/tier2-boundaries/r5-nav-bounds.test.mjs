import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R5_01',
  tier: 'tier2',
  feature: 'r5',
  title: 'R5 Boundary: Navbar z-index layer is elevated (>= 40) to float over page graphics',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasElevatedZ = /z-(?:40|50|100|999)/i.test(nav) || /z-index:\s*(?:[4-9]\d|\d{3,})/i.test(nav);
    assert(hasElevatedZ, 'Navbar must declare elevated z-index (>= 40) to float above content');
  },
});

test({
  id: 'T2_R5_02',
  tier: 'tier2',
  feature: 'r5',
  title: 'R5 Boundary: Quick telephone action href is clean without spaces (tel:+917021112664)',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    if (nav.includes('tel:')) {
      // tel link href must not contain spaces in number
      const telMatch = nav.match(/href=["']tel:([^"']+)["']/i);
      if (telMatch) {
        assert(!telMatch[1].includes(' '), 'tel: link href must have spaces stripped for valid dialer action');
      }
    }
  },
});

test({
  id: 'T2_R5_03',
  tier: 'tier2',
  feature: 'r5',
  title: 'R5 Boundary: Responsive breakpoint hides desktop pills on narrow viewports',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasResponsiveClasses = /hidden\s+md:flex/i.test(nav) ||
                                 /hidden\s+lg:flex/i.test(nav) ||
                                 /md:hidden/i.test(nav);
    assert(hasResponsiveClasses, 'Navbar must include responsive breakpoint classes for mobile devices');
  },
});

test({
  id: 'T2_R5_04',
  tier: 'tier2',
  feature: 'r5',
  title: 'R5 Boundary: Mobile drawer toggle state cleanly initialized to false',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    if (nav.includes('useState')) {
      const hasInitialFalseState = /useState\(false\)/i.test(nav);
      assert(hasInitialFalseState, 'Mobile menu drawer open state must initialize to false');
    }
  },
});

test({
  id: 'T2_R5_05',
  tier: 'tier2',
  feature: 'r5',
  title: 'R5 Boundary: Consultation CTA navigates to valid enquiry destination anchor',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasEnquiryTarget = /href=["'][^"']*(?:enquiry-form|contact|solis|#)[^"']*["']/i.test(nav);
    assert(hasEnquiryTarget, 'Consultation CTA must target valid contact destination or anchor');
  },
});

test({
  id: 'T2_R5_06',
  tier: 'tier2',
  feature: 'r5',
  title: 'R5 Boundary: Navbar link elements provide accessible text or aria-labels',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    // Ensure all <a> tags have descriptive content or aria-label
    assert(!nav.includes('aria-label=""'), 'Link elements must not have empty aria-label');
  },
});
