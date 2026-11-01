import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, PROJECT_ROOT, fileExists, readFileSafe } from '../helpers/project-paths.mjs';
import path from 'node:path';

// What the PDF profiles show, the website must show too (client direction, November 2026).
const profile = (slug) => readFileSafe(path.join(PROJECT_ROOT, 'profiles', `${slug}.mjs`)) || '';
const content = () => readFileSafe(PATHS.divisionsContent) || '';

/** The text of one division's object in divisions.ts. */
function divisionBlock(slug) {
  const code = content();
  const start = code.indexOf(`slug: '${slug}'`);
  const next = code.indexOf('\nexport const', start);
  return code.slice(start, next === -1 ? undefined : next);
}

test({
  id: 'T1_R14_01',
  tier: 'tier1',
  feature: 'r14',
  title: 'R14 Feature: The home map pins the same places as the company profile map',
  fn: () => {
    const pdf = readFileSafe(path.join(PROJECT_ROOT, 'profiles', 'visuals.mjs')) || '';
    const site = readFileSafe(PATHS.places) || '';
    const pins = (code) =>
      Object.fromEntries([...code.matchAll(/^\s+'?([\w -]+?)'?: \[([\d.]+), ([\d.]+)\],$/gm)].map((m) => [m[1], `${m[2]},${m[3]}`]));
    const site_ = pins(site);
    const pdf_ = pins(pdf);
    assert(Object.keys(site_).length >= 9, 'places.ts must list the hotel areas and the solar plants');
    for (const [place, at] of Object.entries(site_)) {
      assert(pdf_[place] === at, `${place} must sit where the company profile puts it (${pdf_[place]} vs ${at})`);
    }
    assert(fileExists(path.join(PROJECT_ROOT, 'src', 'content', 'maps', 'mumbai-region.json')), 'The map outline ships with the site');
  },
});

test({
  id: 'T1_R14_02',
  tier: 'tier1',
  feature: 'r14',
  title: 'R14 Feature: The home page names every client hotel, pictures them, and credits brand work honestly',
  fn: () => {
    const home = readFileSafe(PATHS.homePage) || '';
    assert(home.indexOf('<GroundedProjectTrack') < home.indexOf('<GroundedServices'), 'Clients and projects come straight after the opening facts');
    const section = readFileSafe(PATHS.groundedProjectTrack) || '';
    assertIncludes(section, '<WorkMap />', 'The section must show the map of hotels and plants');
    assertIncludes(section, '<HotelGallery />', 'The section must show the client hotels');
    assertIncludes(section, 'These brands are not clients of JC Apex Ventures.', 'Brand work is credited to the Creative Director, not the company');
    assertIncludes(section, 'creative.attributionLine', 'Brand work carries its attribution line');
    const gallery = readFileSafe(PATHS.hotelGallery) || '';
    const photos = readFileSafe(PATHS.photos) || '';
    const keys = [...gallery.matchAll(/'(hotel-[a-z-]+)'/g)].map((m) => m[1]);
    assert(keys.length >= 5, 'At least five client hotels are pictured');
    for (const key of keys) {
      const entry = new RegExp(`'${key}': \\{[^}]*license: '([^']+)'`).exec(photos);
      assert(entry, `${key} must be listed in photos.ts`);
      assert(!/BY-SA/i.test(entry[1]), `${key} must be CC0, CC BY or public domain`);
      assert(fileExists(path.join(PROJECT_ROOT, 'public', 'images', 'licensed', `${key}.jpg`)), `${key}.jpg must exist`);
    }
    const nav = readFileSafe(PATHS.navbar) || '';
    assert(nav.includes('text="Clients"') && !nav.includes('text="Builds"'), 'The navigation link says what it shows');
  },
});

test({
  id: 'T1_R14_03',
  tier: 'tier1',
  feature: 'r14',
  title: 'R14 Feature: Each division page shows the headline figures and photo tiles of its PDF profile',
  fn: () => {
    for (const slug of ['grid-apex', 'solis', 'sanyog', 'tvasta', 'emudran']) {
      const strip = /factStrip\(\[([\s\S]*?)\]\)/.exec(profile(slug));
      assert(strip, `profiles/${slug}.mjs must have a fact strip`);
      for (const [, label] of strip[1].matchAll(/label: '([^']+)'/g)) {
        assertIncludes(divisionBlock(slug), `label: '${label}'`, `${slug} must show the PDF figure "${label}"`);
      }
    }
    for (const slug of ['solis', 'sanyog', 'tvasta', 'emudran', 'agrim']) {
      const pdf = profile(slug);
      const titles = [
        ...[...pdf.matchAll(/\[\s*'[a-z0-9-]+',\s*'([^']+)',\s*'[^']*'\s*\]/g)].map((m) => m[1]),
        ...[...pdf.matchAll(/shapeTile\('([^']+)'/g)].map((m) => m[1]),
        ...[...pdf.matchAll(/class="tile">(?:(?!<h3>)[\s\S])*?<h3>([^<$]+)<\/h3>/g)].map((m) => m[1]),
      ];
      assert(titles.length >= 3, `profiles/${slug}.mjs must have photo tiles`);
      for (const title of titles) {
        assertIncludes(divisionBlock(slug), `title: '${title}'`, `${slug} must show the PDF tile "${title}"`);
      }
    }
  },
});

test({
  id: 'T1_R14_04',
  tier: 'tier1',
  feature: 'r14',
  title: 'R14 Feature: The PDF diagrams are on the website as flows, and the home page shows one desk and every inbox',
  fn: () => {
    assertIncludes(divisionBlock('sanyog'), "title: 'Electricity Ombudsman'", 'Sanyog shows the grievance route');
    assertIncludes(divisionBlock('sanyog'), 'We tell you at the start if a case is weak.', 'Sanyog says when a case is weak');
    assertIncludes(divisionBlock('grid-apex'), "text: 'VCB protection'", 'Grid Apex shows the HT supply');
    assertIncludes(divisionBlock('agrim'), 'We prepare the file. The lender decides.', 'Agrim shows where it fits');
    assertIncludes(readFileSafe(PATHS.divisionPage) || '', '<FlowDiagram', 'Flows render with FlowDiagram');
    const desk = readFileSafe(PATHS.groundedProcess) || '';
    for (const division of ['Sanyog', 'Solis', 'Grid Apex', 'Agrim', 'eMudran']) {
      assertIncludes(desk, `division: '${division}'`, `The one-desk example includes ${division}`);
    }
    assertIncludes(desk, 'not a description of a specific project', 'The example is labelled illustrative');
    const cta = readFileSafe(PATHS.groundedCta) || '';
    assert(cta.includes('divisions.map((d)') && cta.includes('d.contact.emails'), 'The home enquiry lists every division inbox from divisions.ts');
  },
});
