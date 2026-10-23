import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual } from '../helpers/assertions.mjs';
import { PROJECT_ROOT, SRC_DIR, PATHS, readFileSafe, listDirFiles } from '../helpers/project-paths.mjs';
import fs from 'node:fs';
import path from 'node:path';

test({
  id: 'T2_R10_01',
  tier: 'tier2',
  feature: 'r10',
  title: 'R10 Boundary: Zero disguised literal unicode escape sequences (\\u2014) in string literals',
  fn: () => {
    function checkDirForEscapes(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!['node_modules', '.next', '.git'].includes(entry.name)) {
            checkDirForEscapes(full);
          }
        } else if (/\.(tsx|ts|jsx|js)$/i.test(entry.name)) {
          const content = fs.readFileSync(full, 'utf8');
          assert(
            !content.includes('\\u2014'),
            `Found disguised \\u2014 escape sequence in: ${full}`
          );
        }
      }
    }
    checkDirForEscapes(SRC_DIR);
  },
});

test({
  id: 'T2_R10_02',
  tier: 'tier2',
  feature: 'r10',
  title: 'R2 Boundary: Zero em-dashes in root configuration files (package.json, next.config.ts)',
  fn: () => {
    const pkg = readFileSafe(PATHS.packageJson) || '';
    const nextCfg = readFileSafe(PATHS.nextConfig) || '';
    assert(!pkg.includes('\u2014') && !pkg.includes(' - '), 'package.json must contain zero em-dashes');
    assert(!nextCfg.includes('\u2014') && !nextCfg.includes(' - '), 'next.config.ts must contain zero em-dashes');
  },
});

test({
  id: 'T2_R10_03',
  tier: 'tier2',
  feature: 'r10',
  title: 'R10 Boundary: All images in public/images/ are under 5 MB to prevent payload bloat',
  fn: () => {
    const imagesDir = path.join(PROJECT_ROOT, 'public', 'images');
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      for (const file of files) {
        const full = path.join(imagesDir, file);
        const stat = fs.statSync(full);
        if (stat.isFile() && /\.(jpg|jpeg|png|webp|svg)$/i.test(file)) {
          assert(
            stat.size < 5 * 1024 * 1024,
            `Image asset ${file} exceeds 5 MB limit (${(stat.size / 1024 / 1024).toFixed(2)} MB)`
          );
        }
      }
    }
  },
});

test({
  id: 'T2_R10_04',
  tier: 'tier2',
  feature: 'r10',
  title: 'R10 Boundary: All division dossiers in divisions.ts have non-empty slugs and descriptions',
  fn: () => {
    const content = readFileSafe(PATHS.divisionsContent);
    assert(content !== null, 'src/content/divisions.ts must exist');
    // Ensure divisions array or export exists
    const hasDivisionsExport = /export\s+const\s+divisions/i.test(content) || /export\s+default\s+divisions/i.test(content);
    assert(hasDivisionsExport, 'divisions.ts must export divisions list');
  },
});

test({
  id: 'T2_R10_05',
  tier: 'tier2',
  feature: 'r10',
  title: 'R10 Boundary: Webpack configuration does not disable React strict mode or production optimizations',
  fn: () => {
    const nextConfig = readFileSafe(PATHS.nextConfig) || '';
    assert(
      !nextConfig.includes('reactStrictMode: false'),
      'next.config.ts should not explicitly disable reactStrictMode'
    );
  },
});

test({
  id: 'T2_R10_06',
  tier: 'tier2',
  feature: 'r10',
  title: 'R10 Boundary: Client confidentiality check ensures no private mobile numbers, passwords or named corporate accounts exposed in code',
  fn: () => {
    const content = readFileSafe(PATHS.divisionsContent) || '';
    // Must only contain authorized official contact coordinates
    assert(!content.includes('password'), 'Source content must never contain password strings');
    assert(!content.includes('secret_key'), 'Source content must never contain secret keys');

    // Strict confidentiality: private client names must never be leaked
    const forbiddenClients = ['Taj Mahal Palace', 'The Oberoi', 'Trident BKC', 'Lanxess', 'Tolia Ball', 'Pristo Pipes'];
    for (const client of forbiddenClients) {
      assert(!content.includes(client), `Source content must not leak private client name: ${client}`);
    }
  },
});
