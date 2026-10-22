import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { sanyog } from '@/content/divisions';
import { Scale, ArrowUpRight, CheckCircle2, ShieldAlert, FileText, Clock, Gavel, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import ElectricBorder from '@/components/react-bits/ElectricBorder';
import { ImageWithLightbox } from '@/components/ImageLightbox';

export const metadata: Metadata = {
  title: `${sanyog.name} | Electricity Connections & Statutory CGRF Grievances | JC Apex Ventures`,
  description: sanyog.description,
};

const PROTOCOLS = [
  {
    authority: 'MERC Supply Code & Tariff Schedules',
    section: 'Regulation 8.4 & Schedules LT-1(b) / HT-I',
    action: 'Tariff classification review, billing dispute resolution, and power factor penalty audits across Mumbai utilities.',
    leadTime: '7 to 14 business days',
    status: 'Statutory Verification',
  },
  {
    authority: 'Consumer Grievance Redressal Forum (CGRF)',
    section: 'Section 42(5), Electricity Act 2003',
    action: 'Petition assembly, evidentiary record compilation, and direct forum representation for residential and commercial consumers.',
    leadTime: '30 to 60 day statutory timeline',
    status: 'CGRF Representation',
  },
  {
    authority: 'Electricity Ombudsman Maharashtra',
    section: 'Section 42(6), Electricity Act 2003',
    action: 'Appellate filings against contested CGRF orders, meter discrepancy proceedings, and excessive billing recovery appeals.',
    leadTime: 'State Appellate Horizon',
    status: 'Ombudsman Appeals',
  },
  {
    authority: 'PWD Electrical Inspectorate Licensing',
    section: 'Central Electricity Authority (CEA) Safety Rules',
    action: 'Express feeder sanctions, 11kV to 33kV substation clearances, and contractor electrical safety certification filings.',
    leadTime: 'Formal Sanction Docket',
    status: 'CEI Clearances',
  },
];

const SANYOG_BENCHMARKS = [
  {
    code: 'The Electricity Act 2003, Sec 42(5)',
    title: 'Statutory CGRF Redressal Mechanism',
    desc: 'Mandatory independent judicial forum establishing consumer right to challenge arbitrary DISCOM demands, faulty metering, and delayed service connections.',
  },
  {
    code: 'The Electricity Act 2003, Sec 56(2)',
    title: '24-Month Statutory Limitation Bar',
    desc: 'Strict legal restriction barring distribution licensees from demanding or recovering supplementary arrears or under-billed amounts beyond 2 years.',
  },
  {
    code: 'MERC Standards of Performance 2021',
    title: 'Guaranteed Service Timelines & Penalty',
    desc: 'Statutory compensatory penalties payable by distribution licensees for meter replacement delays, voltage fluctuations, and erroneous disconnections.',
  },
  {
    code: 'MERC Supply Code Reg 8.4',
    title: 'Disputed Bill Reconciliation Protocol',
    desc: 'Binding procedure requiring utilities to accept disputed bill representations and issue provisional average billing pending forensic meter testing.',
  },
  {
    code: 'CEA Metering Regulations 2006',
    title: 'Smart Meter & Optical Port Verification',
    desc: 'Standards for MRI (Meter Reading Instrument) optical dump telemetry, tamper event log retrieval, and third-party NABL calibration tests.',
  },
  {
    code: 'MERC Token Fee Structure',
    title: 'Statutory ₹50 Consultation Registration',
    desc: 'Compliant with State regulatory fee structures, initial grievance analysis and formal docket preparation begins with a statutory ₹50 token registration.',
  },
];

const SANYOG_PROJECT_DOSSIERS = [
  {
    title: 'Heritage Commercial Complex Tariff Re-categorization',
    location: 'Fort Financial District, Mumbai',
    utility: 'BEST Undertaking',
    benefit: 'Rs 38.4 Lakhs Retroactive Refund',
    image: '/images/utility-metering-liaison.jpg',
    takeaway: 'Disputed wrongful classification under temporary tariff for 3 years, securing full refund credit in monthly bills.',
    metrics: [
      { label: 'Refund Secured', value: 'Rs 38.4L' },
      { label: 'DISCOM', value: 'BEST' },
      { label: 'Disposal Time', value: '42 Days' },
      { label: 'Tariff', value: 'LT-II(b)' },
    ],
    specs: [
      'Comprehensive forensic audit of 36 monthly utility ledgers and occupancy certificates',
      'Filing of formal dispute notice under MERC Supply Code Regulation 8.4',
      'Personal representation before CGRF Colaba forum citing Maharashtra Ombudsman precedents',
      'Written order directing credit adjustment across subsequent 12 utility billing cycles',
    ],
  },
  {
    title: 'High-Rise CHS Sanctioned Load Enhancement',
    location: 'Lower Parel, Mumbai',
    utility: 'Tata Power / BEST',
    benefit: 'Enhanced from 250 kVA to 650 kVA',
    image: '/images/electrical-substation.jpg',
    takeaway: 'Overcame local substation transformer capacity constraints to sanction additional load for 8 elevators and EV charging bank.',
    metrics: [
      { label: 'New Sanction', value: '650 kVA' },
      { label: 'Liaison Time', value: '34 Days' },
      { label: 'CEI Sanction', value: 'Approved' },
      { label: 'Feeder', value: '11 kV Express' },
    ],
    specs: [
      'Diversity factor calculation and maximum demand simulation across residential and common services',
      'Joint site inspection with utility executive engineers and substation network planners',
      'Right-of-Way (RoW) coordination with municipal ward authorities for cable trenching',
      'Chief Electrical Inspectorate (CEI) approval certificate issued without project delay',
    ],
  },
  {
    title: 'Industrial Estate Power Factor Penalty Reversal',
    location: 'Andheri East Industrial Corridor, Mumbai',
    utility: 'Adani Electricity Mumbai (AEML)',
    benefit: 'Rs 14.8 Lakhs Penalty Reversal + 9% Interest',
    image: '/images/utility-grievance-legal.jpg',
    takeaway: 'Proved internal utility meter optical reading synchronization failure, overturning 18 months of erroneous kVAh penalty billing.',
    metrics: [
      { label: 'Claim Value', value: 'Rs 14.8L' },
      { label: 'Statutory Int.', value: '9% p.a.' },
      { label: 'Forum', value: 'CGRF Adani' },
      { label: 'Resolution', value: 'Full Reversal' },
    ],
    specs: [
      'Extracted raw optical port TOD (Time-of-Day) hex dump verifying healthy external capacitor banks',
      'Demonstrated utility CT/PT secondary polarity discrepancy during tariff meter replacement',
      'Invoked Section 56(2) limitation bar to quash supplementary demand notices',
      'Secured final forum ruling directing reversal of total penalty plus 9% annual statutory interest',
    ],
  },
  {
    title: 'Cold Chain Logistics Express Feeder Clearance',
    location: 'Navi Mumbai Industrial Belt, Maharashtra',
    utility: 'MSEDCL',
    benefit: '1,200 kVA Dedicated 22kV Feeder Sanctioned',
    image: '/images/banking-sanction-dossier.jpg',
    takeaway: 'Sanctioned dedicated 22kV HT express feeder and private switching substation within 28 business days.',
    metrics: [
      { label: 'Sanctioned Load', value: '1,200 kVA' },
      { label: 'Voltage Level', value: '22 kV' },
      { label: 'Turnaround', value: '28 Days' },
      { label: 'Inspection', value: 'CEI Passed' },
    ],
    specs: [
      'Detailed load break-up and single line diagram (SLD) preparation adhering to CEA norms',
      'Fast-track administrative processing through MSEDCL Circle Office and Superintending Engineer',
      'Supervision of HT dual-metering cubicle installation and electronic boundary meter sealing',
      'Continuous power supply agreement execution protecting against seasonal agricultural rostering',
    ],
  },
];

const SANYOG_EXECUTION_ROADMAP = [
  {
    phase: '01',
    title: 'Forensic Bill Audit & Telemetry Extraction',
    timeline: 'Days 1 to 7',
    scope: 'Examination of 12 to 24 billing cycles, tariff schedule verification, maximum demand patterns, and meter optical reading accuracy analysis.',
    deliverable: 'Forensic Discrepancy Memorandum quantifying exact overcharges and penalty exposure.',
  },
  {
    phase: '02',
    title: 'Statutory Dispute Notice & Licensee Review',
    timeline: 'Days 8 to 15',
    scope: 'Issuance of formal statutory grievance notice under MERC Regulation 8.4 to the respective Divisional Executive Engineer.',
    deliverable: 'Registered postal/email filing receipt and formal DISCOM internal docket number.',
  },
  {
    phase: '03',
    title: 'Formal CGRF Petition Assembly',
    timeline: 'Days 16 to 30',
    scope: 'Drafting of legal grievance petition, sworn affidavit, calculation sheets, and documentary annexures under Section 42(5) of the Electricity Act 2003.',
    deliverable: 'Registered CGRF Petition Docket and formal hearing schedule notification.',
  },
  {
    phase: '04',
    title: 'Forum Hearings & Credit Ledger Realization',
    timeline: 'Days 31 to 60',
    scope: 'Direct oral representation before the judicial forum, cross-examination of utility technical dockets, and enforcement of final ruling.',
    deliverable: 'Binding CGRF Order and verified credit adjustment on subsequent utility electricity bill.',
  },
];

export default function SanyogPage() {
  return (
    <DivisionPage
      data={sanyog}
      customHeroLogo={
        <img
          src="/images/logos/sanyog-official.png"
          alt="SANYOG Official Brand Mark"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      }
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 font-sans">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-wider text-[#2C5ED4] font-bold bg-[#2C5ED4]/10 px-3 py-1 rounded-md border border-[#2C5ED4]/20">
            [MERC STATUTORY LIAISONING &amp; GRIEVANCE DEFENSE]
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
            Statutory Electricity Protocols &amp; Judicial Forum Authority.
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto leading-relaxed">
            36+ years direct regulatory background across BEST Undertaking, Adani Electricity, Tata Power, and MSEDCL. Defending consumers against unlawful billing, arbitrary tariffs, and unsanctioned penalties.
          </p>
        </div>

        {/* 4 Core Statutory Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {PROTOCOLS.map((p, idx) => (
            <ElectricBorder
              key={p.authority}
              active={idx === 1}
              color="#2C5ED4"
              borderRadius="22px"
              innerBg="#FFFFFF"
              className="shadow-sm"
            >
              <div className="p-8 flex flex-col justify-between h-full bg-white rounded-[20px]">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#2C5ED4] font-bold bg-[#2C5ED4]/10 px-2.5 py-1 rounded-md border border-[#2C5ED4]/20">
                      {p.status}
                    </span>
                    <Scale size={18} color="#2C5ED4" />
                  </div>
                  <h4
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 400,
                      color: '#111111',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      marginBottom: '6px',
                    }}
                  >
                    {p.authority}
                  </h4>
                  <div className="text-[11px] font-semibold text-[#888888] mb-3">
                    {p.section}
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                    {p.action}
                  </p>
                </div>
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#666666] font-sans">
                    Timeline: {p.leadTime}
                  </span>
                  <Link
                    href="/electricity-grievances"
                    className="text-xs font-bold text-[#2C5ED4] flex items-center gap-1 hover:underline no-underline"
                  >
                    <span>File Grievance</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </ElectricBorder>
          ))}
        </div>

        {/* Statutory Compliance Codes Grid */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#2C5ED4] font-bold bg-[#2C5ED4]/10 px-3 py-1 rounded-md border border-[#2C5ED4]/20">
              [LEGAL FRAMEWORK &amp; STATUTORY CODES]
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
              MERC Regulations, Section 42 &amp; Limitation Safeguards.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Every petition is constructed on firm legislative bedrock: The Electricity Act 2003, MERC Supply Code 2021, and authoritative appellate rulings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SANYOG_BENCHMARKS.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm hover:border-[#2C5ED4]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-[#2C5ED4] tracking-wider uppercase bg-[#2C5ED4]/10 px-2 py-0.5 rounded">
                      {b.code}
                    </span>
                    <Gavel size={16} color="#2C5ED4" />
                  </div>
                  <h4 className="text-base font-bold text-[#111111] mb-2">{b.title}</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">{b.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-[#047857] font-semibold">
                  <CheckCircle2 size={13} color="#047857" />
                  <span>Statutory Consumer Right Protected</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commissioned Grievance & Liaisoning Project Dossiers */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#2C5ED4] font-bold bg-[#2C5ED4]/10 px-3 py-1 rounded-md border border-[#2C5ED4]/20">
              [PROVEN FORUM CASE HISTORIES]
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
              Resolved Consumer Petitions &amp; Tariff Restorations.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Real commercial housing societies, heritage complexes, and manufacturing plants defended successfully before regulatory forums across Mumbai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SANYOG_PROJECT_DOSSIERS.map((dossier) => (
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
                      category={dossier.utility}
                      scope={dossier.takeaway}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#2C5ED4] shadow-sm border border-black/5">
                      {dossier.benefit}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                      <span>{dossier.location}</span>
                      <span className="font-semibold text-[#2C5ED4]">{dossier.utility}</span>
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
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#2C5ED4]">
                        Executed Legal &amp; Technical Action:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#666666]">
                        {dossier.specs.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#2C5ED4] font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/electricity-grievances"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-[#2C5ED4] text-[#111111] hover:text-white text-xs font-semibold transition-colors no-underline"
                  >
                    <span>Submit Similar Grievance Dossier</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Stage Execution Roadmap */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[#F4F6FC] p-6 md:p-10">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-wider text-[#2C5ED4] font-bold bg-[#2C5ED4]/10 px-3 py-1 rounded-md border border-[#2C5ED4]/20">
              [STATUTORY DISPOSAL TIMELINE]
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
              CGRF Petition &amp; Credit Realization Sequence.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              From forensic energy audit to formal forum ruling: our 60-day regulatory framework enforces statutory disposal timelines under MERC regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SANYOG_EXECUTION_ROADMAP.map((step) => (
              <div
                key={step.phase}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-[#2C5ED4] font-serif">
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
