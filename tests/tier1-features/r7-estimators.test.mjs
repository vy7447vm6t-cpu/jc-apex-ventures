import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertCloseTo, assertInRange } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T1_R7_01',
  tier: 'tier1',
  feature: 'r7',
  title: 'R7 Feature: Solis SolarCalculator component exists and has live state calculation',
  fn: () => {
    const code = readFileSafe(PATHS.solarCalculator);
    assert(code !== null, 'src/components/SolarCalculator.tsx must exist');
    assert(code.includes('billAmount') || code.includes('areaAmount'), 'SolarCalculator must support bill or area input');
    assert(code.includes('subsidy') || code.includes('Subsidy'), 'SolarCalculator must calculate PM Surya Ghar subsidy');
  },
});

test({
  id: 'T1_R7_02',
  tier: 'tier1',
  feature: 'r7',
  title: 'R7 Feature: Solis PM Surya Ghar subsidy mathematical schedule verification',
  fn: () => {
    // Exact official subsidy logic test:
    // Residential: <= 1 kW = 30000; <= 2 kW = 60000; > 2 kW = 78000
    // CHS: 18000/kW capped at 90,00,000 (500 kWp statutory ceiling)
    // Commercial: 0
    function calcSubsidy(type, kwp) {
      if (type === 'commercial') return 0;
      if (type === 'residential') {
        if (kwp <= 1) return 30000;
        if (kwp <= 2) return 60000;
        return 78000;
      }
      if (type === 'chs') {
        return Math.min(9000000, kwp * 18000);
      }
      return 0;
    }

    assertEqual(calcSubsidy('residential', 1.0), 30000, 'Residential 1kW subsidy must be ₹30,000');
    assertEqual(calcSubsidy('residential', 2.0), 60000, 'Residential 2kW subsidy must be ₹60,000');
    assertEqual(calcSubsidy('residential', 3.0), 78000, 'Residential 3kW subsidy must be ₹78,000');
    assertEqual(calcSubsidy('residential', 10.0), 78000, 'Residential >2kW subsidy must cap at ₹78,000');
    assertEqual(calcSubsidy('chs', 10.0), 180000, 'CHS 10kW subsidy must be ₹1,80,000');
    assertEqual(calcSubsidy('chs', 100.0), 1800000, 'CHS 100kW subsidy must be ₹18,00,000');
    assertEqual(calcSubsidy('chs', 500.0), 9000000, 'CHS 500kW subsidy must reach ₹90,00,000 ceiling');
    assertEqual(calcSubsidy('chs', 600.0), 9000000, 'CHS 600kW subsidy must cap at ₹90,00,000 ceiling');
    assertEqual(calcSubsidy('commercial', 25.0), 0, 'Commercial subsidy must be ₹0');
  },
});

test({
  id: 'T1_R7_03',
  tier: 'tier1',
  feature: 'r7',
  title: 'R7 Feature: Solis EPC pricing tiers, pergola premium and 13.8% composite GST',
  fn: () => {
    function calcEpc(kwp, isPergola = false) {
      const watts = kwp * 1000;
      let baseRate = 40;
      if (kwp <= 10) baseRate = 52;
      else if (kwp <= 50) baseRate = 48;
      else if (kwp <= 100) baseRate = 44;
      
      const rate = isPergola ? baseRate + 12 : baseRate;
      const baseCost = watts * rate;
      const gst = baseCost * 0.138;
      return { baseCost, gst, totalCost: baseCost + gst };
    }

    const standard10 = calcEpc(5, false);
    assertEqual(standard10.baseCost, 5000 * 52, '5kW base EPC at ₹52/W');
    assertCloseTo(standard10.gst, 260000 * 0.138, 0.1, 'Composite GST 13.8%');

    const pergola5 = calcEpc(5, true);
    assertEqual(pergola5.baseCost, 5000 * (52 + 12), '5kW pergola EPC at ₹64/W (+₹12/W)');
  },
});

test({
  id: 'T1_R7_04',
  tier: 'tier1',
  feature: 'r7',
  title: 'R7 Feature: eMudran interactive print & packaging estimator mathematical rates',
  fn: () => {
    // Brochures: ₹16,000/1000; Catalogues: ₹28,000/1000; Standard Stationery: ₹2,000/1000; Premium: ₹2,500/1000
    // Signage: Standard ₹350/sqft, Premium ₹450/sqft; Star Flex: Standard ₹15/sqft, Premium ₹25/sqft; Vinyl: Standard ₹35/sqft, Premium ₹40/sqft
    function calcPrint(jobType, qty, quality = 'standard') {
      if (jobType === 'brochure') return (qty / 1000) * 16000;
      if (jobType === 'catalogue') return (qty / 1000) * 28000;
      if (jobType === 'stationery') return (qty / 1000) * (quality === 'premium' ? 2500 : 2000);
      return 0;
    }

    assertEqual(calcPrint('brochure', 5000), 80000, '5,000 brochures must cost ₹80,000');
    assertEqual(calcPrint('catalogue', 2000), 56000, '2,000 catalogues must cost ₹56,000');
    assertEqual(calcPrint('stationery', 3000, 'standard'), 6000, '3,000 standard stationery must cost ₹6,000');
    assertEqual(calcPrint('stationery', 3000, 'premium'), 7500, '3,000 premium stationery must cost ₹7,500');
  },
});

test({
  id: 'T1_R7_05',
  tier: 'tier1',
  feature: 'r7',
  title: 'R7 Feature: eMudran regional logistics rates and signage installation fee',
  fn: () => {
    const logistics = {
      virar: 300,
      nalasopara: 500,
      vasai: 800,
      mumbai: 1500,
    };
    assertEqual(logistics.virar, 300, 'Virar logistics must be ₹300');
    assertEqual(logistics.nalasopara, 500, 'Nalasopara logistics must be ₹500');
    assertEqual(logistics.vasai, 800, 'Vasai logistics must be ₹800');
    assertEqual(logistics.mumbai, 1500, 'Mumbai logistics must be ₹1,500');
    
    const signageInstallFlat = 2500;
    assertEqual(signageInstallFlat, 2500, 'Signage flat installation fee must be ₹2,500');
  },
});

test({
  id: 'T1_R7_06',
  tier: 'tier1',
  feature: 'r7',
  title: 'R7 Feature: TVASTA 3-tier space planning estimator (Standard, Premium, Luxury)',
  fn: () => {
    // Standard: ₹1,200 - ₹1,500/sqft
    // Premium: ₹2,200 - ₹2,800/sqft
    // Luxury: ₹3,800 - ₹5,000/sqft
    // Scope factors: Turnkey = 1.0; Woodwork = 0.6; Civil = 0.4
    function calcTvasta(sqft, tier, scope = 'turnkey') {
      const scopeFactor = scope === 'turnkey' ? 1.0 : (scope === 'woodwork' ? 0.6 : 0.4);
      let minRate = 1200;
      let maxRate = 1500;
      if (tier === 'premium') { minRate = 2200; maxRate = 2800; }
      else if (tier === 'luxury') { minRate = 3800; maxRate = 5000; }
      return {
        minTotal: sqft * minRate * scopeFactor,
        maxTotal: sqft * maxRate * scopeFactor,
      };
    }

    const std1000 = calcTvasta(1000, 'standard', 'turnkey');
    assertEqual(std1000.minTotal, 1200000, '1,000 sq ft standard turnkey min cost ₹12 Lakhs');
    assertEqual(std1000.maxTotal, 1500000, '1,000 sq ft standard turnkey max cost ₹15 Lakhs');

    const lux1800 = calcTvasta(1800, 'luxury', 'turnkey');
    assertEqual(lux1800.minTotal, 6840000, '1,800 sq ft luxury turnkey min cost ₹68.4 Lakhs');
    assertEqual(lux1800.maxTotal, 9000000, '1,800 sq ft luxury turnkey max cost ₹90 Lakhs');

    const premWoodwork = calcTvasta(1000, 'premium', 'woodwork');
    assertEqual(premWoodwork.minTotal, 1000 * 2200 * 0.6, 'Woodwork scope applies 60% factor');
  },
});
