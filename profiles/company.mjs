// JC Apex Ventures company profile. Content: Antigravity/JC_Apex_Brand/JC_Apex_Brand_Guidelines.md,
// src/content/track-record.ts and each division's service list (exported by its profile module).

import {
  ATTRIBUTION_LINES,
  clientGroups,
  formatCapacity,
  formatCount,
  formatProjectDate,
  keyFacts,
  trackRecord,
} from '../src/content/track-record.ts';
import {
  COMPANY,
  CORE_LINE,
  ONE_LINERS,
  PROOF_LINE,
  SHAPES,
  emblem,
  esc,
  eyebrow,
  factRows,
  runningHeader,
  sheet,
  specTable,
  steps,
} from './lib.mjs';
import { MAP_CREDIT, PLACES, factStrip, hotelPhotos, mapSvg, photoSet, pinList } from './visuals.mjs';
import { GRID_APEX_SERVICES } from './grid-apex.mjs';
import { SOLIS_SERVICES } from './solis.mjs';
import { SANYOG_SERVICES } from './sanyog.mjs';
import { TVASTA_SERVICES } from './tvasta.mjs';
import { EMUDRAN_SERVICES } from './emudran.mjs';
import { AGRIM_SERVICES, BOUNDARY } from './agrim.mjs';

const GOLD = '#C29F53';
const INK = '#111111';

/** Where each hotel area sits on the map, and how many properties it holds. */
const HOTEL_AREAS = [
  ['Colaba to Nariman Point', ['Colaba', 'Cuffe Parade', 'Nariman Point']],
  ['Bandra and BKC', ['Bandra']],
  ['Santacruz and Andheri', ['Santacruz', 'Andheri']],
  ['Vikhroli', ['Vikhroli']],
  ['Turbhe', ['Turbhe']],
];

function hubDiagram() {
  const nodes = [
    [40, 20, 'Sanyog', 'load extension with the utility', '#2C5ED4'],
    [40, 175, 'Solis', 'solar plant, chargers, net metering', '#C9A13B'],
    [40, 330, 'Grid Apex', 'LT distribution upgrade if needed', '#0284C7'],
    [1180, 95, 'Agrim', 'loan requirement file (no lending)', '#047857'],
    [1180, 255, 'eMudran', 'EV parking signs and site board', '#00163A'],
  ];
  const hub = { x: 640, y: 165, w: 360, h: 130 };
  const lines = nodes
    .map(([x, y]) => {
      const left = x < hub.x;
      const nx = left ? x + 420 : x;
      const ny = y + 55;
      const hx = left ? hub.x : hub.x + hub.w;
      return `<path d="M${nx} ${ny} H${(nx + hx) / 2} V${hub.y + hub.h / 2} H${hx}" fill="none" stroke="${GOLD}" stroke-width="4"/>`;
    })
    .join('');
  const boxes = nodes
    .map(
      ([x, y, name, role, color]) => `
      <rect x="${x}" y="${y}" width="420" height="110" rx="8" fill="#FFFFFF" stroke="${color}" stroke-width="4"/>
      <text x="${x + 24}" y="${y + 46}" class="h-name">${name}</text>
      <text x="${x + 24}" y="${y + 84}" class="h-role">${role}</text>`,
    )
    .join('');
  return `<svg viewBox="0 0 1640 460" role="img" aria-label="One point of contact coordinating several divisions">
    <style>.h-name{font:600 32px var(--sans);fill:${INK}}.h-role{font:400 25px var(--sans);fill:#555}.h-hub{font:400 40px var(--serif);fill:#FFFFFF}.h-hub-sub{font:400 24px var(--sans);fill:#D9D2C2}</style>
    ${lines}
    <rect x="${hub.x}" y="${hub.y}" width="${hub.w}" height="${hub.h}" rx="8" fill="${INK}"/>
    <circle cx="${hub.x + 40}" cy="${hub.y + 40}" r="11" fill="${GOLD}"/>
    <text x="${hub.x + 66}" y="${hub.y + 56}" class="h-hub">One point of contact</text>
    <text x="${hub.x + 40}" y="${hub.y + 100}" class="h-hub-sub">JC Apex Ventures, Mumbai</text>
    ${boxes}
  </svg>`;
}

export function companyProfile({ logos, qr, block, photosRel }) {
  const total = 9;
  const { photo, credits, used: usedPhotos } = photoSet(photosRel);
  const solar = keyFacts().find((f) => f.id === 'solar-capacity');
  const sites = keyFacts().find((f) => f.id === 'hospitality-sites');
  const plants = trackRecord('solis');
  const hotels = clientGroups().find((g) => g.id === 'hospitality').clients;
  const creative = clientGroups().find((g) => g.id === 'creative');
  const header = runningHeader({
    mark: `<span class="group-mark">${emblem('6.5mm', INK)}<span>JC Apex Ventures</span></span>`,
    right: 'Company profile · October 2026',
  });
  const page = (number, body, extra = {}) => sheet({ number, total, body, header, block, ...extra });

  const divisions = [
    { name: 'Grid Apex', logo: 'grid-apex-official.png', accent: '#0284C7', photo: 'grid-switchgear', line: ONE_LINERS['Grid Apex'], services: GRID_APEX_SERVICES, proof: 'Hospitality, industrial, commercial and residential sites. Track record in the Grid Apex profile.', email: 'admin@jcapexv.com', path: '/grid-apex' },
    { name: 'Solis', logo: 'solis-official.png', accent: '#FFC85A', photo: 'solis-rooftop', line: ONE_LINERS['Solis'], services: SOLIS_SERVICES, proof: `${formatCount(plants.length)[0].toUpperCase()}${formatCount(plants.length).slice(1)} completed plants, ${plants.at(-1).date.year} to ${plants[0].date.year}. Details in the Solis profile.`, email: 'solis@jcapexv.com', path: '/solis' },
    { name: 'Sanyog', logo: 'sanyog-official.png', accent: '#2C5ED4', photo: 'sanyog-meters', line: ONE_LINERS['Sanyog'], services: SANYOG_SERVICES, proof: 'Works with BEST, Adani Electricity, Tata Power and MSEDCL, and before the CGRF.', email: 'licenses@jcapexv.com', path: '/sanyog' },
    { name: 'Tvasta', logo: 'tvasta-dark.png', accent: '#D72A1B', photo: 'tvasta-living', line: ONE_LINERS['Tvasta'], services: TVASTA_SERVICES, proof: 'Standard, Premium and Luxury tiers; three architects and three interior designers.', email: 'spacemgmt@jcapexv.com', path: '/tvasta' },
    { name: 'eMudran', logo: 'emudran-official.png', accent: '#00163A', photo: 'emudran-print', line: ONE_LINERS['eMudran'], services: EMUDRAN_SERVICES, proof: 'Creative direction by Manish Ajgaonkar; production led by Hemangi Patil, 22+ years in print.', email: 'admin@jcapexv.com', path: '/emudran' },
    { name: 'Agrim', logo: 'agrim-dark.png', accent: '#047857', photo: 'agrim-plans', line: ONE_LINERS['Agrim'], services: AGRIM_SERVICES, proof: "Works from the engineering division's cost sheet, so the loan file and the project agree.", email: 'admin@jcapexv.com', path: '/agrim' },
  ];

  const cover = sheet({
    number: 1,
    total,
    className: 'cover cover-dark',
    sectionNumber: false,
    block,
    body: `
      <div style="flex: 1"></div>
      <div class="group-lockup">${emblem('9mm', '#F0F3F6')}<span>JC Apex Ventures (OPC) Pvt. Ltd.</span></div>
      ${eyebrow('Company profile')}
      <h1>Power, energy and fit-out for your building, <em>from one desk</em>.</h1>
      <p class="subtitle">${esc(CORE_LINE)}</p>
      <p class="cover-contact">${esc(COMPANY.web)}</p>`,
  });

  const whoWeAre = page(
    2,
    `
    ${eyebrow('Who we are')}
    <h1>Six specialist divisions. One point of contact.</h1>
    <p>JC Apex Ventures (OPC) Pvt. Ltd. is a Mumbai company with six specialist divisions. A client with an electrical, clean-energy, utility, interior, brand or project finance requirement deals with one desk, not a chain of separate contractors. Each division is run by specialists in its own field; the group brings them together when a project needs more than one. The company is new; the experience behind it is not.</p>
    <p class="attribution">${esc(PROOF_LINE)}</p>
    ${factStrip([
      { value: solar.value, label: `solar across ${formatCount(plants.length)} plants` },
      { value: sites.value, label: 'hotel properties, HT electrical work' },
      { value: '4', label: 'Mumbai utilities we work with' },
    ])}
    <div class="split" style="margin-top: 3mm">
      <div>
        <h2 style="margin-top: 0">How we work with clients</h2>
        ${factRows([
          { label: 'One point of contact', value: 'The client deals with one person, whichever divisions the project needs.' },
          { label: 'Specialists', value: 'Each division is led by people who do that work every day.' },
          { label: 'Facts we can show', value: 'Capacities, dates and sites come from documents on file.' },
          { label: 'Clear scope', value: 'Every quote says what is included and what is not.' },
        ])}
      </div>
      ${photo('own-team-crop', { height: '62mm' })}
    </div>`,
  );

  const sixDivisions = page(
    3,
    `
    ${eyebrow('Our divisions')}
    <h1>Six divisions, each a specialist in its field.</h1>
    <div class="tiles">
      ${divisions
        .map(
          (d) => `<div class="tile">
            ${
              d.photo
                ? photo(d.photo, { height: '30mm', noCaption: true })
                : `<div class="photo-frame" style="height:30mm;display:flex;align-items:center;justify-content:center;background:#EEF4EC">${SHAPES.foldedCorner('16mm', d.accent, 0.6)}</div>`
            }
            <img class="tile-logo logo-${d.name.toLowerCase().replace(' ', '-')}" src="${logos}/${d.logo}" alt="${esc(d.name)}">
            <p>${esc(d.line)}</p>
            <p class="tile-link">${esc(COMPANY.web)}${esc(d.path)}</p>
          </div>`,
        )
        .join('')}
    </div>
    <p class="caption" style="margin-top: 4mm">Photographs on this page are representative images; credits are on the last page.</p>`,
  );

  const hotelPins = HOTEL_AREAS.map(([area, towns], i) => {
    const count = hotels.filter((h) => towns.some((t) => (h.place ?? '').startsWith(t))).length;
    return { n: i + 1, label: area, count, lat: PLACES[area][0], lon: PLACES[area][1] };
  });
  const solarPins = plants.map((p, i) => ({ n: hotelPins.length + i + 1, plant: p, lat: PLACES[p.id][0], lon: PLACES[p.id][1] }));

  const record = page(
    3,
    `
    ${eyebrow('Track record')}
    <h1>${esc(solar.value)} of solar, and HT work at ${esc(sites.value)} hotels.</h1>
    <p class="attribution">${esc(ATTRIBUTION_LINES.director)}</p>
    <div class="split-wide" style="margin-top: 4mm">
      <figure class="map">
        ${mapSvg('mumbai-region', [...hotelPins, ...solarPins], { accent: GOLD })}
        <figcaption class="caption">Mumbai region. ${esc(MAP_CREDIT)}</figcaption>
      </figure>
      <div>
        <h3>HT electrical work for hospitality (Grid Apex)</h3>
        ${pinList(hotelPins.map((p) => ({ n: p.n, title: p.label, sub: `${formatCount(p.count)} ${p.count === 1 ? 'property' : 'properties'}` })))}
        <p class="caption">Also one property each in Aurangabad, Maharashtra, and Jodhpur, Rajasthan.</p>
        <h3 style="margin-top: 5mm">Solar power plants (Solis)</h3>
        ${pinList(
          solarPins.map(({ n, plant }) => ({
            n,
            title: plant.client,
            sub: `${formatCapacity(plant.capacity)} · ${plant.location} · ${formatProjectDate(plant.date)}`,
          })),
        )}
      </div>
    </div>
    <p class="caption" style="margin-top: 5mm">${esc(creative.attributionLine)} His credits include ${esc(
      creative.clients.map((c) => c.name).slice(0, -1).join(', '),
    )} and ${esc(creative.clients.at(-1).name)}. Details of every project are in the division profiles.</p>`,
  );

  const divisionBlock = (d) => `
    <div class="division-block" style="--block-accent: ${d.accent}">
      <div>
        <img class="logo logo-${d.name.toLowerCase().replace(' ', '-')}" src="${logos}/${d.logo}" alt="${esc(d.name)}">
        ${d.photo ? photo(d.photo, { height: '44mm' }) : `<p class="margin-note">${esc(BOUNDARY)}</p>`}
        ${d.photo ? `<p class="proof">${esc(d.proof)}</p>` : ''}
        <p class="proof">${esc(COMPANY.web)}${esc(d.path)}</p>
      </div>
      <div>
        <p class="one-line">${esc(d.line)}</p>
        ${specTable(['Line of work', 'What it covers'], d.services, 'compact')}
      </div>
    </div>`;

  const clientList = page(
    4,
    `
    ${eyebrow('Clients')}
    <h1>Hotels that have trusted us with their HT supply.</h1>
    ${hotelPhotos(photo)}
    ${specTable(['Hotel', 'Place', 'Work'], hotels.map((h) => [h.name, h.place ?? '', 'HT electrical work']))}
    <p class="caption">Hotel names are given as they are today. Photographs show the properties, not our installations.</p>`,
  );

  const divisionPages = [0, 2, 4].map((i, n) =>
    page(
      5 + n,
      `
      ${eyebrow(`Divisions · ${n + 1} of 3`)}
      ${divisionBlock(divisions[i])}
      ${divisionBlock(divisions[i + 1])}`,
    ),
  );

  const oneDesk = page(
    8,
    `
    ${eyebrow('One desk')}
    <h1>When a project needs several divisions, the client still has one point of contact.</h1>
    <p class="lead">An illustrative example: a housing society that wants rooftop solar and EV charging for its residents.</p>
    <div class="diagram">${hubDiagram()}</div>
    ${steps([
      { title: 'Sanyog checks the supply', text: "It reviews the society's connection and files the load extension the chargers will need." },
      { title: 'Solis designs and builds', text: 'The plant and the chargers are installed, then the net-metering application is filed.' },
      { title: 'Grid Apex upgrades if needed', text: 'If the survey shows the distribution board or earthing needs work, Grid Apex does it.' },
      { title: 'Agrim prepares the loan file', text: "If the society needs a loan, Agrim prepares the requirement for its bank." },
      { title: 'eMudran makes the signs', text: "EV parking signs and the plant's site board, in English, Marathi and Hindi." },
    ])}
    <p class="caption">Illustrative example of how the divisions work together; not a description of a specific project.</p>`,
  );

  const contact = page(
    9,
    `
    ${eyebrow('Contact')}
    <h1>Talk to us.</h1>
    <p class="lead">${esc(CORE_LINE)}</p>
    <div class="back-grid">
      ${factRows([
        { label: 'Director', value: COMPANY.director },
        { label: 'Phone and WhatsApp', value: COMPANY.phone },
        { label: 'Email', value: 'admin@jcapexv.com' },
        { label: 'Office', value: COMPANY.address },
        { label: 'Web', value: COMPANY.web },
      ])}
      <figure class="qr">${qr}<figcaption>jcapexv.com</figcaption></figure>
    </div>
    <h2>Division inboxes</h2>
    ${specTable(
      ['Division', 'Email', 'Web page'],
      divisions.map((d) => [d.name, d.email, `${COMPANY.web}${d.path}`]),
      'group-table',
    )}
    ${credits()}
    <p class="legal">${esc(COMPANY.legalName)} · CIN ${esc(COMPANY.cin)} · Registered office: ${esc(COMPANY.address)}</p>`,
  );

  return {
    key: 'company',
    fileName: 'Company',
    title: 'JC Apex Ventures company profile',
    theme: 'theme-group',
    pages: [cover, whoWeAre, record, clientList, ...divisionPages, oneDesk, contact],
    photos: usedPhotos(),
  };
}

export const companyShape = SHAPES.apexDot('2.6mm', GOLD);
