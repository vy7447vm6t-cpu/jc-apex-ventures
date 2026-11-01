import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R8_01',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: Client list closes on Escape and returns focus to the strip',
  fn: () => {
    const code = readFileSafe(PATHS.clientMarquee);
    assert(code !== null, 'ClientMarquee.tsx must exist');
    assert(/event\.key === 'Escape'/.test(code), 'Escape must close the client list');
    assertIncludes(code, 'triggerRef.current?.focus({ preventScroll: true })', 'Focus must return to the strip without scrolling');
    assertIncludes(code, 'aria-modal="true"', 'The list must be a modal dialog');
  },
});

test({
  id: 'T2_R8_02',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: WhatsApp link targets the company number with encoded text',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'Navbar.tsx must exist');
    assert(/https:\/\/wa\.me\/917021112664\?text=\$\{encodeURIComponent\(/.test(nav), 'WhatsApp text must be passed through encodeURIComponent');
    assertIncludes(nav, 'rel="noopener noreferrer"', 'WhatsApp link opens safely in a new tab');
  },
});

test({
  id: 'T2_R8_03',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: Clippy falls back to WhatsApp for a question it cannot match',
  fn: () => {
    const code = readFileSafe(PATHS.clippy) ?? '';
    assertIncludes(code, 'bestScore >= 3', 'Only a reasonable match counts as an answer');
    assertIncludes(code, 'https://wa.me/917021112664', 'Unmatched questions go to WhatsApp, already written out');
    assertIncludes(code, 'encodeURIComponent', 'The question is encoded into the WhatsApp link');
  },
});

test({
  id: 'T2_R8_04',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: Choosing another division in the dialog swaps the form and its inbox',
  fn: () => {
    const code = readFileSafe(PATHS.consultationModal) ?? '';
    assertIncludes(code, 'key={division.slug}', 'The form resets when the division changes');
    assertIncludes(code, 'role="radiogroup"', 'The division choice is a radio group');
    assertIncludes(code, 'aria-checked', 'The chosen division is announced');
  },
});

test({
  id: 'T2_R8_05',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: The enquiry form says sent only when the server sent it',
  fn: () => {
    const code = readFileSafe(PATHS.siteEnquiryForm) ?? '';
    assertIncludes(code, "setStatus(res.ok ? 'sent' : 'failed')", 'Sent only on a successful response');
    assertIncludes(code, 'href={mailto}', 'On failure it offers the same message by email');
    assertIncludes(code, 'href={whatsapp}', 'and by WhatsApp');
  },
});

test({
  id: 'T2_R8_06',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: Client marquee stops moving under reduced motion and while the list is open',
  fn: () => {
    const code = readFileSafe(PATHS.clientMarquee);
    assert(code !== null, 'ClientMarquee.tsx must exist');
    assertIncludes(code, 'useReducedMotion()', 'Marquee must read the reduced-motion preference');
    assertIncludes(code, 'if (reduceMotion || open || !track) return;', 'The loop must stop under reduced motion and while open');
    assertIncludes(code, 'reduceMotion ? { duration: 0 }', 'The expansion must be instant under reduced motion');
  },
});
