/**
 * Detail pages for one task within a division: /licenses and /electricity-grievances (Sanyog),
 * /space-planning (Tvasta) and /print-management (eMudran). They reuse the division's copy from
 * divisions.ts, filtered to the task, so every line still comes from the PDF profiles. Nothing here
 * is new information; claims that are not in the profiles (fees, timelines, rate cards) stay out.
 */

import { emudran, sanyog, tvasta, type DivisionContent } from './divisions';

const servicesNamed = (division: DivisionContent, lines: string[]) => division.services.filter(([line]) => lines.includes(line));
const faqAbout = (division: DivisionContent, words: RegExp) => division.faq.filter((item) => words.test(item.q));

export const licencesPage: DivisionContent = {
  ...sanyog,
  slug: 'licenses',
  parent: 'sanyog',
  href: '/licenses',
  name: 'Connections and licences',
  description:
    'Sanyog files new power connections, load extensions, phase changes, name and billing changes and electrical licence applications with BEST, Adani Electricity, Tata Power and MSEDCL.',
  title: 'New connections, load changes and licences, filed once.',
  intro:
    'Sanyog prepares the paperwork, coordinates the technical requirements and follows up with the utility until the sanction is issued and the change shows on your bill. We work with BEST, Adani Electricity, Tata Power and MSEDCL, and file electrical licence applications through the PWD Electrical Inspectorate.',
  heroPhoto: 'grid-distribution',
  services: servicesNamed(sanyog, ['Connections', 'Load and phase', 'Records and billing', 'Licences']),
  facts: sanyog.facts?.slice(0, 1),
  tiles: sanyog.tiles && { ...sanyog.tiles, items: sanyog.tiles.items.filter((t) => t.title !== 'Complaints and inspections') },
  features: undefined,
  noEstimator: true,
  faq: [
    {
      q: 'What documents will you need from us?',
      a: 'For a load extension we usually ask for the latest electricity bill, proof of ownership or occupancy, a wiring test report from a licensed electrical contractor, details of the load to be added, and the society’s no-objection letter where the meter is in a housing society. Each utility sets its own requirements, and we confirm them before filing.',
    },
    {
      q: 'Do you handle temporary supply for construction?',
      a: 'Yes. New power supply connections and temporary supply for construction are both part of what we file.',
    },
    {
      q: 'Where do electrical licence applications go?',
      a: 'To the PWD Electrical Inspectorate. We prepare the application and follow it up.',
    },
    ...faqAbout(sanyog, /EV chargers/),
  ],
  contact: { emails: ['licenses@jcapexv.com'] },
  actions: [
    { label: 'Bill disputes and grievances', href: '/electricity-grievances' },
    { label: 'All of Sanyog', href: '/sanyog' },
  ],
  enquiryForm: { to: 'licenses@jcapexv.com', subject: 'Connection or licence enquiry', askUtility: true },
};

export const grievancesPage: DivisionContent = {
  ...sanyog,
  slug: 'electricity-grievances',
  parent: 'sanyog',
  href: '/electricity-grievances',
  name: 'Bill disputes and grievances',
  description:
    'Sanyog takes disputed bills, faulty meters, disconnection notices and HT complaints to BEST, Adani Electricity, Tata Power or MSEDCL, then to the CGRF and the Electricity Ombudsman if needed.',
  title: 'When the utility gets it wrong, we take it to the forum.',
  intro:
    'Sanyog handles disputed bills, faulty meters, disconnection notices and HT complaints. We complain to the utility in writing first, then take the case to its Consumer Grievance Redressal Forum (CGRF) if needed, and to the Electricity Ombudsman on appeal.',
  heroPhoto: 'grid-electrician',
  services: servicesNamed(sanyog, ['Records and billing', 'Complaints and compliance']),
  facts: sanyog.facts?.slice().reverse(),
  tiles: undefined,
  proof: {
    eyebrow: 'Cases we take',
    title: 'Bills, meters and disconnections.',
    blocks: [
      {
        kind: 'table',
        headers: ['Case', 'What it looks like', 'What we do', 'What you get'],
        rows: [
          ['Disputed bills and arrears', 'Wrong, inflated or back-dated bills', 'Check the bill history, complain to the utility, then go to the CGRF if needed', 'A written record of every step'],
          ['Faulty meters', 'Meters that run fast, stop or were changed', 'Request a meter test and follow the complaint through', 'The test result and the corrected bill, or the forum decision'],
          ['Disconnection notices', 'Notices and supply cut off', 'Reply to the notice and represent you before the CGRF where it is disputed', 'One person following the case'],
        ],
        caption: 'Source: Sanyog profile, October 2026.',
      },
    ],
  },
  features: sanyog.features?.filter((f) => f.kind === 'flow'),
  stepsTitle: 'From complaint to forum.',
  steps: [
    { title: 'Bill check', text: 'We check the bill history and gather the account number and documents.' },
    { title: 'Complaint', text: 'We complain to the utility in writing and keep a record of every step.' },
    { title: 'CGRF', text: "If that does not resolve it, we take the case to the utility's Consumer Grievance Redressal Forum." },
    { title: 'Ombudsman', text: 'An appeal against a CGRF order goes to the Electricity Ombudsman, under MERC regulations.' },
  ],
  faq: [
    ...faqAbout(sanyog, /bill|meter|disconnection/i),
    {
      q: 'Will we win at the CGRF?',
      a: 'CGRF decisions depend on the facts of each case. We tell you at the start if a case is weak.',
    },
  ],
  contact: { emails: ['consumercmpl@jcapexv.com'] },
  actions: [
    { label: 'Connections and licences', href: '/licenses' },
    { label: 'All of Sanyog', href: '/sanyog' },
  ],
  enquiryForm: { to: 'consumercmpl@jcapexv.com', cc: 'licenses@jcapexv.com', subject: 'Bill or supply complaint', askUtility: true },
};

export const spacePlanningPage: DivisionContent = {
  ...tvasta,
  slug: 'space-planning',
  parent: 'tvasta',
  href: '/space-planning',
  name: 'Space planning and fit-out',
  description:
    'Tvasta plans layouts, materials and lighting for homes and workplaces in Mumbai, then quotes them item by item in one of three tiers: Standard, Premium or Luxury.',
  title: 'Layouts and drawings signed off before anything is built.',
  intro:
    "Tvasta's architects and interior designers plan the layout, the materials and finishes and the lighting, room by room, for homes and workplaces. The plan becomes an itemised quote in one of three tiers, so two quotes can be compared line by line before work starts.",
  heroPhoto: 'tvasta-office',
  contact: { emails: ['spacemgmt@jcapexv.com'] },
  actions: [{ label: 'All of Tvasta', href: '/tvasta' }],
  enquiryForm: { to: 'spacemgmt@jcapexv.com', cc: 'admin@jcapexv.com', subject: 'Space planning enquiry' },
};

const PRINT_LINES = ['Signage and display', 'Commercial print'];

export const printPage: DivisionContent = {
  ...emudran,
  slug: 'print-management',
  parent: 'emudran',
  href: '/print-management',
  name: 'Print and signage orders',
  description:
    'eMudran specifies, proofs, prints, fabricates and installs commercial print, signage and large-format work in Mumbai, in English, Marathi and Hindi.',
  title: 'Every job specified before it is quoted.',
  intro:
    'eMudran manages commercial print, signage and large-format work from pre-press to the installed piece. Artwork is prepared for the substrate and finish it will meet, a physical proof comes before any long run, and signage is surveyed and mounted on site.',
  heroPhoto: 'emudran-print',
  services: servicesNamed(emudran, PRINT_LINES),
  tiles: emudran.tiles && { ...emudran.tiles, items: emudran.tiles.items.filter((t) => t.title !== 'Brand identity') },
  proof: {
    eyebrow: 'Production',
    title: 'Offset, digital, large format and field work.',
    blocks: emudran.proof.blocks.filter((b) => (b.kind === 'facts' || b.kind === 'table') && /Production capability|How we specify/.test(b.title ?? '')),
  },
  contact: { emails: ['admin@jcapexv.com'], note: 'WhatsApp preferred' },
  actions: [{ label: 'All of eMudran', href: '/emudran' }],
  enquiryForm: { to: 'admin@jcapexv.com', subject: 'Print or signage enquiry' },
};
