// Agrim division profile. Content: Antigravity/Agrim_Brand/Agrim_Brand_Guidelines.md.
// The boundary statement appears unchanged (guidelines 1.2). DPR preparation is left out
// until its scope is confirmed, and the EV network study is not shown as client work.

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
  runningHeader,
  sheet,
  specTable,
  steps,
} from './lib.mjs';
import { peopleAndGroup, photoSet } from './visuals.mjs';

const EMERALD = '#047857';
const INK = '#06281E';
const MUTED = '#527364';

export const BOUNDARY =
  'Agrim does not lend money or provide finance. We help clients understand, prepare and coordinate their project loan and advance requirements.';

/** Where Agrim sits between the project and the lender. The lender's box is grey: the decision is theirs. */
function roleDiagram() {
  const boxes = [
    ['Project team', 'Solis, Grid Apex or Tvasta', 'cost sheet and schedule', INK],
    ['Agrim', 'loan or advance', 'requirement file', EMERALD],
    ['Client', 'reviews, signs and', 'submits the file', INK],
    ['Lender', "the client's bank or", 'NBFC, which decides', '#94A3B8'],
  ];
  const w = 360;
  const gap = 66;
  return `<svg viewBox="0 0 1640 200" role="img" aria-label="Where Agrim sits in a project">
    <style>
      .r-label{font:600 31px var(--sans);fill:${INK}}
      .r-sub{font:400 24px var(--sans);fill:${MUTED}}
    </style>
    ${boxes
      .map(([label, a, b, stroke], i) => {
        const x = 4 + i * (w + gap);
        const arrow =
          i < boxes.length - 1
            ? `<path d="M${x + w + 10} 96 H${x + w + gap - 12}" stroke="${EMERALD}" stroke-width="5"/><path d="M${x + w + gap - 24} 84 L${x + w + gap - 10} 96 L${x + w + gap - 24} 108" fill="none" stroke="${EMERALD}" stroke-width="5"/>`
            : '';
        return `<rect x="${x}" y="8" width="${w}" height="176" rx="8" fill="#FFFFFF" stroke="${stroke}" stroke-width="${i === 1 ? 5 : 3}"/>
          <text x="${x + 24}" y="62" class="r-label">${label}</text>
          <text x="${x + 24}" y="112" class="r-sub">${a}</text>
          <text x="${x + 24}" y="146" class="r-sub">${b}</text>${arrow}`;
      })
      .join('')}
  </svg>`;
}

/** What the division does: [line of work, what it covers]. The company profile reads this too. */
export const AGRIM_SERVICES = [
      ['Project loan requirements', 'Working out what the project needs and preparing the information a lender will ask for'],
      ['Advance requirements', 'Planning milestone advances connected with the project work'],
      ['Understanding financial needs', "Explaining the project's costs and cash needs in plain terms"],
      ['Coordination', "Aligning the project scope, schedule and paperwork with the client's lender"],
];

export function agrimProfile({ logos, qr, block, photosRel }) {
  const total = 7;
  const { photo, credits, used: usedPhotos } = photoSet(photosRel);
  const header = runningHeader({
    logo: `${logos}/agrim-dark.png`,
    logoAlt: 'Agrim',
    right: 'Division profile · October 2026',
  });
  const page = (number, body, extra = {}) => sheet({ number, total, body, header, block, ...extra });
  const email = 'admin@jcapexv.com';

  const cover = sheet({
    number: 1,
    total,
    className: 'cover cover-dark',
    sectionNumber: false,
    block,
    background: `<div class="cover-photo split" style="height: 92mm"><img src="${photosRel}/agrim-plans.jpg" alt="" style="height: 92mm; opacity: 0.55"></div>`,
    body: darkCover({
      logo: `${logos}/agrim-official.png`,
      logoAlt: 'Agrim',
      logoHeight: '20mm',
      motif: SHAPES.foldedCorner('30mm', '#10B981', 0.5),
      title: esc(ONE_LINERS.Agrim),
      subtitle: CORE_LINE,
      lead: '',
      details: [
        { label: 'Division of', value: COMPANY.legalName },
        { label: 'Web', value: `${COMPANY.web}/agrim` },
      ],
    }),
  });

  const whoWeAre = page(
    2,
    `
    ${eyebrow('Who we are')}
    <h1>A sound project should not stall over paperwork.</h1>
    <p>Agrim is the project finance coordination division of JC Apex Ventures (OPC) Pvt. Ltd., Mumbai. We help clients understand and prepare the loan and advance requirements connected with their projects, especially projects carried out by our other divisions: a Solis solar plant, a Grid Apex electrical upgrade or a Tvasta fit-out.</p>
    <p class="attribution">${esc(PROOF_LINE)}</p>
    <h2 style="margin-top: 4mm">What a client receives</h2>
    <div class="split">
      ${specTable(['Example: 100 kWp rooftop solar plant', 'Amount'], [
        ['Project cost, from the Solis quote', '₹50 lakh'],
        ['Paid by the client', '₹15 lakh'],
        ['Loan requirement', '₹35 lakh'],
        ['Advance 1: order placed', '₹15 lakh'],
        ['Advance 2: panels on site', '₹15 lakh'],
        ['Advance 3: commissioning', '₹5 lakh'],
      ], 'cost-sheet')}
      <p class="margin-note">One page that ties the loan to the work: how much, what for, and when each advance is needed. Figures here are illustrative.</p>
    </div>
    <h2 style="margin-top: 3mm">What we do</h2>
    ${specTable(['Line of work', 'What it covers'], AGRIM_SERVICES)}`,
  );

  const role = page(
    3,
    `
    ${eyebrow('Where Agrim fits')}
    <h1>We prepare the file. The lender decides.</h1>
    <p class="lead">Agrim sits between the project and the client's lender. We make sure the loan or advance requirement matches the project the engineering team has priced, so the lender sees one consistent set of numbers.</p>
    <div class="diagram">
      ${roleDiagram()}
      <p class="caption">The lender is the client's own bank or NBFC. Agrim is not part of the lending decision.</p>
    </div>
    <h2>What Agrim does not do</h2>
    ${factRows([
      { label: 'Lending', value: 'Agrim does not lend money or provide finance' },
      { label: 'Approvals', value: 'Agrim does not approve, guarantee or promise any loan' },
      { label: 'Terms', value: 'Agrim does not quote interest rates or approval times' },
    ])}`,
  );

  const examples = page(
    4,
    `
    ${eyebrow('Where it helps')}
    <h1>One set of numbers for the project and the loan file.</h1>
    <div class="tiles">
      <div class="tile">${photo('solis-rooftop', { height: '58mm' })}<h3>A solar plant (Solis)</h3><p>The loan requirement is built from the plant's cost sheet and expected generation, so repayment can be shown against savings.</p></div>
      <div class="tile">${photo('grid-switchgear', { height: '58mm' })}<h3>An electrical upgrade (Grid Apex)</h3><p>Advances are planned against the milestones in the installation schedule.</p></div>
      <div class="tile">${photo('tvasta-living', { height: '58mm' })}<h3>An interior fit-out (Tvasta)</h3><p>The requirement follows the tier and the itemised quote, stage by stage.</p></div>
      <div class="tile"><div class="photo-frame shape-frame" style="height: 58mm">${SHAPES.foldedCorner('22mm', EMERALD, 0.6)}</div><h3>Your own project</h3><p>Where the work is done by another contractor, we work from that contractor's quote in the same way.</p></div>
    </div>
    <p class="caption" style="margin-top: 4mm">Illustrative examples of how Agrim works with each division; not descriptions of specific client cases.</p>`,
  );

  const howWeWork = page(
    5,
    `
    ${eyebrow('How we work')}
    <h1>Four steps, alongside the project.</h1>
    <div>
      ${steps([
        { title: 'Understand the requirement', text: 'We find out what the client needs to fund, when, and how much they will contribute themselves.' },
        { title: 'Match it to the project', text: 'We work from the cost sheet and schedule prepared by the engineering division, so the numbers agree.' },
        { title: 'Prepare the file', text: 'We put together the information the lender asks for, in the order the lender wants it.' },
        { title: 'Coordinate', text: 'We stay in touch with the client and the lender until the file is complete, and plan advances against project milestones.' },
      ])}
    </div>`,
  );

  const documents = page(
    6,
    `
    ${eyebrow('Documents')}
    <h1>What a lender usually asks for, and why.</h1>
    ${specTable(
      ['Document', 'Why the lender asks for it'],
      [
        ['Project quote and cost sheet', 'Shows what the money is for'],
        ['Identity and address documents', 'Required for any loan application'],
        ['Recent financial and bank statements', 'Shows the ability to repay'],
        ['Details of existing loans', 'Shows current commitments'],
        ['Project schedule with milestones', 'Links advances and disbursement to the work'],
      ],
    )}
    <p class="caption">Typical list. Each lender sets its own requirements.</p>
    <p class="margin-note" style="margin-top: 8mm">Figures in any Agrim file come from a real quote, a measured yield or a priced bill of quantities. Estimates are labelled as estimates.</p>`,
  );

  const people = peopleAndGroup({
      photo,
      division: 'Agrim',
      joinsTitle: 'Where the numbers come from',
      joins: [
        ['Solis', 'Cost sheet and generation estimate for solar plants'],
        ['Grid Apex', 'Cost sheet and schedule for electrical upgrades'],
        ['Tvasta', 'Tier and itemised quote for interior fit-outs'],
      ],
    });

  const back = page(7, contactPage({ email, webPath: '/agrim', qr, division: 'Agrim', credits: `<div class="joins">${people}</div>${credits()}` }));

  return {
    key: 'agrim',
    fileName: 'Agrim',
    title: 'Agrim division profile',
    theme: 'theme-agrim',
    pages: [cover, whoWeAre, role, examples, howWeWork, documents, back],
    photos: usedPhotos(),
  };
}

export const agrimShape = SHAPES.foldedCorner('2.6mm', EMERALD, 1.3);
