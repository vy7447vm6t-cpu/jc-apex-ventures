export type IconKey = 'plug' | 'sun' | 'layout' | 'printer' | 'landmark' | 'zap';

export interface Service {
  title: string;
  text: string;
}

export interface PortfolioItem {
  title: string;
  text: string;
  /** Says whether this is real past experience or a typical job. Keeps the page honest. */
  tag: string;
  levels?: { label: string; text: string }[];
}

export interface Person {
  name: string;
  role: string;
  note?: string;
}

export interface PeopleGroup {
  heading: string;
  members: Person[];
}

export interface Action {
  label: string;
  href: string;
}

export interface VisualCard {
  title: string;
  takeaway: string;
  image: string;
  imageTag: string;
  badge?: string;
  description: string;
}

export interface DivisionContent {
  slug: string;
  name: string;
  href: string;
  icon: IconKey;
  /** One plain line used on the homepage cards and menus. */
  short: string;
  tagline: string;
  heroImage: string;
  heroImageTag: string;
  statPill: string;
  laypersonBadge: string;
  plainTakeaway: string;
  visualTags: string[];
  visualCards: VisualCard[];
  intro: string[];
  glossary?: { term: string; meaning: string }[];
  notice?: { title: string; text: string };
  servicesTitle: string;
  services: Service[];
  portfolioTitle: string;
  portfolioIntro: string;
  portfolio: PortfolioItem[];
  tiers?: { rows: { label: string; standard: string; premium: string; luxury: string }[] };
  peopleTitle: string;
  peopleIntro?: string;
  people: PeopleGroup[];
  whoDoesTheWork: { title: string; text: string };
  steps: Service[];
  actions: Action[];
  description: string;
}

export const sanyog: DivisionContent = {
  slug: 'sanyog',
  name: 'SANYOG',
  href: '/sanyog',
  icon: 'plug',
  short: 'Electricity connections, bill complaints and government licences.',
  tagline:
    'We deal with the electricity company and government offices for you, so you do not have to queue or chase.',
  heroImage: '/images/utility-power-grid.jpg',
  heroImageTag: 'Mumbai Utility Distribution Network',
  statPill: '36+ Years Inside Mumbai Utilities',
  laypersonBadge: 'Direct Utility Engineering Liaison',
  plainTakeaway:
    'We handle the electricity companies (BEST, Adani, Tata Power, MSEDCL) and government paperwork so you never have to stand in queues or chase officers.',
  visualTags: ['BEST / AEML / Tata / MSEDCL', 'Bill Dispute Resolution', 'CGRF Filing', 'PWD Licences'],
  visualCards: [
    {
      title: 'Meter & Load Sanctioning',
      takeaway: 'Sanctioned load upgrades and meter replacements cleared without bureaucratic delays',
      image: '/images/utility-metering-liaison.jpg',
      imageTag: 'Commercial Metering Panel Specimen',
      badge: 'Fast-Track Verification',
      description: 'Complete documentation and electrical inspection for housing societies and commercial complexes upgrading power capacity.',
    },
    {
      title: 'CGRF Legal Grievance Filing',
      takeaway: 'Formal dispute filings that force utility accountability under MERC regulations',
      image: '/images/utility-grievance-legal.jpg',
      imageTag: 'CGRF Dispute Filing Specimen',
      badge: 'MERC Accountability',
      description: 'Defending consumers against faulty billing, unwarranted penalties, and delayed connection sanctions before official forums.',
    },
    {
      title: 'PWD Licences & Statutory Filings',
      takeaway: 'Supervisory, wireman, and contractor licences filed with meticulous paperwork order',
      image: '/images/electrical-switchgear-panel.jpg',
      imageTag: 'PWD Electrical Licensing Specimen',
      badge: 'Government Clearance',
      description: 'Preparation of statutory documentation, wiring test certifications, and government clearance files for electrical professionals and enterprises.',
    },
  ],
  intro: [
    'SANYOG helps homes, housing societies, shops and businesses with electricity paperwork and complaints. If you need a new connection, have a wrong bill, or want to change the name on a meter, we prepare the papers, speak to the right office and follow up until it is done.',
    'We work with BEST, Adani Electricity (AEML), Tata Power (TPCL), MSEDCL, the Public Works Department (PWD) and the Municipal Corporation of Greater Mumbai (MCGM).',
  ],
  glossary: [
    {
      term: 'CGRF',
      meaning:
        'Consumer Grievance Redressal Forum. The official forum where you can take an electricity complaint if the utility has not solved it.',
    },
    {
      term: 'Sanctioned load',
      meaning: 'The maximum amount of electricity your connection is approved to use.',
    },
    {
      term: 'Single phase and three phase',
      meaning:
        'Single phase is the normal home supply. Three phase is a stronger supply used for heavy equipment such as large pumps and machines.',
    },
  ],
  servicesTitle: 'What we help with',
  services: [
    { title: 'New connections', text: 'Applying for a new electricity connection, with the documents and follow-up.' },
    {
      title: 'Load and phase changes',
      text: 'Increasing or reducing sanctioned load, and changing from single phase to three phase.',
    },
    {
      title: 'Name, address and tariff changes',
      text: 'Changing the name or address on the bill, or moving to the correct tariff category.',
    },
    { title: 'Bill problems', text: 'High bills, bills not received, and arrangements to pay a bill.' },
    {
      title: 'CGRF complaints',
      text: 'Preparing and filing your complaint with the CGRF when the utility has not fixed the problem.',
    },
    { title: 'Wiring test reports', text: 'Certified wiring test reports that the utility asks for.' },
    {
      title: 'HT complaints and meter disconnection',
      text: 'Complaints from high tension consumers, and permanent meter disconnections.',
    },
    {
      title: 'PWD licences',
      text: 'Applications for wireman, supervisory and contractor licences with the PWD.',
    },
    {
      title: 'Other registrations',
      text: 'Udyam, GST, FSSAI and similar registrations. The full list is on the licences page.',
    },
  ],
  portfolioTitle: 'Portfolio',
  portfolioIntro:
    'We do not name clients. These are the requests we handle most often, and how we handle them.',
  portfolio: [
    {
      title: 'A wrong or very high electricity bill',
      text: 'We check the bill and the meter record, raise the problem with the utility, and file with the CGRF if it is not settled.',
      tag: 'Typical request',
    },
    {
      title: 'A housing society that needs more power',
      text: 'For lifts, pumps or EV chargers, we prepare the load increase application, arrange the wiring test report and follow it up with the utility.',
      tag: 'Typical request',
    },
    {
      title: 'A shop or office that changes owner or name',
      text: 'We update the name, address and tariff category on the connection so the bill matches how the space is used.',
      tag: 'Typical request',
    },
    {
      title: 'A business with a high tension connection',
      text: 'We handle complaints, tariff questions and disconnection requests with the utility.',
      tag: 'Typical request',
    },
    {
      title: 'An electrician or contractor who needs a licence',
      text: 'We prepare and file the PWD application and tell you which documents to bring.',
      tag: 'Typical request',
    },
  ],
  peopleTitle: 'Who you deal with',
  peopleIntro: 'SANYOG is led by the Director of JC Apex Ventures.',
  people: [
    {
      heading: 'Leadership',
      members: [
        {
          name: 'Jitendra Chavan',
          role: 'Director',
          note: '36 years of direct utility engineering experience.',
        },
      ],
    },
  ],
  whoDoesTheWork: {
    title: 'Who does the work',
    text: 'SANYOG prepares, files and tracks paperwork directly with utility companies and government offices. If physical civil or electrical work is needed on site, such as wiring changes or meter board replacement, we arrange it through vetted licensed electrical contractors.',
  },
  steps: [
    { title: 'Review your papers', text: 'You share your bill, sanction letter or connection details.' },
    { title: 'We prepare the file', text: 'We check the requirements and assemble the application in the exact order needed.' },
    { title: 'We submit and follow up', text: 'We lodge the file with the utility or department and track it to completion.' },
    { title: 'Resolution', text: 'You receive your corrected bill, new sanction letter or licence document.' },
  ],
  actions: [
    { label: 'Electricity enquiry', href: '/electricity-grievances' },
    { label: 'Licences and registrations', href: '/licenses' },
    { label: 'File Utility Grievance', href: 'mailto:licenses@jcapexv.com?cc=Consumercmpl@jcapexv.com&subject=Utility%20Grievance%20Enquiry' },
  ],
  description:
    'SANYOG by JC Apex Ventures helps with electricity connections, bill complaints, CGRF filings and PWD licences in Mumbai.',
};

export const gridApex: DivisionContent = {
  slug: 'grid-apex',
  name: 'GRID APEX',
  href: '/grid-apex',
  icon: 'sun',
  short: 'HT and LT electrical engineering, substation switchgear and solid waste machines.',
  tagline:
    'Electrical installations, substation switchgear, transformers and on-site waste treatment for homes, businesses and industry.',
  heroImage: '/images/electrical-substation.jpg',
  heroImageTag: 'HT Substation & Transformer Setup',
  statPill: 'PWD Licenced Electrical Contracting',
  laypersonBadge: 'Heavy Electrical & Clean Waste Tech',
  plainTakeaway:
    'Turnkey electrical installations from high-voltage transformers and power distribution boards to innovative zero-energy solid waste disposal machines.',
  visualTags: ['HT/LT Substations', 'Transformers', 'Distribution Boards', 'Zero-Energy Solid Waste Tech'],
  visualCards: [
    {
      title: 'HT/LT Substation Execution',
      takeaway: 'Heavy electrical infrastructure designed and certified to PWD norms',
      image: '/images/electrical-substation.jpg',
      imageTag: 'High-Voltage Switchgear & Transformer Specimen',
      badge: 'Turnkey Commissioning',
      description: 'Transformer substations, HT/LT switchboards, busbars, and power cables installed by certified contractors under engineer supervision.',
    },
    {
      title: 'LT Switchgear & Power Panels',
      takeaway: 'Industrial distribution boards with thermal protection and circuit zoning',
      image: '/images/electrical-switchgear-panel.jpg',
      imageTag: 'Distribution Switchgear Specimen',
      badge: 'Industrial Grade',
      description: 'Engineered motor control centers, sub-distribution panels, and energy metering boards configured for resilient facility operations.',
    },
    {
      title: 'Zero-Energy Solid Waste Tech',
      takeaway: 'Decentralized waste reduction with zero electricity consumption',
      image: '/images/waste-management-tech.jpg',
      imageTag: 'Environmental Waste Conversion Specimen',
      badge: 'Eco Engineering',
      description: 'Patented magnetic combustion machine that safely reduces organic and mixed non-recyclable solid waste right at housing societies and campuses.',
    },
  ],
  intro: [
    'GRID APEX looks after electrical and energy projects. That covers the wiring and equipment inside a building, the heavy supply used by factories and hotels, and a patented waste treatment machine.',
    'We plan the job, deal with the utility approvals and manage the project. The installation itself is done by experienced contractors that we have checked, so the right specialist does each part of the work.',
  ],
  glossary: [
    { term: 'HT (high tension)', meaning: 'The heavy supply used by factories, hotels and large buildings.' },
    { term: 'LT (low tension)', meaning: 'The normal supply used in homes, shops and offices.' },
    {
      term: 'Net metering',
      meaning: 'Your rooftop solar plant sends extra power to the grid, and the utility credits it on your bill.',
    },
    { term: 'kWp', meaning: 'The rated size of a solar plant, in kilowatts.' },
  ],
  servicesTitle: 'What we offer',
  services: [
    {
      title: 'HT electrical work',
      text: 'Panels, switchgear, transformers and cable laying, with testing and commissioning.',
    },
    {
      title: 'LT electrical work',
      text: 'Wiring, distribution panels, lighting, earthing and lightning protection.',
    },
    {
      title: 'Maintenance contracts',
      text: 'Regular servicing and breakdown support for electrical systems.',
    },
    {
      title: 'Rooftop solar and pergolas (Solis)',
      text: 'Dedicated solar EPC through Solis: elevated pergola arrays, BIPV architectural glass, EV charging hubs, net metering, and PM Surya Ghar subsidies.',
    },
    {
      title: 'EV charging',
      text: 'AC and DC charging points for offices, housing societies and commercial sites.',
    },
    {
      title: 'Solid waste machine',
      text: 'A patented machine that treats mixed waste on site without fuel or outside electricity. It holds a Central Government patent and is certified by the Maharashtra Pollution Control Board (MPCB).',
    },
    {
      title: 'Help with government empanelment',
      text: 'Advice for electrical contractors who want to register with government bodies and bid for tenders in their own name.',
    },
  ],
  portfolioTitle: 'Portfolio',
  portfolioIntro:
    'We do not name clients. This is the kind of work our team and execution partners have done, and the work we usually take on.',
  portfolio: [
    {
      title: 'Rooftop solar for industrial plants',
      text: 'Rooftop plants for industrial users, from about 100 kWp to about 690 kWp across manufacturing and processing facilities.',
      tag: 'Team experience',
    },
    {
      title: 'HT supply for hospitality properties',
      text: 'HT electrical work for hotels and hospitality properties in Mumbai and other cities.',
      tag: 'Team experience',
    },
    {
      title: 'Wiring for homes, offices and shops',
      text: 'New wiring, distribution boards, lighting and earthing, and yearly maintenance.',
      tag: 'Typical work',
    },
    {
      title: 'Waste treatment on site',
      text: 'For housing societies, campuses and businesses that want to treat their own waste where it is produced.',
      tag: 'Typical use',
    },
  ],
  peopleTitle: 'People and partners',
  people: [
    {
      heading: 'Leadership',
      members: [
        {
          name: 'Jitendra Chavan',
          role: 'Director',
          note: '36 years of direct utility engineering experience.',
        },
      ],
    },
    {
      heading: 'Execution partners',
      members: [
        {
          name: 'Licensed electrical contractors',
          role: 'HT and LT installation',
        },
        {
          name: 'Solar installation companies',
          role: 'Rooftop plants and EV charging',
        },
      ],
    },
  ],
  whoDoesTheWork: {
    title: 'Who does the work',
    text: 'Installation is done by execution partners we have checked. They are responsible for the on-site work, safety and warranty. GRID APEX plans the project, deals with the utility and manages the partners. If a partner pays us a referral fee, we tell you before you decide.',
  },
  steps: [
    { title: 'Site visit', text: 'We look at the site and understand what you need.' },
    { title: 'Plan and price', text: 'We prepare the design and a clear cost, with quotes from our partners.' },
    { title: 'Approvals', text: 'We handle the utility paperwork, including net metering for solar.' },
    { title: 'Installation and handover', text: 'Our partner installs and tests the system, and we hand it over to you.' },
  ],
  actions: [
    { label: 'Solis Solar Hub & Calculator', href: '/solis' },
    { label: 'Discuss an electrical project', href: 'mailto:admin@jcapexv.com?subject=GRID%20APEX%20enquiry' },
  ],
  description:
    'GRID APEX by JC Apex Ventures: HT and LT electrical work, rooftop solar, EV charging and a patented solid waste machine.',
};

export const tvasta: DivisionContent = {
  slug: 'tvasta',
  name: 'TVASTA',
  href: '/tvasta',
  icon: 'layout',
  short: 'Interior design and space planning, from first sketch to finished site.',
  tagline: 'Interior design and space planning for homes and offices, with the building and electrical work managed for you.',
  heroImage: '/images/architectural-interior.jpg',
  heroImageTag: 'Architectural Fit-out Specimen',
  statPill: 'Architect-Led Execution',
  laypersonBadge: 'Turnkey Space Transformation',
  plainTakeaway:
    'Thoughtful space planning, 3D layouts, and luxury turnkey interior contracting for corporate offices and upscale residences with fixed timelines.',
  visualTags: ['Space Planning', 'Turnkey Interiors', '3D Visualization', 'Custom Fit-outs'],
  visualCards: [
    {
      title: 'Corporate & Executive Interiors',
      takeaway: 'Clean architectural finishes with ergonomic flow and acoustic optimization',
      image: '/images/architectural-interior.jpg',
      imageTag: 'Executive Office Fit-out Specimen',
      badge: 'Turnkey Delivery',
      description: 'Complete interior architecture, modular workstations, partition walls, and custom woodwork built to precise specifications.',
    },
    {
      title: 'Space Planning & Material Selection',
      takeaway: 'Precise 3D layouts and transparent material schedules before construction starts',
      image: '/images/architectural-fitout-materials.jpg',
      imageTag: 'Architectural Material Specimen',
      badge: 'Zero Cost Surprises',
      description: 'Detailed floor plans, lighting schedules, and physical sample boards ensuring total clarity for owners before site mobilization.',
    },
    {
      title: 'Luxury Residential Turnkey Overhauls',
      takeaway: 'Bespoke apartments and penthouses crafted with handcrafted finishes and warm lighting',
      image: '/images/luxury-residential-fitout.jpg',
      imageTag: 'Luxury Residential Interior Specimen',
      badge: 'Tailored Living',
      description: 'Complete residence fit-out including custom modular kitchens, Italian marble masonry, designer false ceilings, and concealed ambient lighting.',
    },
  ],
  intro: [
    'TVASTA designs and fits out interiors. Our architects and interior designers plan the layout, choose materials and lighting, and coordinate the civil and electrical work, so one team looks after the whole job.',
    'Every project is packaged as Standard, Premium or Luxury, so the design matches your budget.',
  ],
  glossary: [
    { term: 'Turnkey', meaning: 'One team handles design and building, so you do not manage separate contractors.' },
    { term: 'Fit-out', meaning: 'The interior work that makes an empty space ready to use.' },
  ],
  servicesTitle: 'What we do',
  services: [
    {
      title: 'Space planning',
      text: 'Layouts for homes and commercial spaces, with materials, finishes and lighting planned together.',
    },
    {
      title: 'Interior design',
      text: 'Modular kitchens, wardrobes and storage, carpentry, wall finishes and lighting.',
    },
    {
      title: 'Turnkey execution',
      text: 'Civil work, electrical fit-out, site coordination and finishing.',
    },
    { title: 'Vastu suggestions', text: 'Layout advice based on Vastu, if you ask for it.' },
  ],
  portfolioTitle: 'Portfolio',
  portfolioIntro:
    'Example designs from the TVASTA portfolio, shown at each of the three levels. We do not name clients.',
  portfolio: [
    {
      title: 'Kitchens',
      text: 'Modular kitchens in three styles.',
      tag: 'Example design',
      levels: [
        { label: 'Standard', text: 'A parallel kitchen with glossy cream cabinets and cove ceiling lights.' },
        { label: 'Premium', text: 'A warm oak kitchen with open shelves, a copper chimney hood and a marble-look backsplash.' },
        { label: 'Luxury', text: 'An island kitchen with a stone waterfall counter, a glass backsplash and bar seating.' },
      ],
    },
    {
      title: 'Living rooms',
      text: 'Living spaces from practical to grand.',
      tag: 'Example design',
      levels: [
        { label: 'Standard', text: 'Smart layouts, durable laminate finishes and dependable fittings.' },
        { label: 'Premium', text: 'Acrylic or PU finishes, soft-close hardware and layered lighting.' },
        { label: 'Luxury', text: 'A bright living room with a crystal chandelier, tufted sofas and floor-to-ceiling windows.' },
      ],
    },
    {
      title: 'Bedrooms',
      text: 'Restful bedrooms with storage and soft lighting.',
      tag: 'Example design',
      levels: [
        { label: 'Standard', text: 'A wood-panelled headboard with loft storage, curtains and cove lighting.' },
        { label: 'Premium', text: 'Warm wood panelling, a gold ring pendant light, framed art and soft cove lighting.' },
        { label: 'Luxury', text: 'A dark stone feature wall, a brass wall light and a quilted upholstered headboard.' },
      ],
    },
    {
      title: 'Balconies and outdoor spaces',
      text: 'Balconies, dining corners and courtyards.',
      tag: 'Example design',
      levels: [
        { label: 'Standard', text: 'A corner balcony with a built-in wooden bench, a vertical garden wall and warm lighting.' },
        { label: 'Premium', text: 'A dining nook with a curved wooden bench, an arched mirror and wall art.' },
        { label: 'Luxury', text: 'A landscaped courtyard with tropical plants, a hand-painted wall panel and teak seating.' },
      ],
    },
  ],
  tiers: {
    rows: [
      { label: 'Finishes', standard: 'Laminate', premium: 'Acrylic, PU or veneer', luxury: 'Natural stone, veneer, custom work' },
      { label: 'Hardware', standard: 'Good basic fittings', premium: 'Soft-close, branded', luxury: 'Imported, automated' },
      { label: 'Lighting', standard: 'Functional', premium: 'Layered and cove', luxury: 'Architectural and scene-based' },
      { label: 'Design input', standard: 'Standard layouts', premium: 'Custom layouts', luxury: 'Fully custom design' },
      { label: 'Best for', standard: 'Value-focused homes', premium: 'Modern family homes', luxury: 'Signature residences' },
    ],
  },
  peopleTitle: 'Our design team',
  peopleIntro: 'Architects and interior designers work together on every project.',
  people: [
    {
      heading: 'Architects',
      members: [
        { name: 'Mr. Bakshi', role: 'Architect' },
        { name: 'Mr. Navale', role: 'Architect' },
        { name: 'Mr. Parmar', role: 'Architect' },
      ],
    },
    {
      heading: 'Interior designers',
      members: [
        { name: 'Mrs. Akshata', role: 'Interior designer' },
        { name: 'Mrs. Shabnam', role: 'Interior designer' },
        { name: 'Ms. Akshata', role: 'Interior designer' },
      ],
    },
  ],
  whoDoesTheWork: {
    title: 'Who does the work',
    text: 'Our design team plans the project. Civil, electrical and carpentry work on site is done by contractors who work with TVASTA, and we coordinate them. Electrical fit-out can also be arranged through GRID APEX.',
  },
  steps: [
    { title: 'Understand', text: 'We listen to what you want and visit the site.' },
    { title: 'Plan', text: 'We prepare the layout, choose materials and agree the budget level.' },
    { title: 'Build', text: 'Contractors carry out the civil, electrical and carpentry work, coordinated by us.' },
    { title: 'Finish', text: 'We check the details and hand over the finished space.' },
  ],
  actions: [
    { label: 'Send a design enquiry', href: '/space-planning' },
    { label: 'Email TVASTA Studio', href: 'mailto:spacemgmt@jcapexv.com?subject=TVASTA%20Design%20Enquiry' },
  ],
  description:
    'TVASTA by JC Apex Ventures: interior design, space planning and turnkey fit-out for homes and offices in Mumbai.',
};

export const emudran: DivisionContent = {
  slug: 'emudran',
  name: 'eMUDRAN',
  href: '/emudran',
  icon: 'printer',
  short: 'Logos, packaging, printing and signboards from one desk.',
  tagline: 'Logos, packaging, printing and signboards, all from one desk.',
  heroImage: '/images/luxury-print-packaging.jpg',
  heroImageTag: 'Embossed Corporate Stationery & Packaging Specimen',
  statPill: 'Direct Press Supervision',
  laypersonBadge: 'Prestige Branding & Production',
  plainTakeaway:
    'High-end embossed stationery, luxury packaging, illuminated 3D signage, and corporate print materials crafted under hands-on production supervision.',
  visualTags: ['Luxury Embossing', 'Corporate Stationery', 'Custom Packaging', '3D Signage'],
  visualCards: [
    {
      title: 'Embossed Corporate Stationery',
      takeaway: 'Tactile foil-stamped cards, letterheads, and folders that reflect prestige',
      image: '/images/luxury-print-packaging.jpg',
      imageTag: 'Embossed Paper Specimen',
      badge: 'Prestige Craftsmanship',
      description: 'Foil embossing, heavy cotton paper stocks, and precision spot UV for executive identity suites.',
    },
    {
      title: 'Brochures & Multi-Page Catalogues',
      takeaway: 'High-definition offset print with precision thread sewing and custom coatings',
      image: '/images/brochures-catalogues-print.jpg',
      imageTag: 'Offset Print Catalogue Specimen',
      badge: 'Press Supervised',
      description: 'Multi-page company profiles, product catalogues, and quarterly reports printed on heavy art card with matte or gloss lamination.',
    },
    {
      title: 'Illuminated 3D Signage & Packaging',
      takeaway: 'High-visibility architectural signboards and rigid packaging boxes',
      image: '/images/craft-signage-print.jpg',
      imageTag: 'Custom Packaging & Signage Specimen',
      badge: 'Turnkey Fabrication',
      description: 'Weatherproof LED acrylic channel lettering and rigid gift box packaging manufactured to exacting standards.',
    },
  ],
  intro: [
    'eMUDRAN takes a job from idea to finished product. We design the logo or packaging, print it, and install the signboard if you need one. You deal with one team instead of a designer, a printer and a fitter.',
  ],
  servicesTitle: 'What we make',
  services: [
    {
      title: 'Brand and packaging design',
      text: 'Logos, brand guidelines, product packaging and box design, campaign material, brochures and company profiles.',
    },
    {
      title: 'Printing',
      text: 'Letterheads, visiting cards, bill and receipt books, brochures, catalogues, ID cards, certificates, registers, folders, envelopes and wedding cards.',
    },
    {
      title: 'Signboards',
      text: '3D acrylic and steel letters, LED and glow signs, ACP boards, name plates in English, Marathi and Hindi, and housing society boards.',
    },
    {
      title: 'Flex, vinyl and large format',
      text: 'Banners, vinyl prints, one-way vision film for glass, roll-up standees, backlit prints, and vehicle and glass branding.',
    },
    { title: 'Fitting on site', text: 'Site survey, mounting and fitting of signs and graphics.' },
    { title: 'Websites and email', text: 'Simple business websites, landing pages, domain and email setup.' },
  ],
  portfolioTitle: 'Portfolio',
  portfolioIntro: 'We do not name clients. Our work falls into three areas.',
  portfolio: [
    {
      title: 'Packaging and brand design',
      text: 'Our Creative Director, Mr. Manish Ajgaonkar, has designed packaging and campaigns for well-known food, personal care, automotive and lifestyle brands in India and abroad.',
      tag: 'Experience of our Creative Director',
    },
    {
      title: 'Print for businesses and institutions',
      text: 'Stationery, bill books, brochures, ID cards and registers for offices, institutions and housing societies.',
      tag: 'Typical work',
    },
    {
      title: 'Signs and displays',
      text: 'Shopfront letters, lit signs, banners and society boards. We survey the site, make the sign and fit it.',
      tag: 'Typical work',
    },
  ],
  peopleTitle: 'People and partners',
  people: [
    {
      heading: 'Creative direction',
      members: [
        {
          name: 'Mr. Manish Ajgaonkar',
          role: 'Creative Director',
          note: 'Art and design, product packaging and brand identity.',
        },
      ],
    },
    {
      heading: 'Print and production',
      members: [
        {
          name: 'Hemangi Patil',
          role: 'Production and print partner',
          note: 'More than 22 years of experience in print and production.',
        },
      ],
    },
  ],
  whoDoesTheWork: {
    title: 'Who does the work',
    text: 'Design is led by our Creative Director. Printing, sign making and fitting are handled by our production partner, Hemangi Patil, who turns approved designs into finished prints, signs and large-format work.',
  },
  steps: [
    { title: 'Brief', text: 'Tell us what you need and share any logo or artwork.' },
    { title: 'Design and proof', text: 'We prepare the design and show you a proof to approve.' },
    { title: 'Production', text: 'Once you approve, we print or make it.' },
    { title: 'Delivery and fitting', text: 'We deliver, and fit the sign or graphics if needed.' },
  ],
  actions: [
    { label: 'See rates and get an estimate', href: '/print-management' },
    { label: 'Email eMUDRAN', href: 'mailto:printmgmt@jcapexv.com?cc=emudran@jcapexv.com&subject=Print%20Production%20Enquiry' },
  ],
  description:
    'eMUDRAN by JC Apex Ventures: logo and packaging design, printing, signboards and large-format work in Mumbai.',
};

export const agrim: DivisionContent = {
  slug: 'agrim',
  name: 'AGRIM',
  href: '/agrim',
  icon: 'landmark',
  short: 'Help preparing project loan and advance files. Not a lender.',
  tagline: 'We prepare your project loan and advance paperwork. We do not lend money.',
  heroImage: '/images/project-finance-binder.jpg',
  heroImageTag: 'Project Finance Feasibility Binder',
  statPill: 'Bank-Ready Institutional Dossiers',
  laypersonBadge: 'Institutional Project Documentation',
  plainTakeaway:
    'We compile institutional-grade project reports, CAPEX vs NPV financial models, and statutory clearance binders for clean technology and infrastructure investments, ensuring bank credit committees can evaluate projects without delays.',
  visualTags: ['DPR & Feasibility', 'CAPEX vs NPV Modeling', 'Payback & IRR Schedules', 'Patented Waste Tech Economics'],
  visualCards: [
    {
      title: 'CAPEX vs NPV Project Economics',
      takeaway: 'Mathematical feasibility schedules and net present value forecasts for infrastructure investments',
      image: '/images/site_capex_npv_v2.png',
      imageTag: 'CAPEX vs NPV Feasibility Chart',
      badge: 'Financial Model',
      description: 'Comprehensive financial modeling analyzing capital expenditures, projected cash generation, discount rates, and net present value for clean energy and industrial ventures.',
    },
    {
      title: 'Payback & IRR Cash-Flow Schedules',
      takeaway: 'Audited internal rate of return schedules and capital payback milestones for institutional appraisal',
      image: '/images/site_payback_irr_v2.png',
      imageTag: 'Payback & IRR Schedule Model',
      badge: 'Audit Ready',
      description: 'Credit Monitoring Arrangement (CMA) models, DSCR calculations, working capital estimates, and sensitivity analysis prepared for bank lending officers and credit committees.',
    },
    {
      title: 'Patented Zero-Power Waste Tech Dossiers',
      takeaway: 'Central Government patent and MPCB compliance documentation for 350°C magnetic decomposition tech',
      image: '/images/waste-management-tech.jpg',
      imageTag: 'Patented Waste Tech System',
      badge: 'Patented Tech',
      description: 'Complete regulatory clearance binders covering Central Government patent credentials, MPCB emission approvals, and project feasibility for zero-electricity municipal solid waste machines.',
    },
  ],
  notice: {
    title: 'What AGRIM is not',
    text: 'AGRIM is not a bank, an NBFC or a lender. It does not give loans or advances, and it cannot promise that a loan will be approved. Every decision is made by the bank or lender you apply to.',
  },
  intro: [
    'Larger engineering projects often require institutional bank financing. Missing technical layouts, unindexed statutory permits, or incomplete financial cash-flow models cause endless delays. AGRIM compiles bank-ready Detailed Project Reports (DPR), CMA data, and regulatory binders for solar EPC, HT electrical substations, and patented waste infrastructure.',
  ],
  servicesTitle: 'How AGRIM helps',
  services: [
    {
      title: 'Project Cost & Sizing Analysis',
      text: 'Consolidate full capital costs, engineering drawings, and equipment bills into bank-standard schedules.',
    },
    {
      title: 'CAPEX, NPV & IRR Modeling',
      text: 'Build mathematical financial forecasting models showing debt service coverage ratios (DSCR) and capital recovery timelines.',
    },
    {
      title: 'Regulatory & Technical Clearance Binders',
      text: 'Assemble DISCOM net-metering approvals, PWD electrical inspectorate sanctions, and patent certifications in compliant banking order.',
    },
    {
      title: 'Institutional Credit Committee Dossiers',
      text: 'Deliver a finished, fully indexed file directly ready for your chosen lender or banker to appraise without procedural queries.',
    },
  ],
  portfolioTitle: 'Typical Project Dossiers',
  portfolioIntro:
    'AGRIM is a support service and non-lender advisory. We do not lend funds. These are the institutional engineering dossiers we prepare.',
  portfolio: [
    {
      title: 'Rooftop Solar Pergola for CHS or Commercial Facility',
      text: 'Consolidated file with 55+ kWp engineering layout, net-metering sanctions, DISCOM agreements, and vendor quotes.',
      tag: 'Solar DPR File',
    },
    {
      title: 'Patented Zero-Power Solid Waste Treatment Facility',
      text: 'Detailed Project Report covering 350°C decomposition kinetics, Central Government patent grants, MPCB approvals, and IRR models.',
      tag: 'Clean Tech DPR',
    },
    {
      title: 'HT Industrial Substation & Sanctioned Load Upgrade',
      text: 'Full engineering drawings, PWD electrical inspectorate approvals, and 1600+ kVA equipment costing dossiers.',
      tag: 'Substation DPR',
    },
    {
      title: 'Maharashtra 3,900 EV Charging Network ROI Framework',
      text: 'Detailed Project Report for deploying 3,900 EV chargers across Maharashtra housing societies (60 kW DC plus dual AC per 100 kW sanctioned site), detailing Rs 40L site CAPEX, 10-year NPV schedules, and 6 to 7 year payback economics.',
      tag: 'EV Infrastructure DPR',
    },
  ],
  peopleTitle: 'Who decides',
  people: [],
  whoDoesTheWork: {
    title: 'Who decides',
    text: 'Banks and other lenders decide. AGRIM prepares the file and you apply directly to the lender.',
  },
  steps: [
    { title: 'Tell us about the project', text: 'Share what you plan to build and what you need.' },
    { title: 'We collect the papers', text: 'We list the documents needed and help gather them.' },
    { title: 'We prepare the file', text: 'We build the file in the order lenders expect.' },
    { title: 'You apply', text: 'You submit the file to your chosen lender.' },
  ],
  actions: [{ label: 'Email AGRIM', href: 'mailto:admin@jcapexv.com?subject=AGRIM%20enquiry' }],
  description:
    'AGRIM by JC Apex Ventures prepares project loan and advance files. AGRIM is not a bank, NBFC or lender.',
};

export const solisDivision: DivisionContent = {
  slug: 'solis',
  name: 'SOLIS',
  href: '/solis',
  icon: 'zap',
  short: 'Turnkey rooftop solar, elevated pergola arrays, BIPV architectural glass and EV charging hubs.',
  tagline:
    'Clean energy EPC, elevated terrace pergolas, solar glass and EV mobility hubs for housing societies, bungalows and businesses.',
  heroImage: '/images/solar-pergola-rooftop.jpg',
  heroImageTag: 'Representative Pergola Array',
  statPill: 'Save up to 90% on electricity bills',
  laypersonBadge: 'Walkable Terrace Architecture',
  plainTakeaway:
    'Get clean rooftop solar without losing your terrace: our elevated pergolas generate power overhead while keeping walking and gathering space completely open.',
  visualTags: ['Elevated Pergolas', 'Zero Terrace Loss', 'BIPV Glass', 'EV Charging', 'Net-Metering'],
  visualCards: [
    {
      title: 'Elevated Pergola Canopies',
      takeaway: 'Walkable, waterproof rooftop canopy that preserves 100% terrace use',
      image: '/images/solar-pergola-rooftop.jpg',
      imageTag: 'Representative Pergola Array',
      badge: 'Walkable Terrace',
      description: 'Raised structural steel frames with 8+ ft clearance allowing housing societies to host events beneath clean solar arrays.',
    },
    {
      title: 'BIPV Architectural Glass',
      takeaway: 'Solar glass panels that generate power while letting natural sunlight through',
      image: '/images/solar-bipv-glass.jpg',
      imageTag: 'Architectural BIPV Specimen',
      badge: 'Aesthetic Integration',
      description: 'Semi-transparent solar glass panels integrated directly into building canopies, balconies, and curtain walls.',
    },
    {
      title: 'EV Charging Hub Integration',
      takeaway: 'Fast vehicle charging powered directly by your building rooftop generation',
      image: '/images/solar-ev-charging.jpg',
      imageTag: 'EV Charging Hub Array',
      badge: 'EV-Ready Infrastructure',
      description: 'Dedicated AC/DC charging stations integrated with society electrical panels and rooftop solar generation.',
    },
  ],
  intro: [
    'Solis is the clean energy and solar EPC division of JC Apex Ventures. We help housing societies, commercial properties and homeowners generate their own clean electricity while lowering their power bills.',
    'Many housing societies worry that standard solar frames will block their terrace or make it unusable. Solis solves this with elevated pergola structures, keeping the terrace floor open for walking, society gatherings and recreation. We also install architectural BIPV solar glass, EV vehicle charging points, and handle all utility net-metering approvals and government subsidies.',
  ],
  glossary: [
    {
      term: 'Elevated Pergola',
      meaning: 'A solar structure raised 8 to 10 feet high, keeping the terrace floor 100% usable for residents.',
    },
    {
      term: 'BIPV (Building Integrated Photovoltaics)',
      meaning:
        'Semi-transparent solar glass panels used for skylights, atriums and canopies that let natural light through while producing electricity.',
    },
    {
      term: 'Net Metering',
      meaning:
        'A bi-directional electricity meter that exports surplus solar power to the utility grid and credits it against your bill.',
    },
    {
      term: 'PM Surya Ghar',
      meaning:
        'Central government subsidy scheme providing financial assistance for rooftop solar installations.',
    },
  ],
  servicesTitle: 'What Solis delivers',
  services: [
    {
      title: 'Site feasibility & shadow analysis',
      text: 'Detailed terrace inspection, structural load assessment and shadow simulation to determine the ideal panel capacity.',
    },
    {
      title: 'Elevated pergola solar structures',
      text: 'Hot-dip galvanised elevated structures engineered for Mumbai coastal wind speeds up to 150 km/h, keeping terraces completely walkable.',
    },
    {
      title: 'BIPV architectural solar glass',
      text: 'Semi-transparent solar glass for canopies, skylights and entrance atriums offering 30% light transmittance and aesthetic appeal.',
    },
    {
      title: 'EV charging infrastructure',
      text: 'Dedicated AC slow chargers and fast DC charging points integrated directly with your solar distribution panel.',
    },
    {
      title: 'Net metering & utility liaisoning',
      text: 'Complete end-to-end paperwork and coordination with BEST, Adani Electricity (AEML), Tata Power and MSEDCL.',
    },
    {
      title: 'PM Surya Ghar subsidy assistance',
      text: 'End-to-end documentation and submission for government subsidies up to Rs 78,000 for homes and up to Rs 10.8 Lakh for housing societies.',
    },
  ],
  portfolioTitle: 'Project and engineering experience',
  portfolioIntro:
    'We protect client privacy and do not display private addresses or society names. Here are representative projects and technical benchmarks handled by our engineering and execution associates.',
  portfolio: [
    {
      title: '101-Panel elevated pergola for a high-rise housing society',
      text: 'Engineered an elevated pergola solar system across a high-rise terrace in Mumbai, keeping the entire rooftop accessible for society members while powering common area lifts, pumps and lighting.',
      tag: 'Associate experience',
    },
    {
      title: 'Commercial rooftop solar & architectural BIPV glass',
      text: 'Combined a standard rooftop solar array with 29 kWp of architectural semi-transparent solar glass canopies, lowering commercial power tariffs and providing clean skylight shade.',
      tag: 'Associate experience',
    },
    {
      title: 'Bungalow rooftop solar with dedicated EV charging point',
      text: 'Installed high-efficiency solar modules paired with a dedicated home EV charger, giving the homeowner zero-emission vehicle charging from their own roof.',
      tag: 'Typical project',
    },
    {
      title: 'Housing society common meter net metering',
      text: 'Guided society committees through AGM resolutions, DISCOM approvals, net meter commissioning, and central government subsidy disbursement.',
      tag: 'Typical project',
    },
  ],
  peopleTitle: 'Engineering leadership & associates',
  people: [
    {
      heading: 'Leadership & Execution Network',
      members: [
        {
          name: 'Jitendra Chavan',
          role: 'Director & Utility Liaison',
          note: '36 years of direct experience with Mumbai power networks.',
        },
        {
          name: 'Solis Engineering Associates',
          role: 'Structural & Solar EPC Specialists',
          note: 'Empanelled solar engineers and licensed structural design associates.',
        },
      ],
    },
  ],
  whoDoesTheWork: {
    title: 'How projects are executed',
    text: 'Solis plans the plant sizing, conducts site inspections and manages all utility net-metering paperwork directly. Fabrication, heavy civil anchoring and electrical module installations are executed by vetted, licensed solar contractors under our strict supervision.',
  },
  steps: [
    {
      title: 'Site inspection & shadow analysis',
      text: 'We visit your roof, measure usable space and check utility connection parameters.',
    },
    {
      title: 'Custom proposal & 3D layout',
      text: 'We present panel count, generation estimates, Pergola options and subsidy calculations.',
    },
    {
      title: 'Approvals & installation',
      text: 'We file for DISCOM net metering sanction and oversee structural fabrication and panel mounting.',
    },
    {
      title: 'Commissioning & subsidy credit',
      text: 'The net meter is installed and tested, and your subsidy claim is tracked until disbursed.',
    },
  ],
  actions: [
    { label: 'Open Solis Solar Calculator', href: '/solis#calculator' },
    { label: 'Request Site Inspection', href: '/solis#enquiry' },
    { label: 'Email Solis Hub', href: 'mailto:solis@jcapexv.com?cc=admin@jcapexv.com&subject=Solis%20Solar%20Feasibility' },
  ],
  description:
    'Solis by JC Apex Ventures offers solar rooftop EPC, elevated pergolas, BIPV solar glass, EV charging hubs and PM Surya Ghar subsidy assistance in Mumbai.',
};

export const divisions: DivisionContent[] = [sanyog, gridApex, solisDivision, tvasta, emudran, agrim];
