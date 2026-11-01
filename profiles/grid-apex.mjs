// Grid Apex division profile. Content: Antigravity/Grid_Apex_Brand/Grid_Apex_Brand_Guidelines.md
// and src/content/track-record.ts (the only source of project facts).

import { ATTRIBUTION_LINES, clientGroups, keyFacts } from '../src/content/track-record.ts';
import {
  COMPANY,
  CORE_LINE,
  ONE_LINERS,
  PROOF_LINE,
  SHAPES,
  contactPage,
  darkCover,
  esc,
  eyebrow,
  factRows,
  groupTable,
  runningHeader,
  sheet,
  specTable,
  steps,
} from './lib.mjs';
import { MAP_CREDIT, PLACES, factStrip, hotelPhotos, mapSvg, photoSet, pinList, projectCard } from './visuals.mjs';

const SKY = '#0284C7';
const INK = '#061224';
const MUTED = '#475569';

const AREA_PINS = [
  ['Colaba to Nariman Point', ['Colaba', 'Cuffe Parade', 'Nariman Point']],
  ['Bandra and BKC', ['Bandra']],
  ['Santacruz and Andheri', ['Santacruz', 'Andheri']],
  ['Vikhroli', ['Vikhroli']],
  ['Turbhe', ['Turbhe']],
];

/** Typical HT supply arrangement, drawn as a single-line diagram with the power path in Sky. */
function htDiagram() {
  const nodes = [
    ['Utility', 'HT supply'],
    ['HT metering', 'utility cubicle'],
    ['HT panel', 'VCB protection'],
    ['Transformer', 'HT to LT'],
    ['LT main panel', 'distribution'],
    ['Distribution', 'boards'],
    ['Loads', 'lifts, HVAC'],
  ];
  const w = 208;
  const gap = 30;
  const boxes = nodes
    .map(([label, sub], i) => {
      const x = 4 + i * (w + gap);
      const isTransformer = label === 'Transformer';
      const shape = isTransformer
        ? `<circle cx="${x + w / 2 - 26}" cy="80" r="46" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>
           <circle cx="${x + w / 2 + 26}" cy="80" r="46" fill="none" stroke="${INK}" stroke-width="3"/>`
        : `<rect x="${x}" y="22" width="${w}" height="116" rx="8" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>
           <text x="${x + w / 2}" y="74" text-anchor="middle" class="d-label">${label}</text>`;
      return `${shape}
        ${isTransformer ? `<text x="${x + w / 2}" y="174" text-anchor="middle" class="d-label">${label}</text>` : ''}
        <text x="${x + w / 2}" y="${isTransformer ? 208 : 108}" text-anchor="middle" class="d-sub">${sub}</text>`;
    })
    .join('');
  const links = nodes
    .slice(0, -1)
    .map((_, i) => {
      const x1 = 4 + i * (w + gap) + w;
      return `<path d="M${x1} 80 H${x1 + gap}" stroke="${SKY}" stroke-width="6"/>`;
    })
    .join('');
  return `<svg viewBox="0 0 1680 222" role="img" aria-label="Typical HT supply arrangement">
    <style>
      .d-label{font:600 28px var(--sans);fill:${INK}}
      .d-sub{font:400 22px var(--sans);fill:${MUTED}}
    </style>
    ${links}${boxes}
  </svg>`;
}

/** What the division does: [line of work, what it covers]. The company profile reads this too. */
export const GRID_APEX_SERVICES = [
      ['HT works', 'HT installation and commissioning; HT panel and switchgear works; transformer installation, testing and maintenance; underground and overhead HT cable laying; distribution system support'],
      ['LT works', 'Wiring for residential, commercial and industrial premises; LT panels and distribution boards; indoor and outdoor lighting; earthing and lightning protection'],
      ['Maintenance and AMC', 'Preventive maintenance, testing, breakdown support and annual maintenance contracts'],
];

export function gridApexProfile({ logos, qr, block, photosRel }) {
  const hospitality = clientGroups().find((g) => g.id === 'hospitality');
  const sites = keyFacts().find((f) => f.id === 'hospitality-sites');
  const total = 8;
  const { photo, credits, used: usedPhotos } = photoSet(photosRel);
  const header = runningHeader({
    logo: `${logos}/grid-apex-official.png`,
    logoAlt: 'Grid Apex',
    right: 'Division profile · October 2026',
  });
  const page = (number, body, extra = {}) => sheet({ number, total, body, header, block, ...extra });
  const marker = `<span class="marker">${SHAPES.latticeSquare('2.6mm', SKY, 1.3)}</span>`;

  const cover = sheet({
    number: 1,
    total,
    className: 'cover cover-dark',
    sectionNumber: false,
    block,
    body: darkCover({
      logo: `${logos}/grid-apex-white.png`,
      logoAlt: 'Grid Apex',
      logoHeight: '17mm',
      motif: SHAPES.latticeSquare('30mm', SKY, 0.5),
      title: esc(ONE_LINERS['Grid Apex']),
      subtitle: CORE_LINE,
      lead: '',
      details: [
        { label: 'Division of', value: COMPANY.legalName },
        { label: 'Web', value: `${COMPANY.web}/grid-apex` },
      ],
    }),
  });

  const [ht, lt, amc] = GRID_APEX_SERVICES;
  const items = (text) => text.split('; ').map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  const areaPins = AREA_PINS.map(([label, towns], i) => {
    const hotels = hospitality.clients.filter((c) => towns.some((t) => (c.place ?? '').startsWith(t)));
    return { n: i + 1, label, hotels, lat: PLACES[label][0], lon: PLACES[label][1] };
  });

  const whoWeAre = page(
    2,
    `
    ${eyebrow('Who we are')}
    <h1>One engineer accountable, from drawings to energisation.</h1>
    <p>Grid Apex is the electrical engineering division of JC Apex Ventures (OPC) Pvt. Ltd., Mumbai. We install, test, commission and maintain High Tension (HT) and Low Tension (LT) electrical systems for industrial, commercial, hospitality and residential sites. Every HT job has one lead engineer from the first survey to energisation.</p>
    <p class="attribution">${esc(PROOF_LINE)}</p>
    ${factStrip([
      { value: sites.value, label: 'hotel properties, HT electrical work' },
      { value: '4', label: 'cities: Mumbai, Navi Mumbai, Aurangabad, Jodhpur' },
    ])}
    <h2 style="margin-top: 3mm">What we do</h2>
    ${specTable(['Line of work', 'What it covers'], GRID_APEX_SERVICES)}`,
  );

  const htWorks = page(
    3,
    `
    ${eyebrow('HT works')}
    <h1>High Tension installations, from panel to transformer.</h1>
    ${photo('grid-switchgear', { height: '84mm' })}
    <div class="split" style="margin-top: 6mm">
      <div>
        <h3>What HT work covers</h3>
        <ul class="plain-list">${items(ht[1]).map((t) => `<li>${marker}${esc(t)}</li>`).join('')}</ul>
      </div>
      ${photo('grid-substation', { height: '56mm' })}
    </div>`,
  );

  const ltWorks = page(
    4,
    `
    ${eyebrow('LT works and maintenance')}
    <h1>Wiring, panels and earthing, then looked after for years.</h1>
    <div class="split">
      ${photo('grid-electrician', { height: '70mm' })}
      ${photo('grid-distribution', { height: '70mm' })}
    </div>
    <div class="split" style="margin-top: 6mm">
      <div>
        <h3>LT works</h3>
        <ul class="plain-list">${items(lt[1]).map((t) => `<li>${marker}${esc(t)}</li>`).join('')}</ul>
      </div>
      <div>
        <h3>Maintenance and AMC</h3>
        <ul class="plain-list">${['Preventive maintenance', 'Periodic testing', 'Breakdown support', 'Annual maintenance contracts'].map((t) => `<li>${marker}${esc(t)}</li>`).join('')}</ul>
        <p class="caption">${esc(amc[1])}.</p>
      </div>
    </div>`,
  );

  const record = page(
    5,
    `
    ${eyebrow('Track record')}
    <h1>HT electrical work at ${esc(sites.value)} hospitality properties.</h1>
    <p class="attribution">${esc(ATTRIBUTION_LINES.director)}</p>
    ${hotelPhotos(photo)}
    <div class="split-wide" style="margin-top: 5mm">
      <figure class="map">
        ${mapSvg('mumbai-region', areaPins.map(({ n, lat, lon }) => ({ n, lat, lon })), { accent: SKY, ink: INK, land: '#EEF2F6', border: '#B9C6D3' })}
        <figcaption class="caption">Mumbai region. ${esc(MAP_CREDIT)}</figcaption>
      </figure>
      <div>
        ${pinList(areaPins.map(({ n, label, hotels }) => ({ n, title: label, sub: hotels.map((h) => h.name).join(', ') })))}
        <p class="caption">Also: Vivanta Aurangabad, Maharashtra, and Taj Hari Mahal, Jodhpur, Rajasthan. Scope at each property: HT electrical work. Hotel names are given as they are today.</p>
      </div>
    </div>`,
  );

  const howWeWork = page(
    6,
    `
    ${eyebrow('How we work')}
    <h1>From survey to energisation, in five steps.</h1>
    ${steps([
      { title: 'Survey and load study', text: 'We visit the site, record the existing supply and equipment, and work out the connected and maximum demand.' },
      { title: 'Design and drawings', text: 'Single-line diagram, cable and switchgear schedules, and the layout of panels and the transformer.' },
      { title: 'Approvals', text: 'We prepare drawings and documents for Electrical Inspectorate approval. Utility sanctions and load changes are filed through Sanyog.' },
      { title: 'Installation and commissioning', text: 'Installation, testing and commissioning, with test reports handed over at energisation.' },
      { title: 'Maintenance', text: 'Preventive maintenance, periodic testing and breakdown support, under an annual contract if the client wants one.' },
    ])}
    <div class="diagram" style="margin-top: 8mm">
      <p class="chart-title">A typical HT supply arrangement</p>
      ${htDiagram()}
      <p class="caption">Simplified single-line diagram. Ratings and protection depend on the sanctioned load and the utility.</p>
    </div>`,
  );

  const advisory = page(
    7,
    `
    ${eyebrow('Maintenance and safety')}
    <h1>Maintenance contracts and safety.</h1>
    <div class="cards" style="margin-top: 4mm">
      ${projectCard({ tag: 'Service', figure: 'AMC', title: 'Maintenance contracts', meta: 'For HT and LT installations', rows: [['Covers', 'Scheduled inspection, testing and breakdown response'], ['Contact', 'One point of contact for the whole installation']] })}
      ${projectCard({ tag: 'Standards', figure: 'Safety', title: 'Safety and compliance', meta: 'On every HT and LT job', rows: [['Standards', 'Central Electricity Authority safety regulations'], ['Approvals', 'Drawings and documents prepared for Electrical Inspectorate review']] })}
    </div>`,
  );

  const people = `
    <h2>Who else joins an electrical project</h2>
    ${factRows([
          { label: 'Sanyog', value: 'Load sanctions, connections and utility applications' },
          { label: 'Solis', value: 'Rooftop solar, pergolas and EV charging' },
          { label: 'Tvasta', value: 'Interior fit-out where electrical work is part of a refit' },
          { label: 'Agrim', value: 'Coordinating project loan requirements' },
        ])}
    ${groupTable('Grid Apex')}`;

  const back = page(8, contactPage({ email: 'admin@jcapexv.com', webPath: '/grid-apex', qr, division: 'Grid Apex', credits: `<div class="joins">${people}</div>${credits()}` }));

  return {
    key: 'grid-apex',
    fileName: 'GridApex',
    title: 'Grid Apex division profile',
    theme: 'theme-grid-apex',
    pages: [cover, whoWeAre, htWorks, ltWorks, record, howWeWork, advisory, back],
    photos: usedPhotos(),
  };
}

export const gridApexShape = SHAPES.latticeSquare('2.6mm', SKY, 1.3);
