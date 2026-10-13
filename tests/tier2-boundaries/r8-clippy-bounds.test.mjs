import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R8_01',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: Clippy toggle uses functional state updater (prev => !prev)',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'src/components/Clippy.tsx must exist');
    // Look for toggle updater
    const hasToggle = /setIsOpen\(\s*(?:prev\s*=>\s*!prev|!isOpen)\s*\)/i.test(code) ||
                      /setExpanded\(\s*(?:prev\s*=>\s*!prev|!expanded)\s*\)/i.test(code) ||
                      /!open/i.test(code) || /!isOpen/i.test(code);
    assert(hasToggle, 'Clippy state toggle must invert current boolean open state');
  },
});

test({
  id: 'T2_R8_02',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: Clippy WhatsApp URL parameters are properly encoded',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'src/components/Clippy.tsx must exist');
    if (code.includes('wa.me') && code.includes('text=')) {
      // Must not contain raw unencoded spaces in query string
      const waUrlMatch = code.match(/https:\/\/wa\.me\/917021112664\?[^"'\s]+/);
      if (waUrlMatch) {
        assert(!waUrlMatch[0].includes(' '), 'WhatsApp text query string must be URL-encoded without raw spaces');
      }
    }
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
    const hasEscapeCheck = /e\.key\s*===\s*['"]Escape['"]/i.test(code) ||
                           /key\s*===\s*['"]Escape['"]/i.test(code);
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
    // Should check e.target === e.currentTarget or e.stopPropagation() on modal card
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
    // Checks caption && <p> or caption || ''
    const hasSafeCaption = /caption\s*&&/i.test(code) || /caption\s*\|\|/i.test(code) || /specs\s*&&/i.test(code);
    assert(hasSafeCaption, 'ImageLightbox must safely guard optional caption/specifications props');
  },
});

test({
  id: 'T2_R8_06',
  tier: 'tier2',
  feature: 'r8',
  title: 'R8 Boundary: Clippy assistant dock cleans up interval timer on unmount',
  fn: () => {
    const code = readFileSafe(PATHS.clippy);
    assert(code !== null, 'src/components/Clippy.tsx must exist');
    if (code.includes('setInterval')) {
      const hasCleanup = /clearInterval/i.test(code);
      assert(hasCleanup, 'Clippy useEffect must call clearInterval on component unmount');
    }
  },
});
