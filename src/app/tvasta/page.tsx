import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { tvasta } from '@/content/divisions';
import TvastaTierGallery, { TvastaTier } from '@/components/TvastaTierGallery';
import { InteriorSpecBreakdownChart } from '@/components/bklit';
import { ImageWithLightbox } from '@/components/ImageLightbox';
import {
  Ruler,
  Layers,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Volume2,
  Sparkles,
  ArrowRight,
  Flame,
  SunMedium,
  Building,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `${tvasta.name} | Turnkey Interior Design & Space Planning | JC Apex Ventures`,
  description: tvasta.description,
};

const TVASTA_TIERS: TvastaTier[] = [
  {
    id: 'tier-standard',
    title: 'Standard Tier : Durable Essentials',
    subtitle: 'Functional Commercial Grade',
    badge: 'Tier 01',
    description: 'Vitrified high-traffic tile flooring, commercial grade modular laminate workstations, acoustic drywall partitions, concealed electrical conduit wiring, and energy-efficient LED task lighting.',
    image: '/images/architectural-interior.jpg',
    specs: ['Commercial Laminates', 'Gypsum Acoustic Partitions', 'Concealed Conduit Wiring', '2-Year Turnkey Warranty'],
    rate: 'Rs 1,850 / sq.ft',
    turnaround: '45 to 60 days',
  },
  {
    id: 'tier-premium',
    title: 'Premium Tier : Curated Architectural Finishes',
    subtitle: 'Contemporary Executive Suite',
    badge: 'Tier 02',
    description: 'Natural veneer paneling, fluted acoustic baffle ceilings, frameless double-glazed glass partitions, integrated smart HVAC controls, and engineered quartz counters with acoustic isolation.',
    image: '/images/architectural-fitout-materials.jpg',
    specs: ['Natural Wood Veneers', 'Acoustic Ceiling Baffles', 'Smart Automation', '5-Year Turnkey Warranty'],
    rate: 'Rs 2,850 / sq.ft',
    turnaround: '60 to 75 days',
  },
  {
    id: 'tier-luxury',
    title: 'Luxury Tier : Bespoke Spatial Craftsmanship',
    subtitle: 'High-Net-Worth Headquarters',
    badge: 'Tier 03',
    description: 'Book-matched imported Italian marble, custom architectural bronze and brass metalwork, boardroom acoustic isolation rated to STC 52, and museum-grade dimmable lighting scenes.',
    image: '/images/tvasta_luxury_interior.jpg',
    specs: ['Italian Marble', 'Bespoke Architectural Metals', 'STC 52 Acoustic Isolation', 'Lifetime Heritage Support'],
    rate: 'Rs 4,600+ / sq.ft',
    turnaround: '90 to 120 days',
  },
];

const ENGINEERING_BENCHMARKS = [
  {
    code: 'ASTM E90 / E413',
    title: 'STC 52 Acoustic Isolation',
    desc: 'Double-layer 15mm Gyproc plasterboards with 50mm high-density 48 kg/m3 Rockwool cavity infill, dampening cross-talk between executive boardrooms and open workspaces.',
    icon: Volume2,
  },
  {
    code: 'ASTM C423 / ISO 354',
    title: 'NRC >= 0.85 Noise Reduction',
    desc: 'Engineered suspended PET felt ceiling baffles and micro-perforated natural timber wall linings engineered to suppress reverberation time below 0.55 seconds.',
    icon: Layers,
  },
  {
    code: 'ASTM E84 / BS 476',
    title: 'Class 1 / Class A Fire Rating',
    desc: 'Flame spread index < 25 across all wall claddings, acoustic fabrics, and modular partitions in strict compliance with Municipal Fire Department codes.',
    icon: Flame,
  },
  {
    code: 'IS 3646 & NBC 2016 Part 8',
    title: 'Ergonomic Lux Level Modeling',
    desc: 'Workstations calibrated to 400 Lux, drafting suites to 500 Lux, and circulation corridors to 150 Lux with flicker-free DALI / 0-10V dimmable drivers.',
    icon: SunMedium,
  },
  {
    code: 'GRIHA / LEED v4.1',
    title: 'Low-VOC Indoor Air Quality',
    desc: 'Water-based polyurethane finishes, zero-formaldehyde E0 engineered boards, and low-VOC adhesive bonding strictly under 50 g/L.',
    icon: Sparkles,
  },
  {
    code: 'CPWD / NBC 2016',
    title: 'BIM LOD 350 Clash Detection',
    desc: 'Full 3D coordinated Autodesk Revit models reconciling civil beams, VRV air ducts, sprinkler drops, and electrical conduits prior to site execution.',
    icon: Ruler,
  },
];

const TVASTA_PROJECT_DOSSIERS = [
  {
    title: 'Corporate Headquarters Fit-Out',
    location: 'Nariman Point, Mumbai',
    area: '14,500 sq.ft',
    tier: 'Premium Commercial',
    image: '/images/commercial_office_fitout.jpg',
    takeaway: 'STC 54 double-glazed demising partitions with 120 agile workstations and executive boardroom suite.',
    metrics: [
      { label: 'Acoustic Rating', value: 'STC 54' },
      { label: 'Workstations', value: '120 Pods' },
      { label: 'Turnaround', value: '58 Days' },
      { label: 'Warranty', value: '5 Years' },
    ],
    specs: [
      'Frameless 12mm acoustic laminated double-glazing with drop seals',
      'Engineered American Walnut natural veneer boardroom paneling',
      'Daikin VRV-IV air conditioning with HEPA filtration and modulating dampers',
      'Lutron centralized architectural lighting with occupancy sensors',
    ],
  },
  {
    title: 'Luxury Residential Penthouse',
    location: 'Bandra West, Mumbai',
    area: '4,800 sq.ft',
    tier: 'Luxury Bespoke',
    image: '/images/luxury-residential-fitout.jpg',
    takeaway: 'Book-matched imported Calacatta Gold marble flooring with fluted walnut acoustic joinery.',
    metrics: [
      { label: 'Marble Origin', value: 'Carrara, Italy' },
      { label: 'STC Rating', value: 'STC 52' },
      { label: 'Turnaround', value: '95 Days' },
      { label: 'Joinery', value: 'Solid Walnut' },
    ],
    specs: [
      'Epoxy-grouted 20mm book-matched Calacatta Gold Italian marble',
      'Concealed magnetic architectural door hardware with soft-close jambs',
      'Automated motorized Somfy blackout and sheer dual-roller screens',
      'Custom dry bar with brushed architectural champagne brass counters',
    ],
  },
  {
    title: 'FinTech Innovation & R&D Hub',
    location: 'Lower Parel, Mumbai',
    area: '8,200 sq.ft',
    tier: 'Agile Technology',
    image: '/images/architectural-interior.jpg',
    takeaway: 'Exposed industrial ceilings with biophilic moss baffles and BIFMA Level 3 ergonomic seating.',
    metrics: [
      { label: 'Air Flow Rate', value: '25 CFM/Person' },
      { label: 'Server Suite', value: 'N+1 Redundant' },
      { label: 'Turnaround', value: '45 Days' },
      { label: 'Reverberation', value: '0.48 Seconds' },
    ],
    specs: [
      'Acoustic suspended PET ceiling clouds with NRC 0.90 absorption',
      'Dual redundant CAT6A 10-Gigabit overhead structured cabling trays',
      'Precision air-cooled server room with FM-200 fire suppression',
      'Modular writable acoustic glass demountable collaboration booths',
    ],
  },
  {
    title: 'Private Coastal Luxury Villa',
    location: 'Juhu Waterfront, Mumbai',
    area: '6,200 sq.ft',
    tier: 'Bespoke Coastal',
    image: '/images/tvasta_luxury_interior.jpg',
    takeaway: 'Marine-grade SS316 architectural metalwork and soundproof private cinema suite.',
    metrics: [
      { label: 'Metal Grade', value: 'SS316 Marine' },
      { label: 'Cinema STC', value: 'STC 58' },
      { label: 'Turnaround', value: '110 Days' },
      { label: 'Coating', value: 'PVDF 3-Coat' },
    ],
    specs: [
      'Corrosion-resistant marine-grade powder-coated architectural aluminum profiles',
      'Private cinema room acoustic decoupled floating floor and double stud walls',
      'Handcrafted fluted oak wood panelling with integrated indirect brass illumination',
      'Custom master walk-in wardrobe with dehumidified sensor lighting compartments',
    ],
  },
];

const EXECUTION_ROADMAP = [
  {
    phase: '01',
    title: 'Spatial Programming & 3D BIM Modeling',
    days: 'Days 1 to 14',
    scope: 'Architectural inventory, user workflow surveys, Lux level analysis, and full 3D Revit BIM clash-detection between civil elements and MEP ducts.',
    deliverable: 'Approved 3D BIM model, itemized BOQ, and physical material sample tray.',
  },
  {
    phase: '02',
    title: 'Civil Demolition & MEP Rough-Ins',
    days: 'Days 15 to 35',
    scope: 'Precision structural core-cutting, acoustic drywall framing, concealed electrical conduits, VRV refrigerant piping, and fire sprinkler line realignment.',
    deliverable: 'Pre-drywall pressure testing certificate, electrical insulation test docket.',
  },
  {
    phase: '03',
    title: 'Joinery, Glazing & Veneer Cladding',
    days: 'Days 36 to 60',
    scope: 'Off-site CNC-machined modular cabinetry installation, acoustic double-glazed partition erection, book-matched veneer pressing, and ceiling baffle suspension.',
    deliverable: 'First-fix joinery inspection, STC acoustic field test report.',
  },
  {
    phase: '04',
    title: 'Commissioning, Air Balancing & Handover',
    days: 'Days 61 to 75',
    scope: 'Air balancing across all HVAC diffusers, lux meter illuminance certification, comprehensive snag resolution, deep chemical cleaning, and turnkey handover.',
    deliverable: 'As-built CAD drawing pack, operation manuals, and 5-Year Turnkey Warranty Dossier.',
  },
];

export default function TvastaPage() {
  return (
    <DivisionPage
      data={tvasta}
      customHeroLogo={
        <img
          src="/images/logos/tvasta-dark.png"
          alt="TVASTA Official Luxury Emblem"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      }
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 font-sans">
        {/* 1. 3-Tier Execution Gallery */}
        <TvastaTierGallery tiers={TVASTA_TIERS} />

        {/* 2. Budget Allocation & Cost Composition Chart */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-sm">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-wider text-[#D72A1B] font-bold bg-[#D72A1B]/10 px-3 py-1 rounded-md border border-[#D72A1B]/20">
              [CAPEX COST COMPOSITION]
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                marginTop: '10px',
              }}
            >
              Fit-Out Financial Allocation &amp; Material Breakdown.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Transparent cost distribution across civil partitions, precision HVAC, DALI lighting, and architectural joinery for 2,400 sq.ft commercial footprint.
            </p>
          </div>
          <InteriorSpecBreakdownChart tier="premium" areaSqFt={2400} />
        </div>

        {/* 3. Engineering Benchmarks & Statutory Acoustic/NBC Codes */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#D72A1B] font-bold bg-[#D72A1B]/10 px-3 py-1 rounded-md border border-[#D72A1B]/20">
              [ENGINEERING BENCHMARKS &amp; STATUTORY CODES]
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                marginTop: '10px',
              }}
            >
              Statutory Acoustics, Fire Safety &amp; Lux Standards.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Every detail is engineered against certified international standards: ASTM acoustic isolation, NBC 2016 building services, and GRIHA environmental protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGINEERING_BENCHMARKS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm hover:border-[#D72A1B]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#D72A1B] tracking-wider uppercase bg-[#D72A1B]/10 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      <Icon size={18} color="#D72A1B" />
                    </div>
                    <h4 className="text-base font-bold text-[#111111] mb-2">{b.title}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed">{b.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-[#047857] font-semibold">
                    <CheckCircle2 size={13} color="#047857" />
                    <span>Statutory Inspection Certified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Expanded Project Dossiers */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#D72A1B] font-bold bg-[#D72A1B]/10 px-3 py-1 rounded-md border border-[#D72A1B]/20">
              [COMMISSIONED PROJECT DOSSIERS]
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                marginTop: '10px',
              }}
            >
              Completed Interior Architectural References.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Real commercial headquarters, executive penthouses, and technology centres executed across Mumbai with strict handover schedules and zero cost escalations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TVASTA_PROJECT_DOSSIERS.map((dossier) => (
              <div
                key={dossier.title}
                className="rounded-3xl border border-[var(--color-border)] bg-white overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <ImageWithLightbox
                      src={dossier.image}
                      alt={dossier.title}
                      title={`${dossier.title} (${dossier.location})`}
                      category={dossier.tier}
                      scope={dossier.takeaway}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#111111] shadow-sm border border-black/5">
                      {dossier.tier}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                      <span>{dossier.location}</span>
                      <span className="font-semibold text-[#111111]">{dossier.area}</span>
                    </div>

                    <h4
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 400,
                        color: '#111111',
                        fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                        marginBottom: '8px',
                      }}
                    >
                      {dossier.title}
                    </h4>

                    <p className="text-xs text-[#555555] leading-relaxed mb-6">{dossier.takeaway}</p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-3 rounded-xl bg-slate-50 border border-black/5">
                      {dossier.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-[10px] text-[#777777] uppercase">{m.label}</div>
                          <div className="text-xs font-bold text-[#111111] mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Specs Bullet List */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#D72A1B]">
                        Executed Specifications:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#666666]">
                        {dossier.specs.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#D72A1B] font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-[#D72A1B] text-[#111111] hover:text-white text-xs font-semibold transition-colors no-underline"
                  >
                    <span>Request Similar Spatial Specification</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. 4-Stage Execution Roadmap */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[#F8F9FA] p-6 md:p-10">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-wider text-[#D72A1B] font-bold bg-[#D72A1B]/10 px-3 py-1 rounded-md border border-[#D72A1B]/20">
              [STRUCTURED PROJECT GOVERNANCE]
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                marginTop: '10px',
              }}
            >
              Turnkey Interior Execution Roadmap.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              From first architectural survey to snag-free handover: our 75-day delivery framework guarantees fixed dates and zero budget surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXECUTION_ROADMAP.map((step) => (
              <div
                key={step.phase}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-[#D72A1B] font-serif">
                      ({step.phase})
                    </span>
                    <span className="text-[10px] font-semibold text-[#666666] bg-slate-100 px-2 py-0.5 rounded">
                      {step.days}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#666666] leading-relaxed mb-4">{step.scope}</p>
                </div>
                <div className="pt-3 border-t border-black/5 text-[11px] text-[#047857] font-medium leading-normal">
                  <strong>Output:</strong> {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DivisionPage>
  );
}
