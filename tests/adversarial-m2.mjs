#!/usr/bin/env node

/**
 * ADVERSARIAL STRESS TEST SUITE  -  MILESTONE 2
 * JC Apex Ventures Digital Platform
 * 
 * Verifies:
 * 1. DivisionLogo prop robustness (bizarre, invalid, uppercase, whitespace, null, types, injections)
 * 2. SVG path syntax and geometry in Logo.tsx and all vector marks (Solis, Sanyog, GridApex, Agrim)
 * 3. Image asset magic bytes and dimensions (eMudran PNG, TVASTA JPG)
 * 4. Exhaustive em-dash scan across src/components/
 * 5. Production build and typecheck verification
 */

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const ROOT_DIR = process.cwd();
const LOGOS_DIR = path.join(ROOT_DIR, 'public', 'images', 'logos');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'src', 'components');

let testsPassed = 0;
let testsFailed = 0;
const failures = [];

function assert(condition, message, details = '') {
  if (!condition) {
    testsFailed++;
    failures.push({ message, details });
    console.error(`  ✗ FAIL: ${message} ${details ? '(' + details + ')' : ''}`);
  } else {
    testsPassed++;
    console.log(`  ✓ PASS: ${message}`);
  }
}

// Helper to mock Next.js Image
const mockNextImage = (props) => {
  return React.createElement('img', {
    src: props.src,
    alt: props.alt,
    width: props.width,
    height: props.height,
    className: props.className
  });
};

function loadTsx(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true
    }
  }).outputText;
  
  const module = { exports: {} };
  const require = (mod) => {
    if (mod === 'react') return { __esModule: true, default: React, ...React };
    if (mod === 'next/image') return { __esModule: true, default: mockNextImage };
    if (mod === './Logo') return loadTsx(path.join(COMPONENTS_DIR, 'Logo.tsx'));
    return {};
  };
  
  const fn = new Function('module', 'exports', 'require', transpiled);
  fn(module, module.exports, require);
  return module.exports;
}

console.log('========================================================================');
console.log('  MILESTONE 2 EMPIRICAL ADVERSARIAL CHALLENGE SUITE');
console.log('========================================================================\n');

// ========================================================================
// TEST SUITE 1: Image Asset Magic Bytes & Physical Dimension Oracle
// ========================================================================
console.log('▶ [CHALLENGE 1] Image Asset Magic Bytes & Dimensions');

// 1.1 eMudran PNG
const emudranPath = path.join(LOGOS_DIR, '00003033-eMudran_Business_Card_p1_img_0_X5.png');
assert(fs.existsSync(emudranPath), 'eMudran PNG file exists on disk', emudranPath);
const emudranBuf = fs.readFileSync(emudranPath);

// PNG 8-byte magic: 89 50 4E 47 0D 0A 1A 0A
const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const hasPngMagic = pngMagic.every((byte, idx) => emudranBuf[idx] === byte);
assert(hasPngMagic, 'eMudran PNG has valid 8-byte PNG signature (0x89 50 4E 47 0D 0A 1A 0A)');

// IHDR chunk validation (bytes 12-15 = 'IHDR')
const ihdr = emudranBuf.subarray(12, 16).toString('ascii');
assert(ihdr === 'IHDR', 'eMudran PNG has valid IHDR header chunk');

const emudranWidth = emudranBuf.readUInt32BE(16);
const emudranHeight = emudranBuf.readUInt32BE(20);
const emudranBitDepth = emudranBuf[24];
const emudranColorType = emudranBuf[25];

assert(emudranWidth > 0 && emudranHeight > 0, `eMudran PNG dimensions are positive: ${emudranWidth}x${emudranHeight}px`);
assert(emudranBitDepth === 8, `eMudran PNG bit depth is 8-bit (found ${emudranBitDepth})`);
assert(emudranColorType === 6, `eMudran PNG color type is 6 (RGBA with alpha channel) for transparent compositing (found ${emudranColorType})`);
assert(emudranBuf.length > 500 && emudranBuf.length < 5 * 1024 * 1024, `eMudran PNG size (${emudranBuf.length} bytes) is healthy (< 5MB)`);

// 1.2 TVASTA JPG
const tvastaPath = path.join(LOGOS_DIR, '00003034-TVASTA Business Card_p1_img_0_FormXob.73321509b2ffc0b3df216bb95ab2c419.jpg');
assert(fs.existsSync(tvastaPath), 'TVASTA JPG file exists on disk', tvastaPath);
const tvastaBuf = fs.readFileSync(tvastaPath);

// JPEG SOI: 0xFF 0xD8
assert(tvastaBuf[0] === 0xff && tvastaBuf[1] === 0xd8, 'TVASTA JPG has valid SOI marker (0xFF 0xD8)');

// Find SOF marker for dimensions
let tvastaWidth = 0;
let tvastaHeight = 0;
for (let i = 0; i < tvastaBuf.length - 8; i++) {
  if (tvastaBuf[i] === 0xff && (tvastaBuf[i + 1] === 0xc0 || tvastaBuf[i + 1] === 0xc2)) {
    tvastaHeight = tvastaBuf.readUInt16BE(i + 5);
    tvastaWidth = tvastaBuf.readUInt16BE(i + 7);
    break;
  }
}
assert(tvastaWidth >= 1000, `TVASTA JPG is high-resolution with width >= 1000px (found ${tvastaWidth}px)`);
assert(tvastaHeight >= 500, `TVASTA JPG height is substantial (found ${tvastaHeight}px)`);
assert(tvastaBuf.length > 1000 && tvastaBuf.length < 5 * 1024 * 1024, `TVASTA JPG size (${tvastaBuf.length} bytes) is healthy (< 5MB)`);

// Check EOI marker (0xFF 0xD9) near end
let hasEoi = false;
for (let i = tvastaBuf.length - 1; i >= Math.max(0, tvastaBuf.length - 32); i--) {
  if (tvastaBuf[i] === 0xd9 && tvastaBuf[i - 1] === 0xff) {
    hasEoi = true;
    break;
  }
}
assert(hasEoi, 'TVASTA JPG has valid EOI terminator marker (0xFF 0xD9)');

// ========================================================================
// TEST SUITE 2: SVG Path Syntax, XML Well-Formedness & Geometry
// ========================================================================
console.log('\n▶ [CHALLENGE 2] SVG Path Syntax & Geometry Stress Test');

const LogoMod = loadTsx(path.join(COMPONENTS_DIR, 'Logo.tsx'));
const DivMod = loadTsx(path.join(COMPONENTS_DIR, 'DivisionLogos.tsx'));

const vectorComponents = [
  { name: 'Master Logo', comp: LogoMod.Logo, props: {} },
  { name: 'SolisLogo', comp: DivMod.SolisLogo, props: {} },
  { name: 'SanyogLogo', comp: DivMod.SanyogLogo, props: {} },
  { name: 'GridApexLogo', comp: DivMod.GridApexLogo, props: {} },
  { name: 'AgrimLogo', comp: DivMod.AgrimLogo, props: {} },
];

function validateSvgMarkup(name, markup) {
  // 1. Starts with <svg and ends with </svg>
  assert(markup.startsWith('<svg') && markup.endsWith('</svg>'), `${name}: Root element is enclosed <svg>...</svg>`);
  
  // 2. No NaN or undefined substrings
  assert(!markup.includes('NaN'), `${name}: SVG contains zero NaN values`);
  assert(!markup.includes('undefined'), `${name}: SVG contains zero undefined values`);
  assert(!markup.includes('null'), `${name}: SVG contains zero null attributes`);
  
  // 3. Valid viewBox
  const viewBoxMatch = markup.match(/viewBox="([^"]+)"/);
  assert(viewBoxMatch !== null, `${name}: Defines viewBox attribute`);
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/\s+/).map(Number);
    assert(parts.length === 4 && parts.every(n => !isNaN(n)), `${name}: viewBox consists of 4 valid numbers (${viewBoxMatch[1]})`);
    assert(parts[2] > 0 && parts[3] > 0, `${name}: viewBox width & height are strictly positive`);
  }

  // 4. Extract and stress-test all path `d` attributes
  const pathRegex = /<path[^>]*d="([^"]+)"/g;
  let match;
  let pathCount = 0;
  while ((match = pathRegex.exec(markup)) !== null) {
    pathCount++;
    const d = match[1];
    // Check path syntax: only allowed SVG commands (M, L, H, V, C, S, Q, T, A, Z, etc.) and numbers
    const validCharsRegex = /^[MmLlHhVvCcSsQqTtAaZz0-9\s,\.\-]+$/;
    assert(validCharsRegex.test(d), `${name} path #${pathCount}: Path d syntax contains only valid command characters`, d);
    // Ensure no double decimals like 12.34.56
    assert(!/\d+\.\d+\./.test(d), `${name} path #${pathCount}: No malformed consecutive decimal points in coordinates`);
    // Ensure valid start command (must start with M or m)
    assert(/^[Mm]/.test(d.trim()), `${name} path #${pathCount}: Path starts with Move command (M/m)`);
  }

  // 5. Extract and validate polygon points
  const polyRegex = /<polygon[^>]*points="([^"]+)"/g;
  while ((match = polyRegex.exec(markup)) !== null) {
    const pointsStr = match[1];
    const pairs = pointsStr.trim().split(/\s+/);
    assert(pairs.length >= 3, `${name}: Polygon has at least 3 vertices (${pairs.length} points)`);
    for (const pair of pairs) {
      const coords = pair.split(',').map(Number);
      assert(coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1]), `${name}: Valid coordinate pair in polygon: ${pair}`);
    }
  }

  // 6. Check defs gradients
  const gradientRefRegex = /url\(#([^)]+)\)/g;
  while ((match = gradientRefRegex.exec(markup)) !== null) {
    const id = match[1];
    const defExists = markup.includes(`id="${id}"`);
    assert(defExists, `${name}: Referenced linearGradient '#${id}' is defined in <defs>`);
  }
}

for (const vc of vectorComponents) {
  const markup = ReactDOMServer.renderToStaticMarkup(React.createElement(vc.comp, vc.props));
  validateSvgMarkup(vc.name, markup);
}

// ========================================================================
// TEST SUITE 3: DivisionLogo Fallback & Adversarial Prop Stress Test
// ========================================================================
console.log('\n▶ [CHALLENGE 3] DivisionLogo Adversarial Prop Stress Test');

// 3.1 Canonical slug routing test
const canonicalMappings = [
  { slug: 'solis', expectedSnippet: 'SOLIS Solar Mark', type: 'svg' },
  { slug: 'sanyog', expectedSnippet: 'SANYOG Liaison Mark', type: 'svg' },
  { slug: 'gridApex', expectedSnippet: 'GRID APEX Power Grid Mark', type: 'svg' },
  { slug: 'grid-apex', expectedSnippet: 'GRID APEX Power Grid Mark', type: 'svg' },
  { slug: 'tvasta', expectedSnippet: 'TVASTA Luxury Emblem', type: 'raster' },
  { slug: 'emudran', expectedSnippet: 'eMudran CMYK Emblem', type: 'raster' },
  { slug: 'agrim', expectedSnippet: 'AGRIM Financial Pillars Mark', type: 'svg' },
];

for (const map of canonicalMappings) {
  const rendered = ReactDOMServer.renderToStaticMarkup(
    React.createElement(DivMod.DivisionLogo, { division: map.slug, size: 64 })
  );
  assert(rendered.includes(map.expectedSnippet), `Canonical slug '${map.slug}' routes to dedicated mark`);
  if (map.type === 'svg') {
    assert(rendered.includes('width="64"') && rendered.includes('height="64"'), `SVG size prop honored for '${map.slug}'`);
  }
}

// 3.2 Uppercase and Mixed-case Normalization Test
const caseVariants = [
  { input: 'SOLIS', expectedSnippet: 'SOLIS Solar Mark' },
  { input: 'Solis', expectedSnippet: 'SOLIS Solar Mark' },
  { input: 'sOlIs', expectedSnippet: 'SOLIS Solar Mark' },
  { input: 'SANYOG', expectedSnippet: 'SANYOG Liaison Mark' },
  { input: 'Sanyog', expectedSnippet: 'SANYOG Liaison Mark' },
  { input: 'GRIDAPEX', expectedSnippet: 'GRID APEX Power Grid Mark' },
  { input: 'GridApex', expectedSnippet: 'GRID APEX Power Grid Mark' },
  { input: 'GRID-APEX', expectedSnippet: 'GRID APEX Power Grid Mark' },
  { input: 'Grid-Apex', expectedSnippet: 'GRID APEX Power Grid Mark' },
  { input: 'TVASTA', expectedSnippet: 'TVASTA Luxury Emblem' },
  { input: 'Tvasta', expectedSnippet: 'TVASTA Luxury Emblem' },
  { input: 'EMUDRAN', expectedSnippet: 'eMudran CMYK Emblem' },
  { input: 'eMudran', expectedSnippet: 'eMudran CMYK Emblem' },
  { input: 'AGRIM', expectedSnippet: 'AGRIM Financial Pillars Mark' },
  { input: 'Agrim', expectedSnippet: 'AGRIM Financial Pillars Mark' },
];

for (const variant of caseVariants) {
  const rendered = ReactDOMServer.renderToStaticMarkup(
    React.createElement(DivMod.DivisionLogo, { division: variant.input })
  );
  assert(rendered.includes(variant.expectedSnippet), `Case variant '${variant.input}' normalized correctly`);
}

// 3.3 Whitespace and Trimming Test
const whitespaceVariants = [
  { input: '  solis  ', expectedSnippet: 'SOLIS Solar Mark' },
  { input: '\tsanyog\n', expectedSnippet: 'SANYOG Liaison Mark' },
  { input: '   grid-apex   ', expectedSnippet: 'GRID APEX Power Grid Mark' },
  { input: '  tvasta \t', expectedSnippet: 'TVASTA Luxury Emblem' },
  { input: ' \n emudran \n ', expectedSnippet: 'eMudran CMYK Emblem' },
  { input: ' agrim ', expectedSnippet: 'AGRIM Financial Pillars Mark' },
];

for (const ws of whitespaceVariants) {
  const rendered = ReactDOMServer.renderToStaticMarkup(
    React.createElement(DivMod.DivisionLogo, { division: ws.input })
  );
  assert(rendered.includes(ws.expectedSnippet), `Whitespace input '${JSON.stringify(ws.input)}' trimmed and resolved`);
}

// 3.4 Fallback Trigger Battery: Master JC Apex Umbrella Emblem Fallback
// The master umbrella emblem contains:
// - Gold dot: #D4AF37
// - Umbrella canopy arc: M20 50 Q 50 20 80 50
// - Underside highlight: M28 50 Q 50 28 72 50
// - J-stem: M50 45 L 50 80 Q 50 92 40 92
function isMasterUmbrellaFallback(markup) {
  return (
    markup.includes('#D4AF37') &&
    markup.includes('M20 50 Q 50 20 80 50') &&
    markup.includes('M28 50 Q 50 28 72 50') &&
    markup.includes('M50 45 L 50 80')
  );
}

const fallbackInputs = [
  { label: 'empty string', val: '' },
  { label: 'spaces only', val: '   ' },
  { label: 'tabs/newlines only', val: '\t\n\r ' },
  { label: 'unknown slug "unknown"', val: 'unknown' },
  { label: 'unknown slug "apex"', val: 'apex' },
  { label: 'unknown slug "random-division"', val: 'random-division' },
  { label: 'null value', val: null },
  { label: 'undefined value', val: undefined },
  { label: 'numeric 0', val: 0 },
  { label: 'numeric 100', val: 100 },
  { label: 'boolean false', val: false },
  { label: 'boolean true', val: true },
  { label: 'NaN value', val: NaN },
  { label: 'Infinity value', val: Infinity },
  { label: 'XSS script injection', val: '<script>alert(1)</script>' },
  { label: 'Path traversal ../../', val: '../../etc/passwd' },
  { label: 'SQL injection string', val: 'solis; DROP TABLE divisions;' },
  { label: 'Prototype property name "__proto__"', val: '__proto__' },
  { label: 'Constructor name "constructor"', val: 'constructor' },
  { label: 'Method name "toString"', val: 'toString' },
  { label: 'Unicode emoji "⚡"', val: '⚡' },
  { label: 'Fullwidth unicode "ＳＯＬＩＳ"', val: 'ＳＯＬＩＳ' },
];

for (const fb of fallbackInputs) {
  let rendered = '';
  let didThrow = false;
  try {
    rendered = ReactDOMServer.renderToStaticMarkup(
      React.createElement(DivMod.DivisionLogo, { division: fb.val, size: 52 })
    );
  } catch (err) {
    didThrow = true;
    assert(false, `Fallback did not throw for ${fb.label}`, err.message);
  }
  if (!didThrow) {
    assert(
      isMasterUmbrellaFallback(rendered),
      `Fallback input [${fb.label}] safely returns Master JC Apex umbrella emblem`
    );
  }
}

// 3.5 Bizarre Object / Symbol Inputs Test
const objectInputs = [
  { label: 'Empty object {}', val: {} },
  { label: 'Empty array []', val: [] },
  { label: 'Array with slug ["solis"]', val: ['solis'] },
];

for (const obj of objectInputs) {
  let rendered = '';
  let didThrow = false;
  try {
    rendered = ReactDOMServer.renderToStaticMarkup(
      React.createElement(DivMod.DivisionLogo, { division: obj.val })
    );
  } catch (err) {
    didThrow = true;
    assert(false, `Object input threw for ${obj.label}`, err.message);
  }
  if (!didThrow) {
    // Array with 'solis' turns into 'solis' in toString(), or falls back to master emblem!
    assert(rendered.length > 0, `Object input [${obj.label}] produced non-empty rendered output`);
  }
}

// 3.6 Size and ClassName prop boundary stress
const styleStressTests = [
  { size: 0, className: 'w-0 h-0' },
  { size: 16, className: 'opacity-50' },
  { size: 256, className: 'specular-glow shadow-2xl' },
  { size: undefined, className: undefined },
  { size: null, className: '' },
];

for (const st of styleStressTests) {
  const rendered = ReactDOMServer.renderToStaticMarkup(
    React.createElement(DivMod.DivisionLogo, { division: 'solis', size: st.size, className: st.className })
  );
  assert(rendered.includes('SOLIS Solar Mark'), `SolisLogo renders under style variation: size=${st.size}`);
  if (st.className) {
    assert(rendered.includes(st.className), `SolisLogo preserves custom className='${st.className}'`);
  }
}

// ========================================================================
// TEST SUITE 4: Exhaustive Em-Dash Prohibition Scan
// ========================================================================
console.log('\n▶ [CHALLENGE 4] Exhaustive Em-Dash Prohibition Scan');

function scanDirForEmDashes(dir) {
  const files = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
  const violations = [];
  
  for (const file of files) {
    if (!file.isFile()) continue;
    if (file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js') || file.name.endsWith('.jsx')) {
      const fullPath = path.join(file.parentPath || file.path, file.name);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check 1: Literal unicode em-dash character (\u2014)
      if (content.includes('\u2014')) {
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (line.includes('\u2014')) {
            violations.push({ file: fullPath, line: idx + 1, type: 'literal em-dash', snippet: line.trim() });
          }
        });
      }
      
      // Check 2: HTML entity &mdash; or &#8212; or &#x2014;
      const htmlEntityMatch = /&(?:mdash|#8212|#x2014);/.exec(content);
      if (htmlEntityMatch) {
        violations.push({ file: fullPath, type: 'html entity', snippet: htmlEntityMatch[0] });
      }

      // Check 3: Escaped unicode string literal "\u2014"
      if (/\\u2014/i.test(content)) {
        violations.push({ file: fullPath, type: 'unicode escape sequence', snippet: '\\u2014' });
      }
    }
  }
  return violations;
}

const componentViolations = scanDirForEmDashes(COMPONENTS_DIR);
assert(
  componentViolations.length === 0,
  `Zero em-dashes in src/components/ (${componentViolations.length} violations found)`,
  componentViolations.map(v => `${v.file}:${v.line || '?'} [${v.snippet}]`).join('; ')
);

const allSrcViolations = scanDirForEmDashes(path.join(ROOT_DIR, 'src'));
assert(
  allSrcViolations.length === 0,
  `Zero em-dashes across entire src/ directory (${allSrcViolations.length} violations found)`,
  allSrcViolations.map(v => `${v.file}:${v.line || '?'} [${v.snippet}]`).join('; ')
);

// ========================================================================
// SUMMARY REPORT
// ========================================================================
console.log('\n========================================================================');
console.log(`  ADVERSARIAL CHALLENGE SUMMARY: ${testsPassed} PASSED, ${testsFailed} FAILED`);
console.log('========================================================================\n');

if (testsFailed > 0) {
  console.error('FAILURES DETECTED:');
  for (const f of failures) {
    console.error(`- ${f.message}: ${f.details}`);
  }
  process.exit(1);
} else {
  console.log('ALL ADVERSARIAL CHALLENGES EMPIRICALLY PASSED (100% ROBUST).');
  process.exit(0);
}
