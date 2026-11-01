// Tvasta division profile. Content: Antigravity/Tvasta_Brand/Tvasta_Brand_Guidelines.md
// (tier table and team from the Tvasta portfolio). Chennai Metro and the One International
// Centre fit-out are held back until confirmed (track-record.ts marks both 'confirm').

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
import { factStrip, peopleAndGroup, photoSet } from './visuals.mjs';

const RED = '#D72A1B';

const TIERS = [
  ['Finishes', 'Laminate', 'Acrylic, PU or veneer', 'Natural stone, veneer, bespoke'],
  ['Hardware', 'Quality basic fittings', 'Soft-close, branded', 'Premium fittings, with automation if wanted'],
  ['Lighting', 'Functional', 'Layered and cove', 'Architectural and scene-based'],
  ['Design input', 'Standard layouts', 'Custom layouts', 'Fully bespoke design'],
  ['Best for', 'Rental and first homes', 'Family homes and offices', 'Homes where every detail is custom'],
];

/** What the division does: [line of work, what it covers]. The company profile reads this too. */
export const TVASTA_SERVICES = [
      ['Space planning', 'Residential and commercial layouts, material and finish planning, lighting composition'],
      ['Interior design', 'Modular kitchens, carpentry, wardrobes and storage, wall finishes, architectural lighting'],
      ['Turnkey execution', 'Civil work, electrical fit-out, coordinated site execution, finishing'],
];

export function tvastaProfile({ logos, qr, block, photosRel }) {
  const total = 7;
  const { photo, credits, used: usedPhotos } = photoSet(photosRel);
  const header = runningHeader({
    logo: `${logos}/tvasta-dark.png`,
    logoAlt: 'Tvasta',
    right: 'Division profile · October 2026',
  });
  const page = (number, body, extra = {}) => sheet({ number, total, body, header, block, ...extra });
  const marker = `<span class="marker">${SHAPES.roofGable('2.8mm', RED, 1.5)}</span>`;
  const email = 'spacemgmt@jcapexv.com';

  const cover = sheet({
    number: 1,
    total,
    className: 'cover cover-dark',
    sectionNumber: false,
    block,
    body: darkCover({
      logo: `${logos}/tvasta-official.png`,
      logoAlt: 'Tvasta',
      logoHeight: '12mm',
      motif: SHAPES.roofGable('30mm', RED, 0.55),
      title: esc(ONE_LINERS.Tvasta),
      subtitle: CORE_LINE,
      lead: '',
      details: [
        { label: 'Division of', value: COMPANY.legalName },
        { label: 'Web', value: `${COMPANY.web}/tvasta` },
      ],
    }),
  });

  const whoWeAre = page(
    2,
    `
    ${eyebrow('Who we are')}
    <h1>Design and execution with the same people.</h1>
    <p>Tvasta is the interior design and turnkey fit-out division of JC Apex Ventures (OPC) Pvt. Ltd., Mumbai. Our architects and interior designers plan the space, design the interiors and carry out the civil and electrical work, so the client deals with one team from concept to handover. Electrical fit-out is planned with our sister division Grid Apex, so wiring is done once.</p>
    ${factStrip([
      { value: '3', label: 'tiers: Standard, Premium and Luxury' },
      { value: '6', label: 'architects and interior designers on the team' },
    ])}
    <h2 style="margin-top: 3mm">What we do</h2>
    ${specTable(['Line of work', 'What it covers'], TVASTA_SERVICES)}`,
  );

  const tiers = page(
    3,
    `
    ${eyebrow('Three tiers')}
    <h1>Every project in one of three tiers, then tailored to the space.</h1>
    <p class="lead">Each tier sets the finish, hardware, lighting and design input. Within a tier, the layout and materials are chosen for the client's space and budget.</p>
    ${specTable(['', 'Standard', 'Premium', 'Luxury'], TIERS.map(([row, ...cells]) => [row, ...cells]), 'tiers')}
    <p class="caption">Source: Tvasta portfolio, October 2026.</p>
    <div class="spacer"></div>
    ${photo('tvasta-living', { height: '78mm' })}`,
  );

  const spaces = page(
    4,
    `
    ${eyebrow('Spaces we design')}
    <h1>Homes and workplaces, room by room.</h1>
    <div class="tiles">
      ${[
        ['tvasta-kitchen', 'Kitchens', 'Modular kitchens in parallel, L-shaped and island layouts, with storage planned to the inch.'],
        ['tvasta-living-2', 'Living and dining', 'Layouts, wall finishes, storage and layered lighting.'],
        ['tvasta-kitchen-2', 'Open-plan homes', 'Living and kitchen planned as one space, with finishes that carry through.'],
        ['tvasta-office', 'Workplaces', 'Offices planned and fitted out as one scope, from layout to lighting.'],
      ]
        .map(([img, title, text]) => `<div class="tile">${photo(img, { height: '62mm' })}<h3>${esc(title)}</h3><p>${esc(text)}</p></div>`)
        .join('')}
    </div>
    <p class="caption" style="margin-top: 4mm">We also design bedrooms (wardrobes, loft storage, headboards) and balconies and terraces (built-in seating, planting and concealed lighting).</p>`,
  );

  const quotesAndTeam = page(
    5,
    `
    ${eyebrow('Quotes and people')}
    <h1>Every quote is itemised, and the same team designs and builds.</h1>
    <h2 style="margin-top: 2mm">What every quote lists</h2>
    ${factRows([
      { label: 'Finishes', value: 'Material and grade for every surface' },
      { label: 'Hardware', value: 'Brand and type for hinges, channels and fittings' },
      { label: 'Lighting', value: 'Fixture type and placement, room by room' },
      { label: 'Quantities', value: 'Item by item, so two quotes can be compared line by line' },
      { label: 'Drawings', value: 'Layouts and elevations signed off before work starts' },
    ])}
    <h2>The design team</h2>
    <p>Three architects and three interior designers plan, draw and supervise every project, from the first layout to the snag list.</p>`,
  );

  const howWeWork = page(
    6,
    `
    ${eyebrow('How we work')}
    <h1>Understand, plan, execute, refine.</h1>
    <div class="split">
      ${steps([
        { title: 'Understand', text: "We listen to how the space will be used and agree the tier, the budget and the client's style." },
        { title: 'Plan', text: 'Layouts, drawings and a material schedule. Nothing is built until the client signs them off.' },
        { title: 'Execute', text: 'Civil, electrical and carpentry work under one site lead, with electrical changes planned with Grid Apex.' },
        { title: 'Refine', text: 'A snag list, finishing and handover once every item on the list is closed.' },
      ])}
      ${photo('agrim-plans', { height: '110mm' })}
    </div>`,
  );

  const people = peopleAndGroup({
      photo,
      division: 'Tvasta',
      joinsTitle: 'Who else joins an interior project',
      joins: [
        ['Grid Apex', 'Electrical fit-out, distribution boards and earthing'],
        ['Sanyog', 'Load changes and meter shifts with the utility'],
        ['eMudran', 'Signage, nameplates and printed finishes'],
        ['Agrim', 'Coordinating project loan requirements'],
      ],
    });

  const back = page(7, contactPage({ email, webPath: '/tvasta', qr, division: 'Tvasta', credits: `<div class="joins">${people}</div>${credits()}` }));

  return {
    key: 'tvasta',
    fileName: 'Tvasta',
    title: 'Tvasta division profile',
    theme: 'theme-tvasta',
    pages: [cover, whoWeAre, tiers, spaces, quotesAndTeam, howWeWork, back],
    photos: usedPhotos(),
  };
}

export const tvastaShape = SHAPES.roofGable('2.6mm', RED, 1.5);
