import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R9_01',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: Contact API route (/api/contact) validates email address syntax',
  fn: () => {
    const code = readFileSafe(PATHS.apiContact);
    assert(code !== null, 'src/app/api/contact/route.ts must exist');
    // Regex for email validation
    const hasEmailCheck = /email/i.test(code) && (/@/.test(code) || /includes\(['"]@['"]\)/.test(code) || /test\([^)]*email/i.test(code));
    assert(hasEmailCheck, 'Contact API route must perform email syntax validation');
  },
});

test({
  id: 'T2_R9_02',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: Contact API route returns 400 status for missing required fields',
  fn: () => {
    const code = readFileSafe(PATHS.apiContact);
    assert(code !== null, 'src/app/api/contact/route.ts must exist');
    const hasStatus400 = /status:\s*400/i.test(code) || /NextResponse\.json\([^,]+,\s*\{\s*status:\s*400\s*\}\)/i.test(code);
    assert(hasStatus400, 'Contact API route must return 400 status when payload validation fails');
  },
});

test({
  id: 'T2_R9_03',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: Contact API route provides safe simulated mode when SMTP env vars unset',
  fn: () => {
    const code = readFileSafe(PATHS.apiContact);
    assert(code !== null, 'src/app/api/contact/route.ts must exist');
    // Must handle missing process.env.SMTP_USER without uncaught crash
    const hasEnvCheck = /process\.env\.SMTP_USER/i.test(code) || /process\.env\.EMAIL_USER/i.test(code) || /!process\.env/i.test(code);
    const hasSimulatedMode = /simulated/i.test(code) || /status:\s*200/i.test(code);
    assert(hasEnvCheck, 'Contact API must check for environment variables');
    assert(hasSimulatedMode, 'Contact API must provide safe simulated fallback instead of throwing unhandled 500 error');
  },
});

test({
  id: 'T2_R9_04',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: EnquiryForm encodes special characters in mailto URI query string',
  fn: () => {
    const code = readFileSafe(PATHS.enquiryForm);
    assert(code !== null, 'src/components/EnquiryForm.tsx must exist');
    const hasEncoding = /encodeURIComponent/i.test(code);
    assert(hasEncoding, 'EnquiryForm must use encodeURIComponent when building mailto: link parameters');
  },
});

test({
  id: 'T2_R9_05',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: Electricity grievance dossier enforces exact nominal ₹50 administrative intake fee',
  fn: () => {
    const code = readFileSafe(PATHS.routeGrievances);
    assert(code !== null, 'src/app/electricity-grievances/page.tsx must exist');
    const hasFee50 = /₹\s*50\b/i.test(code) || /Rs\.?\s*50\b/i.test(code) || /50\s*(?:consultation|fee|nominal)/i.test(code);
    assert(hasFee50, 'Electricity grievance page must state exact nominal fee of ₹50');
  },
});

test({
  id: 'T2_R9_06',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: AGRIM project finance dossier includes prominent non-lender disclaimer',
  fn: () => {
    const code = readFileSafe(PATHS.routeAgrim);
    assert(code !== null, 'src/app/agrim/page.tsx must exist');
    const hasDisclaimer = /not a lender/i.test(code) || /not an NBFC/i.test(code) || /financial advisory/i.test(code) || /facilitation/i.test(code) || /disclaimer/i.test(code);
    assert(hasDisclaimer, 'AGRIM dossier must include explicit non-lender / financial advisory disclaimer');
  },
});
