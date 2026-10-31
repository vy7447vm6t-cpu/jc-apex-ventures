/**
 * Single source of truth for the group's track record: projects, proposals,
 * studies and the client roster. The website and the division profiles (PDF)
 * both read from here, so a fact is corrected once and changes everywhere.
 *
 * Rules: Antigravity/JC_Apex_Brand/JC_Apex_Brand_Guidelines.md, sections 5 and 6.
 *
 * This file ships to the browser. Never add invoice or work-order values,
 * PO numbers, certificate wording, or the names of associates and the firms
 * that held earlier contracts. Value brackets are rounded on purpose.
 */

export type DivisionKey = 'grid-apex' | 'solis' | 'sanyog' | 'tvasta' | 'emudran' | 'agrim';

/**
 * How sure we are of a fact.
 * - verified: backed by a document on file
 * - company-record: in our own published profiles; evidence still to collect
 * - confirm: kept here so it is tracked, but never shown until confirmed
 * - do-not-use: known to be unsupported
 */
export type ProofStatus = 'verified' | 'company-record' | 'confirm' | 'do-not-use';

/** Whose experience this is, which decides the attribution line shown with it. */
export type Attribution = 'company' | 'director' | 'creative-director';

export type ProjectKind = 'completed' | 'in-award' | 'proposal' | 'study';

export type Sector =
  | 'industrial'
  | 'government'
  | 'hospitality'
  | 'residential'
  | 'commercial'
  | 'transport'
  | 'consumer-brand';

export interface ProjectDate {
  year: number;
  /** 1 to 12 */
  month?: number;
}

export interface Capacity {
  value: number;
  unit: 'kWp' | 'kW' | 'stations' | 'sq ft' | 'chargers';
}

export interface Proof {
  status: ProofStatus;
  /** Generic description of the evidence, safe to publish. */
  note: string;
  /** ISO date the entry was last checked against its source. */
  checkedOn: string;
}

export interface Project {
  id: string;
  division: DivisionKey;
  kind: ProjectKind;
  /** Short name used in lists, e.g. "691.20 kWp solar power plant". */
  title: string;
  /** Client or site, exactly as it may be named publicly. */
  client: string;
  location: string;
  sector: Sector;
  /** What was done, in the words of the source document. */
  scope: string;
  capacity?: Capacity;
  /** Completion month for completed work; status month for anything else. */
  date?: ProjectDate;
  /** Rounded bracket only. Never an invoice figure. */
  valueBracket?: string;
  equipment?: string;
  attribution: Attribution;
  proof: Proof;
  /** Shown verbatim next to anything that is not completed work. */
  statusNote?: string;
}

/** A client known from the roster rather than from a single documented project. */
export interface RosterClient {
  id: string;
  name: string;
  place?: string;
  division: DivisionKey;
  sector: Sector;
  /** What we did for them, in a few words. */
  work: string;
  attribution: Attribution;
  proof: ProofStatus;
  /** Name used in the source profile, when the current official name differs. */
  nameInSource?: string;
}

export interface Client {
  id: string;
  name: string;
  place?: string;
  division: DivisionKey;
  sector: Sector;
  work: string;
  attribution: Attribution;
  proof: ProofStatus;
  year?: number;
  projectId?: string;
}

export interface ClientGroup {
  id: string;
  heading: string;
  /** Attribution line shown under the heading. */
  attributionLine: string;
  division: DivisionKey;
  clients: Client[];
}

export interface KeyFact {
  id: string;
  value: string;
  label: string;
  division?: DivisionKey;
  proof: ProofStatus;
}

export const ATTRIBUTION_LINES: Record<Attribution, string> = {
  company: 'Delivered by JC Apex Ventures.',
  // The Director is named once per document, elsewhere (messaging framework, section 9).
  director: 'Delivered under the technical leadership of our Director.',
  'creative-director': 'Creative work led by Manish Ajgaonkar, our Creative Director.',
};

const CHECKED_ON = '2026-10-30';

export const PROJECTS: Project[] = [
  {
    id: 'solis-tolia-bhiwandi-2025',
    division: 'solis',
    kind: 'completed',
    title: '691.20 kWp solar power plant',
    client: 'Tolia Ball & Roller LLP',
    location: 'Vashere, Bhiwandi',
    sector: 'industrial',
    scope: 'Supply, installation, testing and commissioning of a solar power generating system',
    capacity: { value: 691.2, unit: 'kWp' },
    date: { year: 2025, month: 3 },
    valueBracket: '₹2 crore+ (before GST)',
    equipment: 'Tata Power Solar',
    attribution: 'director',
    proof: {
      status: 'verified',
      note: 'Completion certificate from the client, dated 23 June 2025',
      checkedOn: CHECKED_ON,
    },
  },
  {
    id: 'solis-pristo-taloja-2022',
    division: 'solis',
    kind: 'completed',
    title: '180 kWp solar power plant',
    client: 'Pristo Pipes and Fittings',
    location: 'Taloja MIDC, Navi Mumbai',
    sector: 'industrial',
    scope: 'Installation of a solar power generating system',
    capacity: { value: 180, unit: 'kWp' },
    date: { year: 2022, month: 8 },
    valueBracket: '₹85 to 90 lakh',
    equipment: 'Tata Power Solar',
    attribution: 'director',
    proof: {
      status: 'verified',
      note: 'Completion letter from the client, dated 9 May 2023',
      checkedOn: CHECKED_ON,
    },
  },
  {
    id: 'solis-cgst-kharghar-2022',
    division: 'solis',
    kind: 'completed',
    title: '84 kWp solar power plant',
    client: 'CGST & Central Excise Building',
    location: 'Sector 7, Kharghar, Navi Mumbai',
    sector: 'government',
    scope: 'Supply, installation, testing and commissioning of a solar power generating system',
    capacity: { value: 84, unit: 'kWp' },
    // Installed August 2022; work completed October 2022.
    date: { year: 2022, month: 10 },
    valueBracket: '₹60 to 65 lakh (including GST)',
    equipment: 'Tata Power Solar',
    attribution: 'director',
    proof: {
      status: 'verified',
      note: 'Completion certificate from the main contractor, dated 9 May 2023',
      checkedOn: CHECKED_ON,
    },
  },
  {
    id: 'solis-devharsh-bhiwandi-2016',
    division: 'solis',
    kind: 'completed',
    title: '100 kW on-grid solar power plant',
    client: 'Devharsh Infotech Pvt. Ltd.',
    location: 'Bhoomi World, Pimplas, Bhiwandi',
    sector: 'industrial',
    scope: 'Supply, installation, testing and commissioning of an on-grid solar power generating system',
    capacity: { value: 100, unit: 'kW' },
    date: { year: 2016, month: 6 },
    attribution: 'director',
    proof: {
      status: 'verified',
      note: 'Completion certificate from the client',
      checkedOn: CHECKED_ON,
    },
  },
  {
    id: 'solis-charkop-pergola-proposal-2026',
    division: 'solis',
    kind: 'proposal',
    title: 'About 60 kWp walkable solar pergola, terrace array and BIPV facade',
    client: 'A 19-floor housing society',
    location: 'Charkop, Kandivali West',
    sector: 'residential',
    scope: 'Walkable pergola array, terrace array and BIPV facade, with net metering',
    capacity: { value: 60, unit: 'kWp' },
    date: { year: 2026, month: 10 },
    attribution: 'company',
    proof: {
      status: 'company-record',
      note: 'Solis proposal dated 12 October 2026',
      checkedOn: CHECKED_ON,
    },
    statusNote: 'Proposal submitted, October 2026',
  },
  {
    id: 'tvasta-chennai-metro-2026',
    division: 'tvasta',
    kind: 'in-award',
    title: 'Station works for two Chennai Metro stations',
    client: 'Chennai Metro',
    location: 'Chennai, Tamil Nadu',
    sector: 'transport',
    scope: 'Interior design, civil work and electrical fit-out',
    capacity: { value: 2, unit: 'stations' },
    date: { year: 2026, month: 10 },
    attribution: 'company',
    proof: {
      status: 'confirm',
      note: 'Tvasta portfolio, page 5; award status to be confirmed before each use',
      checkedOn: CHECKED_ON,
    },
    statusNote: 'Offer received for two stations; award being finalised (October 2026)',
  },
  {
    id: 'tvasta-oic-office-fitout',
    division: 'tvasta',
    kind: 'completed',
    title: '4,800 sq ft office fit-out',
    client: 'Office at One International Centre',
    location: 'Elphinstone, Mumbai',
    sector: 'commercial',
    scope: 'Office fit-out with acoustic zoning (client, scope and dates to be confirmed)',
    capacity: { value: 4800, unit: 'sq ft' },
    attribution: 'company',
    proof: {
      status: 'confirm',
      note: 'Appears only on the website and in v1.0 guidelines; no source document',
      checkedOn: CHECKED_ON,
    },
  },
  {
    id: 'agrim-ev-network-study-2026',
    division: 'agrim',
    kind: 'study',
    title: 'Feasibility model for a 3,900-charger EV network',
    client: 'Internal feasibility study',
    location: 'Maharashtra',
    sector: 'residential',
    scope: 'Capital cost, tariff and payback model for chargers in housing societies',
    capacity: { value: 3900, unit: 'chargers' },
    date: { year: 2026, month: 9 },
    attribution: 'company',
    proof: {
      status: 'confirm',
      note: 'Internal study; confirm whether it was commissioned by a client',
      checkedOn: CHECKED_ON,
    },
  },
];

/**
 * Hotel names are the properties' current official names. The GRID APEX
 * profile used older forms for three of them (kept in nameInSource).
 */
const HOSPITALITY: RosterClient[] = [
  ['taj-mahal-palace', 'The Taj Mahal Palace', 'Colaba, Mumbai'],
  ['taj-wellington-mews', 'Taj Wellington Mews', 'Colaba, Mumbai'],
  ['president-ihcl-seleqtions', 'President, IHCL SeleQtions', 'Cuffe Parade, Mumbai'],
  ['the-oberoi-mumbai', 'The Oberoi', 'Nariman Point, Mumbai'],
  ['trident-nariman-point', 'Trident, Nariman Point', 'Nariman Point, Mumbai'],
  ['taj-lands-end', 'Taj Lands End', 'Bandra, Mumbai'],
  ['trident-bandra-kurla', 'Trident, Bandra Kurla', 'Bandra Kurla Complex, Mumbai'],
  ['taj-santacruz', 'Taj Santacruz', 'Santacruz, Mumbai'],
  ['taj-the-trees', 'Taj The Trees', 'Vikhroli, Mumbai'],
  ['tajsats', 'TajSATS', 'Andheri, Mumbai', 'Taj Sats'],
  ['oberoi-airport-services', 'Oberoi Airport Services', 'Andheri, Mumbai'],
  ['vivanta-navi-mumbai', 'Vivanta Navi Mumbai', 'Turbhe, Navi Mumbai'],
  ['vivanta-aurangabad', 'Vivanta Aurangabad', 'Aurangabad', 'Vivanta by Taj'],
  ['taj-hari-mahal', 'Taj Hari Mahal', 'Jodhpur', 'Hari Mahal by Taj'],
].map(([id, name, place, nameInSource]) => ({
  id,
  name,
  place,
  division: 'grid-apex',
  sector: 'hospitality',
  work: 'HT electrical work',
  attribution: 'director',
  proof: 'company-record',
  ...(nameInSource ? { nameInSource } : {}),
}));

/**
 * Manish Ajgaonkar's portfolio, from the eMudran profile, page 2. These are
 * his creative credits, not clients of JC Apex, so they never join the
 * group's client marquee.
 */
const CREATIVE_DIRECTOR_PORTFOLIO: RosterClient[] = [
  ['gowardhan', 'Gowardhan', 'Packaging: ghee, gulab jamun, rasgulla'],
  ['go-cheese', 'Go Cheese', 'Product packaging'],
  ['vadilal', 'Vadilal', 'Ice cream packaging'],
  ['bluepond', 'BluePond', 'Brand identity and digital'],
  ['kaya', 'Kaya Derma Naturals', 'Brand and campaign design'],
  ['avvatar', 'Avvatar Nutrition', 'Brand and campaign design'],
  ['citroen-india', 'Citroën India', 'Brand and campaign design'],
  ['club-mahindra', 'Club Mahindra', 'Brand and campaign design'],
  ['asian-paints-royale', 'Asian Paints Royale', 'Brand and campaign design'],
  ['wpp', 'WPP', 'Campaigns'],
  ['reset', 'RESET', 'Brand and campaign design'],
  ['orange', 'Orange', 'Brand and campaign design'],
  ['disney', 'Disney', 'International creative work'],
  ['samsonite', 'Samsonite', 'International creative work'],
].map(([id, name, work]) => ({
  id: `emudran-${id}`,
  name,
  division: 'emudran',
  sector: 'consumer-brand',
  work,
  attribution: 'creative-director',
  proof: 'company-record',
}));

export const CLIENT_ROSTER: RosterClient[] = [
  ...HOSPITALITY,
  ...CREATIVE_DIRECTOR_PORTFOLIO,
  {
    // Listed in the earlier JC Apex profile but not in the eMudran profile.
    id: 'emudran-vicco',
    name: 'Vicco',
    division: 'emudran',
    sector: 'consumer-brand',
    work: 'Packaging',
    attribution: 'creative-director',
    proof: 'confirm',
  },
];

export function isShowable(status: ProofStatus): boolean {
  return status === 'verified' || status === 'company-record';
}

/** Completed work that may be shown. Proposals, studies and unconfirmed items are left out. */
export function trackRecord(division?: DivisionKey): Project[] {
  return PROJECTS.filter(
    (p) => p.kind === 'completed' && isShowable(p.proof.status) && (!division || p.division === division),
  ).sort((a, b) => (b.date?.year ?? 0) - (a.date?.year ?? 0) || (b.date?.month ?? 0) - (a.date?.month ?? 0));
}

/** Every client that may be shown: from completed projects first, then the roster. */
export function clients(): Client[] {
  const fromProjects: Client[] = trackRecord().map((p) => ({
    id: p.id,
    name: p.client,
    place: p.location,
    division: p.division,
    sector: p.sector,
    work: p.title,
    attribution: p.attribution,
    proof: p.proof.status,
    year: p.date?.year,
    projectId: p.id,
  }));
  const fromRoster: Client[] = CLIENT_ROSTER.filter((c) => isShowable(c.proof)).map((c) => ({
    id: c.id,
    name: c.name,
    place: c.place,
    division: c.division,
    sector: c.sector,
    work: c.work,
    attribution: c.attribution,
    proof: c.proof,
  }));
  return [...fromProjects, ...fromRoster];
}

/** Clients for the scrolling ribbon. Personal portfolios are never presented as group clients. */
export function marqueeClients(): Client[] {
  return clients().filter((c) => c.attribution !== 'creative-director');
}

/** The expanded client list, grouped, each group with its attribution line. */
export function clientGroups(): ClientGroup[] {
  const all = clients();
  const groups: Omit<ClientGroup, 'clients'>[] = [
    {
      id: 'solar',
      heading: 'Solar power plants',
      attributionLine: ATTRIBUTION_LINES.director,
      division: 'solis',
    },
    {
      id: 'hospitality',
      heading: 'HT electrical work for hospitality',
      attributionLine: ATTRIBUTION_LINES.director,
      division: 'grid-apex',
    },
    {
      id: 'creative',
      heading: 'Brand, packaging and campaign work',
      attributionLine: ATTRIBUTION_LINES['creative-director'],
      division: 'emudran',
    },
  ];
  return groups
    .map((g) => ({ ...g, clients: all.filter((c) => c.division === g.division) }))
    .filter((g) => g.clients.length > 0);
}

/**
 * Installed solar capacity across completed, showable plants. One certificate
 * states kW and the others kWp, so the total is published as "1 MW+", not kWp.
 */
export function solarCapacityKw(): number {
  return trackRecord('solis').reduce((sum, p) => sum + (p.capacity?.value ?? 0), 0);
}

export function keyFacts(): KeyFact[] {
  const solar = trackRecord('solis');
  const years = solar.map((p) => p.date?.year ?? 0).filter(Boolean);
  const hospitality = CLIENT_ROSTER.filter((c) => c.sector === 'hospitality' && isShowable(c.proof));
  const facts: KeyFact[] = [
    {
      id: 'solar-capacity',
      value: `${Math.floor(solarCapacityKw() / 1000)} MW+`,
      label: `Solar capacity across ${formatCount(solar.length)} plants, ${Math.min(...years)} to ${Math.max(...years)}`,
      division: 'solis',
      proof: 'verified',
    },
    {
      id: 'hospitality-sites',
      value: String(hospitality.length),
      label: 'Hospitality properties with HT electrical work led by our Director',
      division: 'grid-apex',
      proof: 'company-record',
    },
    {
      id: 'director-experience',
      value: '36+ years',
      label: "Our Director's experience in Mumbai's power utility sector",
      proof: 'company-record',
    },
    {
      id: 'liaison-engagements',
      value: '140+',
      label: 'Sanction and liaison engagements',
      division: 'sanyog',
      proof: 'confirm',
    },
  ];
  return facts.filter((f) => isShowable(f.proof));
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatProjectDate(date?: ProjectDate): string {
  if (!date) return '';
  return date.month ? `${MONTHS[date.month - 1]} ${date.year}` : String(date.year);
}

/** Numbers one to nine in words, as the guidelines write them in running text. */
export function formatCount(n: number): string {
  const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  return Number.isInteger(n) && n >= 0 && n < 10 ? words[n] : n.toLocaleString('en-IN');
}

export function formatCapacity(capacity: Capacity): string {
  const value = Number.isInteger(capacity.value)
    ? capacity.value.toLocaleString('en-IN')
    : capacity.value.toFixed(2);
  return `${value} ${capacity.unit}`;
}
