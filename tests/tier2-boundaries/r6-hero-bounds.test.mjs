import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';
import { HOME_SECTION_FILES, readAll } from '../helpers/brand-source.mjs';

test({
  id: 'T2_R6_01',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: No bracketed eyebrows or "(01)" and "_01" numbering on the home page',
  fn: () => {
    const code = readAll(HOME_SECTION_FILES.concat([PATHS.groundedHero, PATHS.footer, PATHS.navbar]));
    assert(!/\[\s*\d{2}\s*\/|\[[A-Z][A-Z &;·/.-]{6,}\]/.test(code), 'Bracketed labels are retired (guidelines 2.8.1)');
    assert(!/'\(0\d\)'|'_0\d'/.test(code), '"(01)" and "_01" numbering is retired');
  },
});

test({
  id: 'T2_R6_02',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Hero photograph sits under a flat Night overlay, not a gradient',
  fn: () => {
    const hero = readFileSafe(PATHS.groundedHero);
    assert(hero !== null, 'GroundedHero.tsx must exist');
    assert(!/gradient\(/.test(hero), 'Hero must not use gradients');
    assertMatch(hero, /rgba\(11, 14, 20, 0\.(3[5-9]|4[0-5])\)/, 'Hero overlay must be Night at 35 to 45% opacity');
  },
});

test({
  id: 'T2_R6_03',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Hero division list drops to two columns on phones',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) ?? '';
    assertMatch(css, /@media \(max-width: 640px\) \{\s*\.hero-division-list \{ grid-template-columns: repeat\(2/, 'Hero division list must use two columns at 640 px and below');
  },
});

test({
  id: 'T2_R6_04',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Section numbers move into the margin only on wide screens',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) ?? '';
    assertMatch(css, /@media \(min-width: 1400px\) \{\s*\.section-number \{[^}]*right: calc\(100% \+ 24px\)/, 'Section numbers sit in the margin from 1400 px');
    assertMatch(css, /\.section-number \{[^}]*font-size: 56px/, 'Section numbers are 56 px above the headline on smaller screens');
  },
});

test({
  id: 'T2_R6_05',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Division names in running text use brand casing',
  fn: () => {
    const code = readAll([PATHS.groundedHero, PATHS.groundedServices, PATHS.groundedCta, PATHS.groundedProjectTrack]);
    for (const name of ['Grid Apex', 'Solis', 'Sanyog', 'Tvasta', 'eMudran', 'Agrim']) {
      assertIncludes(code, `'${name}'`, `${name} must be written in brand casing`);
    }
    assert(!/'(GRID APEX|SOLIS|SANYOG|TVASTA|EMUDRAN|eMUDRAN|AGRIM)'/.test(code), 'All-caps division names are for logos only (guidelines 4.2)');
  },
});

test({
  id: 'T2_R6_06',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Estimator tabs are underline tabs with arrow-key navigation',
  fn: () => {
    const tabs = readFileSafe(PATHS.underlineTabs);
    assert(tabs !== null, 'UnderlineTabs.tsx must exist');
    for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) assertIncludes(tabs, key, `Tabs must handle ${key}`);
    assertIncludes(tabs, 'role="tablist"', 'Tabs must expose a tablist');
    assertIncludes(tabs, 'tabIndex={selected ? 0 : -1}', 'Tabs must use a roving tabindex');
    assertIncludes(readFileSafe(PATHS.groundedCalculators) ?? '', '<UnderlineTabs', 'Estimators must use underline tabs');
  },
});
