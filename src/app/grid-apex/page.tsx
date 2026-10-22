import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { gridApex } from '@/content/divisions';
import { Zap, Flame, CheckCircle2, ShieldCheck, Activity, Cpu, ArrowRight, Layers, FileCheck } from 'lucide-react';
import ElectricBorder from '@/components/react-bits/ElectricBorder';
import { ImageWithLightbox } from '@/components/ImageLightbox';

export const metadata: Metadata = {
  title: `${gridApex.name} | Electrical Substation & Thermal Cleantech Systems | JC Apex Ventures`,
  description: gridApex.description,
};

const GRID_BENCHMARKS = [
  {
    code: 'CEA Regulations 2010',
    title: 'Central Electricity Authority Compliance',
    desc: 'Statutory grid synchronization, insulation coordination, and clearance design for high-voltage and extra-high-voltage substations up to 33kV.',
    icon: ShieldCheck,
  },
  {
    code: 'IS 2026 / IEC 60076',
    title: 'Power & Distribution Transformers',
    desc: 'Low-loss ONAN oil-immersed and dry cast-resin transformers with copper winding, off-circuit tap changers or on-load tap changers (OLTC).',
    icon: Zap,
  },
  {
    code: 'IS 13947 / IEC 62271',
    title: 'HT Vacuum Circuit Breakers (VCB)',
    desc: 'Indoor and outdoor 11kV/33kV draw-out VCB panels rated up to 31.5 kA for 3 seconds with digital microprocessor numerical protection relays.',
    icon: Cpu,
  },
  {
    code: 'IS 3043 Code of Practice',
    title: 'Chemical Pipe Earth Grid (< 1.0 Ohm)',
    desc: 'Multi-electrode earthing grid with step and touch potential dissipation calculations, maintaining combined resistance strictly below 1.0 Ohm.',
    icon: Activity,
  },
  {
    code: 'Central Govt Patent 384912',
    title: 'Zero-Residue Thermal Cleantech',
    desc: 'Patented catalytic thermolysis system achieving 95% solid waste volume reduction without atmospheric toxic fly-ash or dioxin release.',
    icon: Flame,
  },
  {
    code: 'MPCB Air & Water Consent',
    title: 'Pollution Control Board Standards',
    desc: 'Integrated Venturi scrubber and continuous emissions monitoring system (CEMS) certified under statutory State Pollution Board norms.',
    icon: FileCheck,
  },
];

const GRID_PROJECT_DOSSIERS = [
  {
    title: '33kV Substation Bay & Express Feeder',
    location: 'Tarapur MIDC, Maharashtra',
    capacity: '5,000 kVA (5 MVA)',
    type: 'Substation Bay & Line',
    image: '/images/electrical-substation.jpg',
    takeaway: 'Dual 33kV incoming express feeder with 5 MVA ONAN transformer and automated SCADA telemetry.',
    metrics: [
      { label: 'Voltage Incomer', value: '33 kV' },
      { label: 'Transformer', value: '5 MVA' },
      { label: 'Fault Rating', value: '31.5 kA' },
      { label: 'Sanction Authority', value: 'MSEDCL' },
    ],
    specs: [
      'Dual 33kV HT underground XLPE aluminium armoured feeder cables (3C x 300 sq.mm)',
      'Outdoor 5 MVA 33/0.433 kV step-down transformer with OLTC and nitrogen fire protection',
      'Indoor HT panel board with 4-breaker vacuum circuit breaker (VCB) configuration',
      'Automated remote telemetry unit (RTU) integrated with DISCOM regional load dispatch centre',
    ],
  },
  {
    title: 'Industrial Substation Modernization & APFC',
    location: 'Taloja MIDC Industrial Complex, Maharashtra',
    capacity: '2,500 kVA Modernization',
    type: 'Power Quality & Switchgear',
    image: '/images/grid_apex_transformer.jpg',
    takeaway: 'Complete 2,500 kVA substation overhaul with 900 kVAR detuned capacitor bank, eliminating monthly penalty.',
    metrics: [
      { label: 'Initial PF', value: '0.82 Lag' },
      { label: 'Corrected PF', value: '0.99 Lag' },
      { label: 'Penalty Saved', value: 'Rs 4.2L / mo' },
      { label: 'Harmonic Atten.', value: 'THD < 4%' },
    ],
    specs: [
      'Automated power factor correction (APFC) panel with 7% detuned copper wound reactors',
      'Microprocessor relay replacement with IEC 61850 protocol communication compatibility',
      'Oil filtration, BDV testing (tested > 65 kV), and bushing gasket overhaul on 2,500 kVA unit',
      'Statutory inspection clearance from the Chief Electrical Inspectorate (CEI)',
    ],
  },
  {
    title: 'Municipal Solid Waste Thermal Gasifier',
    location: 'Municipal Corporation Cleantech Facility',
    capacity: '50 TPD Continuous Feed',
    type: 'Patented Thermal Cleantech',
    image: '/images/electrical-switchgear-panel.jpg',
    takeaway: 'Central Government patented thermal catalytic decomposition reducing municipal solid waste to sterile bio-char.',
    metrics: [
      { label: 'Throughput', value: '50 TPD' },
      { label: 'Volume Reduction', value: '95%' },
      { label: 'Patent Number', value: 'No. 384912' },
      { label: 'Emissions', value: 'MPCB Zero-Ash' },
    ],
    specs: [
      'Multi-stage thermal decomposition chamber operating at controlled 650°C to 850°C pyrolysis range',
      'Continuous emissions monitoring system (CEMS) tracking PM, SOx, and NOx in real time',
      'Closed-loop wet scrubbing system with zero liquid discharge (ZLD) effluent recirculation',
      'Sterile non-leachable mineral char output suitable for statutory road sub-base construction',
    ],
  },
  {
    title: 'Automotive Plant 11kV Compact Substation',
    location: 'Chakan Industrial Corridor, Pune',
    capacity: '1,600 kVA Dual CSS',
    type: 'Compact Substation (CSS)',
    image: '/images/ht_cable_termination.jpg',
    takeaway: 'Dual 1,600 kVA dry cast-resin compact substation with SF6 Ring Main Unit (RMU) for zero-downtime manufacturing.',
    metrics: [
      { label: 'Enclosure Rating', value: 'IP54 Outdoor' },
      { label: 'Dry Transformer', value: 'Cast Resin' },
      { label: 'Bus Coupler', value: 'Auto-Transfer' },
      { label: 'Uptime SLA', value: '99.98%' },
    ],
    specs: [
      'Pre-fabricated modular enclosure certified under IEC 62271-202 internal arc classification',
      'Dry-type Class F insulation transformer eliminating oil contamination risks inside factory zones',
      'Three-way 11kV extensible SF6 gas insulated Ring Main Unit with motor operated isolators',
      'Main LT switchboard with motorized air circuit breakers (ACB) and automatic bus-tie logic',
    ],
  },
];

const GRID_EXECUTION_ROADMAP = [
  {
    phase: '01',
    title: 'Load Flow Study & Feasibility',
    timeline: 'Days 1 to 20',
    scope: 'ETAP load flow simulation, short-circuit withstand calculation, soil resistivity testing, and DISCOM transmission corridor right-of-way audit.',
    deliverable: 'Comprehensive Technical Feasibility Report & System Single Line Diagram (SLD).',
  },
  {
    phase: '02',
    title: 'Statutory CEI Sanctions & Procurement',
    timeline: 'Days 21 to 45',
    scope: 'Preparation and submission of statutory electrical dockets to the Chief Electrical Inspectorate (CEI) and utility clearance petitions.',
    deliverable: 'Approved CEI drawing endorsement and equipment manufacturing release.',
  },
  {
    phase: '03',
    title: 'Substation Erection & HT Cable Jointing',
    timeline: 'Days 46 to 80',
    scope: 'Reinforced concrete transformer plinth casting, HT switchgear positioning, heat-shrink cable termination, and chemical earth pit grid interconnect.',
    deliverable: 'Civil load test report, pre-commissioning HT cable megger and Hi-Pot dossier.',
  },
  {
    phase: '04',
    title: 'Relay Calibration, Charging & Energization',
    timeline: 'Days 81 to 90',
    scope: 'Secondary injection testing of numerical protection relays, transformer oil BDV verification, joint DISCOM meter sealing, and live bay energization.',
    deliverable: 'Formal CEI Charging Permission, MSEDCL energization protocol certificate.',
  },
];

export default function GridApexPage() {
  return (
    <DivisionPage
      data={gridApex}
      customHeroLogo={
        <img
          src="/images/logos/grid-apex-official.png"
          alt="GRID APEX Engineering Infrastructure Brand Mark"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      }
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 font-sans">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-wider text-[#0284C7] font-bold bg-[#0284C7]/10 px-3 py-1 rounded-md border border-[#0284C7]/20">
            [HIGH-TENSION ENGINEERING &amp; THERMAL CLEANTECH]
          </span>
          <h3
            style={{
              fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              marginTop: '10px',
            }}
          >
            Turnkey Substation Engineering &amp; Patented Waste Pyrolysis.
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto leading-relaxed">
            High-voltage utility substations, MSEDCL 11kV/33kV bay erection, APFC power factor correction, and Central Government patented thermal waste decomposition technology.
          </p>
        </div>

        {/* 2-Column Technical Dossier with ElectricBorder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: 33kV Substation & Switchgear */}
          <ElectricBorder
            active={true}
            color="#0284C7"
            borderRadius="22px"
            innerBg="#FFFFFF"
            className="shadow-sm"
          >
            <div className="p-8 flex flex-col justify-between h-full bg-white rounded-[20px]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#0284C7] font-bold bg-[#0284C7]/10 px-2.5 py-1 rounded-md border border-[#0284C7]/20">
                    Substation Bay Engineering
                  </span>
                  <Zap size={18} color="#0284C7" />
                </div>
                <h4
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#111111',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    marginBottom: '10px',
                  }}
                >
                  11kV / 22kV / 33kV Substation Bays &amp; Switchgear
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                  Turnkey engineering, procurement, and construction (EPC) for industrial substations, high-voltage vacuum circuit breakers (VCB), dry and oil-cooled transformers, and capacitor banks.
                </p>
                <div className="space-y-2.5">
                  {[
                    'CEI drawing approvals and statutory clearance dockets',
                    'Transformer sizing, oil testing, and filtration protocols',
                    'APFC detuned capacitor banks for 0.99 power factor maintenance',
                    'HT underground cable laying and heat-shrink terminations',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#333333] font-sans">
                      <CheckCircle2 size={14} color="#0284C7" className="mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#666666] font-sans">
                  Full CEA &amp; IS 2026 Code Adherence
                </span>
                <span className="text-xs font-bold text-[#0284C7] font-sans">Turnkey EPC</span>
              </div>
            </div>
          </ElectricBorder>

          {/* Card 2: Patented Cleantech */}
          <ElectricBorder
            active={true}
            color="#D97706"
            borderRadius="22px"
            innerBg="#FFFFFF"
            className="shadow-sm"
          >
            <div className="p-8 flex flex-col justify-between h-full bg-white rounded-[20px]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#D97706] font-bold bg-[#D97706]/10 px-2.5 py-1 rounded-md border border-[#D97706]/20">
                    Central Govt Patented Technology
                  </span>
                  <Flame size={18} color="#D97706" />
                </div>
                <h4
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#111111',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    marginBottom: '10px',
                  }}
                >
                  Thermal Solid Waste Pyrolysis Systems
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                  Proprietary continuous thermal gasification and zero-residue decomposition technology transforming municipal and industrial solid waste into clean syngas and inert char.
                </p>
                <div className="space-y-2.5">
                  {[
                    '95% volume reduction without toxic atmospheric emissions',
                    'MPCB certified continuous emissions monitoring compliance',
                    'Energy self-sustaining closed-loop thermal cycle',
                    'Zero dioxins, furans, or hazardous fly-ash generation',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#333333] font-sans">
                      <CheckCircle2 size={14} color="#D97706" className="mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#666666] font-sans">
                  Patent No. 384912 / MPCB Certified
                </span>
                <span className="text-xs font-bold text-[#D97706] font-sans">Cleantech Division</span>
              </div>
            </div>
          </ElectricBorder>
        </div>

        {/* Engineering Benchmarks & Standards Grid */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#0284C7] font-bold bg-[#0284C7]/10 px-3 py-1 rounded-md border border-[#0284C7]/20">
              [STATUTORY CODES &amp; TECHNICAL BENCHMARKS]
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
              Certified High-Tension Standards &amp; MPCB Norms.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Engineered to exact Central Electricity Authority (CEA) standards, Indian Standards (IS), and Maharashtra Pollution Control Board mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRID_BENCHMARKS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm hover:border-[#0284C7]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#0284C7] tracking-wider uppercase bg-[#0284C7]/10 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      <Icon size={18} color="#0284C7" />
                    </div>
                    <h4 className="text-base font-bold text-[#111111] mb-2">{b.title}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed">{b.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-[#047857] font-semibold">
                    <CheckCircle2 size={13} color="#047857" />
                    <span>CEI / MSEDCL Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commissioned Substation & Cleantech Project Dossiers */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#0284C7] font-bold bg-[#0284C7]/10 px-3 py-1 rounded-md border border-[#0284C7]/20">
              [COMMISSIONED ENGINEERING DOSSIERS]
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
              Real Heavy Industrial Installations &amp; Cleantech Plants.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Real-world commissioned substations, express feeders, and thermal decomposition facilities delivered across Maharashtra manufacturing clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GRID_PROJECT_DOSSIERS.map((dossier) => (
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
                      category={dossier.type}
                      scope={dossier.takeaway}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#111111] shadow-sm border border-black/5">
                      {dossier.capacity}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                      <span>{dossier.location}</span>
                      <span className="font-semibold text-[#0284C7]">{dossier.type}</span>
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
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7]">
                        Executed Technical Scope:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#666666]">
                        {dossier.specs.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#0284C7] font-bold">•</span>
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
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-[#0284C7] text-[#111111] hover:text-white text-xs font-semibold transition-colors no-underline"
                  >
                    <span>Request Substation Engineering Feasibility</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Stage Execution Roadmap */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[#F0F7FF] p-6 md:p-10">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-wider text-[#0284C7] font-bold bg-[#0284C7]/10 px-3 py-1 rounded-md border border-[#0284C7]/20">
              [HIGH-VOLTAGE TURNKEY TIMELINE]
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
              Substation Erection &amp; Energization Sequence.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              From ETAP load flow study to live CEI charging permission: our 90-day execution framework coordinates civil plinths, transformer erection, and DISCOM synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRID_EXECUTION_ROADMAP.map((step) => (
              <div
                key={step.phase}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-[#0284C7] font-serif">
                      ({step.phase})
                    </span>
                    <span className="text-[10px] font-semibold text-[#666666] bg-slate-100 px-2 py-0.5 rounded">
                      {step.timeline}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#666666] leading-relaxed mb-4">{step.scope}</p>
                </div>
                <div className="pt-3 border-t border-black/5 text-[11px] text-[#047857] font-medium leading-normal">
                  <strong>Milestone:</strong> {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DivisionPage>
  );
}
