/**
 * Copy for the six division pages, all built on DivisionPage.
 *
 * Source: the client-ready division profiles (profiles/*.mjs, October 2026), which follow the
 * messaging framework. Services are word for word, so the website and the PDFs say the same
 * thing; tests/tier1-features/r13-division-pages.test.mjs checks that. Facts with "Confirm"
 * status in the proof register (brand guidelines 6) are left out.
 */

import type { PhotoKey } from './photos';
import { formatCount, keyFacts, trackRecord } from './track-record';

export type IconKey = 'plug' | 'sun' | 'layout' | 'printer' | 'landmark' | 'zap';

export interface Step {
  title: string;
  text: string;
}

export interface Question {
  q: string;
  a: string;
}

/** One block in a division's proof section. Track-record blocks read src/content/track-record.ts. */
export type ProofBlock =
  | { kind: 'table'; title?: string; headers: string[]; rows: string[][]; caption?: string }
  | { kind: 'facts'; title?: string; rows: { label: string; value: string }[]; caption?: string }
  | { kind: 'note'; text: string }
  | { kind: 'hotels'; photos: PhotoKey[] }
  | { kind: 'creative-credits' }
  | { kind: 'plants' };

/** A section only one division needs, placed between its proof and its process. */
export type FeatureSection =
  | { kind: 'terrace-comparison'; eyebrow: string; title: string; text: string }
  | {
      kind: 'connection';
      eyebrow: string;
      title: string;
      columns: [string, string][];
      facts: { label: string; value: string }[];
    };

export interface DivisionContent {
  slug: string;
  name: string;
  href: string;
  icon: IconKey;
  /** Meta description. */
  description: string;
  /** Hero headline: the benefit, in the division's own words. */
  title: string;
  /** Hero paragraph: who we are and who we work for. */
  intro: string;
  /** The Director's proof line suits the electrical and finance divisions, not interiors or print (client decision). */
  showProofLine: boolean;
  heroPhoto: PhotoKey;
  services: [string, string][];
  proof: { eyebrow: string; title: string; text?: string; blocks: ProofBlock[] };
  stepsTitle: string;
  steps: Step[];
  faq: Question[];
  /** Other divisions that join a project, and what they bring (messaging framework M3). */
  joins: [string, string][];
  contact: { emails: string[]; note?: string };
  actions: { label: string; href: string }[];
  /** Headline figures under the hero, from the track record. */
  facts?: { value: string; label: string }[];
  features?: FeatureSection[];
  /** Our own photograph beside the process, when we have one. */
  stepsPhoto?: { src: string; width: number; height: number; alt: string; caption: string };
  /** An enquiry form in place of the contact buttons; the estimate fills it in. */
  enquiryForm?: { to: string; cc: string; subject: string };
}

export const gridApex: DivisionContent = {
  slug: 'grid-apex',
  name: 'Grid Apex',
  href: '/grid-apex',
  icon: 'zap',
  description:
    'Grid Apex installs, tests, commissions and maintains HT and LT electrical systems for industrial, commercial, hospitality and residential sites in Mumbai.',
  title: 'One engineer accountable, from drawings to energisation.',
  intro:
    'Grid Apex is the electrical engineering division of JC Apex Ventures. We install, test, commission and maintain High Tension (HT) and Low Tension (LT) electrical systems for industrial, commercial, hospitality and residential sites.',
  showProofLine: true,
  heroPhoto: 'grid-switchgear',
  services: [
    ['HT works', 'HT installation and commissioning; HT panel and switchgear works; transformer installation, testing and maintenance; underground and overhead HT cable laying; distribution system support'],
    ['LT works', 'Wiring for residential, commercial and industrial premises; LT panels and distribution boards; indoor and outdoor lighting; earthing and lightning protection'],
    ['Maintenance and AMC', 'Preventive maintenance, testing, breakdown support and annual maintenance contracts'],
    ['Government tender empanelment', 'Advice that helps electrical contracting firms get empanelled with government bodies and bid for tenders in their own name'],
  ],
  proof: {
    eyebrow: 'Track record',
    title: 'HT electrical work at 14 hospitality properties.',
    blocks: [{ kind: 'hotels', photos: ['hotel-taj-palace', 'hotel-taj-lands-end', 'hotel-trident-bkc'] }],
  },
  stepsTitle: 'From survey to energisation, in five steps.',
  steps: [
    { title: 'Survey and load study', text: 'We visit the site, record the existing supply and equipment, and work out the connected and maximum demand.' },
    { title: 'Design and drawings', text: 'Single-line diagram, cable and switchgear schedules, and the layout of panels and the transformer.' },
    { title: 'Approvals', text: 'We prepare drawings and documents for Electrical Inspectorate approval. Utility sanctions and load changes are filed through Sanyog.' },
    { title: 'Installation and commissioning', text: 'Installation, testing and commissioning, with test reports handed over at energisation.' },
    { title: 'Maintenance', text: 'Preventive maintenance, periodic testing and breakdown support, under an annual contract if the client wants one.' },
  ],
  faq: [
    {
      q: 'Who arranges the Electrical Inspectorate approval?',
      a: 'We prepare the drawings and documents for Electrical Inspectorate approval. Utility sanctions and load changes are filed through Sanyog, our liaison division.',
    },
    {
      q: 'Do you offer annual maintenance contracts?',
      a: 'Yes. Preventive maintenance, periodic testing and breakdown support, under an annual contract if you want one, with one point of contact for the whole installation.',
    },
    {
      q: 'What safety standards do you follow?',
      a: 'Central Electricity Authority safety regulations on every HT and LT job, with test reports handed over at energisation.',
    },
    {
      q: 'Where have you worked?',
      a: 'Our hospitality work covers Mumbai, Navi Mumbai, Aurangabad and Jodhpur.',
    },
  ],
  joins: [
    ['Sanyog', 'Load sanctions, connections and utility applications'],
    ['Solis', 'Rooftop solar, pergolas and EV charging'],
    ['Tvasta', 'Interior fit-out where electrical work is part of a refit'],
    ['Agrim', 'Coordinating project loan requirements'],
  ],
  contact: { emails: ['admin@jcapexv.com'] },
  actions: [{ label: 'Email Grid Apex', href: 'mailto:admin@jcapexv.com?subject=Grid%20Apex%20enquiry' }],
};

export const sanyog: DivisionContent = {
  slug: 'sanyog',
  name: 'Sanyog',
  href: '/sanyog',
  icon: 'plug',
  description:
    'Sanyog handles power connections, load changes, bill disputes and CGRF grievances with BEST, Adani Electricity, Tata Power and MSEDCL in Mumbai.',
  title: 'We deal with the utility, so you do not have to.',
  intro:
    'Sanyog is the power liaison and grievance division of JC Apex Ventures. We prepare the paperwork, coordinate the technical requirements and follow up with the utility for homes, housing societies, businesses and industrial sites. We know which desk handles what, and we file the right form once.',
  showProofLine: true,
  heroPhoto: 'sanyog-meters',
  services: [
    ['Connections', 'New power supply connections; temporary supply for construction'],
    ['Load and phase', 'Sanctioned load extensions (for lifts, EV charging, air conditioning); single-phase to three-phase conversion'],
    ['Records and billing', 'Change of name and billing address; electricity bill and tariff category issues'],
    ['Complaints and compliance', 'CGRF consumer grievances; HT complaints; meter disconnections; certified wiring test reports'],
    ['Licences', 'Electrical licence applications through the PWD Electrical Inspectorate'],
  ],
  proof: {
    eyebrow: 'Where we work',
    title: 'Four utilities, one desk.',
    blocks: [
      {
        kind: 'table',
        headers: ['Utility or forum', 'Where it applies', 'What we handle there'],
        rows: [
          ['BEST Undertaking', 'Mumbai island city', 'Connections, load changes, name and tariff changes, complaints'],
          ['Adani Electricity Mumbai', 'Mumbai suburbs', 'Connections, load changes, name and tariff changes, complaints'],
          ['Tata Power', 'Across Mumbai, alongside BEST and Adani', 'Connections, load changes, name and tariff changes, complaints'],
          ['MSEDCL (Mahavitaran)', 'Thane, Navi Mumbai and the rest of Maharashtra', 'Connections, load changes, HT complaints, tariff issues'],
          ['CGRF', "Each utility's grievance forum", 'Consumer grievances on billing, meters and disconnections'],
          ['Electricity Ombudsman', 'Maharashtra, under MERC regulations', 'Appeals against CGRF orders'],
          ['PWD Electrical Inspectorate', 'Maharashtra', 'Electrical licence applications'],
        ],
      },
      {
        kind: 'facts',
        title: 'A typical document checklist',
        rows: [
          { label: '1', value: 'The latest electricity bill' },
          { label: '2', value: 'Proof of ownership or occupancy' },
          { label: '3', value: 'A wiring test report from a licensed electrical contractor' },
          { label: '4', value: 'Details of the load to be added' },
          { label: '5', value: "The society's no-objection letter, where the meter is in a housing society" },
        ],
        caption: 'Typical list. Each utility sets its own requirements, and we confirm them before filing.',
      },
    ],
  },
  stepsTitle: 'One file in, one result out.',
  steps: [
    { title: 'Document check', text: 'We review what you have against what the utility will ask for, and give you one checklist.' },
    { title: 'Application', text: 'We prepare and file the application, and share the application number with you.' },
    { title: 'Utility inspection', text: 'We coordinate the site inspection and any wiring test report the utility needs.' },
    { title: 'Sanction', text: 'We follow up until the sanction is issued and tell you what is payable to the utility.' },
    { title: 'Meter installation', text: 'We stay with it until the new meter is fitted or the change shows on your bill.' },
  ],
  faq: [
    {
      q: 'My bill looks wrong. What can you do?',
      a: 'We check the bill history and complain to the utility. If that does not resolve it, we take it to the CGRF, and you get a written record of every step.',
    },
    {
      q: 'My meter seems to run fast. What happens next?',
      a: 'We request a meter test and follow the complaint through. You get the test result and the corrected bill, or the forum decision.',
    },
    {
      q: 'We received a disconnection notice. Can you help?',
      a: 'Yes. We reply to the notice and represent you before the CGRF where it is disputed, with one person following the case.',
    },
    {
      q: 'Our housing society wants EV chargers. Will the supply take it?',
      a: 'We check whether the supply can take the extra load, then file the load extension. Solis can install the chargers.',
    },
  ],
  joins: [
    ['Grid Apex', 'Electrical upgrades the utility asks for before a sanction'],
    ['Solis', 'Solar net metering and EV chargers'],
    ['Tvasta', 'Load changes during an interior refit'],
    ['Agrim', 'Coordinating project loan requirements'],
  ],
  contact: { emails: ['licenses@jcapexv.com', 'consumercmpl@jcapexv.com'] },
  actions: [
    { label: 'Report a bill or supply problem', href: '/electricity-grievances' },
    { label: 'Licences and registrations', href: '/licenses' },
  ],
};

export const tvasta: DivisionContent = {
  slug: 'tvasta',
  name: 'Tvasta',
  href: '/tvasta',
  icon: 'layout',
  description:
    'Tvasta designs and builds interiors for homes and workplaces in Mumbai, in three clear tiers: Standard, Premium and Luxury.',
  title: 'Design and execution with the same people.',
  intro:
    'Tvasta is the interior design and turnkey fit-out division of JC Apex Ventures. Our architects and interior designers plan the space, design the interiors and carry out the civil and electrical work, so you deal with one team from concept to handover.',
  showProofLine: false,
  heroPhoto: 'tvasta-living',
  services: [
    ['Space planning', 'Residential and commercial layouts, material and finish planning, lighting composition'],
    ['Interior design', 'Modular kitchens, carpentry, wardrobes and storage, wall finishes, architectural lighting'],
    ['Turnkey execution', 'Civil work, electrical fit-out, coordinated site execution, finishing'],
  ],
  proof: {
    eyebrow: 'Three tiers',
    title: 'Every project in one of three tiers, then tailored to the space.',
    blocks: [
      {
        kind: 'table',
        headers: ['', 'Standard', 'Premium', 'Luxury'],
        rows: [
          ['Finishes', 'Laminate', 'Acrylic, PU or veneer', 'Natural stone, veneer, bespoke'],
          ['Hardware', 'Quality basic fittings', 'Soft-close, branded', 'Premium imported, automated'],
          ['Lighting', 'Functional', 'Layered and cove', 'Architectural and scene-based'],
          ['Design input', 'Standard layouts', 'Custom layouts', 'Fully bespoke design'],
          ['Best for', 'Value-focused homes', 'Modern family homes', 'Signature residences'],
        ],
        caption: 'Source: Tvasta portfolio, October 2026.',
      },
      {
        kind: 'facts',
        title: 'What every quote lists',
        rows: [
          { label: 'Finishes', value: 'Material and grade for every surface' },
          { label: 'Hardware', value: 'Brand and type for hinges, channels and fittings' },
          { label: 'Lighting', value: 'Fixture type and placement, room by room' },
          { label: 'Quantities', value: 'Item by item, so two quotes can be compared line by line' },
          { label: 'Drawings', value: 'Layouts and elevations signed off before work starts' },
        ],
      },
      { kind: 'note', text: 'Three architects and three interior designers plan, draw and supervise every project, from the first layout to the snag list.' },
    ],
  },
  stepsTitle: 'Understand, plan, execute, refine.',
  steps: [
    { title: 'Understand', text: "We listen to how the space will be used and agree the tier, the budget and the client's style." },
    { title: 'Plan', text: 'Layouts, drawings and a material schedule. Nothing is built until the client signs them off.' },
    { title: 'Execute', text: 'Civil, electrical and carpentry work under one site lead, with electrical changes planned with Grid Apex.' },
    { title: 'Refine', text: 'A snag list, finishing and handover once every item on the list is closed.' },
  ],
  faq: [
    {
      q: 'How do I compare your quote with another one?',
      a: 'Every quote is itemised: material and grade for each surface, hardware brand and type, lighting room by room, and quantities item by item, so two quotes can be compared line by line.',
    },
    {
      q: 'Which tier is right for us?',
      a: 'Standard suits value-focused homes, Premium suits modern family homes and Luxury suits signature residences. We agree the tier with you before any drawings are made.',
    },
    {
      q: 'Who does the electrical work?',
      a: 'Electrical fit-out is planned with Grid Apex. Load changes and meter shifts with the utility are handled by Sanyog.',
    },
    {
      q: 'What rooms do you design?',
      a: 'Kitchens, living and dining rooms, bedrooms, balconies and terraces, open-plan homes and workplaces.',
    },
  ],
  joins: [
    ['Grid Apex', 'Electrical fit-out, distribution boards and earthing'],
    ['Sanyog', 'Load changes and meter shifts with the utility'],
    ['eMudran', 'Signage, nameplates and printed finishes'],
    ['Agrim', 'Coordinating project loan requirements'],
  ],
  contact: { emails: ['spacemgmt@jcapexv.com'] },
  actions: [{ label: 'Send a design enquiry', href: '/space-planning' }],
};

export const emudran: DivisionContent = {
  slug: 'emudran',
  name: 'eMudran',
  href: '/emudran',
  icon: 'printer',
  description:
    'eMudran designs brands and packaging, makes signage and manages print and production in Mumbai, from concept to installation.',
  title: 'What is designed on screen is what gets printed and installed.',
  intro:
    'eMudran is the visual communication division of JC Apex Ventures. We design brands and packaging, make signage, and manage print and production, from the first concept to the finished, installed piece. You work directly with the people doing the work.',
  showProofLine: false,
  heroPhoto: 'emudran-print',
  services: [
    ['Brand design', 'Corporate identity and brand guides; product packaging; campaign media; company profiles, brochures and creative assets'],
    ['Signage and display', '3D acrylic and steel letters; glow, LED, ACP and acrylic boards; flex and vinyl banners; society notice and site signage; survey and mounting'],
    ['Commercial print', 'Stationery, brochures and catalogues; ID cards, certificates and registers; bill and receipt books; digital and four-colour offset; large-format, backlit and vehicle graphics'],
    ['Digital and field', 'Business websites and landing pages; domain, hosting and email set-up; vehicle and glass branding'],
  ],
  proof: {
    eyebrow: 'Creative experience',
    title: "Our Creative Director's work spans consumer and international brands.",
    blocks: [
      { kind: 'creative-credits' },
      {
        kind: 'facts',
        title: 'Senior people on the design and on the press',
        rows: [
          { label: 'Creative direction', value: 'Manish Ajgaonkar, Creative Director: art direction, FMCG packaging and brand identity' },
          { label: 'Production', value: 'Hemangi Patil: 22+ years in print, signage, large-format and field work' },
        ],
      },
      {
        kind: 'table',
        title: 'How we specify a job',
        headers: ['Item', 'Size', 'Material', 'Finish and process'],
        rows: [
          ['Company brochure', 'A4, 8 pages', '300 GSM cover, 170 GSM inner pages', 'Matt lamination on the cover; four-colour offset'],
          ['Society nameplate board', 'As surveyed on site', '3 mm ACP with printed vinyl, or acrylic letters', 'English, Marathi and Hindi; mounted on site'],
        ],
        caption: 'Example specifications. Every job is specified this way before it is quoted.',
      },
    ],
  },
  stepsTitle: 'Concept, pre-press, production, field.',
  steps: [
    { title: 'Concept', text: 'Identity, packaging or campaign design, led by our Creative Director and agreed with the client.' },
    { title: 'Pre-press', text: 'Artwork prepared for the substrate, finish and print process it will meet, with Pantone references.' },
    { title: 'Production', text: 'A physical proof before any long run, then printing, fabrication or large-format output.' },
    { title: 'Field execution', text: 'Survey, delivery, mounting and on-site branding, so the finished piece is installed as designed.' },
  ],
  faq: [
    {
      q: 'Do you install signage as well as make it?',
      a: 'Yes. We survey the site, deliver, mount and brand on site, so the finished piece is installed as designed.',
    },
    {
      q: 'Can you print in Marathi and Hindi?',
      a: 'Yes. We work in English, Marathi and Hindi, including society nameplates and site signage.',
    },
    {
      q: 'Will I see a proof before printing?',
      a: 'Yes. A physical proof comes before any long run.',
    },
    {
      q: 'What is the quickest way to reach eMudran?',
      a: 'WhatsApp on +91 70211 12664, or email admin@jcapexv.com.',
    },
  ],
  joins: [
    ['Tvasta', 'Signage and nameplates as part of a fit-out'],
    ['Solis', 'Site boards and plant signage'],
    ['Agrim', 'Coordinating project loan requirements'],
  ],
  contact: { emails: ['admin@jcapexv.com'], note: 'WhatsApp preferred' },
  actions: [{ label: 'See rates and get an estimate', href: '/print-management' }],
};

export const agrim: DivisionContent = {
  slug: 'agrim',
  name: 'Agrim',
  href: '/agrim',
  icon: 'landmark',
  description:
    'Agrim helps clients understand, prepare and coordinate the loan and advance requirements of their projects. Agrim does not lend money.',
  title: 'A sound project should not stall over paperwork.',
  intro:
    'Agrim is the project finance coordination division of JC Apex Ventures. We help clients understand and prepare the loan and advance requirements connected with their projects, especially projects carried out by our other divisions: a Solis solar plant, a Grid Apex electrical upgrade or a Tvasta fit-out.',
  showProofLine: true,
  heroPhoto: 'agrim-plans',
  services: [
    ['Project loan requirements', 'Working out what the project needs and preparing the information a lender will ask for'],
    ['Advance requirements', 'Planning milestone advances connected with the project work'],
    ['Understanding financial needs', "Explaining the project's costs and cash needs in plain terms"],
    ['Coordination', "Aligning the project scope, schedule and paperwork with the client's lender"],
  ],
  proof: {
    eyebrow: 'What a client receives',
    title: 'One page that ties the loan to the work.',
    text: 'How much, what for, and when each advance is needed. The lender sees one consistent set of numbers.',
    blocks: [
      {
        kind: 'table',
        title: 'Sample cost sheet for a solar plant',
        headers: ['Item', 'Amount'],
        rows: [
          ['Project cost, from the Solis quote', '₹50 lakh'],
          ['Paid by the client', '₹15 lakh'],
          ['Loan requirement', '₹35 lakh'],
          ['Advance 1: order placed', '₹15 lakh'],
          ['Advance 2: panels on site', '₹15 lakh'],
          ['Advance 3: commissioning', '₹5 lakh'],
        ],
        caption: 'Illustrative figures.',
      },
      {
        kind: 'facts',
        title: 'What Agrim does not do',
        rows: [
          { label: 'Lending', value: 'Agrim does not lend money or provide finance' },
          { label: 'Approvals', value: 'Agrim does not approve, guarantee or promise any loan' },
          { label: 'Terms', value: 'Agrim does not quote interest rates or approval times' },
        ],
        caption: "The lender is the client's own bank or NBFC. Agrim is not part of the lending decision.",
      },
      {
        kind: 'table',
        title: 'What a lender usually asks for, and why',
        headers: ['Document', 'Why the lender asks for it'],
        rows: [
          ['Project quote and cost sheet', 'Shows what the money is for'],
          ['Identity and address documents', 'Required for any loan application'],
          ['Recent financial and bank statements', 'Shows the ability to repay'],
          ['Details of existing loans', 'Shows current commitments'],
          ['Project schedule with milestones', 'Links advances and disbursement to the work'],
        ],
        caption: 'Typical list. Each lender sets its own requirements.',
      },
    ],
  },
  stepsTitle: 'Four steps, alongside the project.',
  steps: [
    { title: 'Understand the requirement', text: 'We find out what the client needs to fund, when, and how much they will contribute themselves.' },
    { title: 'Match it to the project', text: 'We work from the cost sheet and schedule prepared by the engineering division, so the numbers agree.' },
    { title: 'Prepare the file', text: 'We put together the information the lender asks for, in the order the lender wants it.' },
    { title: 'Coordinate', text: 'We stay in touch with the client and the lender until the file is complete, and plan advances against project milestones.' },
  ],
  faq: [
    {
      q: 'Does Agrim lend money?',
      a: 'No. Agrim does not lend money or provide finance. We help you understand, prepare and coordinate your project loan and advance requirements.',
    },
    {
      q: 'Can you get my loan approved?',
      a: 'No. The lender is your own bank or NBFC, and it makes every decision. Agrim does not approve, guarantee or promise any loan, and does not quote interest rates or approval times.',
    },
    {
      q: 'Can you help if another contractor is doing the work?',
      a: "Yes. We work from that contractor's quote in the same way.",
    },
    {
      q: 'Where do the figures in the file come from?',
      a: 'From a real quote, a measured yield or a priced bill of quantities. Estimates are labelled as estimates.',
    },
  ],
  joins: [
    ['Solis', 'Cost sheet and generation estimate for solar plants'],
    ['Grid Apex', 'Cost sheet and schedule for electrical upgrades'],
    ['Tvasta', 'Tier and itemised quote for interior fit-outs'],
  ],
  contact: { emails: ['admin@jcapexv.com'] },
  actions: [{ label: 'Email Agrim', href: 'mailto:admin@jcapexv.com?subject=Agrim%20enquiry' }],
};

const solarPlants = trackRecord('solis');
const solarFact = keyFacts().find((f) => f.id === 'solar-capacity');
const plantsWithEquipment = solarPlants.filter((p) => p.equipment);

export const solis: DivisionContent = {
  slug: 'solis',
  name: 'Solis',
  href: '/solis',
  icon: 'sun',
  description:
    'Solis designs and builds on-grid solar plants, elevated solar pergolas, BIPV glass and EV charging in Mumbai, and files the net-metering and subsidy applications.',
  title: 'One accountable team, from site survey to net meter.',
  intro:
    'Solis is the clean-energy division of JC Apex Ventures. We design and build solar power plants, elevated solar pergolas, building-integrated photovoltaic (BIPV) glass and EV charging, and we handle the net-metering and subsidy applications. Because our engineering roots are in Mumbai’s power utilities, plants are designed to meet utility requirements from the first application.',
  showProofLine: true,
  heroPhoto: 'solis-rooftop',
  facts: [
    { value: solarFact?.value ?? '', label: 'of solar delivered' },
    { value: String(solarPlants.length), label: 'completed plants' },
    { value: '4', label: 'Mumbai utilities we file with' },
  ],
  services: [
    ['Solar power plants', 'Design, supply, installation, testing and commissioning of on-grid plants for factories, offices, institutions and housing societies'],
    ['Elevated solar pergolas', 'Panels raised on a steel frame high enough to walk under, so the terrace stays usable'],
    ['BIPV glass', 'Solar glass for canopies, skylights and facades that generates power and lets in daylight'],
    ['EV charging', 'AC and DC chargers for housing societies, offices and commercial sites, with the load extension handled through Sanyog'],
    ['Net metering and subsidies', 'Net-metering applications with the utility, and PM Surya Ghar subsidy paperwork for homes and housing societies'],
    ['Advice for public bodies', 'Feasibility, planning and procurement advice for clean-energy projects'],
    ['On-site waste treatment', 'Segregation, collection and on-site treatment of organic and inorganic waste for housing societies, campuses and businesses'],
  ],
  proof: {
    eyebrow: 'Track record',
    title: `${solarFact?.value} of solar delivered across ${formatCount(solarPlants.length)} plants.`,
    blocks: [{ kind: 'plants' }],
  },
  features: [
    {
      kind: 'terrace-comparison',
      eyebrow: 'Elevated pergolas',
      title: 'Solar power without giving up the terrace.',
      text: 'Drag the divider to compare panels on low frames with panels on a walkable pergola.',
    },
    {
      kind: 'connection',
      eyebrow: 'Connection and approvals',
      title: 'How an on-grid plant connects, and what we file for it.',
      columns: [
        ['Net metering', 'We prepare and file the net-metering application with the utility (BEST, Adani Electricity, Tata Power or MSEDCL) and coordinate the meter change. Power is used on site first; surplus is exported and credited against the bill.'],
        ['Subsidies', 'For homes and housing societies, we prepare the paperwork for the PM Surya Ghar rooftop solar scheme where it applies. The amount depends on the scheme rules at the time of application.'],
      ],
      facts: [
        { label: 'Equipment', value: `Tata Power Solar systems on ${formatCount(plantsWithEquipment.length)} of the ${formatCount(solarPlants.length)} completed plants` },
        { label: 'Utilities', value: 'BEST Undertaking, Adani Electricity, Tata Power, MSEDCL' },
        { label: 'Load extensions', value: 'Filed through Sanyog, our utility liaison division' },
      ],
    },
  ],
  stepsTitle: 'Four steps, one point of contact.',
  steps: [
    { title: 'Site survey', text: 'We inspect the roof or terrace, check shade, structure and the existing electrical supply, and read the last twelve months of electricity bills.' },
    { title: 'Design', text: 'We size the plant to the site and the load, choose the mounting (a standard frame or an elevated pergola) and draw the single-line diagram.' },
    { title: 'Proposal', text: 'A costed proposal with the equipment list, expected generation, the net-metering route and any subsidy that applies. Estimates are marked as estimates.' },
    { title: 'Build and commission', text: 'Supply, installation, testing and commissioning, then the net-metering application and handover documents.' },
  ],
  stepsPhoto: {
    src: '/images/own/terrace-survey.jpg',
    width: 1280,
    height: 960,
    alt: 'An open terrace with water tanks, a lift room and pipework along the parapet',
    caption: 'A terrace survey by our team, Mumbai, October 2026.',
  },
  faq: [
    {
      q: 'Can we still use the terrace after the panels go up?',
      a: 'Yes, with an elevated pergola. The panels are raised on a steel frame high enough to walk under, so the terrace stays usable.',
    },
    {
      q: 'Do you handle net metering?',
      a: 'Yes. We prepare and file the net-metering application with BEST, Adani Electricity, Tata Power or MSEDCL and coordinate the meter change. Power is used on site first; surplus is exported and credited against the bill.',
    },
    {
      q: 'Can our housing society get a subsidy?',
      a: 'For homes and housing societies, we prepare the paperwork for the PM Surya Ghar rooftop solar scheme where it applies. The amount depends on the scheme rules at the time of application.',
    },
    {
      q: 'We want EV chargers. Do we need more sanctioned load?',
      a: 'Often, yes. We supply AC and DC chargers, and the load extension is filed through Sanyog, our utility liaison division.',
    },
    {
      q: 'What equipment have you used?',
      a: `Tata Power Solar systems on ${formatCount(plantsWithEquipment.length)} of our ${formatCount(solarPlants.length)} completed plants. Every proposal lists the equipment it quotes for.`,
    },
  ],
  joins: [
    ['Sanyog', 'Load extensions and utility applications'],
    ['Grid Apex', 'HT and LT electrical work, earthing and maintenance'],
    ['Agrim', 'Coordinating project loan requirements'],
    ['eMudran', 'Site boards, plant signage and EV parking signs'],
  ],
  contact: { emails: ['solis@jcapexv.com'] },
  actions: [{ label: 'Email Solis', href: 'mailto:solis@jcapexv.com?subject=Solis%20enquiry' }],
  enquiryForm: { to: 'solis@jcapexv.com', cc: 'admin@jcapexv.com', subject: 'Solis site survey request' },
};

export const divisions: DivisionContent[] = [gridApex, solis, sanyog, tvasta, emudran, agrim];
