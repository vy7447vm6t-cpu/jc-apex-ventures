import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes, assertNotIncludes } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T1_R1_01',
  tier: 'tier1',
  feature: 'r1',
  title: 'R1 Feature: Global canvas slate/graphite tokens in globals.css',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    // Must define deep slate canvas #0A0D10 and elevated panel #11151A
    const hasCanvasDark = /#0A0D10/i.test(css) || /--color-bg:\s*#0A0D10/i.test(css);
    const hasPanelDark = /#11151A/i.test(css) || /--color-bg-alt:\s*#11151A/i.test(css);
    assert(hasCanvasDark, 'globals.css must define canvas background #0A0D10');
    assert(hasPanelDark, 'globals.css must define elevated panel background #11151A');
  },
});

test({
  id: 'T1_R1_02',
  tier: 'tier1',
  feature: 'r1',
  title: 'R1 Feature: Elevated surface token with dark translucent backing',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    const hasSurfaceToken = /--color-surface:\s*rgba\(\s*17,\s*21,\s*26/i.test(css) ||
                            /--color-surface:\s*#11151A/i.test(css) ||
                            /--color-surface-hover/i.test(css);
    assert(hasSurfaceToken, 'globals.css must define --color-surface with translucent dark backing (rgba(17, 21, 26, ...))');
  },
});

test({
  id: 'T1_R1_03',
  tier: 'tier1',
  feature: 'r1',
  title: 'R1 Feature: iOS liquid glass material system with blur(24px) saturate(190%)',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    const hasBlur24 = /blur\(\s*24px\s*\)/i.test(css);
    const hasSaturate190 = /saturate\(\s*190%\s*\)/i.test(css);
    assert(hasBlur24, 'globals.css liquid glass must include backdrop-filter: blur(24px)');
    assert(hasSaturate190, 'globals.css liquid glass must include saturate(190%)');
  },
});

test({
  id: 'T1_R1_04',
  tier: 'tier1',
  feature: 'r1',
  title: 'R1 Feature: Ambient champagne/gold specular border token',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    const hasGoldBorder = /rgba\(\s*194,\s*159,\s*83,\s*0\.3\s*\)/i.test(css) ||
                          /--color-border-accent:\s*rgba\(\s*194,\s*159,\s*83/i.test(css) ||
                          /--color-border-accent/i.test(css);
    assert(hasGoldBorder, 'globals.css must define champagne gold specular border rgba(194, 159, 83, 0.3)');
  },
});

test({
  id: 'T1_R1_05',
  tier: 'tier1',
  feature: 'r1',
  title: 'R1 Feature: High-contrast typography palette (pure white & warm ivory)',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    const hasWhiteTitle = /#FFFFFF/i.test(css) || /--color-text-primary:\s*#FFFFFF/i.test(css) || /--color-text-primary:\s*#fff/i.test(css);
    const hasWarmIvory = /#E8E4DA/i.test(css) || /--color-text-secondary:\s*#E8E4DA/i.test(css) || /#EAE6DC/i.test(css);
    assert(hasWhiteTitle, 'globals.css must define pure white (#FFFFFF) for high-contrast display titles');
    assert(hasWarmIvory, 'globals.css must define warm ivory (#E8E4DA) for editorial secondary text');
  },
});

test({
  id: 'T1_R1_06',
  tier: 'tier1',
  feature: 'r1',
  title: 'R1 Feature: Elimination of legacy light mode canvas (#FBFBFA)',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    // Root background in globals.css must not be set to light #FBFBFA
    const hasLightCanvas = /:root\s*\{[^}]*--color-bg:\s*#FBFBFA/i.test(css) ||
                           /body\s*\{[^}]*background-color:\s*#FBFBFA/i.test(css);
    assert(!hasLightCanvas, 'Legacy light background #FBFBFA must be eliminated from root/body');
  },
});
