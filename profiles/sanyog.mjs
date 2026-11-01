// Sanyog division profile. Content: Antigravity/Sanyog_Brand/Sanyog_Brand_Guidelines.md.
// Sanyog has no case record yet, so it shows no counts (guidelines section 3).

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
import { factStrip, peopleAndGroup, photoSet, projectCard } from './visuals.mjs';

const BLUE = '#2C5ED4';
const INK = '#0B132B';
const MUTED = '#516285';

/** The grievance route as a three-stage line, Signal Blue for the path. */
function grievanceRoute() {
  const stages = [
    ['Complaint to the utility', 'in writing, with the account', 'number and documents'],
    ['CGRF', "the utility's Consumer Grievance", 'Redressal Forum'],
    ['Electricity Ombudsman', 'appeal against a CGRF order,', 'under MERC regulations'],
  ];
  const w = 470;
  const gap = 115;
  return `<svg viewBox="0 0 1640 210" role="img" aria-label="Grievance route">
    <style>
      .g-n{font:400 46px var(--serif);fill:${BLUE}}
      .g-label{font:600 31px var(--sans);fill:${INK}}
      .g-sub{font:400 25px var(--sans);fill:${MUTED}}
    </style>
    ${stages
      .map(([label, a, b], i) => {
        const x = i * (w + gap);
        const arrow = i < stages.length - 1
          ? `<path d="M${x + w + 18} 46 H${x + w + gap - 22}" stroke="${BLUE}" stroke-width="5"/><path d="M${x + w + gap - 34} 34 L${x + w + gap - 18} 46 L${x + w + gap - 34} 58" fill="none" stroke="${BLUE}" stroke-width="5"/>`
          : '';
        return `<rect x="${x}" y="4" width="${w}" height="190" rx="8" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>
          <text x="${x + 26}" y="62" class="g-n">${i + 1}</text>
          <text x="${x + 70}" y="58" class="g-label">${label}</text>
          <text x="${x + 26}" y="122" class="g-sub">${a}</text>
          <text x="${x + 26}" y="156" class="g-sub">${b}</text>${arrow}`;
      })
      .join('')}
  </svg>`;
}

/** What the division does: [line of work, what it covers]. The company profile reads this too. */
export const SANYOG_SERVICES = [
      ['Connections', 'New power supply connections; temporary supply for construction'],
      ['Load and phase', 'Sanctioned load extensions (for lifts, EV charging, air conditioning); single-phase to three-phase conversion'],
      ['Records and billing', 'Change of name and billing address; electricity bill and tariff category issues'],
      ['Complaints and compliance', 'CGRF consumer grievances; HT complaints; meter disconnections; wiring test reports arranged through a licensed electrical contractor'],
      ['Licences', 'Electrical licence applications through the PWD Electrical Inspectorate'],
];

export function sanyogProfile({ logos, qr, block, photosRel }) {
  const total = 7;
  const { photo, credits, used: usedPhotos } = photoSet(photosRel);
  const header = runningHeader({
    logo: `${logos}/sanyog-official.png`,
    logoAlt: 'Sanyog',
    right: 'Division profile · October 2026',
  });
  const page = (number, body, extra = {}) => sheet({ number, total, body, header, block, ...extra });
  const email = 'licenses@jcapexv.com';

  const cover = sheet({
    number: 1,
    total,
    className: 'cover cover-dark',
    sectionNumber: false,
    block,
    body: darkCover({
      logo: `${logos}/sanyog-white.png`,
      logoAlt: 'Sanyog',
      logoHeight: '22mm',
      motif: SHAPES.speechBubble('30mm', BLUE, 0.5),
      title: esc(ONE_LINERS.Sanyog),
      subtitle: CORE_LINE,
      lead: '',
      details: [
        { label: 'Division of', value: COMPANY.legalName },
        { label: 'Web', value: `${COMPANY.web}/sanyog` },
      ],
    }),
  });

  const whoWeAre = page(
    2,
    `
    ${eyebrow('Who we are')}
    <h1>We deal with the utility, so you do not have to.</h1>
    <p>Sanyog is the power liaison and grievance division of JC Apex Ventures (OPC) Pvt. Ltd., Mumbai. We prepare the paperwork, coordinate the technical requirements and follow up with the utility for homes, housing societies, businesses and industrial sites. We know which desk handles what, and we file the right form once.</p>
    <p class="attribution">${esc(PROOF_LINE)}</p>
    ${factStrip([
      { value: '4', label: 'Mumbai distribution utilities we work with' },
      { value: '2', label: 'grievance forums: the CGRF and the Ombudsman' },
    ])}
    <h2 style="margin-top: 3mm">What we do</h2>
    ${specTable(['Line of work', 'What it covers'], SANYOG_SERVICES)}`,
  );

  const whatWeHandle = page(
    3,
    `
    ${eyebrow('What we handle')}
    <h1>From a new meter to a disputed bill.</h1>
    <div class="tiles">
      ${[
        ['sanyog-meters', 'Connections and meters', 'New connections, temporary supply for construction, and meter changes.'],
        ['grid-distribution', 'Load and phase', 'Load extensions for lifts, EV chargers and air conditioning; single-phase to three-phase conversion.'],
        ['sanyog-meter-analog', 'Bills and tariff category', 'Change of name or billing address, wrong bills and tariff category corrections.'],
        ['grid-electrician', 'Complaints and inspections', 'CGRF grievances, HT complaints, disconnections, and wiring test reports arranged through a licensed contractor.'],
      ]
        .map(([img, title, text]) => `<div class="tile">${photo(img, { height: '62mm' })}<h3>${esc(title)}</h3><p>${esc(text)}</p></div>`)
        .join('')}
    </div>`,
  );

  const whereWeWork = page(
    4,
    `
    ${eyebrow('Where we work')}
    <h1>Four utilities, one desk.</h1>
    <p class="lead">Mumbai is served by four distribution utilities, each with its own procedures. We work with all of them, and with the forums that hear consumer grievances.</p>
    ${specTable(
      ['Utility or forum', 'Where it applies', 'What we handle there'],
      [
        ['BEST Undertaking', 'Mumbai island city', 'Connections, load changes, name and tariff changes, complaints'],
        ['Adani Electricity Mumbai', 'Mumbai suburbs', 'Connections, load changes, name and tariff changes, complaints'],
        ['Tata Power', 'Across Mumbai, alongside BEST and Adani', 'Connections, load changes, name and tariff changes, complaints'],
        ['MSEDCL (Mahavitaran)', 'Thane, Navi Mumbai and the rest of Maharashtra', 'Connections, load changes, HT complaints, tariff issues'],
        ['CGRF', "Each utility's grievance forum", 'Consumer grievances on billing, meters and disconnections'],
        ['Electricity Ombudsman', 'Maharashtra, under MERC regulations', 'Appeals against CGRF orders'],
        ['PWD Electrical Inspectorate', 'Maharashtra', 'Electrical licence applications'],
      ],
    )}
    <h2>A typical document checklist</h2>
    <p class="lead-small">For a sanctioned load extension, we usually ask for:</p>
    ${factRows([
      { label: '1', value: 'The latest electricity bill' },
      { label: '2', value: 'Proof of ownership or occupancy' },
      { label: '3', value: 'A wiring test report from a licensed electrical contractor' },
      { label: '4', value: 'Details of the load to be added' },
      { label: '5', value: "The society's no-objection letter, where the meter is in a housing society" },
    ])}
    <p class="caption">Typical list. Each utility sets its own requirements, and we confirm them before filing.</p>`,
  );

  const howWeWork = page(
    5,
    `
    ${eyebrow('How we work')}
    <h1>One file in, one result out.</h1>
    <div class="split">
      ${steps([
        { title: 'Document check', text: 'We review what you have against what the utility will ask for, and give you one checklist.' },
        { title: 'Application', text: 'We prepare and file the application, and share the application number with you.' },
        { title: 'Utility inspection', text: 'We coordinate the site inspection and any wiring test report the utility needs.' },
        { title: 'Sanction', text: 'We follow up until the sanction is issued and tell you what is payable to the utility.' },
        { title: 'Meter installation', text: 'We stay with it until the new meter is fitted or the change shows on your bill.' },
      ])}
      ${photo('agrim-plans', { height: '120mm' })}
    </div>`,
  );

  const grievances = page(
    6,
    `
    ${eyebrow('Grievances')}
    <h1>When the utility gets it wrong, we take it to the forum.</h1>
    <div class="diagram">
      <p class="chart-title">The grievance route</p>
      ${grievanceRoute()}
    </div>
    <div class="cards" style="margin-top: 7mm">
      ${projectCard({ tag: 'Billing', figure: 'Bills', title: 'Disputed bills and arrears', meta: 'Wrong, inflated or back-dated bills', rows: [['We do', 'Check the bill history, complain to the utility, then go to the CGRF if needed'], ['You get', 'A written record of every step']] })}
      ${projectCard({ tag: 'Meters', figure: 'Meters', title: 'Faulty meters', meta: 'Meters that run fast, stop or were changed', rows: [['We do', 'Request a meter test and follow the complaint through'], ['You get', 'The test result and the corrected bill, or the forum decision']] })}
      ${projectCard({ tag: 'Supply', figure: 'Supply', title: 'Disconnection notices', meta: 'Notices and supply cut off', rows: [['We do', 'Reply to the notice and represent you before the CGRF where it is disputed'], ['You get', 'One person following the case']] })}
      ${projectCard({ tag: 'EV charging', figure: 'Load', title: 'Load for EV chargers', meta: 'Housing societies adding chargers', rows: [['We do', 'Check whether the supply can take the extra load, then file the extension'], ['With', 'Chargers installed by Solis']] })}
    </div>
    <p class="margin-note" style="margin-top: 6mm">CGRF decisions depend on the facts of each case. We tell you at the start if a case is weak.</p>`,
  );

  const people = peopleAndGroup({
      photo,
      division: 'Sanyog',
      joinsTitle: 'Who else joins a utility job',
      joins: [
        ['Grid Apex', 'Electrical upgrades the utility asks for before a sanction'],
        ['Solis', 'Solar net metering and EV chargers'],
        ['Tvasta', 'Load changes during an interior refit'],
        ['Agrim', 'Coordinating project loan requirements'],
      ],
    });

  const back = page(7, contactPage({ email: `${email} · consumercmpl@jcapexv.com`, webPath: '/sanyog', qr, division: 'Sanyog', credits: `<div class="joins">${people}</div>${credits()}` }));

  return {
    key: 'sanyog',
    fileName: 'Sanyog',
    title: 'Sanyog division profile',
    theme: 'theme-sanyog',
    pages: [cover, whoWeAre, whatWeHandle, whereWeWork, howWeWork, grievances, back],
    photos: usedPhotos(),
  };
}

export const sanyogShape = SHAPES.speechBubble('2.6mm', BLUE, 1.3);
