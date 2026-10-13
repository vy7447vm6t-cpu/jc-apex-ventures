import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T1_R8_01',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: Clippy assistant dock incorporates umbrella mascot and liquid glass dock',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'src/components/Clippy.tsx must exist');
    // Must feature umbrella mascot (Logo, umbrella icon or SVG) and floating dock positioning
    const hasUmbrella = /umbrella/i.test(code) || /Logo/i.test(code) || /apex/i.test(code);
    const hasFloatingDock = /fixed/i.test(code) && (/bottom-/i.test(code) || /right-/i.test(code));
    assert(hasUmbrella, 'Clippy assistant must incorporate umbrella mascot branding');
    assert(hasFloatingDock, 'Clippy assistant must be a fixed floating dock');
  },
});

test({
  id: 'T1_R8_02',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: Clippy guidance hub provides 1-tap division routing shortcuts',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'src/components/Clippy.tsx must exist');
    // Must provide 1-tap routing to consortium divisions
    const divisions = ['solis', 'sanyog', 'grid', 'tvasta', 'emudran', 'agrim'];
    let count = 0;
    for (const d of divisions) {
      if (code.toLowerCase().includes(d)) count++;
    }
    assert(count >= 3, `Clippy guidance hub must provide division shortcuts (found ${count})`);
  },
});

test({
  id: 'T1_R8_03',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: Clippy guidance hub direct WhatsApp consultation link',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'src/components/Clippy.tsx must exist');
    const hasWhatsApp = /wa\.me\/917021112664/i.test(code) || /whatsapp/i.test(code);
    assert(hasWhatsApp, 'Clippy guidance hub must include 1-tap WhatsApp consultation link (wa.me/917021112664)');
  },
});

test({
  id: 'T1_R8_04',
  tier: 'tier1',
  feature: 'r8',
  title: 'R8 Feature: Clippy guidance hub quick solar estimate trigger',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'src/components/Clippy.tsx must exist');
    const hasSolarAction = /solar/i.test(code) || /estimator/i.test(code) || /calculator/i.test(code);
    assert(hasSolarAction, 'Clippy guidance hub must include quick solar estimate trigger');
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
    // Must handle closing via Escape key or onClose callback
    const hasCloseHandling = /onClose/i.test(code) || /Escape/i.test(code) || /close/i.test(code);
    assert(hasCloseHandling, 'ImageLightbox must support dismissal via close action or Escape key');
  },
});
