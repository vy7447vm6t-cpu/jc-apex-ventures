import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, COMPONENTS_DIR, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import path from 'node:path';

test({
  id: 'T1_R8_01',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: The concierge mascot is retired from every page',
  fn: () => {
    assert(!fileExists(path.join(COMPONENTS_DIR, 'Clippy.tsx')), 'Clippy.tsx must be deleted (guidelines 2.8.2)');
    for (const page of [PATHS.homePage, PATHS.routeSolis, PATHS.routeStudio, PATHS.divisionPage]) {
      assert(!/Clippy/.test(readFileSafe(page) ?? ''), `${path.basename(page)} must not render the concierge`);
    }
  },
});

test({
  id: 'T1_R8_02',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: The navigation Enquire link goes to each page\'s enquiry section',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'Navbar.tsx must exist');
    assertMatch(nav, />\s*Enquire\s*</, 'Navigation must show an Enquire link');
    const anchors = /const ENQUIRY_ANCHORS[^}]*\}/.exec(nav)?.[0] ?? '';
    assert(!anchors.includes("'/solis'"), 'Solis uses the division template, so its Enquire link falls back to #contact');
    assertIncludes(nav, "'/print-management': '#enquiry-section'", 'Print rates must map to their enquiry form');
    assertIncludes(nav, "?? '#contact'", 'Every other page falls back to #contact');
  },
});

test({
  id: 'T1_R8_03',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: Every page with the navigation has the enquiry anchor the link points to',
  fn: () => {
    const anchors = [
      [PATHS.groundedCta, 'id="contact"'],
      [PATHS.divisionPage, 'id="contact"'],
      [PATHS.routeStudio, 'id="contact"'],
      [PATHS.routePrintMgmt, 'id="enquiry-section"'],
      [PATHS.routeGrievances, 'id="contact"'],
      [PATHS.routeLicenses, 'id="contact"'],
      [PATHS.routeSpacePlanning, 'id="contact"'],
    ];
    for (const [file, anchor] of anchors) {
      assertIncludes(readFileSafe(file) ?? '', anchor, `${path.basename(path.dirname(file))}/${path.basename(file)} must contain ${anchor}`);
    }
  },
});

test({
  id: 'T1_R8_04',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: The WhatsApp button shows on phones only and stays below dialogs',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) ?? '';
    assertMatch(css, /@media \(min-width: 768px\) \{ \.whatsapp-fab \{ display: none; \} \}/, 'WhatsApp button must hide from 768 px');
    const z = /\.whatsapp-fab \{[^}]*z-index: (\d+);/.exec(css);
    assert(z && Number(z[1]) < 200, 'WhatsApp button must sit below the client list dialog (z-index 200)');
    assertIncludes(readFileSafe(PATHS.navbar) ?? '', 'className="whatsapp-fab"', 'Navigation must render the WhatsApp button');
  },
});

test({
  id: 'T1_R8_05',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: ImageLightbox component exists and implements modal dialog',
  fn: () => {
    const exists = fileExists(PATHS.imageLightbox);
    assert(exists, 'src/components/ImageLightbox.tsx must exist');
    const code = readFileSafe(PATHS.imageLightbox);
    const hasModal = /fixed\s+inset-0/i.test(code) || /backdrop/i.test(code) || /dialog/i.test(code);
    assert(hasModal, 'ImageLightbox must render a full-screen fixed backdrop modal overlay');
  },
});

test({
  id: 'T1_R8_06',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: ImageLightbox displays specifications and supports dismiss interactions',
  fn: () => {
    const code = readFileSafe(PATHS.imageLightbox);
    assert(code !== null, 'ImageLightbox.tsx must exist');
    const hasCloseHandling = /onClose/i.test(code) || /Escape/i.test(code) || /close/i.test(code);
    assert(hasCloseHandling, 'ImageLightbox must support dismissal via close action or Escape key');
  },
});
