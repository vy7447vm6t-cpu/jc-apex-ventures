import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T1_R5_01',
  tier: 'tier1',
  feature: 'r5',
  title: 'R5 Feature: Centered floating island capsule navigation structure',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    // Must feature fixed top centered floating dock layout
    const isFloatingCapsule = (/fixed/i.test(nav) && /top-/i.test(nav) && (/left-1\/2/i.test(nav) || /-translate-x-1\/2/i.test(nav) || /mx-auto/i.test(nav) || /transform/i.test(nav))) ||
                              /floating/i.test(nav);
    assert(isFloatingCapsule, 'Navbar.tsx must implement a centered floating island capsule layout');
  },
});

test({
  id: 'T1_R5_02',
  tier: 'tier1',
  feature: 'r5',
  title: 'R5 Feature: Master umbrella emblem and brand wordmark on left of navbar',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasLogoComponent = /<Logo/i.test(nav) || /Logo/i.test(nav);
    const hasBrandText = /JC APEX/i.test(nav) || /APEX/i.test(nav);
    assert(hasLogoComponent, 'Navbar must include Logo component');
    assert(hasBrandText, 'Navbar must include JC Apex brand identity text/wordmark');
  },
});

test({
  id: 'T1_R5_03',
  tier: 'tier1',
  feature: 'r5',
  title: 'R5 Feature: Interactive division switcher navigation links in center',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    // Must include navigation links for consortium divisions
    const divisions = ['solis', 'sanyog', 'grid-apex', 'tvasta', 'emudran', 'agrim'];
    let foundCount = 0;
    for (const div of divisions) {
      if (nav.includes(`/${div}`) || nav.includes(div)) {
        foundCount++;
      }
    }
    assert(foundCount >= 4, `Navbar must feature division links (found ${foundCount} of 6)`);
  },
});

test({
  id: 'T1_R5_04',
  tier: 'tier1',
  feature: 'r5',
  title: 'R5 Feature: Direct telephone action link (+91 70211 12664) with tel: protocol',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasTelLink = /tel:\+?917021112664/i.test(nav) || /70211\s*12664/i.test(nav);
    assert(hasTelLink, 'Navbar must include quick telephone call action (+91 70211 12664)');
  },
});

test({
  id: 'T1_R5_05',
  tier: 'tier1',
  feature: 'r5',
  title: 'R5 Feature: Consultation CTA button with specular sheen or accent highlight',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasConsultationCta = /Consultation/i.test(nav) || /Enquire/i.test(nav) || /Contact/i.test(nav) || /#enquiry-form/i.test(nav);
    assert(hasConsultationCta, 'Navbar must feature consultation CTA button');
  },
});

test({
  id: 'T1_R5_06',
  tier: 'tier1',
  feature: 'r5',
  title: 'R5 Feature: Liquid glass material styling on floating capsule dock',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'src/components/Navbar.tsx must exist');
    const hasGlass = /backdrop-blur/i.test(nav) || /ios-glass/i.test(nav) || /glass/i.test(nav) || /rgba/i.test(nav);
    assert(hasGlass, 'Navbar floating capsule must employ liquid glass material backdrop blur');
  },
});
