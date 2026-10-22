import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { agrim } from '@/content/divisions';
import { EvNetworkCapexRevenueChart } from '@/components/bklit';
import { Landmark, ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, TrendingUp, Info, FileSpreadsheet, Building2, Trees } from 'lucide-react';
import Link from 'next/link';
import { ImageWithLightbox } from '@/components/ImageLightbox';

export const metadata: Metadata = {
  title: `${agrim.name} | Project Finance Paperwork & Bankable DPR Advisory | JC Apex Ventures`,
  description: agrim.description,
};

/**
 * Regulatory Disclaimer:
 * AGRIM by JC Apex Ventures is not a lender, bank, or NBFC.
 * We provide non-lending administrative project finance file preparation, paperwork facilitation, and financial advisory documentation.
 */

const AGRIM_BENCHMARKS = [
  {
    code: 'TEV Banking Norms',
    title: 'Techno-Economic Viability (TEV) Assembly',
    desc: 'Rigorous engineering cashflow and sensitivity models adhering to State Bank of India (SBI), Bank of Baroda, and Canara Bank appraisal manuals.',
    icon: Landmark,
  },
  {
    code: 'RBI Master Directions',
    title: 'Non-Lending Advisory Compliance',
    desc: 'Strict non-lender status ensuring independent administrative project report compilation without conflict of interest or credit exposure.',
    icon: ShieldCheck,
  },
  {
    code: 'MoP EV Guidelines 2022',
    title: 'Ministry of Power Charging Architecture',
    desc: 'Public charging station (PCS) infrastructure design adhering to BIS IS 17017 safety interlocks, open charge point protocol (OCPP 2.0.1), and DISCOM connectivity.',
    icon: TrendingUp,
  },
  {
    code: 'AIF Guidelines (MoA&FW)',
    title: '3% Interest Subvention (7 Years)',
    desc: 'Central Sector Agriculture Infrastructure Fund dossier structuring for cold chain storage, pre-cooling units, and ripening chambers up to Rs 2.0 Crore.',
    icon: Trees,
  },
  {
    code: 'DSCR Sensitivity Standards',
    title: 'Bankable Debt Service Coverage (>= 1.45x)',
    desc: 'Multi-variable scenario stress testing over 10-year repayment tenures guaranteeing debt service coverage ratios (DSCR) comfort levels for credit committees.',
    icon: FileSpreadsheet,
  },
  {
    code: 'APEDA & MOFPI Norms',
    title: 'Agro-Export Infrastructure Subsidies',
    desc: 'Scheme documentation assembly for capital investment subsidies across perishable agro-processing clusters and integrated packhouse logistics.',
    icon: Building2,
  },
];

const AGRIM_PROJECT_DOSSIERS = [
  {
    title: 'Western Express Highway EV Charging Corridor',
    location: 'Mumbai-Surat Highway Sector, Western Maharashtra',
    capex: 'Rs 4.80 Crore Total Outlay',
    scope: '12 DC Fast Chargers + 2 MVA Captive Substation',
    image: '/images/banking-sanction-dossier.jpg',
    takeaway: 'Comprehensive bankable DPR and TEV study securing 70% debt sanction from a nationalized banking consortium.',
    metrics: [
      { label: 'Project CAPEX', value: 'Rs 4.80 Cr' },
      { label: 'Debt Sanctioned', value: 'Rs 3.36 Cr' },
      { label: 'Appraised DSCR', value: '1.68x' },
      { label: 'Sanction Time', value: '45 Days' },
    ],
    specs: [
      'Comprehensive 10-year discounted cashflow (DCF) model and sensitivity analysis across fluctuating power tariffs',
      'Civil plinth structural designs and 2 MVA 11kV substation step-down bay SLD integration',
      'Joint Lenders Forum (JLF) technical appraisal presentation and credit risk mitigation docket',
      'Formal term loan sanction letter release with milestone-based disbursement schedule',
    ],
  },
  {
    title: 'Controlled Atmosphere Agro-Cold Storage Facility',
    location: 'Nashik Agricultural Belt, Maharashtra',
    capex: 'Rs 7.20 Crore Project Cost',
    scope: '5,000 MT Multi-Commodity Cold Chain Hub',
    image: '/images/utility-metering-liaison.jpg',
    takeaway: 'Secured Agriculture Infrastructure Fund (AIF) 3% interest subvention for 7 years alongside primary bank loan.',
    metrics: [
      { label: 'Storage Capacity', value: '5,000 MT' },
      { label: 'AIF Benefit', value: 'Rs 42L Subvention' },
      { label: 'Appraised DSCR', value: '1.54x' },
      { label: 'Repayment', value: '8 Years' },
    ],
    specs: [
      'Thermodynamic heat load calculation and compressor COP efficiency optimization schedules',
      'Detailed Project Report (DPR) aligned with NABARD and National Horticulture Board (NHB) specifications',
      'AIF portal documentation clearance and statutory District Monitoring Committee endorsement',
      'First-tranche commercial disbursement clearance with zero compliance observations',
    ],
  },
  {
    title: 'Expressway Commercial Fleet Electrification Hub',
    location: 'Pune-Mumbai Expressway Logistics Node',
    capex: 'Rs 8.50 Crore Outlay',
    scope: '16 Dual-Gun Heavy Duty DC Fast Plazas',
    image: '/images/electrical-substation.jpg',
    takeaway: 'Bankable infrastructure financial structuring for heavy commercial electric bus and freight logistics fleets.',
    metrics: [
      { label: 'Substation Feeder', value: '33 kV Incomer' },
      { label: 'Daily Sessions', value: '120 Trucks' },
      { label: 'Appraised DSCR', value: '1.75x' },
      { label: 'Payback', value: '4.2 Years' },
    ],
    specs: [
      'Fleet concessionaire charging demand profiling and dynamic load balancing software integration',
      'Dedicated 33kV terminal switchyard clearance with state transmission utility (MSETCL)',
      'Bank appraisal presentation before Lead Bank Infrastructure Finance Branch, Nariman Point',
      'Comprehensive ESG (Environmental, Social, Governance) compliance certification docket',
    ],
  },
  {
    title: 'Integrated Mango Processing & Export Cluster',
    location: 'Ratnagiri Coastal Agro-Corridor, Maharashtra',
    capex: 'Rs 5.40 Crore Outlay',
    scope: 'Vapour Heat Treatment (VHT) & Ripening Facility',
    image: '/images/grid_apex_transformer.jpg',
    takeaway: 'Facilitated APEDA export compliance documentation and statutory agro-industrial subsidy clearances.',
    metrics: [
      { label: 'Daily Throughput', value: '25 TPD' },
      { label: 'APEDA Clearance', value: 'Certified' },
      { label: 'Appraised DSCR', value: '1.60x' },
      { label: 'Subsidy Outlay', value: 'Rs 1.35 Cr' },
    ],
    specs: [
      'Packhouse layout planning and ISO 22000 / HACCP food safety zoning documentation',
      'Techno-economic viability paperwork for central Ministry of Food Processing Industries (MOFPI) grants',
      'Energy-efficient refrigeration compressor selection with solar PV hybrid captive integration',
      'Project completion certificate and subsidy drawdown facilitation through statutory nodal agency',
    ],
  },
];

const AGRIM_EXECUTION_ROADMAP = [
  {
    phase: '01',
    title: 'Techno-Economic Viability (TEV) Study',
    timeline: 'Weeks 1 to 3',
    scope: 'Site grid interconnection verification, demand catchment analysis, capital machinery vendor quotation benchmarking, and regulatory zoning checks.',
    deliverable: 'Preliminary Feasibility Memorandum & Preliminary Project Cost Estimate.',
  },
  {
    phase: '02',
    title: 'Bankable DPR Assembly & Modeling',
    timeline: 'Weeks 4 to 6',
    scope: '10-year integrated P&L, balance sheet, and cashflow modeling with sensitivity matrices for occupancy, power tariffs, and interest rate movements.',
    deliverable: 'Bound Bankable Detailed Project Report (DPR) with CMA Data format.',
  },
  {
    phase: '03',
    title: 'Credit Committee Appraisal Defense',
    timeline: 'Weeks 7 to 10',
    scope: 'Direct technical representation before nationalized/private banking credit officers, resolving query memorandums and technical auditor inspections.',
    deliverable: 'Risk assessment compliance sign-off and Credit Committee Approval Docket.',
  },
  {
    phase: '04',
    title: 'Sanction Letter & Drawdown Support',
    timeline: 'Weeks 11 to 14',
    scope: 'Formal term loan sanction letter validation, statutory subsidy portal filings (AIF / MoP), and milestone pre-disbursement compliance coordination.',
    deliverable: 'Formal Sanction Letter and statutory capital subsidy disbursement advice.',
  },
];

export default function AgrimPage() {
  return (
    <DivisionPage
      data={agrim}
      customHeroLogo={
        <img
          src="/images/logos/agrim-dark.png"
          alt="AGRIM Official Brand Mark"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      }
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 font-sans">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-wider text-[#047857] font-bold bg-[#047857]/10 px-3 py-1 rounded-md border border-[#047857]/20">
            [BANKABLE PROJECT FINANCE &amp; AGRO-INFRASTRUCTURE ADVISORY]
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
            Bankable DPR Assembly &amp; Infrastructure Feasibility.
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto leading-relaxed">
            Airtight techno-economic viability (TEV) modeling, Detailed Project Reports (DPR), and statutory subsidy facilitation for EV charging networks and agro-cold chain hubs.
          </p>
        </div>

        {/* 2-Column Grid: Chart + DPR Appraisal Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Chart Column */}
          <div className="lg:col-span-7 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#047857] font-bold">
                  EV Network 10-Year Economics
                </span>
                <span className="text-[11px] font-semibold text-[var(--color-text-muted)]">
                  Simulated Cashflows
                </span>
              </div>
              <h4
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#111111',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  marginBottom: '8px',
                }}
              >
                Capital Outlay vs Cumulative Operating Surplus
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                Dynamic projection illustrating initial hardware acquisition, transformer civil plinths, and progressive revenue accretion across 10 operating years.
              </p>
              <div className="h-64 w-full">
                <EvNetworkCapexRevenueChart />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#666666] font-sans">
              <span>Standard 8-Year Banking Amortization</span>
              <span className="font-bold text-[#047857]">DSCR &gt; 1.50x</span>
            </div>
          </div>

          {/* Appraisal Dossier Column */}
          <div className="lg:col-span-5 rounded-3xl border border-[var(--color-border)] bg-[#F7F9F5] p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#047857] font-bold">
                  Bank Appraisal Docket
                </span>
                <Landmark size={18} color="#047857" />
              </div>
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: '#111111',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  marginBottom: '10px',
                }}
              >
                Nationalized &amp; Private Bank TEV Compliance
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                Our documentation undergoes rigorous stress testing prior to credit committee submission, eliminating procedural rejections and interest rate penalties.
              </p>
              <div className="space-y-3">
                {[
                  'Techno-Economic Feasibility (TEV) validation',
                  '10-Year CMA Data & Sensitivity Stress Testing',
                  'Agriculture Infrastructure Fund (AIF) subsidy dockets',
                  'Joint Lenders Forum (JLF) technical presentation',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#333333] font-sans">
                    <CheckCircle2 size={15} color="#047857" className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10">
              <div className="text-[11px] text-[#555555] leading-relaxed mb-4">
                <strong>Statutory Notice:</strong> AGRIM provides non-lending administrative project finance file preparation, paperwork facilitation, and financial advisory documentation. Not a direct lender, bank, or NBFC.
              </div>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#047857] text-white text-xs font-semibold shadow-sm hover:bg-[#035a40] transition-colors no-underline"
              >
                <span>Commission Bankable DPR Docket</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Banking Appraisal Standards & Engineering Benchmarks Grid */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#047857] font-bold bg-[#047857]/10 px-3 py-1 rounded-md border border-[#047857]/20">
              [APPRAISAL STANDARDS &amp; REGULATORY CODES]
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
              Banking Manual Norms, AIF Subsidies &amp; BIS Standards.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Every financial model is constructed on institutional banking standards: State Bank of India appraisal guidelines, RBI non-lending directives, and MoP specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGRIM_BENCHMARKS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm hover:border-[#047857]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#047857] tracking-wider uppercase bg-[#047857]/10 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      <Icon size={18} color="#047857" />
                    </div>
                    <h4 className="text-base font-bold text-[#111111] mb-2">{b.title}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed">{b.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-[#047857] font-semibold">
                    <CheckCircle2 size={13} color="#047857" />
                    <span>Banking Appraisal Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commissioned EV & Agro Project Dossiers */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#047857] font-bold bg-[#047857]/10 px-3 py-1 rounded-md border border-[#047857]/20">
              [COMMISSIONED ADVISORY DOSSIERS]
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
              Appraised EV Corridors &amp; Agro-Industrial Clusters.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Real commercial infrastructure projects structured for nationalized bank term loans and central government capital subsidies across Western India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AGRIM_PROJECT_DOSSIERS.map((dossier) => (
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
                      category={dossier.scope}
                      scope={dossier.takeaway}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#047857] shadow-sm border border-black/5">
                      {dossier.capex}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                      <span>{dossier.location}</span>
                      <span className="font-semibold text-[#047857]">{dossier.scope}</span>
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
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#047857]">
                        Financial &amp; Technical Structure:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#666666]">
                        {dossier.specs.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#047857] font-bold">•</span>
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
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-[#047857] text-[#111111] hover:text-white text-xs font-semibold transition-colors no-underline"
                  >
                    <span>Request Bankable DPR Consultation</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Stage Execution Roadmap */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[#F7F9F5] p-6 md:p-10">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-wider text-[#047857] font-bold bg-[#047857]/10 px-3 py-1 rounded-md border border-[#047857]/20">
              [BANK APPRAISAL HORIZON]
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
              DPR Structuring &amp; Banking Sanction Sequence.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              From techno-economic viability study to formal term loan sanction: our 14-week financial structuring roadmap ensures swift credit appraisal with zero compliance queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGRIM_EXECUTION_ROADMAP.map((step) => (
              <div
                key={step.phase}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-[#047857] font-serif">
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
                  <strong>Deliverable:</strong> {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DivisionPage>
  );
}
