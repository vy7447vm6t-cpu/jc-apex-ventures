// Solis division profile. Content: Antigravity/Solis_Brand/Solis_Brand_Guidelines.md
// and src/content/track-record.ts (the only source of project facts).

import {
  ATTRIBUTION_LINES,
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
  contactPage,
  esc,
  eyebrow,
  factRows,
  groupTable,
  runningHeader,
  sheet,
  specTable,
  steps,
} from './lib.mjs';
import { MAP_CREDIT, PLACES, factStrip, mapSvg, photoSet, pinList, projectCard } from './visuals.mjs';

const SUN = '#FFC85A';
const INK = '#111111';
const ASH = '#A6A6A6';
const STONE = '#6E6E6E';

/** Horizontal bars, grey first, the one bar the title is about in Sun Yellow with an Ink outline. */
function capacityChart(plants) {
  const max = Math.max(...plants.map((p) => p.capacity.value));
  const rowH = 112;
  const labelW = 700;
  const barW = 690;
  const height = plants.length * rowH;
  const rows = plants
    .map((p, i) => {
      const y = i * rowH + 10;
      const w = Math.max(8, (p.capacity.value / max) * barW);
      const highlight = p.capacity.value === max;
      return `
        <line x1="0" x2="1640" y1="${y + rowH - 10}" y2="${y + rowH - 10}" stroke="#E3E3E3" stroke-width="2"/>
        <text x="0" y="${y + 40}" class="c-name">${esc(p.client)}</text>
        <text x="0" y="${y + 78}" class="c-sub">${esc(p.location)} · ${esc(formatProjectDate(p.date))}</text>
        <rect x="${labelW}" y="${y + 22}" width="${w}" height="52" fill="${highlight ? SUN : ASH}" ${
          highlight ? `stroke="${INK}" stroke-width="2.5"` : ''
        }/>
        <text x="${labelW + w + 20}" y="${y + 60}" class="c-val">${esc(formatCapacity(p.capacity))}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 1640 ${height}" role="img" aria-label="Capacity of each completed plant">
    <style>
      .c-name{font:600 36px var(--sans);fill:${INK}}
      .c-sub{font:400 27px var(--sans);fill:${STONE}}
      .c-val{font:600 36px var(--sans);fill:${INK}}
    </style>${rows}</svg>`;
}

/** Typical on-grid connection, drawn as a single-line diagram. */
function onGridDiagram() {
  const box = (x, y, w, label, sub, strong = true) => `
    <rect x="${x}" y="${y}" width="${w}" height="128" rx="8" fill="#FFFFFF" stroke="${strong ? INK : ASH}" stroke-width="3"/>
    <text x="${x + w / 2}" y="${y + 58}" text-anchor="middle" class="d-label">${label}</text>
    <text x="${x + w / 2}" y="${y + 96}" text-anchor="middle" class="d-sub">${sub}</text>`;
  return `<svg viewBox="0 0 1640 500" role="img" aria-label="Typical on-grid solar connection">
    <style>
      .d-label{font:600 34px var(--sans);fill:${INK}}
      .d-sub{font:400 27px var(--sans);fill:${STONE}}
      .d-note{font:400 28px var(--sans);fill:${STONE}}
    </style>
    <path d="M252 84 H322 M574 84 H644 M956 84 H1026 M1278 84 H1348" stroke="${INK}" stroke-width="4" fill="none"/>
    <path d="M800 148 V318" stroke="${INK}" stroke-width="4" fill="none"/>
    ${box(2, 20, 250, 'Solar array', 'DC')}
    ${box(322, 20, 252, 'Inverter', 'DC to AC')}
    ${box(644, 20, 312, 'AC distribution', 'board')}
    ${box(1026, 20, 252, 'Net meter', 'two-way')}
    ${box(1348, 20, 290, 'Utility grid', 'distribution utility', false)}
    ${box(644, 318, 312, 'Building loads', 'lifts, pumps, lighting')}
    <text x="1026" y="372" class="d-note">Power is used on site first.</text>
    <text x="1026" y="414" class="d-note">Surplus is exported through</text>
    <text x="1026" y="456" class="d-note">the net meter.</text>
  </svg>`;
}

/** What the division does: [line of work, what it covers]. The company profile reads this too. */
export const SOLIS_SERVICES = [
      ['Solar power plants', 'Design, supply, installation, testing and commissioning of on-grid plants for factories, offices, institutions and housing societies'],
      ['Elevated solar pergolas', 'Panels raised on a steel frame high enough to walk under, so the terrace stays usable'],
      ['BIPV glass', 'Solar glass for canopies, skylights and facades that generates power and lets in daylight'],
      ['EV charging', 'AC and DC chargers for housing societies, offices and commercial sites, with the load extension handled through Sanyog'],
      ['Net metering and subsidies', 'Net-metering applications with the utility, and PM Surya Ghar subsidy paperwork for homes and housing societies'],
      ['On-site waste treatment', 'Segregation, collection and on-site treatment of organic and inorganic waste for housing societies, campuses and businesses'],
];

export function solisProfile({ logos, qr, block, photosRel }) {
  const plants = trackRecord('solis');
  const solar = keyFacts().find((f) => f.id === 'solar-capacity');
  const largest = plants.reduce((a, b) => (b.capacity.value > a.capacity.value ? b : a));
  const total = 8;
  const { photo, credits, used: usedPhotos } = photoSet(photosRel);
  const first = plants.at(-1).date.year;
  const last = plants[0].date.year;
  const smallest = plants.reduce((a, b) => (b.capacity.value < a.capacity.value ? b : a));
  const header = runningHeader({
    logo: `${logos}/solis-official.png`,
    logoAlt: 'Solis',
    right: 'Division profile · October 2026',
  });
  const page = (number, body, extra = {}) => sheet({ number, total, body, header, block, ...extra });

  const cover = sheet({
    number: 1,
    total,
    className: 'cover',
    sectionNumber: false,
    block,
    body: `
      <img class="cover-logo" src="${logos}/solis-official.png" alt="Solis">
      <div class="solis-motif">${SHAPES.sunDot('22mm', SUN)}</div>
      <div style="height: 40mm"></div>
      ${eyebrow('Division profile')}
      <h1>${esc(ONE_LINERS.Solis)}</h1>
      <p class="subtitle">${esc(CORE_LINE)}</p>
      <div class="cover-details">
        ${factRows([
          { label: 'Division of', value: COMPANY.legalName },
          { label: 'Web', value: `${COMPANY.web}/solis` },
        ])}
      </div>`,
  });

  const whoWeAre = page(
    2,
    `
    ${eyebrow('Who we are')}
    <h1>One accountable team, from site survey to net meter.</h1>
    <p>Solis is the clean-energy division of JC Apex Ventures (OPC) Pvt. Ltd., Mumbai. We design and build solar power plants, elevated solar pergolas, building-integrated photovoltaic (BIPV) glass and EV charging, and we handle the net-metering and subsidy applications. Because our engineering roots are in Mumbai's power utilities, plants are designed to meet utility requirements from the first application.</p>
    <p class="attribution">${esc(PROOF_LINE)}</p>
    ${factStrip([
      { value: solar.value, label: 'of solar delivered' },
      { value: String(plants.length), label: 'completed plants' },
      { value: '4', label: 'Mumbai utilities we file with' },
    ])}
    <h2 style="margin-top: 3mm">What we do</h2>
    ${specTable(['Line of work', 'What it covers'], SOLIS_SERVICES)}`,
  );

  const whatWeBuild = page(
    3,
    `
    ${eyebrow('What we build')}
    <h1>Four kinds of clean-energy infrastructure.</h1>
    <div class="tiles">
      ${[
        ['solis-rooftop', 'Solar power plants', 'On-grid plants on factory, office, institutional and housing society roofs, sized to the site and the load.'],
        ['solis-carport', 'Elevated pergolas and canopies', 'Panels raised on a steel frame high enough to walk or park under, so the terrace or parking stays in use.'],
        ['solis-bipv', 'BIPV glass', 'Solar glass for canopies, skylights and facades that generates power and lets in daylight.'],
        ['solis-ev', 'EV charging', 'AC and DC chargers for housing societies, offices and commercial sites, with the load extension handled through Sanyog.'],
      ]
        .map(([img, title, text]) => `<div class="tile">${photo(img, { height: '62mm' })}<h3>${esc(title)}</h3><p>${esc(text)}</p></div>`)
        .join('')}
    </div>`,
  );

  const record = page(
    4,
    `
    ${eyebrow('Track record')}
    <h1>${esc(solar.value)} of solar delivered across ${formatCount(plants.length)} plants.</h1>
    <p class="attribution">${esc(ATTRIBUTION_LINES.director)}</p>
    <div class="split-wide" style="margin-top: 4mm">
      <figure class="map">
        ${mapSvg('mumbai-region', plants.map((p, i) => ({ n: i + 1, lat: PLACES[p.id][0], lon: PLACES[p.id][1] })), { accent: SUN, ink: INK })}
        <figcaption class="caption">Mumbai region. ${esc(MAP_CREDIT)}</figcaption>
      </figure>
      ${pinList(plants.map((p, i) => ({ n: i + 1, title: p.client, sub: `${formatCapacity(p.capacity)} · ${p.location} · ${formatProjectDate(p.date)}` })))}
    </div>
    <div class="chart" style="margin-top: 6mm">
      <p class="chart-title">The largest plant, ${esc(formatCapacity(largest.capacity))} in ${esc(largest.location.split(', ').pop())}, was completed in ${esc(formatProjectDate(largest.date))}.</p>
      ${capacityChart(plants)}
      <p class="caption">Source: completion certificates on file. Capacities as stated in each certificate; the 2016 plant is stated in kW.</p>
    </div>`,
  );

  const plantCards = page(
    5,
    `
    ${eyebrow('Completed plants')}
    <h1>Four plants, from ${esc(formatCapacity(smallest.capacity))} to ${esc(formatCapacity(largest.capacity))}.</h1>
    <p class="lead" style="margin-bottom: 6mm">Each plant below is backed by a completion document on file. Values are rounded.</p>
    <div class="cards">
      ${plants
        .map((p, i) =>
          projectCard({
            tag: `${i + 1} · ${p.sector === 'government' ? 'Government building' : 'Industrial'}`,
            figure: formatCapacity(p.capacity),
            title: p.client,
            meta: `${p.location} · completed ${formatProjectDate(p.date)}`,
            rows: [
              ['Scope', p.scope],
              ['Equipment', p.equipment ?? 'Not stated'],
              ['Value', p.valueBracket ?? 'Not stated'],
            ],
          }),
        )
        .join('')}
    </div>`,
  );

  const howWeWork = page(
    6,
    `
    ${eyebrow('How we work')}
    <h1>Four steps, one point of contact.</h1>
    <div class="split">
      ${steps([
        { title: 'Site survey', text: 'We inspect the roof or terrace, check shade, structure and the existing electrical supply, and read the last twelve months of electricity bills.' },
        { title: 'Design', text: 'We size the plant to the site and the load, choose the mounting (a standard frame or an elevated pergola) and draw the single-line diagram.' },
        { title: 'Proposal', text: 'A costed proposal with the equipment list, expected generation, the net-metering route and any subsidy that applies. Estimates are marked as estimates.' },
        { title: 'Build and commission', text: 'Supply, installation, testing and commissioning, then the net-metering application and handover documents.' },
      ])}
      ${photo('own-terrace-survey', { height: '96mm', captionText: 'A terrace survey by our team, Mumbai, October 2026' })}
    </div>
    <div class="spacer"></div>
    ${photo('solis-install', { height: '62mm' })}`,
  );

  const connection = page(
    7,
    `
    ${eyebrow('Connection and approvals')}
    <h1>How an on-grid plant connects, and what we file for it.</h1>
    <div class="diagram">
      ${onGridDiagram()}
      <p class="caption">Typical arrangement. The exact layout depends on the site and the utility.</p>
    </div>
    <div class="two-col" style="margin-top: 9mm">
      <div>
        <h3>Net metering</h3>
        <p>We prepare and file the net-metering application with the utility (BEST, Adani Electricity, Tata Power or MSEDCL) and coordinate the meter change. Power is used on site first; surplus is exported and credited against the bill.</p>
      </div>
      <div>
        <h3>Subsidies</h3>
        <p>For homes and housing societies, we prepare the paperwork for the PM Surya Ghar rooftop solar scheme where it applies. The amount depends on the scheme rules at the time of application.</p>
      </div>
    </div>
    <div class="spacer"></div>
    ${factRows([
      { label: 'Equipment', value: `Tata Power Solar systems on ${formatCount(plants.filter((p) => p.equipment).length)} of the ${formatCount(plants.length)} completed plants` },
      { label: 'Utilities', value: 'BEST Undertaking, Adani Electricity, Tata Power, MSEDCL' },
      { label: 'Load extensions', value: 'Filed through Sanyog, our utility liaison division' },
    ])}`,
  );

  const people = `
    <h2>Who else joins a solar project</h2>
    ${factRows([
          { label: 'Sanyog', value: 'Load extensions and utility applications' },
          { label: 'Grid Apex', value: 'HT and LT electrical work, earthing and maintenance' },
          { label: 'Agrim', value: 'Coordinating project loan requirements' },
          { label: 'eMudran', value: 'Site boards, plant signage and EV parking signs' },
        ])}
    ${groupTable('Solis')}`;

  const back = page(8, contactPage({ email: 'solis@jcapexv.com', webPath: '/solis', qr, division: 'Solis', credits: `<div class="joins">${people}</div>${credits()}` }));

  return {
    key: 'solis',
    fileName: 'Solis',
    title: 'Solis division profile',
    theme: 'theme-solis',
    pages: [cover, whoWeAre, whatWeBuild, record, plantCards, howWeWork, connection, back],
    photos: usedPhotos(),
  };
}

export const solisShape = SHAPES.sunDot('2.6mm', SUN);
