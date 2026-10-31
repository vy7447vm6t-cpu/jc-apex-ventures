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
  title: 'R8 Boundary: ImageLightbox checks Escape key explicitly in keydown listener',
  fn: () => {
    const code = readFileSafe(PATHS.imageLightbox);
    assert(code !== null, 'src/components/ImageLightbox.tsx must exist');
    const hasEscapeCheck = /e\.key\s*===\s*['"]Escape['"]/i.test(code) || /key\s*===\s*['"]Escape['"]/i.test(code);
    assert(hasEscapeCheck, 'ImageLightbox must attach keydown listener checking e.key === "Escape"');
  },
});

test({
  id: 'T2_R8_04',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: ImageLightbox backdrop click guards against inner modal event bubbling',
  fn: () => {
    const code = readFileSafe(PATHS.imageLightbox);
    assert(code !== null, 'src/components/ImageLightbox.tsx must exist');
    const hasStopPropagation = /stopPropagation\(\)/i.test(code) || /e\.target\s*===\s*e\.currentTarget/i.test(code);
    assert(hasStopPropagation, 'ImageLightbox must guard inner card clicks against closing modal');
  },
});

test({
  id: 'T2_R8_05',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: ImageLightbox renders safely when caption is empty or undefined',
  fn: () => {
    const code = readFileSafe(PATHS.imageLightbox);
    assert(code !== null, 'src/components/ImageLightbox.tsx must exist');
    const hasSafeCaption = /caption\s*&&/i.test(code) || /caption\s*\|\|/i.test(code) || /specs\s*&&/i.test(code);
    assert(hasSafeCaption, 'ImageLightbox must safely guard optional caption/specifications props');
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
