"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, CheckCircle2, MapPin } from 'lucide-react';
import {
  FlexCarousel,
  DepthCarousel,
  ElectricBorder,
  TechText,
  SpecularButton,
  MicroSlats,
  OptionWheel,
} from '@/components/react-bits';

interface CaseStudy {
  id: string;
  num: string;
  divisionName: string;
  logoLight: string;
  isElectric: boolean;
  title: string;
  location: string;
  category: string;
  statusTag: string;
  metric: string;
  primaryImage: string;
  galleryItems: {
    id: string;
    title: string;
    tag: string;
    image: string;
    description: string;
  }[];
  client: string;
  leadAssociate: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  specs: { label: string; value: string }[];
  actionHref: string;
  actionLabel: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'suburban-chs',
    num: '(01)',
    divisionName: 'SOLIS',
    logoLight: '/images/logos/solis-official.png',
    isElectric: true,
    title: 'Suburban CHS Walkable Rooftop Solar Pergola',
    location: 'Kandivali West, Mumbai',
    category: 'Renewable Infrastructure / Solis',
    statusTag: 'Engineering Feasibility Study & Proposal Framework',
    metric: '55.55 kWp (101 Bi-Facial Panels) · 100% Usable Terrace Footprint',
    primaryImage: '/images/solis_canopy_page1.jpg',
    galleryItems: [
      {
        id: 'sub-1',
        title: '10.5 ft Elevated Galvanized Pergola Array',
        tag: 'STRUCTURAL CANOPY',
        image: '/images/solis_canopy_page1.jpg',
        description: 'Hot-dip galvanized structural portal frame engineered for 150 km/h coastal wind loads.',
      },
      {
        id: 'sub-2',
        title: 'Unobstructed Resident Terrace Amenity Zone',
        tag: 'SPATIAL PRESERVATION',
        image: '/images/solis_terrace_lounge.jpg',
        description: 'Zero floor-level trip hazards; full headroom preserved for walking and society gatherings.',
      },
      {
        id: 'sub-3',
        title: 'Bi-Facial Module Array & Rainwater Channeling',
        tag: 'NET-METERING SCHEMATIC',
        image: '/images/rooftop_amenity_sky_lounge.jpg',
        description: '101 high-efficiency bi-facial modules feeding Adani Electricity (AEML) net-metering grid.',
      },
    ],
    client: 'Suburban Cooperative Housing Society (Managing Committee)',
    leadAssociate: 'Jitendra Chavan (Director) & Solis EPC Network',
    challenge:
      'The society terrace was actively utilized by residents for recreation, morning walks, and community gatherings. Standard low-slung RCC ballast solar structures would have created trip hazards, blocked access, and rendered the roof deck unusable.',
    solution:
      'Solis engineered a 10.5 ft elevated hot-dip galvanized structural pergola canopy carrying 101 high-wattage bi-facial solar modules in a comprehensive feasibility study. The schematic integrates concealed cable raceways, rainwater gutters, and Adani Electricity Mumbai Limited (AEML) bi-directional net-metering synchronization.',
    outcomes: [
      'Modeled for 55.55 kWp capacity generating ~80,000 clean kWh units annually',
      '85% projected reduction in society common-area electricity billing',
      '100% usable terrace footprint preserved with shaded walkable headroom',
      'Certified structural wind-load tolerance modeled up to 150 km/h',
    ],
    specs: [
      { label: 'Plant Capacity', value: '55.55 kWp (Feasibility Study)' },
      { label: 'Module Array', value: '101 Bi-Facial PERC Panels' },
      { label: 'Clear Headroom', value: '10.5 ft Walkable Elevation' },
      { label: 'DISCOM Liaison', value: 'Adani Electricity (AEML)' },
    ],
    actionHref: '/solis#solis-enquiry',
    actionLabel: 'Request Solis Pergola Assessment',
  },
  {
    id: 'sanyog-cgrf-tariff',
    num: '(02)',
    divisionName: 'SANYOG',
    logoLight: '/images/logos/sanyog-official.png',
    isElectric: true,
    title: 'Commercial-to-Residential Tariff Re-Categorization & 250 kVA Sanction',
    location: 'Nariman Point & Suburban Mumbai',
    category: 'Statutory Utility Liaison / Sanyog',
    statusTag: 'Engineering Feasibility Study & MERC Regulatory Dossier',
    metric: '250 kVA Sanction Regularization · MERC & CGRF Representation',
    primaryImage: '/images/sanyog_utility_infra.jpg',
    galleryItems: [
      {
        id: 'san-1',
        title: 'HT/LT Metering Cubicle & Tariff Audit',
        tag: 'METERING AUDIT',
        image: '/images/sanyog_utility_infra.jpg',
        description: 'Forensic verification of CT/PT ratios, billing multipliers, and sanction load records.',
      },
      {
        id: 'san-2',
        title: 'Multi-Utility Liaison Across 4 Mumbai Licensees',
        tag: 'DISCOM SANCTIONS',
        image: '/images/utility-metering-liaison.jpg',
        description: 'Direct coordination with BEST, Adani Electricity, Tata Power, and MSEDCL nodal cells.',
      },
      {
        id: 'san-3',
        title: 'Evidentiary Petition Assembly & Forum Pleadings',
        tag: 'CGRF ADVOCACY',
        image: '/images/utility-grievance-legal.jpg',
        description: 'Formulation of formal regulatory claims under Section 42(5) of the Electricity Act 2003.',
      },
    ],
    client: 'Commercial Premises & Housing Society Consortium',
    leadAssociate: 'Jitendra Chavan (36+ Years Direct Utility Engineering Practice)',
    challenge:
      'Premises across Mumbai frequently suffer from erroneous commercial tariff classification, retrospective billing assessments, low power factor penalties, or stalled load enhancement applications due to fragmented utility documentation.',
    solution:
      'Sanyog conducts a forensic audit of past billing ledgers, load profiles, and MERC tariff orders, preparing formal technical submissions for distribution licensees and statutory representation before the Consumer Grievance Redressal Forum (CGRF) and Ombudsman.',
    outcomes: [
      'Formal re-categorization from commercial tariff to residential common-amenity tariff',
      'Successful 250 kVA load enhancement sanction without network augmentation delays',
      'Elimination of recurring low power factor billing penalties',
      'Statutory representation conducted under Electricity Act 2003 guidelines',
    ],
    specs: [
      { label: 'Sanction Load', value: '250 kVA Regularization' },
      { label: 'Statutory Forum', value: 'CGRF & Electricity Ombudsman' },
      { label: 'Jurisdiction', value: 'BEST, Adani, Tata Power, MSEDCL' },
      { label: 'Initial Review', value: '₹50 Statutory Case Evaluation' },
    ],
    actionHref: '/sanyog',
    actionLabel: 'Open Sanyog Regulatory Dossier',
  },
  {
    id: 'substation-switchgear',
    num: '(03)',
    divisionName: 'GRID APEX',
    logoLight: '/images/logos/grid-apex-official.png',
    isElectric: true,
    title: '33kV/11kV Outdoor Substation & 1600 kVA VCB Switchgear Bay',
    location: 'Thane Industrial Belt, MMR',
    category: 'Industrial Electrical / Grid Apex',
    statusTag: 'In-Design Technical Schematic & PWD Proposal',
    metric: '1600 kVA Step-Down Bay · PWD Electrical Inspectorate Sanctions',
    primaryImage: '/images/electrical-substation.jpg',
    galleryItems: [
      {
        id: 'sub-1',
        title: '1600 kVA Step-Down Transformer Yard',
        tag: 'HT SUBSTATION BAY',
        image: '/images/electrical-substation.jpg',
        description: '33kV/433V oil-cooled distribution transformer bay with neutral earthing grid.',
      },
      {
        id: 'sub-2',
        title: 'SF6 Vacuum Circuit Breaker (VCB) Switchgear',
        tag: 'PROTECTION RELAYS',
        image: '/images/field_switchgear_panel.jpg',
        description: 'Fault-current protection coordination calibrated to parent DISCOM feeder.',
      },
      {
        id: 'sub-3',
        title: 'HT XLPE Trenching & Termination Protocol',
        tag: 'PWD INSPECTORATE',
        image: '/images/ht_cable_termination.jpg',
        description: 'End-to-end statutory drawing preparation under CEI safety regulations.',
      },
    ],
    client: 'Precision Engineering Manufacturing Complex',
    leadAssociate: 'Jitendra Chavan (36+ Yrs Utility Engineering Practice)',
    challenge:
      'Factory line expansion required an immediate 1600 kVA high-tension load sanction, step-down transformer bay design, and Chief Electrical Inspector (PWD) statutory clearances without halting active production shifts.',
    solution:
      'Grid Apex prepared single-line technical schematics for an oil-cooled 1600 kVA transformer bay, vacuum circuit breaker (VCB) panels, HT XLPE cable trenching, neutral earth pit matrix, and statutory filing with the Maharashtra PWD Electrical Inspectorate.',
    outcomes: [
      'Engineered for phased 1600 kVA energization with minimal plant downtime',
      'Zero safety non-conformities in statutory electrical inspectorate review',
      'Relay protection coordination verified against parent DISCOM fault levels',
      'Complete documentation from single-line drawings to charging permission',
    ],
    specs: [
      { label: 'Voltage Class', value: '33kV / 433V HT Step-Down' },
      { label: 'Transformer Rating', value: '1600 kVA Oil-Cooled Bay' },
      { label: 'Switchgear', value: 'Vacuum Circuit Breaker (VCB)' },
      { label: 'Statutory Authority', value: 'PWD Electrical Inspectorate' },
    ],
    actionHref: '/grid-apex',
    actionLabel: 'Consult on HT/LT Substation Scope',
  },
  {
    id: 'one-international-centre',
    num: '(04)',
    divisionName: 'TVASTA',
    logoLight: '/images/logos/tvasta-dark.png',
    isElectric: false,
    title: 'Corporate Headquarters Fit-Out & Acoustic Zoning',
    location: 'One International Centre, Senapati Bapat Marg, Mumbai',
    category: 'Turnkey Spatial Planning / Tvasta',
    statusTag: 'Proposal Framework & 3D CAD Space Schematic',
    metric: '4,800 sq.ft. Executive Floor · STC 48 Acoustic Isolation Zoning',
    primaryImage: '/images/architectural-interior.jpg',
    galleryItems: [
      {
        id: 'tva-1',
        title: 'Executive Boardroom & Acoustic Baffle Ceiling',
        tag: 'STC 48 ACOUSTICS',
        image: '/images/architectural-interior.jpg',
        description: 'Double-glazed acoustic partitions and walnut veneer paneling rated to STC 48.',
      },
      {
        id: 'tva-2',
        title: 'Material Palette & Concealed Low-Voltage MEP',
        tag: '3-TIER MATERIALITY',
        image: '/images/architectural-fitout-materials.jpg',
        description: 'Underfloor trunking and concealed HVAC diffusers with zero surface conduit clutter.',
      },
      {
        id: 'tva-3',
        title: 'Turnkey Workspace Zoning & Lighting Calibration',
        tag: 'CAD SPACE PLANNING',
        image: '/images/tvasta_luxury_interior.jpg',
        description: 'Ergonomic workstation density paired with DALI dimmable architectural luminaires.',
      },
    ],
    client: 'Financial Advisory & Wealth Management Suite',
    leadAssociate: 'Tvasta Architectural & MEP Execution Consortium',
    challenge:
      'A strict 58-day execution window requiring executive-grade finishes, high-decibel speech privacy for boardrooms, and dense low-voltage data and HVAC routing within fixed commercial slab heights.',
    solution:
      'Tvasta developed complete 3D CAD spatial layouts, acoustic isolation detailing (STC 48), natural walnut veneer specifications, and coordinated MEP distribution drawings under a single turnkey responsibility framework.',
    outcomes: [
      'Structured 58-calendar-day bar chart execution schedule',
      'Boardroom speech privacy engineered to STC 48 acoustic rating',
      'Integrated concealed HVAC, fire-fighting, and low-voltage cabling',
      'Single-point accountability across civil, electrical, and carpentry trades',
    ],
    specs: [
      { label: 'Floor Plate', value: '4,800 sq.ft. Commercial Suite' },
      { label: 'Acoustic Rating', value: 'STC 48 Partition Isolation' },
      { label: 'Schedule', value: '58 Calendar Days Turnkey Plan' },
      { label: 'Material Tier', value: 'Walnut Veneer & Architectural Stone' },
    ],
    actionHref: '/tvasta',
    actionLabel: 'Explore Tvasta Space Planning',
  },
  {
    id: 'rigid-box-packaging',
    num: '(05)',
    divisionName: 'eMUDRAN',
    logoLight: '/images/logos/emudran-official.png',
    isElectric: false,
    title: 'Thermal Foil-Stamped Rigid Presentation Packaging & Corporate Signage',
    location: 'Mumbai Corporate Production Portfolio',
    category: 'Visual Media & Production / eMudran',
    statusTag: 'Technical Production Framework & Press Specification',
    metric: 'Thermal Micro-Foil Embossing · 22+ Yrs Press Supervision',
    primaryImage: '/images/luxury-print-packaging.jpg',
    galleryItems: [
      {
        id: 'emu-1',
        title: 'Registered Gold Thermal Foil & Rigid Greyboard',
        tag: 'RIGID PACKAGING',
        image: '/images/luxury-print-packaging.jpg',
        description: 'Zero-warp 1200 GSM greyboard core wrapped in soft-touch laminated specialty paper.',
      },
      {
        id: 'emu-2',
        title: 'Corporate Monograph & Annual Report Production',
        tag: 'OFFSET CALIBRATION',
        image: '/images/catalogues_mockup.png',
        description: 'Section-sewn binding with automated press-pass Pantone ΔE < 1.0 color fidelity.',
      },
      {
        id: 'emu-3',
        title: 'Multi-Surface Brand Collateral & Signage',
        tag: 'PRODUCTION QC',
        image: '/images/brochures-catalogues-print.jpg',
        description: 'Supervised by Creative Director Manish Ajgaonkar and Production Partner Hemangi Patil.',
      },
    ],
    client: 'Corporate & Luxury Retail Portfolio',
    leadAssociate: 'Manish Ajgaonkar (Creative Director) & Hemangi Patil (22+ Yrs Print Production)',
    challenge:
      'High-volume presentation packaging and corporate publications require exact Pantone color consistency, crisp 90-degree V-grooved rigid box corners, and registered metallic foil stamping without batch variance.',
    solution:
      'eMudran executes on-press spectrophotometric color calibration, substrate grain-direction testing, precision brass die-making, and automated rigid box assembly overseen by Creative Director Manish Ajgaonkar and Production Partner Hemangi Patil.',
    outcomes: [
      '50,000-unit production framework with strict batch-to-batch color lock',
      '90-degree V-grooved greyboard construction with concealed magnetic closures',
      'FSC-certified archival paperboard and low-VOC offset inks',
      'End-to-end supervision from structural die-line to dispatch',
    ],
    specs: [
      { label: 'Production Scale', value: 'Up to 50,000 Rigid Units' },
      { label: 'Specialty Finish', value: 'Registered Thermal Micro-Foil' },
      { label: 'Core Substrate', value: '1200 GSM V-Grooved Greyboard' },
      { label: 'Leadership', value: 'Manish Ajgaonkar & Hemangi Patil' },
    ],
    actionHref: '/emudran',
    actionLabel: 'Request eMudran Packaging Proof',
  },
  {
    id: 'ev-network-dpr',
    num: '(06)',
    divisionName: 'AGRIM',
    logoLight: '/images/logos/agrim-dark.png',
    isElectric: false,
    title: '3,900 EV Charging Station Network CAPEX & 10-Year Bank Syndication DPR',
    location: 'Maharashtra Municipal & Highway Corridors',
    category: 'Clean Tech Advisory & DPR / Agrim',
    statusTag: 'Engineering Feasibility Study & Bankable DPR',
    metric: '3,900 EV Charge Points · 10-Yr CAPEX / Debt Syndication DPR',
    primaryImage: '/images/banking-sanction-dossier.jpg',
    galleryItems: [
      {
        id: 'agr-1',
        title: '10-Year CAPEX, DSCR & NPV Sensitivity Schedule',
        tag: 'BANKABLE DPR',
        image: '/images/site_capex_npv_v2.png',
        description: 'Institutional project finance modeling prepared for scheduled bank credit appraisal.',
      },
      {
        id: 'agr-2',
        title: 'IRR & Payback Trajectory for EV Infrastructure',
        tag: 'FINANCIAL MODELING',
        image: '/images/site_payback_irr_v2.png',
        description: 'Detailed debt service coverage ratio (DSCR) sensitivity across 3,900 planned charging bays.',
      },
      {
        id: 'agr-3',
        title: 'DISCOM Power Substation & Grid Interconnection Model',
        tag: 'POWER INFRASTRUCTURE',
        image: '/images/solar-ev-charging.jpg',
        description: 'Purely advisory & technical preparation (explicitly non-lender / non-NBFC).',
      },
    ],
    client: 'Municipal Clean Mobility Infrastructure Consortium',
    leadAssociate: 'Agrim Financial Modeling & DPR Desk (Non-NBFC Advisory)',
    challenge:
      'Scaling a regional EV charging hub network across 3,900 points required comprehensive financial sensitivity analysis, power load feasibility, and bank-grade documentation to secure commercial debt syndication.',
    solution:
      'Agrim formulated a bank-grade Detailed Project Report (DPR) detailing 10-year capital expenditures, revenue assumptions across AC and 60kW DC chargers, debt service coverage ratios (DSCR), and grid interconnection costs.',
    outcomes: [
      'Bank-grade DPR covering 3,900 EV charging points across commercial and municipal nodes',
      'Detailed 10-year capital expenditure (CAPEX), IRR, and NPV sensitivity matrix',
      'Structured credit appraisal submission package aligned with commercial bank lending criteria',
      'Strict non-lender compliance adhering purely to technical and financial engineering advisory',
    ],
    specs: [
      { label: 'Scope', value: '3,900 EV Charging Station Network' },
      { label: 'Financial Horizon', value: '10-Year CAPEX & Cashflow Model' },
      { label: 'Documentation', value: 'Bankable DPR & Syndication Pack' },
      { label: 'Advisory Status', value: 'Pure Technical Advisory (Non-NBFC)' },
    ],
    actionHref: '/agrim',
    actionLabel: 'Explore Agrim Infrastructure Advisory',
  },
];

export default function GroundedProjectTrack() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [viewMode, setViewMode] = useState<'track' | 'depth'>('depth');
  const [mobileIdx, setMobileIdx] = useState<number>(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scrollMobileTo = (idx: number) => {
    if (!mobileScrollRef.current) return;
    const targetIdx = Math.max(0, Math.min(idx, CASE_STUDIES.length - 1));
    const cardWidth = mobileScrollRef.current.clientWidth * 0.84;
    mobileScrollRef.current.scrollTo({
      left: targetIdx * (cardWidth + 14),
      behavior: 'smooth',
    });
    setMobileIdx(targetIdx);
  };

  const openDossier = (study: CaseStudy) => {
    setSelectedStudy(study);
  };

  const closeDossier = () => {
    setSelectedStudy(null);
  };

  useEffect(() => {
    if (selectedStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedStudy) {
        closeDossier();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStudy]);

  const carouselItems = CASE_STUDIES.map((study) => ({
    id: study.id,
    content: (
      <div style={{ width: 'clamp(315px, 28vw, 380px)', height: '100%' }}>
        <ElectricBorder
          active={study.isElectric}
          borderRadius={22}
          glowColor="#C29F53"
          innerBg="#FFFFFF"
          className="h-full"
        >
          <article
            onClick={() => openDossier(study)}
            className="project-card-grounded group"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '580px',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              border: study.isElectric ? 'none' : '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 14px 36px -8px rgba(0, 0, 0, 0.07)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Top Image Viewport (250px) with Official Brand Logo Pill & Status Tag */}
            <div style={{ position: 'relative', height: '245px', width: '100%', overflow: 'hidden', backgroundColor: '#111111' }}>
              <img
                src={study.primaryImage}
                alt={study.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="group-hover:scale-105"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(17,17,17,0.35) 0%, transparent 45%, rgba(17,17,17,0.65) 100%)',
                }}
              />

              {/* Top Row: Official Division Brand Mark Pill + Number */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 12px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(17, 17, 17, 0.76)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    height: '38px',
                  }}
                >
                  <img
                    src={study.logoLight}
                    alt={study.divisionName}
                    style={{
                      maxHeight: '26px',
                      maxWidth: '96px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                </div>

                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(17, 17, 17, 0.78)',
                    backdropFilter: 'blur(12px)',
                    color: '#F4F1EA',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.68rem',
                    fontWeight: 650,
                    letterSpacing: '0.05em',
                  }}
                >
                  {study.num} · {study.location}
                </span>
              </div>

              {/* Bottom Status Pill on Image */}
              <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontWeight: 650,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(244, 241, 234, 0.95)',
                    color: '#8C733E',
                    border: '1px solid rgba(194, 159, 83, 0.35)',
                  }}
                >
                  {study.statusTag}
                </span>
              </div>
            </div>

            {/* Card Body: Grounded Limestone & Crisp Editorial Hierarchy */}
            <div
              style={{
                padding: '22px 24px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                backgroundColor: '#FFFFFF',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.72rem',
                    fontWeight: 650,
                    color: '#8C733E',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '6px',
                  }}
                >
                  {study.category}
                </div>

                <h4
                  style={{
                    fontSize: '1.48rem',
                    fontWeight: 400,
                    color: '#111111',
                    margin: '0 0 10px 0',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  {study.title}
                </h4>

                <p
                  style={{
                    fontSize: '0.86rem',
                    color: '#555555',
                    lineHeight: 1.55,
                    margin: '0 0 14px 0',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {study.solution}
                </p>
              </div>

              <div>
                {/* TechText Engineering Metric Bar */}
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#F4F1EA',
                    border: '1px solid rgba(194, 159, 83, 0.25)',
                    marginBottom: '14px',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#222222',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <TechText text={study.metric} scrambleSpeed={20} maxScrambles={4} triggerOnHover={true} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.72rem',
                      color: '#666666',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {study.leadAssociate}
                  </span>

                  <SpecularButton
                    onClick={() => openDossier(study)}
                    variant="dark"
                    className="!py-2 !px-3.5 !text-[0.72rem] !normal-case flex-shrink-0"
                    icon={<ArrowUpRight size={13} />}
                  >
                    Inspect Dossier
                  </SpecularButton>
                </div>
              </div>
            </div>
          </article>
        </ElectricBorder>
      </div>
    ),
  }));

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#F4F1EA',
        color: '#111111',
        padding: 'clamp(96px, 12vh, 136px) 24px',
        position: 'relative',
        zIndex: 5,
        scrollMarginTop: '104px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
      }}
    >
      <div id="builds" className="absolute top-0 pointer-events-none" style={{ scrollMarginTop: '104px' }} aria-hidden="true" />

      {/* Background WebGL MicroSlats Layer */}
      <div
        className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
        style={{ opacity: 0.18 }}
        aria-hidden="true"
      >
        <MicroSlats
          preset="swell"
          color="#A855F7"
          glintColor="#ffffff"
          backgroundColor="#000000"
          slatWidth={10}
          slatHeight={25}
          gap={3}
          roundness={0.75}
          interactive
          cursorStrength={1}
          cursorSize={40}
          swirl={0}
          trail={1.4}
          lean={0}
          intro
        />
      </div>

      {/* Subtle Architectural Louver Rhythm */}
      <MicroSlats count={24} color="#8C733E" opacity={0.08} zIndex={1} showTicks={true} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header & View Mode Switcher */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '44px',
            textAlign: 'left',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <div className="eye-brow-container" style={{ marginBottom: '18px' }}>
              <span
                className="text-eye-brow"
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.74rem',
                  fontWeight: 650,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#8C733E',
                  display: 'inline-block',
                }}
              >
                [<TechText text="04 / SELECTED BUILDS & SANCTIONS" scrambleSpeed={26} maxScrambles={5} triggerOnHover={true} />]
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
                color: '#111111',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                margin: '0 0 18px 0',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                lineHeight: 1.14,
              }}
            >
              Engineering Feasibility Studies &amp; Field Schematics.
            </h2>

            <p
              style={{
                color: '#555555',
                fontSize: 'clamp(1rem, 1.3vw, 1.14rem)',
                lineHeight: 1.65,
                margin: 0,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 350,
              }}
            >
              Select any technical dossier below to inspect 3D spatial schematics, single-line substation specifications, and regulatory compliance outcomes across our six consortium divisions.
            </p>
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden md:block">
            <OptionWheel
              options={[
                { label: '01 / Gallery Track', value: 'track' },
                { label: '02 / 3D Depth Deck', value: 'depth' },
              ]}
              selectedValue={viewMode}
              onChange={(val) => setViewMode(val as 'track' | 'depth')}
            />
          </div>
        </div>

        {/* Desktop View: Horizontal FlexCarousel Track OR 3D Depth Deck */}
        <div className="hidden md:block">
          {viewMode === 'track' ? (
            <FlexCarousel items={carouselItems} gap={24} />
          ) : (
            <div className="py-6 px-4 md:px-8 rounded-3xl bg-white/75 backdrop-blur-md border border-black/8 shadow-md">
              <DepthCarousel
                items={CASE_STUDIES.map((s) => ({
                  id: s.id,
                  title: s.title,
                  tag: `${s.num} · ${s.divisionName}`,
                  image: s.primaryImage,
                  description: s.metric,
                  location: s.location,
                  metric: s.metric,
                  outcome: s.statusTag,
                  onClick: () => setSelectedStudy(s),
                }))}
                onSelect={(item) => {
                  const found = CASE_STUDIES.find((c) => c.id === item.id);
                  if (found) setSelectedStudy(found);
                }}
              />
              <div className="text-center mt-3">
                <p className="text-xs text-[#666666] font-sans">
                  Click the active card or &quot;Inspect CAD&quot; to open the full engineering dossier and single-line schematics.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile View: High-End Touch Swipe Carousel Deck */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-1 mb-2.5">
            <span
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.72rem',
                fontWeight: 650,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8C733E',
              }}
            >
              [Swipeable Project Dossiers]
            </span>
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.7rem',
                  fontWeight: 650,
                  color: '#8C733E',
                  backgroundColor: 'rgba(194, 159, 83, 0.14)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(194, 159, 83, 0.3)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                0{mobileIdx + 1} / 0{CASE_STUDIES.length}
              </span>
            </div>
          </div>

          {/* Swipe Track with Snap */}
          <div
            ref={mobileScrollRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardWidth = el.clientWidth * 0.84;
              const newIdx = Math.round(el.scrollLeft / (cardWidth + 14));
              if (newIdx !== mobileIdx && newIdx >= 0 && newIdx < CASE_STUDIES.length) {
                setMobileIdx(newIdx);
              }
            }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-3 -mx-4 px-4 scrollbar-none"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {CASE_STUDIES.map((study, idx) => (
              <div
                key={`mob-${study.id}`}
                onClick={() => openDossier(study)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-black/10 bg-white shadow-md transition-all duration-300 hover:shadow-lg flex-shrink-0 snap-center"
                style={{
                  width: 'calc(85vw - 20px)',
                  maxWidth: '330px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {/* Photo with division badge */}
                <div className="relative h-48 w-full overflow-hidden bg-[#111111]">
                  <img
                    src={study.primaryImage}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(17, 17, 17, 0.85) 0%, transparent 60%)',
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-md flex items-center justify-center">
                      <img
                        src={study.logoLight}
                        alt={study.divisionName}
                        className="h-4 w-auto object-contain brightness-0 invert"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {study.num}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] text-[#C29F53] font-sans font-medium">
                      {study.location}
                    </span>
                    <span className="text-[11px] text-white/90 font-medium">
                      {study.category.split('/')[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      lineHeight: 1.2,
                      fontWeight: 400,
                      color: '#111111',
                      margin: '0 0 8px 0',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    }}
                  >
                    {study.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      color: '#8C733E',
                      fontWeight: 600,
                      backgroundColor: '#F8F6F0',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(194, 159, 83, 0.22)',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <TechText text={study.metric} scrambleSpeed={18} maxScrambles={4} />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/8 text-[12px] text-[#666666]">
                    <span>Client: {study.client.split('(')[0].trim()}</span>
                    <span className="inline-flex items-center gap-1 text-[#8C733E] font-semibold">
                      <span>Inspect Dossier</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots and Quick Jump Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => scrollMobileTo(i)}
                  aria-label={`Go to case study ${i + 1}`}
                  style={{
                    width: mobileIdx === i ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: mobileIdx === i ? '#C29F53' : 'rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollMobileTo(mobileIdx - 1)}
                disabled={mobileIdx === 0}
                className="w-8 h-8 rounded-full border border-black/10 bg-white flex items-center justify-center text-xs font-bold text-[#111111] disabled:opacity-30 shadow-sm"
                aria-label="Previous Project"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollMobileTo(mobileIdx + 1)}
                disabled={mobileIdx === CASE_STUDIES.length - 1}
                className="w-8 h-8 rounded-full border border-black/10 bg-white flex items-center justify-center text-xs font-bold text-[#111111] disabled:opacity-30 shadow-sm"
                aria-label="Next Project"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Case Study Dossier Modal with DepthCarousel */}
      {selectedStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedStudy.title}
          onClick={closeDossier}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(17, 17, 17, 0.78)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              backgroundColor: '#F4F1EA',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0, 0, 0, 0.45)',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(194, 159, 83, 0.35)',
              textAlign: 'left',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 28px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#FFFFFF',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    height: '44px',
                    padding: '4px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#F8F6F0',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={selectedStudy.logoLight}
                    alt={selectedStudy.divisionName}
                    style={{ maxHeight: '30px', maxWidth: '110px', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.72rem',
                        color: '#8C733E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontWeight: 650,
                      }}
                    >
                      [{selectedStudy.category}]
                    </span>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.66rem',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        backgroundColor: 'rgba(194, 159, 83, 0.15)',
                        color: '#8C733E',
                        border: '1px solid rgba(194, 159, 83, 0.3)',
                      }}
                    >
                      {selectedStudy.statusTag}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 'clamp(1.4rem, 2.4vw, 1.95rem)',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontWeight: 400,
                      color: '#111111',
                      lineHeight: 1.15,
                    }}
                  >
                    {selectedStudy.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDossier}
                aria-label="Close dossier modal"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#F4F1EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#111111',
                  flexShrink: 0,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div
              style={{
                padding: '28px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* 3D DepthCarousel Gallery Inspection */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '12px 16px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.72rem',
                    fontWeight: 650,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#8C733E',
                    marginBottom: '4px',
                  }}
                >
                  [3D Schematic &amp; Site Inspection Carousel]
                </div>
                <DepthCarousel items={selectedStudy.galleryItems} className="!py-4" />
              </div>

              {/* Technical Specifications Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                  gap: '12px',
                  backgroundColor: '#FFFFFF',
                  padding: '18px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                {selectedStudy.specs.map((spec) => (
                  <div key={spec.label}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#8C733E',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontWeight: 650,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        display: 'block',
                      }}
                    >
                      {spec.label}
                    </span>
                    <strong
                      style={{
                        fontSize: '0.94rem',
                        color: '#111111',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        marginTop: '2px',
                        display: 'block',
                        fontWeight: 600,
                      }}
                    >
                      {spec.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="dossier-split">
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '22px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.72rem',
                      color: '#8C733E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: 650,
                    }}
                  >
                    [Site Bottleneck]
                  </span>
                  <p
                    style={{
                      marginTop: '8px',
                      marginBottom: 0,
                      color: '#444444',
                      fontSize: '0.92rem',
                      lineHeight: 1.62,
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {selectedStudy.challenge}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '22px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.72rem',
                      color: '#8C733E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: 650,
                    }}
                  >
                    [Engineering Protocol]
                  </span>
                  <p
                    style={{
                      marginTop: '8px',
                      marginBottom: 0,
                      color: '#444444',
                      fontSize: '0.92rem',
                      lineHeight: 1.62,
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {selectedStudy.solution}
                  </p>
                </div>
              </div>

              {/* Measurable Field Outcomes */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '22px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.72rem',
                    color: '#8C733E',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 650,
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  [Verified Engineering Parameters &amp; Leadership]
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedStudy.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.9rem',
                        color: '#333333',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      }}
                    >
                      <CheckCircle2 size={16} color="#C29F53" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div
              style={{
                padding: '18px 28px',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#555555',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                <MapPin size={15} color="#8C733E" />
                <span>
                  {selectedStudy.location} · {selectedStudy.leadAssociate}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <SpecularButton onClick={closeDossier} variant="light" className="!py-2 !px-4 !text-[0.76rem]">
                  Close
                </SpecularButton>
                <SpecularButton
                  href={selectedStudy.actionHref}
                  variant="dark"
                  icon={<ArrowUpRight size={14} />}
                  className="!py-2 !px-4 !text-[0.76rem]"
                >
                  {selectedStudy.actionLabel}
                </SpecularButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .dossier-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
