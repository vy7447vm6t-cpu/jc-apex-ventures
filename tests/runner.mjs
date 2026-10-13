#!/usr/bin/env node

import { registry } from './helpers/test-context.mjs';
import { colors } from './helpers/assertions.mjs';

// Import all Tier 1 test modules
import './tier1-features/r1-dark-theme.test.mjs';
import './tier1-features/r2-brand-logos.test.mjs';
import './tier1-features/r3-typography.test.mjs';
import './tier1-features/r4-cin-badge.test.mjs';
import './tier1-features/r5-floating-nav.test.mjs';
import './tier1-features/r6-monograph-hero.test.mjs';
import './tier1-features/r7-estimators.test.mjs';
import './tier1-features/r8-clippy-lightbox.test.mjs';
import './tier1-features/r9-division-routes.test.mjs';
import './tier1-features/r10-constraints.test.mjs';

// Import all Tier 2 test modules
import './tier2-boundaries/r1-theme-bounds.test.mjs';
import './tier2-boundaries/r2-logo-bounds.test.mjs';
import './tier2-boundaries/r3-font-bounds.test.mjs';
import './tier2-boundaries/r4-cin-bounds.test.mjs';
import './tier2-boundaries/r5-nav-bounds.test.mjs';
import './tier2-boundaries/r6-monograph-bounds.test.mjs';
import './tier2-boundaries/r7-estimator-bounds.test.mjs';
import './tier2-boundaries/r8-clippy-bounds.test.mjs';
import './tier2-boundaries/r9-routing-bounds.test.mjs';
import './tier2-boundaries/r10-constraint-bounds.test.mjs';

// Import Tier 3 & Tier 4 modules
import './tier3-combinations/cross-feature.test.mjs';
import './tier4-scenarios/customer-workflows.test.mjs';

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    tier: null,
    feature: null,
    keyword: null,
    json: false,
    verbose: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tier' && args[i + 1]) {
      options.tier = args[++i];
    } else if (args[i] === '--feature' && args[i + 1]) {
      options.feature = args[++i];
    } else if (args[i] === '--keyword' && args[i + 1]) {
      options.keyword = args[++i];
    } else if (args[i] === '--json') {
      options.json = true;
    } else if (args[i] === '--verbose' || args[i] === '-v') {
      options.verbose = true;
    }
  }
  return options;
}

async function run() {
  const options = parseArgs();
  const testsToRun = registry.filter(options);

  if (!options.json) {
    console.log(`\n${colors.bold}${colors.cyan}========================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}  JC APEX VENTURES  -  4-TIER E2E TEST RUNNER${colors.reset}`);
    console.log(`${colors.cyan}========================================================================${colors.reset}`);
    console.log(`${colors.dim}Total Registered Tests: ${registry.getTests().length} | Selected: ${testsToRun.length}${colors.reset}\n`);
  }

  const results = {
    total: testsToRun.length,
    passed: 0,
    failed: 0,
    skipped: 0,
    durationMs: 0,
    byTier: {
      tier1: { total: 0, passed: 0, failed: 0 },
      tier2: { total: 0, passed: 0, failed: 0 },
      tier3: { total: 0, passed: 0, failed: 0 },
      tier4: { total: 0, passed: 0, failed: 0 },
      other: { total: 0, passed: 0, failed: 0 },
    },
    tests: [],
  };

  const startTime = performance.now();
  let currentTier = null;

  for (const t of testsToRun) {
    const tierKey = results.byTier[t.tier] ? t.tier : 'other';
    results.byTier[tierKey].total++;

    if (!options.json && currentTier !== t.tier) {
      currentTier = t.tier;
      console.log(`${colors.bold}${colors.magenta}▶ [${t.tier.toUpperCase()}]${colors.reset}`);
    }

    const testStart = performance.now();
    let status = 'PASSED';
    let error = null;

    try {
      await t.fn();
      results.passed++;
      results.byTier[tierKey].passed++;
    } catch (err) {
      status = 'FAILED';
      error = {
        message: err.message,
        actual: err.actual,
        expected: err.expected,
        stack: err.stack,
      };
      results.failed++;
      results.byTier[tierKey].failed++;
    }
    const duration = +(performance.now() - testStart).toFixed(2);

    results.tests.push({
      id: t.id,
      tier: t.tier,
      feature: t.feature,
      title: t.title,
      status,
      durationMs: duration,
      error,
    });

    if (!options.json) {
      const icon = status === 'PASSED' ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`;
      console.log(`  ${icon} ${colors.bold}[${t.id}]${colors.reset} ${t.title} ${colors.dim}(${duration}ms)${colors.reset}`);
      if (status === 'FAILED') {
        console.log(`      ${colors.red}Error:${colors.reset} ${error.message}`);
        if (options.verbose && error.stack) {
          console.log(`      ${colors.dim}${error.stack.split('\n').slice(1, 4).join('\n      ')}${colors.reset}`);
        }
      }
    }
  }

  results.durationMs = +(performance.now() - startTime).toFixed(2);

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log(`\n${colors.bold}${colors.cyan}========================================================================${colors.reset}`);
    console.log(`${colors.bold}  SUMMARY REPORT${colors.reset}`);
    console.log(`${colors.cyan}========================================================================${colors.reset}`);

    const tierRows = [
      ['Tier 1: Feature Coverage (R1-R10)', results.byTier.tier1],
      ['Tier 2: Boundary & Corner Cases', results.byTier.tier2],
      ['Tier 3: Cross-Feature Interactions', results.byTier.tier3],
      ['Tier 4: Real-World Workflows', results.byTier.tier4],
    ];

    for (const [name, stats] of tierRows) {
      if (stats.total > 0) {
        const passPercent = ((stats.passed / stats.total) * 100).toFixed(1);
        const color = stats.failed === 0 ? colors.green : colors.yellow;
        console.log(`  ${name.padEnd(38)} : ${color}${stats.passed}/${stats.total} passed (${passPercent}%)${colors.reset}`);
      }
    }

    console.log(`${colors.dim}------------------------------------------------------------------------${colors.reset}`);
    const overallRate = results.total > 0 ? ((results.passed / results.total) * 100).toFixed(1) : 0;
    const finalColor = results.failed === 0 ? `${colors.bold}${colors.green}` : `${colors.bold}${colors.red}`;
    console.log(`  ${colors.bold}Grand Total${colors.reset}                            : ${finalColor}${results.passed}/${results.total} passed (${overallRate}%)${colors.reset} in ${results.durationMs}ms\n`);

    if (results.failed > 0) {
      console.log(`${colors.bold}${colors.yellow}Pending Implementation Features (${results.failed} failing tests):${colors.reset}`);
      const failedTests = results.tests.filter(t => t.status === 'FAILED');
      for (const ft of failedTests.slice(0, 15)) {
        console.log(`  • [${ft.id}] ${ft.title}`);
        console.log(`    ↳ ${colors.dim}${ft.error.message}${colors.reset}`);
      }
      if (failedTests.length > 15) {
        console.log(`    ... and ${failedTests.length - 15} more.`);
      }
      console.log('');
    }
  }

  process.exit(results.failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(2);
});
