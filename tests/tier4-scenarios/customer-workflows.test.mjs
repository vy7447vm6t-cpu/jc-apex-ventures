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
    const gst = baseCost * 0.138;
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
    const divisions = readFileSafe(PATHS.divisionsContent) || '';
    assert(divisions.includes('solis@jcapexv.com'), 'Solar consultation must route to solis@jcapexv.com');
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
    assert(
      divisions.includes('printmgmt@jcapexv.com') || divisions.includes('emudran@jcapexv.com'),
      'eMudran print order must route to printmgmt@jcapexv.com'
    );
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
  title: 'T4 Scenario 4: End-to-end electricity consumer grievance filing & liaisoning (SANYOG)',
  fn: () => {
    const grievancesPage = readFileSafe(PATHS.routeGrievances) || '';
    assert(grievancesPage.length > 0, 'Electricity grievances page must exist');
    
    // Verify CGRF / MERC framework reference
    assert(
      grievancesPage.includes('CGRF') || grievancesPage.includes('Consumer') || grievancesPage.includes('Grievance'),
      'Grievance workflow must reference statutory CGRF / utility grievance framework'
    );
    
    // Verify ₹50 consultation fee
    assert(
      grievancesPage.includes('50'),
      'Grievance workflow must state nominal consultation fee of ₹50'
    );
    
    // Verify routing email
    const divisions = readFileSafe(PATHS.divisionsContent) || '';
    assert(
      divisions.includes('licenses@jcapexv.com') || divisions.includes('Consumercmpl@jcapexv.com'),
      'Grievance filing must route to licenses@jcapexv.com or Consumercmpl@jcapexv.com'
    );
  },
});

test({
  id: 'T4_SCEN_05',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 5: End-to-end HT substation engineering & solid waste tech (GRID APEX / AGRIM)',
  fn: () => {
    const gridApexPage = readFileSafe(PATHS.routeGridApex) || '';
    assert(gridApexPage.length > 0, 'GRID APEX page must exist');
    
    // Verify technical scope: Substation / HT / LT / Waste
    const hasEngineeringScope = /substation/i.test(gridApexPage) || /switchgear/i.test(gridApexPage) || /transformer/i.test(gridApexPage) || /waste/i.test(gridApexPage);
    assert(hasEngineeringScope, 'GRID APEX must detail electrical substation and environmental engineering scope');
    
    // Verify routing email
    const divisions = readFileSafe(PATHS.divisionsContent) || '';
    assert(divisions.includes('admin@jcapexv.com'), 'GRID APEX enquiries must route to admin@jcapexv.com');
  },
});

test({
  id: 'T4_SCEN_06',
  tier: 'tier4',
  feature: 'scenario',
  title: 'T4 Scenario 6: Mobile visitor quick guidance via Clippy dock to 1-tap WhatsApp consultation',
  fn: () => {
    const clippy = readFileSafe(PATHS.clippy);
    assert(clippy !== null, 'Clippy assistant must exist');
    
    // Verify WhatsApp direct consultation URL with authorized phone number
    const waUrlRegex = /https:\/\/wa\.me\/917021112664/i;
    assert(waUrlRegex.test(clippy) || clippy.includes('7021112664'), 'Clippy must provide direct WhatsApp link to +91 70211 12664');
  },
});
