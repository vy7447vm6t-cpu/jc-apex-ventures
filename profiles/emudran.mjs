// eMudran division profile. Content: Antigravity/eMudran_Brand/eMudran_Brand_Guidelines.md
// and src/content/track-record.ts. The brand list is Manish Ajgaonkar's portfolio and is
// always introduced as his creative credits, never as clients of JC Apex (guidelines 3.1).

import { clientGroups } from '../src/content/track-record.ts';
import {
  COMPANY,
  CORE_LINE,
  ONE_LINERS,
  SHAPES,
  contactPage,
  darkCover,
  esc,
  eyebrow,
  factRows,
  runningHeader,
  sheet,
  specTable,
  steps,
} from './lib.mjs';
import { factStrip, peopleAndGroup, photoSet, projectCard } from './visuals.mjs';

const NAVY = '#00163A';
const INDIGO = '#4338CA';

const AREAS = [
  ['Packaging', /packaging/i],
  ['Brand identity and digital', /identity/i],
  ['International and global-facing', /international/i],
  ['Brand and campaign design', /./],
];

function byArea(brands) {
  const areaOf = (work) => AREAS.findIndex(([, test]) => test.test(work));
  return AREAS.map(([area], i) => [area, brands.filter((b) => areaOf(b.work) === i)]).filter(([, list]) => list.length);
}

/** What the division does: [line of work, what it covers]. The company profile reads this too. */
export const EMUDRAN_SERVICES = [
      ['Brand design', 'Corporate identity and brand guides; product packaging; campaign media; company profiles, brochures and creative assets'],
      ['Signage and display', '3D acrylic and steel letters; glow, LED, ACP and acrylic boards; flex and vinyl banners; society notice and site signage; survey and mounting'],
      ['Commercial print', 'Stationery, brochures and catalogues; ID cards, certificates and registers; bill and receipt books; digital and four-colour offset; large-format, backlit and vehicle graphics'],
      ['Digital and field', 'Business websites and landing pages; domain, hosting and email set-up; vehicle and glass branding'],
];

export function emudranProfile({ logos, qr, block, photosRel }) {
  const creative = clientGroups().find((g) => g.id === 'creative');
  const total = 7;
  const { photo, credits, used: usedPhotos } = photoSet(photosRel);
  const header = runningHeader({
    logo: `${logos}/emudran-official.png`,
    logoAlt: 'eMudran',
    right: 'Division profile · October 2026',
  });
  const page = (number, body, extra = {}) => sheet({ number, total, body, header, block, ...extra });
  const email = 'admin@jcapexv.com (WhatsApp preferred)';
  const shapeTile = (title, text) =>
    `<div class="tile"><div class="photo-frame shape-frame" style="height: 62mm">${SHAPES.swoosh('24mm', NAVY)}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;

  const cover = sheet({
    number: 1,
    total,
    className: 'cover cover-dark',
    sectionNumber: false,
    block,
    body: darkCover({
      logo: `${logos}/emudran-white.png`,
      logoAlt: 'eMudran',
      logoHeight: '13mm',
      motif: SHAPES.swoosh('30mm', INDIGO),
      title: esc(ONE_LINERS.eMudran),
      subtitle: CORE_LINE,
      lead: '',
      details: [
        { label: 'Division of', value: COMPANY.legalName },
        { label: 'Web', value: `${COMPANY.web}/emudran` },
      ],
    }),
  });

  const whoWeAre = page(
    2,
    `
    ${eyebrow('Who we are')}
    <h1>What is designed on screen is what gets printed and installed.</h1>
    <p>eMudran is the visual communication division of JC Apex Ventures (OPC) Pvt. Ltd., Mumbai. We design brands and packaging, make signage, and manage print and production, from the first concept to the finished, installed piece. Clients work directly with the people doing the work.</p>
    ${factStrip([
      { value: '22+', label: 'years of print and production experience' },
      { value: '3', label: 'scripts: English, Marathi and Hindi' },
      { value: '50+', label: 'print and production outputs' },
    ])}
    <h2 style="margin-top: 3mm">What we do</h2>
    ${specTable(['Line of work', 'What it covers'], EMUDRAN_SERVICES)}`,
  );

  const whatWeMake = page(
    3,
    `
    ${eyebrow('What we make')}
    <h1>From a logo to a lit sign on the building.</h1>
    <div class="tiles">
      ${shapeTile('Brand identity', 'Logos, brand guides, campaign media, company profiles and brochures.')}
      <div class="tile">${photo('emudran-packaging', { height: '62mm' })}<h3>Packaging</h3><p>Product packaging, boxes and labels, prepared for the board and finish they will be printed on.</p></div>
      <div class="tile">${photo('emudran-print', { height: '62mm' })}<h3>Commercial print</h3><p>Stationery, brochures, catalogues, registers and receipt books, in digital and four-colour offset.</p></div>
      ${shapeTile('Signage and display', '3D acrylic and steel letters, LED and glow boards, banners, and society and site signage, surveyed and mounted.')}
    </div>`,
  );

  const creativeWork = page(
    4,
    `
    ${eyebrow('Creative experience')}
    <h1>Our Creative Director's work spans consumer and international brands.</h1>
    <p class="attribution">${esc(creative.attributionLine)}</p>
    <div style="margin-top: 6mm">
    ${specTable(
      ['Area', 'Brands and work'],
      byArea(creative.clients).map(([area, brands]) => [
        area,
        { html: brands.map((b) => (/packaging:/i.test(b.work) ? `${esc(b.name)} (${esc(b.work.split(': ')[1])})` : esc(b.name))).join(', ') },
      ]),
    )}
    </div>
    <p class="caption">Credits from Manish Ajgaonkar's career in brand and packaging design. Brand names are shown for reference only.</p>`,
  );

  const leads = page(
    5,
    `
    ${eyebrow('Leadership')}
    <h1>Senior people on the design and on the press.</h1>
    <div class="cards" style="margin-top: 4mm">
      ${projectCard({ tag: 'Creative direction', figure: 'Design', title: 'Manish Ajgaonkar', meta: 'Creative Director', rows: [['Focus', 'Art direction, FMCG packaging and brand identity'], ['Work with', 'Clients directly, from first concept to approved artwork']] })}
      ${projectCard({ tag: 'Production', figure: 'Print', title: 'Hemangi Patil', meta: 'Production and print execution', rows: [['Experience', '22+ years in print, signage, large-format and field work'], ['Covers', 'Turning approved artwork into print, signage and installed output']] })}
    </div>
    <h2>Production capability</h2>
    ${factRows([
      { label: 'Print', value: 'Offset and digital' },
      { label: 'Signage', value: 'LED, acrylic and neon' },
      { label: 'Large format', value: 'Flex, vinyl and backlit' },
      { label: 'Field', value: 'Survey, mounting and on-site branding' },
    ])}
    <p class="caption">Source: eMudran profile, October 2026.</p>`,
  );

  const howWeWork = page(
    6,
    `
    ${eyebrow('How we work')}
    <h1>Concept, pre-press, production, field.</h1>
    ${steps([
      { title: 'Concept', text: 'Identity, packaging or campaign design, led by our Creative Director and agreed with the client.' },
      { title: 'Pre-press', text: 'Artwork prepared for the substrate, finish and print process it will meet, with Pantone references.' },
      { title: 'Production', text: 'A physical proof before any long run, then printing, fabrication or large-format output.' },
      { title: 'Field execution', text: 'Survey, delivery, mounting and on-site branding, so the finished piece is installed as designed.' },
    ])}
    <h2>How we specify a job</h2>
    ${specTable(
      ['Item', 'Size', 'Material', 'Finish and process'],
      [
        ['Company brochure', 'A4, 8 pages', '300 GSM cover, 170 GSM inner pages', 'Matt lamination on the cover; four-colour offset'],
        ['Society nameplate board', 'As surveyed on site', '3 mm ACP with printed vinyl, or acrylic letters', 'English, Marathi and Hindi; mounted on site'],
      ],
    )}
    <p class="caption">Example specifications. Every job is specified this way before it is quoted.</p>`,
  );

  const people = peopleAndGroup({
      photo,
      division: 'eMudran',
      joinsTitle: 'Who else joins a brand or signage job',
      joins: [
        ['Tvasta', 'Signage and nameplates as part of a fit-out'],
        ['Solis', 'Site boards and plant signage'],
        ['Agrim', 'Coordinating project loan requirements'],
      ],
    });

  const back = page(7, contactPage({ email, webPath: '/emudran', qr, division: 'eMudran', credits: `<div class="joins">${people}</div>${credits()}` }));

  return {
    key: 'emudran',
    fileName: 'eMudran',
    title: 'eMudran division profile',
    theme: 'theme-emudran',
    pages: [cover, whoWeAre, whatWeMake, creativeWork, leads, howWeWork, back],
    photos: usedPhotos(),
  };
}

export const emudranShape = SHAPES.swoosh('2.8mm', NAVY);
