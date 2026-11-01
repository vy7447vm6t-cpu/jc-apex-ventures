import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertMatch, assertIncludes } from '../helpers/assertions.mjs';
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
  title: 'R9 Boundary: Contact API says plainly when email is not set up, instead of reporting a sent message',
  fn: () => {
    const code = readFileSafe(PATHS.apiContact);
    assert(code !== null, 'src/app/api/contact/route.ts must exist');
    // Must handle missing process.env.SMTP_USER without an uncaught crash, and without a false "sent".
    const hasEnvCheck = /process\.env\.SMTP_USER/i.test(code) || /process\.env\.EMAIL_USER/i.test(code) || /!process\.env/i.test(code);
    assert(hasEnvCheck, 'Contact API must check for environment variables');
    assert(/mode: 'not-configured'/.test(code) && /status: 503/.test(code), 'Contact API must answer 503 when email is not set up');
    assert(!/simulated/i.test(code), 'Contact API must not report an unsent enquiry as sent');
  },
});

test({
  id: 'T2_R9_04',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: The enquiry form encodes special characters in its email and WhatsApp links',
  fn: () => {
    const code = readFileSafe(PATHS.siteEnquiryForm);
    assert(code !== null, 'src/components/SiteEnquiryForm.tsx must exist');
    assert((code.match(/encodeURIComponent/g) || []).length >= 3, 'Subject, body and WhatsApp text must all be encoded');
  },
});

test({
  id: 'T2_R9_05',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: The grievance page states no fee and follows the CGRF and Ombudsman route',
  fn: () => {
    const code = readFileSafe(PATHS.servicePages) ?? '';
    const block = code.slice(code.indexOf('export const grievancesPage'), code.indexOf('export const spacePlanningPage'));
    assert(block.length > 0, 'service-pages.ts must define grievancesPage');
    assert(!/₹\s*50\b|Rs\.?\s*50\b|fee of/i.test(block), 'No fee is stated: none is in the Sanyog profile');
    assertIncludes(block, 'Consumer Grievance Redressal Forum', 'The CGRF is named');
    assertIncludes(block, 'Electricity Ombudsman', 'The appeal route is named');
  },
});

test({
  id: 'T2_R9_06',
  tier: 'tier2',
  feature: 'r9',
  title: 'R9 Boundary: Agrim says plainly, in several places, that it does not lend',
  fn: () => {
    const code = readFileSafe(PATHS.divisionsContent) || '';
    const agrim = code.slice(code.indexOf("slug: 'agrim'"));
    assert(agrim.includes('Agrim does not lend money'), 'Agrim must state that it does not lend money');
    assert(agrim.includes('Agrim does not approve, guarantee or promise any loan'), 'Agrim must state that it does not approve or guarantee loans');
    assert(agrim.includes("q: 'Does Agrim lend money?'"), 'Agrim must answer the lending question directly');
  },
});
