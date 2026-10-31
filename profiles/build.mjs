// Builds the division profiles as A4 PDFs with headless Chrome.
//
//   node --no-warnings profiles/build.mjs [--out <dir>] [--date YYYY-MM-DD]
//
// Chrome: set CHROME_PATH, or the newest chrome-headless-shell in ~/.cache/puppeteer is used.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { fontFaceCss, renderDocument } from './lib.mjs';
import { solisProfile, solisShape } from './solis.mjs';
import { gridApexProfile, gridApexShape } from './grid-apex.mjs';
import { sanyogProfile, sanyogShape } from './sanyog.mjs';
import { tvastaProfile, tvastaShape } from './tvasta.mjs';
import { emudranProfile, emudranShape } from './emudran.mjs';
import { agrimProfile, agrimShape } from './agrim.mjs';
import { companyProfile, companyShape } from './company.mjs';

// Revision of each document. Raise a profile's number when its content or layout changes.
const REVS = { company: '1.4', solis: '1.4', 'grid-apex': '1.5', sanyog: '1.3', tvasta: '1.3', emudran: '1.3', agrim: '1.3' };
const WEB = { company: 'jcapexv.com', solis: 'jcapexv.com/solis', 'grid-apex': 'jcapexv.com/grid-apex', sanyog: 'jcapexv.com/sanyog', tvasta: 'jcapexv.com/tvasta', emudran: 'jcapexv.com/emudran', agrim: 'jcapexv.com/agrim' };
const here = path.dirname(fileURLToPath(import.meta.url));

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, i, all) => (arg.startsWith('--') ? [...pairs, [arg.slice(2), all[i + 1]]] : pairs), []),
);
const date = args.date ? new Date(`${args.date}T00:00:00`) : new Date();
const isoDate = date.toLocaleDateString('en-CA');
const blockDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const buildDir = path.join(here, 'build');
const outDir = path.resolve(args.out ?? path.join(here, 'out'));

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const root = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');
  const versions = fs.existsSync(root) ? fs.readdirSync(root).sort().reverse() : [];
  for (const version of versions) {
    for (const dir of fs.readdirSync(path.join(root, version))) {
      const exe = path.join(root, version, dir, 'chrome-headless-shell');
      if (fs.existsSync(exe)) return exe;
    }
  }
  throw new Error('No Chrome found. Set CHROME_PATH to a Chrome or chrome-headless-shell binary.');
}

const css = `${fontFaceCss(path.join(here, 'fonts'))}\n${fs.readFileSync(path.join(here, 'styles.css'), 'utf8')}`;
const logos = path.relative(buildDir, path.join(here, '..', 'public', 'images', 'logos'));
const photosRel = path.relative(buildDir, path.join(here, 'assets', 'photos'));
const qr = (key) => fs.readFileSync(path.join(here, 'assets', `qr-${key}.svg`), 'utf8');
const block = (key, division, shape, document = 'Division profile') => ({ shape, division, document, web: WEB[key], rev: REVS[key], date: blockDate });

const profiles = [
  companyProfile({ logos, qr: qr('group'), photosRel, block: block('company', 'Group', companyShape, 'Company profile') }),
  solisProfile({ logos, qr: qr('solis'), photosRel, block: block('solis', 'Solis', solisShape) }),
  gridApexProfile({ logos, qr: qr('grid-apex'), photosRel, block: block('grid-apex', 'Grid Apex', gridApexShape) }),
  sanyogProfile({ logos, qr: qr('sanyog'), photosRel, block: block('sanyog', 'Sanyog', sanyogShape) }),
  tvastaProfile({ logos, qr: qr('tvasta'), photosRel, block: block('tvasta', 'Tvasta', tvastaShape) }),
  emudranProfile({ logos, qr: qr('emudran'), photosRel, block: block('emudran', 'eMudran', emudranShape) }),
  agrimProfile({ logos, qr: qr('agrim'), photosRel, block: block('agrim', 'Agrim', agrimShape) }),
];

fs.mkdirSync(buildDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });
const chrome = findChrome();

for (const profile of profiles) {
  const htmlPath = path.join(buildDir, `${profile.key}.html`);
  const pdfPath = path.join(outDir, `${isoDate}_JCApex_${profile.fileName}_Profile_v${REVS[profile.key]}.pdf`);
  fs.writeFileSync(htmlPath, renderDocument({ ...profile, css }));
  execFileSync(
    chrome,
    ['--headless', '--no-pdf-header-footer', '--virtual-time-budget=5000', `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href],
    { stdio: 'pipe' },
  );
  console.log(`${profile.title}: ${pdfPath}`);
}

// Sidecar credit list: every third-party photo with its licence and source URL, and where it is used.
const photoCredits = JSON.parse(fs.readFileSync(path.join(here, 'assets', 'photos', 'credits.json'), 'utf8'));
const usedIn = {};
for (const profile of profiles) for (const name of profile.photos ?? []) (usedIn[name] ??= []).push(profile.title);
const creditRows = Object.entries(usedIn)
  .filter(([name]) => !photoCredits[name].own)
  .map(([name, docs]) => {
    const c = photoCredits[name];
    return `| ${c.subject} | ${c.author} | ${c.license} | ${c.source} | ${docs.join('; ')} |`;
  });
fs.writeFileSync(
  path.join(outDir, `${isoDate}_JCApex_Profile_Photo_Credits.md`),
  `# Photo credits for the profiles\n\nBuilt ${blockDate}. Every photo below is captioned "Representative image" in the PDFs. Own photos (the team, the terrace survey) are not listed.\n\n| Subject | Author | Licence | Source | Used in |\n| --- | --- | --- | --- | --- |\n${creditRows.join('\n')}\n`,
);
