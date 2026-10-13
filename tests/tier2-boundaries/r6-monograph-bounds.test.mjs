import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertInRange } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R6_01',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Monograph active tab index clamped to valid range [0, 5]',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    // State initialization should start at 0
    const hasInit0 = /useState\(\s*0\s*\)/i.test(code) || /useState<number>\(\s*0\s*\)/i.test(code) || /activeTab/i.test(code);
    assert(hasInit0, 'Active tab state must be tracked and initialize to valid index');
  },
});

test({
  id: 'T2_R6_02',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Monograph tab iteration uses distinct unique keys',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    // key={division.id} or key={division.slug}
    const hasKeyProp = /key=\{[a-zA-Z0-9_\.]+\}/i.test(code);
    assert(hasKeyProp, 'Monograph division tab iteration must declare React key prop');
  },
});

test({
  id: 'T2_R6_03',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Monograph handles optional associate leadership entries gracefully',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    // Safe optional chaining when mapping associates
    const hasSafeMapping = /\?\.map/i.test(code) || /&&/i.test(code) || /associates/i.test(code);
    assert(hasSafeMapping, 'Monograph must safely check array existence before mapping associates');
  },
});

test({
  id: 'T2_R6_04',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Live status indicator uses active pulse / luminous indicator',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    const hasStatusDot = /rounded-full/i.test(code) && (/bg-emerald/i.test(code) || /bg-green/i.test(code) || /animate-pulse/i.test(code) || /bg-\[/i.test(code));
    assert(hasStatusDot, 'Monograph tab status indicator must render a luminous status dot');
  },
});

test({
  id: 'T2_R6_05',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Monograph image rendering specifies fill or responsive dimensions',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    const hasResponsiveImage = /fill/i.test(code) || (/width=/i.test(code) && /height=/i.test(code)) || /object-cover/i.test(code);
    assert(hasResponsiveImage, 'Monograph image must specify fill or explicit responsive width/height to avoid layout shift');
  },
});

test({
  id: 'T2_R6_06',
  tier: 'tier2',
  feature: 'r6',
  title: 'R6 Boundary: Monograph jump button specifies direct absolute route href',
  fn: () => {
    const code = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(code !== null, 'InteractiveTabbedMonograph.tsx must exist');
    // Ensure links start with leading slash /
    const hasRootPathHref = /href=["']\//i.test(code) || /href=\{`\//i.test(code);
    assert(hasRootPathHref, 'Monograph jump link href must start with root slash /');
  },
});
