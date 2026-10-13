import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes, assertNotIncludes } from '../helpers/assertions.mjs';
import { PATHS, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T1_R4_01',
  tier: 'tier1',
  feature: 'r4',
  title: 'R4 Feature: Hero section in page.tsx omits prominent CIN registration badge',
  fn: () => {
    const home = readFileSafe(PATHS.homePage);
    assert(home !== null, 'src/app/page.tsx must exist');
    // Extract first 150 lines or Hero section of page.tsx
    const heroSlice = home.slice(0, Math.min(home.length, 3000));
    const hasCinInHero = /CIN:\s*U70200MH2023OPC411326/i.test(heroSlice) ||
                         /U70200MH2023OPC411326/i.test(heroSlice);
    assert(!hasCinInHero, 'Hero section in page.tsx must NOT contain prominent CIN registration number');
  },
});

test({
  id: 'T1_R4_02',
  tier: 'tier1',
  feature: 'r4',
  title: 'R4 Feature: Hero section leads with editorial category badge',
  fn: () => {
    const home = readFileSafe(PATHS.homePage);
    assert(home !== null, 'src/app/page.tsx must exist');
    // Must feature editorial category badge mentioning Multi-Disciplinary Engineering & Design Consortium and One International Centre
    const hasEditorialBadge = /Multi-Disciplinary Engineering & Design Consortium/i.test(home) &&
                              /One International Centre/i.test(home);
    assert(hasEditorialBadge, 'Hero section must lead with architectural editorial category badge ("Multi-Disciplinary Engineering & Design Consortium | One International Centre, Mumbai")');
  },
});

test({
  id: 'T1_R4_03',
  tier: 'tier1',
  feature: 'r4',
  title: 'R4 Feature: Subtle footer copyright row contains statutory CIN: U70200MH2023OPC411326',
  fn: () => {
    const footer = readFileSafe(PATHS.footer);
    assert(footer !== null, 'src/components/Footer.tsx must exist');
    const hasCin = /U70200MH2023OPC411326/i.test(footer);
    assert(hasCin, 'Footer.tsx must contain statutory CIN registration U70200MH2023OPC411326 in copyright row');
  },
});

test({
  id: 'T1_R4_04',
  tier: 'tier1',
  feature: 'r4',
  title: 'R4 Feature: Subtle footer row includes MCA Registration & OPC status disclosure',
  fn: () => {
    const footer = readFileSafe(PATHS.footer);
    assert(footer !== null, 'src/components/Footer.tsx must exist');
    const hasMca = /MCA/i.test(footer) || /Ministry of Corporate Affairs/i.test(footer);
    const hasOpc = /OPC/i.test(footer) || /One Person Company/i.test(footer);
    assert(hasMca, 'Footer.tsx must disclose MCA registration status');
    assert(hasOpc, 'Footer.tsx must disclose OPC status');
  },
});

test({
  id: 'T1_R4_05',
  tier: 'tier1',
  feature: 'r4',
  title: 'R4 Feature: Navbar does NOT contain bureaucratic CIN or registration badges',
  fn: () => {
    const navbar = readFileSafe(PATHS.navbar);
    assert(navbar !== null, 'src/components/Navbar.tsx must exist');
    const hasCinInNav = /U70200MH2023OPC411326/i.test(navbar) || /CIN:/i.test(navbar);
    assert(!hasCinInNav, 'Navbar must be clean and not contain bureaucratic CIN disclosures');
  },
});

test({
  id: 'T1_R4_06',
  tier: 'tier1',
  feature: 'r4',
  title: 'R4 Feature: Footer legal text uses muted, non-distracting typography styling',
  fn: () => {
    const footer = readFileSafe(PATHS.footer);
    assert(footer !== null, 'src/components/Footer.tsx must exist');
    // Muted text class: text-xs, text-muted, opacity, or dim color
    const hasMutedStyling = /text-xs/i.test(footer) || /text-\[.*px\]/i.test(footer) || /opacity/i.test(footer) || /text-muted/i.test(footer);
    assert(hasMutedStyling, 'Footer statutory disclosures must be styled in muted/subtle typography');
  },
});
