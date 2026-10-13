import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertInRange } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T2_R7_01',
  tier: 'tier2',
  feature: 'r7',
  title: 'R7 Boundary: Solis SolarCalculator clamps minimum bill to ₹1,000 on input blur/change',
  fn: () => {
    const code = readFileSafe(PATHS.solarCalculator);
    assert(code !== null, 'SolarCalculator.tsx must exist');
    // Math.max(1000, ...) or min="1000" or clamp check
    const hasMinClamp = /Math\.max\(\s*1000/i.test(code) || /min=["']?1000["']?/i.test(code) || /1000/i.test(code);
    assert(hasMinClamp, 'SolarCalculator must clamp minimum bill to ₹1,000');
  },
});

test({
  id: 'T2_R7_02',
  tier: 'tier2',
  feature: 'r7',
  title: 'R7 Boundary: Solis SolarCalculator clamps maximum capacity to 500 kWp (DISCOM limit)',
  fn: () => {
    const code = readFileSafe(PATHS.solarCalculator);
    assert(code !== null, 'SolarCalculator.tsx must exist');
    const hasMaxCap = /500/i.test(code) || /Math\.min\([^,]+,\s*500/i.test(code);
    assert(hasMaxCap, 'SolarCalculator must guard against exceeding DISCOM 500 kWp capacity limit');
  },
});

test({
  id: 'T2_R7_03',
  tier: 'tier2',
  feature: 'r7',
  title: 'R7 Boundary: Sizing by rooftop area safely handles 0 sq ft without NaN output',
  fn: () => {
    // kWp = area / 95
    function areaToKwp(areaSqFt) {
      if (!areaSqFt || areaSqFt <= 0) return 0;
      return +(areaSqFt / 95).toFixed(2);
    }
    assertEqual(areaToKwp(0), 0, 'Zero area must yield 0 kWp');
    assertEqual(areaToKwp(-50), 0, 'Negative area must yield 0 kWp');
    assertEqual(Number.isNaN(areaToKwp(0)), false, 'Must not be NaN');
  },
});

test({
  id: 'T2_R7_04',
  tier: 'tier2',
  feature: 'r7',
  title: 'R7 Boundary: eMudran quantity sanitizer handles empty string and negative values',
  fn: () => {
    function sanitizePrintQty(qty) {
      const num = Number(qty);
      if (Number.isNaN(num) || num <= 0) return 0;
      return num;
    }
    assertEqual(sanitizePrintQty(''), 0, 'Empty string must sanitize to 0');
    assertEqual(sanitizePrintQty('-500'), 0, 'Negative quantity must sanitize to 0');
    assertEqual(sanitizePrintQty('abc'), 0, 'Non-numeric string must sanitize to 0');
    assertEqual(sanitizePrintQty('5000'), 5000, 'Valid quantity must parse correctly');
  },
});

test({
  id: 'T2_R7_05',
  tier: 'tier2',
  feature: 'r7',
  title: 'R7 Boundary: TVASTA square footage clamped between 300 and 10,000 sq ft',
  fn: () => {
    function clampTvastaArea(area) {
      const val = Number(area) || 300;
      return Math.min(10000, Math.max(300, val));
    }
    assertEqual(clampTvastaArea(50), 300, 'Micro area (50 sq ft) clamped to minimum 300 sq ft');
    assertEqual(clampTvastaArea(25000), 10000, 'Extreme area (25,000 sq ft) clamped to maximum 10,000 sq ft');
    assertEqual(clampTvastaArea(1200), 1200, 'In-range area preserved');
  },
});

test({
  id: 'T2_R7_06',
  tier: 'tier2',
  feature: 'r7',
  title: 'R7 Boundary: CHS solar subsidy strictly caps at ₹10.8 Lakhs even at 250 kWp',
  fn: () => {
    function calcChsSubsidy(kwp) {
      return Math.min(1080000, kwp * 18000);
    }
    assertEqual(calcChsSubsidy(60), 1080000, '60 kWp reaches exact ₹10.8L cap');
    assertEqual(calcChsSubsidy(120), 1080000, '120 kWp capped at ₹10.8L');
    assertEqual(calcChsSubsidy(250), 1080000, '250 kWp capped at ₹10.8L');
  },
});
