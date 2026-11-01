import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, COMPONENTS_DIR, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import path from 'node:path';

test({
  id: 'T1_R8_01',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: Clippy answers only from the division profiles and stays off phones',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'Clippy.tsx must exist (the user asked for the components back)');
    assertIncludes(code, "from '@/content/divisions'", 'Answers must come from the division FAQs');
    assertIncludes(code, 'd.faq.map', 'Every division FAQ must feed the answers');
    for (const banned of ['Tower 2', 'patent', '3,900', 'Kabnurkar', 'Manoj', 'zero contractor abandonment', '33kV']) {
      assert(!code.includes(banned), `Clippy must not say "${banned}"`);
    }
    assert(!/animate-pulse/.test(code), 'No pulsing status dot');
    assertMatch(readFileSafe(PATHS.globalsCss) ?? '', /@media \(max-width: 767px\) \{ \.clippy-dock \{ display: none !important; \} \}/, 'Clippy must stay off phones, where the WhatsApp button sits');
    assertIncludes(readFileSafe(PATHS.layoutTsx) ?? '', '<Clippy />', 'The root layout must mount Clippy on every page');
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
    assert(!anchors.includes('#enquiry-section'), 'The old print page anchor is gone; print-management uses the division template');
    assertIncludes(nav, "?? '#contact'", 'Every page falls back to #contact');
  },
});

test({
  id: 'T1_R8_03',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: Every page with the navigation has the enquiry anchor the link points to',
  fn: () => {
    for (const file of [PATHS.groundedCta, PATHS.divisionPage, PATHS.routeStudio]) {
      assertIncludes(readFileSafe(file) ?? '', 'id="contact"', `${path.basename(file)} must contain id="contact"`);
    }
    // The four service pages render the division template, which carries id="contact".
    for (const file of [PATHS.routePrintMgmt, PATHS.routeGrievances, PATHS.routeLicenses, PATHS.routeSpacePlanning]) {
      assertIncludes(readFileSafe(file) ?? '', '<DivisionPage', `${path.basename(path.dirname(file))}/page.tsx must render DivisionPage`);
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
  title: 'R8 Feature: The enquiry dialog uses the shared form on a flat overlay, with no blur',
  fn: () => {
    const code = readFileSafe(PATHS.consultationModal);
    assert(code !== null, 'ConsultationModal.tsx must exist');
    assertIncludes(code, '<SiteEnquiryForm', 'The dialog must use the same form as the division pages');
    assertIncludes(code, 'role="dialog"', 'It must be a dialog');
    assertIncludes(code, 'aria-modal="true"', 'It must be modal');
    assert(!/backdrop-blur|backdropFilter/.test(code), 'No glass blur in the dialog');
    const css = readFileSafe(PATHS.globalsCss) ?? '';
    const overlay = /\.enquiry-overlay \{[^}]*\}/.exec(css)?.[0] ?? '';
    assert(overlay && !/backdrop-filter/.test(overlay), 'The overlay is flat Night, not blurred');
  },
});

test({
  id: 'T1_R8_06',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: The enquiry dialog closes on Escape or the backdrop and returns focus',
  fn: () => {
    const code = readFileSafe(PATHS.consultationModal) ?? '';
    assertIncludes(code, "e.key === 'Escape'", 'Escape must close the dialog');
    assertIncludes(code, 'e.target === e.currentTarget', 'Only a click on the backdrop itself closes it');
    assertIncludes(code, 'opener?.focus()', 'Focus must return to the button that opened it');
    assertIncludes(code, 'division.enquiryForm', 'Each division sends to its own inbox');
  },
});
