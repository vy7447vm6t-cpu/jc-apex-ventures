import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertNotMatch, assertNotIncludes } from '../helpers/assertions.mjs';
import { PROJECT_ROOT, SRC_DIR, PATHS, readFileSafe, listDirFiles } from '../helpers/project-paths.mjs';
import fs from 'node:fs';
import path from 'node:path';

function scanDirForEmDash(dir, violations = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        scanDirForEmDash(fullPath, violations);
      }
    } else if (/\.(tsx|ts|jsx|js|css|json|md)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('\u2014')) {
        violations.push({ file: fullPath, match: 'em-dash (\\u2014)' });
      }
      if (/&mdash;/i.test(content) || /&#8212;/i.test(content)) {
        violations.push({ file: fullPath, match: 'HTML entity mdash' });
      }
    }
  }
  return violations;
}

test({
  id: 'T1_R10_01',
  tier: 'tier1',
  feature: 'r10',
  title: 'R10 Feature: Strictly ZERO em-dashes (\\u2014) across entire src/ directory',
  fn: () => {
    const violations = scanDirForEmDash(SRC_DIR);
    assert(
      violations.length === 0,
      `Strict zero em-dash constraint violated! Found in: ${violations.map(v => v.file).join(', ')}`
    );
  },
});

test({
  id: 'T1_R10_02',
  tier: 'tier1',
  feature: 'r10',
  title: 'R10 Feature: Strictly ZERO em-dash HTML entities (&mdash;, &#8212;) in src/',
  fn: () => {
    const violations = [];
    scanDirForEmDash(SRC_DIR, violations);
    const htmlEntityViolations = violations.filter(v => v.match.includes('entity'));
    assert(
      htmlEntityViolations.length === 0,
      `Found forbidden HTML entity mdash in: ${htmlEntityViolations.map(v => v.file).join(', ')}`
    );
  },
});

test({
  id: 'T1_R10_03',
  tier: 'tier1',
  feature: 'r10',
  title: 'R10 Feature: Website photographs are licensed, credited and on disk',
  fn: () => {
    const photos = readFileSafe(path.join(SRC_DIR, 'content', 'photos.ts'));
    assert(photos !== null, 'src/content/photos.ts must exist');
    const entries = [...photos.matchAll(/src: '(\/images\/licensed\/[^']+)'.*?license: '([^']+)', source: '([^']+)'/g)];
    assert(entries.length >= 10, 'photos.ts must list the licensed photographs');
    for (const [, src, license, source] of entries) {
      assert(fs.existsSync(path.join(PROJECT_ROOT, 'public', src.slice(1))), `${src} must exist in public/`);
      assert(/^(CC0|CC BY [\d.]+|Public domain)$/.test(license), `${src} must be CC0, CC BY or public domain (no CC BY-SA), found ${license}`);
      assert(source.startsWith('https://'), `${src} must record its source URL`);
    }
    const credits = readFileSafe(path.join(PROJECT_ROOT, 'public', 'images', 'CREDITS.md')) || '';
    for (const [, src] of entries) assert(credits.includes(src.replace('/images/', '')), `CREDITS.md must list ${src}`);
  },
});

test({
  id: 'T1_R10_04',
  tier: 'tier1',
  feature: 'r10',
  title: 'R10 Feature: Strict prohibition of external AI stock image CDNs in codebase',
  fn: () => {
    const content = readFileSafe(PATHS.divisionsContent) || '';
    const forbiddenDomains = ['unsplash.com', 'pexels.com', 'midjourney.com', 'stock.adobe.com', 'shutterstock.com'];
    for (const domain of forbiddenDomains) {
      assert(
        !content.includes(domain),
        `Prohibited external stock/AI image domain found in divisions data: ${domain}`
      );
    }
  },
});

test({
  id: 'T1_R10_05',
  tier: 'tier1',
  feature: 'r10',
  title: 'R10 Feature: Division pages show no facts still marked "Confirm" in the proof register',
  fn: () => {
    const content = readFileSafe(PATHS.divisionsContent) || '';
    for (const claim of ['Chennai Metro', '4,800 sq ft', 'STC', 'patent', 'MPCB', '3,900', 'Class-A', '140+']) {
      assert(!content.includes(claim), `"${claim}" is unconfirmed or do-not-use (brand guidelines 6)`);
    }
  },
});

test({
  id: 'T1_R10_06',
  tier: 'tier1',
  feature: 'r10',
  title: 'R10 Feature: Production webpack build configuration exists in next.config.ts',
  fn: () => {
    const config = readFileSafe(PATHS.nextConfig);
    assert(config !== null, 'next.config.ts must exist');
    assert(config.includes('NextConfig') || config.includes('nextConfig'), 'next.config.ts must define valid NextConfig');
  },
});
