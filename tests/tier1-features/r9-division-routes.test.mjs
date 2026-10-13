import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T1_R9_01',
  tier: 'tier1',
  feature: 'r9',
  title: 'R9 Feature: All 6 primary division route page files exist in src/app/',
  fn: () => {
    assert(fileExists(PATHS.routeSolis), '/solis/page.tsx must exist');
    assert(fileExists(PATHS.routeSanyog), '/sanyog/page.tsx must exist');
    assert(fileExists(PATHS.routeGridApex), '/grid-apex/page.tsx must exist');
    assert(fileExists(PATHS.routeTvasta), '/tvasta/page.tsx must exist');
    assert(fileExists(PATHS.routeEmudran), '/emudran/page.tsx must exist');
    assert(fileExists(PATHS.routeAgrim), '/agrim/page.tsx must exist');
  },
});

test({
  id: 'T1_R9_02',
  tier: 'tier1',
  feature: 'r9',
  title: 'R9 Feature: All 4 specialized sub-route page files exist in src/app/',
  fn: () => {
    assert(fileExists(PATHS.routeGrievances), '/electricity-grievances/page.tsx must exist');
    assert(fileExists(PATHS.routeLicenses), '/licenses/page.tsx must exist');
    assert(fileExists(PATHS.routePrintMgmt), '/print-management/page.tsx must exist');
    assert(fileExists(PATHS.routeSpacePlanning), '/space-planning/page.tsx must exist');
  },
});

test({
  id: 'T1_R9_03',
  tier: 'tier1',
  feature: 'r9',
  title: 'R9 Feature: Intelligent email routing matrix in divisions data / forms',
  fn: () => {
    const data = readFileSafe(PATHS.divisionsContent) || '';
    const formCode = readFileSafe(PATHS.enquiryForm) || '';
    const combined = data + ' ' + formCode;

    // Homepage / general: admin@jcapexv.com
    assert(/admin@jcapexv\.com/i.test(combined), 'Must route general enquiries to admin@jcapexv.com');
    // eMudran: printmgmt@jcapexv.com or emudran@jcapexv.com
    assert(/printmgmt@jcapexv\.com/i.test(combined) || /emudran@jcapexv\.com/i.test(combined), 'Must route eMudran enquiries to printmgmt@jcapexv.com');
    // TVASTA: spacemgmt@jcapexv.com
    assert(/spacemgmt@jcapexv\.com/i.test(combined), 'Must route TVASTA enquiries to spacemgmt@jcapexv.com');
    // Solis: solis@jcapexv.com
    assert(/solis@jcapexv\.com/i.test(combined), 'Must route Solis enquiries to solis@jcapexv.com');
    // Sanyog: licenses@jcapexv.com or Consumercmpl@jcapexv.com
    assert(/licenses@jcapexv\.com/i.test(combined) || /consumercmpl@jcapexv\.com/i.test(combined), 'Must route Sanyog enquiries to licenses@jcapexv.com or Consumercmpl@jcapexv.com');
  },
});

test({
  id: 'T1_R9_04',
  tier: 'tier1',
  feature: 'r9',
  title: 'R9 Feature: EnquiryForm component handles division tailoring & mailto fallback',
  fn: () => {
    const code = readFileSafe(PATHS.enquiryForm);
    assert(code !== null, 'src/components/EnquiryForm.tsx must exist');
    // Must feature division selection or props and mailto: fallback
    const hasDivisionLogic = /division/i.test(code);
    const hasMailto = /mailto:/i.test(code);
    assert(hasDivisionLogic, 'EnquiryForm must tailor fields by division');
    assert(hasMailto, 'EnquiryForm must include mailto fallback for direct client mail dispatch');
  },
});

test({
  id: 'T1_R9_05',
  tier: 'tier1',
  feature: 'r9',
  title: 'R9 Feature: Contact API endpoint (/api/contact) implements POST route handler',
  fn: () => {
    const code = readFileSafe(PATHS.apiContact);
    assert(code !== null, 'src/app/api/contact/route.ts must exist');
    const hasPostHandler = /export\s+async\s+function\s+POST/i.test(code);
    assert(hasPostHandler, '/api/contact/route.ts must export async function POST');
  },
});

test({
  id: 'T1_R9_06',
  tier: 'tier1',
  feature: 'r9',
  title: 'R9 Feature: 1-tap WhatsApp consultation link available across division touchpoints',
  fn: () => {
    const data = readFileSafe(PATHS.divisionsContent) || '';
    const formCode = readFileSafe(PATHS.enquiryForm) || '';
    const navCode = readFileSafe(PATHS.navbar) || '';
    const clippyCode = readFileSafe(PATHS.clippy) || '';
    const all = data + ' ' + formCode + ' ' + navCode + ' ' + clippyCode;
    const hasWhatsApp = /wa\.me/i.test(all) || /whatsapp/i.test(all);
    assert(hasWhatsApp, 'Platform must integrate 1-tap WhatsApp consultation touchpoints (wa.me)');
  },
});
