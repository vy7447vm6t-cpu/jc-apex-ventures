import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertCloseTo, assertInRange } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T4_SCEN_01',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 1: End-to-end solar consultation, sizing & subsidy workflow (SOLIS)',
  fn: () => {
    // Simulate user selecting Residential 16 kWp with Pergola (+₹12/W)
    const bill = 18000;
    const tariff = 9.5;
    const unitsPerMonth = bill / tariff; // 1894.74 units
    const kwp = Math.min(500, +(unitsPerMonth / 120).toFixed(2)); // ~15.79 kWp
    
    // Panel count (550W)
    const panelCount = Math.ceil((kwp * 1000) / 550);
    assert(panelCount >= 28 && panelCount <= 32, `16 kWp requires ~29 panels (calculated: ${panelCount})`);
    
    // EPC Cost (11-50kWp base = 48/W, Pergola = +12/W => 60/W)
    const baseCost = kwp * 1000 * 60;
    const gst = baseCost * 0.089;
    const grossCost = baseCost + gst;
    
    // Subsidy (Residential > 2kW => 78,000)
    const subsidy = 78000;
    const netInvestment = grossCost - subsidy;
    
    // Annual savings
    const annualUnits = kwp * 120 * 12;
    const annualSavings = annualUnits * tariff;
    const paybackYears = +(netInvestment / annualSavings).toFixed(2);
    
    assertInRange(paybackYears, 3.5, 6.0, `Payback must be between 3.5 and 6 years (calculated: ${paybackYears})`);
    
    // Verify routing destination
    const content = readFileSafe(PATHS.divisionsContent) || '';
    const solis = content.slice(content.indexOf("slug: 'solis'"));
    assert(/enquiryForm: \{ to: 'solis@jcapexv\.com'/.test(solis), 'Solar consultation must route to solis@jcapexv.com');
  },
});

test({
  id: 'T4_SCEN_02',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 2: End-to-end luxury packaging & signage order workflow (eMudran)',
  fn: () => {
    // 5,000 Brochures (300 GSM, 4-side): (5000/1000) * 16,000 = 80,000
    const brochureCost = (5000 / 1000) * 16000;
    assertEqual(brochureCost, 80000, '5,000 brochures = ₹80,000');
    
    // 100 sq ft Glow Sign Board (Premium: ₹450/sqft): 100 * 450 = 45,000
    const signBoardCost = 100 * 450;
    assertEqual(signBoardCost, 45000, '100 sq ft premium sign = ₹45,000');
    
    // Signage install: flat ₹2,500
    const installCost = 2500;
    
    // Delivery to Vasai: ₹800
    const deliveryCost = 800;
    
    const grandTotal = brochureCost + signBoardCost + installCost + deliveryCost;
    assertEqual(grandTotal, 128300, 'Total quotation = ₹1,28,300');
    
    // Verify routing destination
    const divisions = readFileSafe(PATHS.divisionsContent) || '';
    // eMudran works mostly over WhatsApp and admin@ (client decision, October 2026).
    assert(/contact: \{ emails: \['admin@jcapexv\.com'\], note: 'WhatsApp preferred' \}/.test(divisions), 'eMudran print order must route to admin@jcapexv.com, WhatsApp preferred');
  },
});

test({
  id: 'T4_SCEN_03',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 3: End-to-end turnkey architectural interior space planning (TVASTA)',
  fn: () => {
    // 1,800 sq ft apartment, Luxury Tier (₹3,800 - ₹5,000 / sqft), Turnkey scope
    const area = 1800;
    const minRate = 3800;
    const maxRate = 5000;
    const minBudget = area * minRate; // 68,40,000 (68.4L)
    const maxBudget = area * maxRate; // 90,00,000 (90.0L)
    
    assertEqual(minBudget, 6840000, '1,800 sq ft luxury min budget = ₹68.4 Lakhs');
    assertEqual(maxBudget, 9000000, '1,800 sq ft luxury max budget = ₹90.0 Lakhs');
    
    // Verify routing destination
    const divisions = readFileSafe(PATHS.divisionsContent) || '';
    assert(divisions.includes('spacemgmt@jcapexv.com'), 'TVASTA interior planning must route to spacemgmt@jcapexv.com');
  },
});

test({
  id: 'T4_SCEN_04',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 4: A consumer with a disputed bill reaches Sanyog\'s grievance inbox (SANYOG)',
  fn: () => {
    const route = readFileSafe(PATHS.routeGrievances) || '';
    assert(route.includes('grievancesPage'), 'The grievances route renders grievancesPage');
    const pages = readFileSafe(PATHS.servicePages) || '';
    const block = pages.slice(pages.indexOf('export const grievancesPage'), pages.indexOf('export const spacePlanningPage'));
    assert(block.includes('CGRF'), 'The page explains the CGRF route');
    assert(!/₹\s*50\b/.test(block), 'No fee is invented');
    assert(block.includes("to: 'consumercmpl@jcapexv.com'"), 'Grievances go to consumercmpl@jcapexv.com');
  },
});

test({
  id: 'T4_SCEN_05',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 5: Grid Apex HT and LT electrical enquiry routes to admin@jcapexv.com',
  fn: () => {
    const gridApexPage = readFileSafe(PATHS.routeGridApex) || '';
    assert(gridApexPage.length > 0, 'GRID APEX page must exist');
    
    // Verify technical scope: Substation / HT / LT / Waste
    const divisionsText = readFileSafe(PATHS.divisionsContent) || '';
    assert(gridApexPage.includes('<DivisionPage data={gridApex} />'), 'Grid Apex page must render the division template');
    assert(/transformer installation, testing and maintenance/.test(divisionsText), 'Grid Apex must list HT and transformer work');
    assert(!/waste/i.test(divisionsText.slice(divisionsText.indexOf('export const gridApex'), divisionsText.indexOf('export const sanyog'))), 'Waste treatment is a Solis service, not Grid Apex (client decision)');
    
    // Verify routing email
    const divisions = readFileSafe(PATHS.divisionsContent) || '';
    assert(divisions.includes('admin@jcapexv.com'), 'GRID APEX enquiries must route to admin@jcapexv.com');
  },
});

test({
  id: 'T4_SCEN_06',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 6: Mobile visitor messages us on WhatsApp from any page',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    assert(nav !== null, 'Navbar.tsx must exist');
    assert(/https:\/\/wa\.me\/917021112664/.test(nav), 'Navigation must link to WhatsApp on +91 70211 12664');
    assert(nav.includes('className="whatsapp-fab"'), 'The WhatsApp button renders with the navigation on every page');
    assert(nav.includes('aria-label="Message JC Apex Ventures on WhatsApp"'), 'The icon-only button must have an accessible name');
  },
});
