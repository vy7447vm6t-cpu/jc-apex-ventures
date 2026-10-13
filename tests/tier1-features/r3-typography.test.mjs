import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes, assertNotIncludes } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T1_R3_01',
  tier: 'tier1',
  feature: 'r3',
  title: 'R3 Feature: Native Next.js font loading in layout.tsx via next/font/google',
  fn: () => {
    const layout = readFileSafe(PATHS.layoutTsx);
    assert(layout !== null, 'src/app/layout.tsx must exist');
    assertIncludes(layout, 'next/font/google', 'layout.tsx must import from next/font/google');
    const hasInstrumentSans = /Instrument_Sans/i.test(layout) || /instrumentSans/i.test(layout);
    const hasNewsreader = /Newsreader/i.test(layout) || /newsreader/i.test(layout);
    assert(hasInstrumentSans, 'layout.tsx must import and configure Instrument_Sans');
    assert(hasNewsreader, 'layout.tsx must import and configure Newsreader');
  },
});

test({
  id: 'T1_R3_02',
  tier: 'tier1',
  feature: 'r3',
  title: 'R3 Feature: CSS font variables injected into RootLayout HTML/body',
  fn: () => {
    const layout = readFileSafe(PATHS.layoutTsx);
    assert(layout !== null, 'src/app/layout.tsx must exist');
    // Must bind font variables (e.g., instrumentSans.variable, newsreader.variable) to <html> or <body>
    const bindsSansVar = /instrumentSans\.variable/i.test(layout) || /--font-sans/i.test(layout);
    const bindsSerifVar = /newsreader\.variable/i.test(layout) || /--font-serif/i.test(layout);
    assert(bindsSansVar, 'layout.tsx must bind Instrument Sans font variable to layout container');
    assert(bindsSerifVar, 'layout.tsx must bind Newsreader font variable to layout container');
  },
});

test({
  id: 'T1_R3_03',
  tier: 'tier1',
  feature: 'r3',
  title: 'R3 Feature: Elimination of render-blocking Google Fonts @import in globals.css',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    // Must not contain render-blocking @import url('https://fonts.googleapis.com...')
    const hasRenderBlockingImport = /@import\s+url\(['"]https:\/\/fonts\.googleapis\.com/i.test(css);
    assert(!hasRenderBlockingImport, 'globals.css must NOT contain render-blocking external Google Fonts @import');
  },
});

test({
  id: 'T1_R3_04',
  tier: 'tier1',
  feature: 'r3',
  title: 'R3 Feature: Architectural letter-spacing tracking (-0.02em) on display headlines/UI',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    // Must specify letter-spacing: -0.02em for headings or font-sans elements
    const hasTightTracking = /letter-spacing:\s*-0\.02em/i.test(css) ||
                             /tracking-\[-0\.02em\]/i.test(css);
    assert(hasTightTracking, 'globals.css or design system must enforce -0.02em letter-spacing on headline/sans typography');
  },
});

test({
  id: 'T1_R3_05',
  tier: 'tier1',
  feature: 'r3',
  title: 'R3 Feature: Optical sizing and generous line-height on Newsreader editorial body',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    // Must support font-serif / Newsreader with optical sizing and line-height between 1.65 and 1.7
    const hasSerifRule = /\.font-serif/i.test(css) || /font-family:[^;]*serif/i.test(css);
    const hasLineHeight = /line-height:\s*1\.6[5-9]/i.test(css) || /line-height:\s*1\.7/i.test(css) || /leading-relaxed/i.test(css);
    assert(hasSerifRule, 'globals.css must configure .font-serif rule');
    assert(hasLineHeight, 'Editorial narrative serif text must have generous line-height (1.65 - 1.7)');
  },
});

test({
  id: 'T1_R3_06',
  tier: 'tier1',
  feature: 'r3',
  title: 'R3 Feature: Font family bindings connect variables to Tailwind / CSS classes',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss);
    assert(css !== null, 'globals.css must exist');
    // Must declare font-family mapping to var(--font-sans) and var(--font-serif)
    const hasSansVarBinding = /var\(--font-sans\)/i.test(css) || /--font-sans/i.test(css);
    const hasSerifVarBinding = /var\(--font-serif\)/i.test(css) || /--font-serif/i.test(css);
    assert(hasSansVarBinding, 'globals.css must bind --font-sans variable');
    assert(hasSerifVarBinding, 'globals.css must bind --font-serif variable');
  },
});
