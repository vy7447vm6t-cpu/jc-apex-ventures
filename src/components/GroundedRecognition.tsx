"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AuthorityLogo from '@/components/AuthorityLogos';
import {
  LineSidebar,
  LineSidebarItem,
  TechText,
  MicroSlats,
  FaultyTerminal,
  CrtWarp,
} from '@/components/react-bits';

interface LedgerRow {
  parameter: string;
  authority: string;
  authorityId: string;
  framework: string;
  deliverable: string;
  category: 'discom' | 'safety' | 'env' | 'corporate';
  divisionLogo: string;
  divisionName: string;
  divisionHref: string;
}

const JURISDICTION_FILTERS: LineSidebarItem[] = [
  { id: 'all', label: 'All Jurisdictions', tag: '9 Statutory Frameworks' },
  { id: 'discom', label: 'Power Licensees', tag: 'BEST · Adani · Tata · MSEDCL' },
  { id: 'safety', label: 'Safety & Redressal', tag: 'PWD Inspectorate · MERC CGRF' },
  { id: 'env', label: 'Environment & Solar', tag: 'MPCB · PM Surya Ghar / MNRE' },
  { id: 'corporate', label: 'Corporate Registry', tag: 'MCA Companies Act 2013' },
];

const LEDGER_ROWS: LedgerRow[] = [
  {
    parameter: 'Island City Power Sanctions',
    authority: 'BEST Undertaking',
    authorityId: 'best',
    framework: 'MERC Electricity Supply Code 2021',
    deliverable: 'HT and LT load release, meter shifting, and substation space allocation sanctions',
    category: 'discom',
    divisionLogo: '/images/logos/sanyog-official.png',
    divisionName: 'Sanyog',
    divisionHref: '/sanyog',
  },
  {
    parameter: 'Suburban Power Distribution',
    authority: 'Adani Electricity (AEML)',
    authorityId: 'adani',
    framework: 'MERC Grid Code & Distribution Rules',
    deliverable: 'Digital net-metering synchronization, commercial tariff audit, and load sanctioning',
    category: 'discom',
    divisionLogo: '/images/logos/sanyog-official.png',
    divisionName: 'Sanyog',
    divisionHref: '/sanyog',
  },
  {
    parameter: 'Urban Grid Interconnection',
    authority: 'Tata Power (TPCL)',
    authorityId: 'tata',
    framework: 'CEA Safety & Supply Regulations',
    deliverable: 'Rooftop solar grid synchronization, HT metering cabins, and capacitor bank compliance',
    category: 'discom',
    divisionLogo: '/images/logos/solis-official.png',
    divisionName: 'Solis',
    divisionHref: '/solis',
  },
  {
    parameter: 'Industrial & MMR Supply',
    authority: 'MSEDCL (Mahavitaran)',
    authorityId: 'msedcl',
    framework: 'Maharashtra Electricity Distribution Code',
    deliverable: 'Express industrial feeder sanctions, open access liaisoning, and power factor audits',
    category: 'discom',
    divisionLogo: '/images/logos/grid-apex-official.png',
    divisionName: 'Grid Apex',
    divisionHref: '/grid-apex',
  },
  {
    parameter: 'Electrical Safety Clearances',
    authority: 'PWD Electrical Inspectorate',
    authorityId: 'pwd',
    framework: 'CEA Safety Regulations 2023',
    deliverable: 'Substation energization certification and switchgear safety inspection approvals',
    category: 'safety',
    divisionLogo: '/images/logos/grid-apex-official.png',
    divisionName: 'Grid Apex',
    divisionHref: '/grid-apex',
  },
  {
    parameter: 'Environmental Sanctions',
    authority: 'Pollution Control Board (MPCB)',
    authorityId: 'mpcb',
    framework: 'Pollution Control Acts & Solid Waste Rules',
    deliverable: 'Consent to Establish (CTE) and Consent to Operate (CTO) for processing units',
    category: 'env',
    divisionLogo: '/images/logos/grid-apex-official.png',
    divisionName: 'Grid Apex',
    divisionHref: '/grid-apex',
  },
  {
    parameter: 'Central Solar Subsidy',
    authority: 'PM Surya Ghar / MNRE',
    authorityId: 'pmsuryaghar',
    framework: 'National Rooftop Solar Guidelines',
    deliverable: 'Central financial assistance clearance up to Rs 78,000 (homes) and Rs 10.8 Lakhs (CHS)',
    category: 'env',
    divisionLogo: '/images/logos/solis-official.png',
    divisionName: 'Solis',
    divisionHref: '/solis',
  },
  {
    parameter: 'Consumer Grievance Redressal',
    authority: 'MERC CGRF & Ombudsman',
    authorityId: 'merc',
    framework: 'Electricity Act 2003 (Section 42)',
    deliverable: 'Statutory representation for billing disputes, tariff reclassification, and recovery',
    category: 'safety',
    divisionLogo: '/images/logos/sanyog-official.png',
    divisionName: 'Sanyog',
    divisionHref: '/sanyog',
  },
  {
    parameter: 'Corporate Governance',
    authority: 'Ministry of Corporate Affairs (MCA)',
    authorityId: 'mca',
    framework: 'Companies Act 2013',
    deliverable: 'Registered OPC Private Limited. Corporate Identity Number: U70200MH2023OPC411326',
    category: 'corporate',
    divisionLogo: '/images/logos/agrim-dark.png',
    divisionName: 'Agrim',
    divisionHref: '/agrim',
  },
];

const TELEMETRY_LOGS: Record<string, { timestamp: string; source: string; message: string; status: 'info' | 'warn' | 'success' }[]> = {
  all: [
    { timestamp: 'IST 09:42:10', source: 'MERC-CODE', message: 'Supply Code Reg 2021 §4.12 load sanction verified.', status: 'success' },
    { timestamp: 'IST 09:42:14', source: 'PWD-CEI', message: 'CEA 2023 Reg 43 33kV/11kV dielectric clearance active.', status: 'info' },
    { timestamp: 'IST 09:42:19', source: 'MNRE-PORTAL', message: 'PM Surya Ghar CHS Rs 18,000/kW slab up to 500 kW synced.', status: 'success' },
    { timestamp: 'IST 09:42:25', source: 'MPCB-CTO', message: 'Zero-energy thermal waste emission threshold verified.', status: 'success' },
  ],
  discom: [
    { timestamp: 'IST 10:04:11', source: 'BEST-ISLAND', message: 'Colaba to Mahim LT/HT feeder sanction desk active.', status: 'success' },
    { timestamp: 'IST 10:04:15', source: 'AEML-SUBURB', message: 'Bidirectional net-meter synchronization SLA: 15-30 days.', status: 'info' },
    { timestamp: 'IST 10:04:19', source: 'TPCL-GRID', message: 'Parallel MMR network harmonic & PF 0.99 audit passed.', status: 'success' },
    { timestamp: 'IST 10:04:22', source: 'MSEDCL-MIDC', message: 'Express industrial feeder open-access filing ready.', status: 'info' },
  ],
  safety: [
    { timestamp: 'IST 10:12:02', source: 'PWD-CEI', message: 'Class-A electrical contractor test report verified.', status: 'success' },
    { timestamp: 'IST 10:12:08', source: 'MERC-CGRF', message: 'Section 42(5) & Ombudsman Section 42(6) docket ready.', status: 'warn' },
    { timestamp: 'IST 10:12:14', source: 'EARTH-GRID', message: 'IS 3043 substation earthing impedance < 1.0 Ohm.', status: 'success' },
  ],
  env: [
    { timestamp: 'IST 10:18:05', source: 'MPCB-CONSENT', message: 'CTE/CTO solid waste thermal decomposition compliant.', status: 'success' },
    { timestamp: 'IST 10:18:11', source: 'MNRE-SUBSIDY', message: 'Residential Rs 78,000 & Society Rs 10.8L cap active.', status: 'success' },
  ],
  corporate: [
    { timestamp: 'IST 10:22:00', source: 'MCA-ROC', message: 'CIN U70200MH2023OPC411326 active at Mumbai ROC.', status: 'success' },
    { timestamp: 'IST 10:22:04', source: 'AGRIM-DPR', message: 'Pure technical & financial DPR preparation (Non-NBFC).', status: 'info' },
  ],
};

export default function GroundedRecognition() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const filteredRows =
    activeCategory === 'all'
      ? LEDGER_ROWS
      : LEDGER_ROWS.filter((r) => r.category === activeCategory);

  const activeLogs = TELEMETRY_LOGS[activeCategory] || TELEMETRY_LOGS.all;

  return (
    <section
      id="recognition"
      className="recognition-section relative overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        padding: 'clamp(80px, 9vw, 128px) clamp(20px, 4vw, 48px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        scrollMarginTop: '104px',
        position: 'relative',
      }}
    >
      {/* Subtle CAD Louver Geometry */}
      <MicroSlats count={20} color="#8C733E" opacity={0.05} zIndex={1} showTicks={true} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans), Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#8C733E',
            }}
          >
            [<TechText text="09 / STATUTORY FRAMEWORK LEDGER" scrambleSpeed={22} maxScrambles={4} triggerOnHover={true} />]
          </span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '960px', marginBottom: '36px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              lineHeight: 1.12,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Statutory Recognition &amp; Compliance Parameters.
          </h2>
          <p
            style={{
              fontSize: '1.02rem',
              color: '#4A4A46',
              lineHeight: 1.65,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            A transparent ledger of government departments, regulatory frameworks, and engineering parameters governing our work across the Mumbai Metropolitan Region. Filter by regulatory jurisdiction below.
          </p>
        </div>

        {/* Interactive Layout: LineSidebar + Live Telemetry Terminal + Ledger Table / Mobile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-full overflow-hidden">
          {/* Left Rail: LineSidebar Jurisdiction Filter + CrtWarp / FaultyTerminal Statutory Telemetry */}
          <div className="lg:col-span-4 flex flex-col gap-5 w-full max-w-full overflow-hidden">
            <div className="rounded-2xl bg-[#F4F1EA] p-4 border border-black/8 w-full max-w-full overflow-hidden">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666666] mb-2 px-2">
                Jurisdiction Index
              </div>
              <LineSidebar
                items={JURISDICTION_FILTERS}
                activeId={activeCategory}
                onSelect={(id) => setActiveCategory(id)}
              />
            </div>

            {/* Live Statutory Telemetry Terminal wrapped in CrtWarp */}
            <div className="hidden md:block">
              <CrtWarp enableCurvature={false} enableScanlines={true} className="!p-0">
                <FaultyTerminal
                  title="MERC / CEA Statutory Telemetry"
                  logs={activeLogs}
                  className="!border-0 !rounded-none !shadow-none"
                />
              </CrtWarp>
            </div>
          </div>

          {/* Right Viewport: Desktop 4-Column Hairline Table + Mobile Stacked Cards */}
          <div className="lg:col-span-8 w-full max-w-full overflow-hidden">
            {/* Desktop & Tablet Table */}
            <div
              className="hidden md:block"
              style={{
                overflowX: 'auto',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
              }}
            >
              <table className="recognition-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F4F1EA', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <th style={{ width: '24%', padding: '16px 18px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Discipline &amp; Desk
                    </th>
                    <th style={{ width: '24%', padding: '16px 18px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Statutory Authority
                    </th>
                    <th style={{ width: '22%', padding: '16px 18px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Regulatory Code
                    </th>
                    <th style={{ width: '30%', padding: '16px 18px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Scope &amp; Deliverables
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row, idx) => (
                    <tr
                      key={row.parameter}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        borderBottom: idx === filteredRows.length - 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                        backgroundColor: hoveredRow === idx ? 'rgba(244, 241, 234, 0.55)' : '#FFFFFF',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <td
                        style={{
                          padding: '16px 18px',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          color: '#111111',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        <div style={{ marginBottom: '6px' }}>{row.parameter}</div>
                        <Link
                          href={row.divisionHref}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#F4F1EA',
                            border: '1px solid rgba(194, 159, 83, 0.25)',
                            textDecoration: 'none',
                          }}
                        >
                          <img
                            src={row.divisionLogo}
                            alt={row.divisionName}
                            style={{
                              height: row.divisionLogo.includes('sanyog') ? '22px' : '17px',
                              maxWidth: '72px',
                              width: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 650,
                              color: '#8C6D23',
                              letterSpacing: '0.02em',
                            }}
                          >
                            ↗
                          </span>
                        </Link>
                      </td>
                      <td
                        style={{
                          padding: '16px 18px',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          color: '#222222',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              backgroundColor: '#F8F6F0',
                              border: '1px solid rgba(0, 0, 0, 0.06)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <AuthorityLogo id={row.authorityId} size={22} />
                          </div>
                          <span>{row.authority}</span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: '16px 18px',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#8C6D23',
                        }}
                      >
                        <TechText
                          text={row.framework}
                          trigger="hover"
                          active={hoveredRow === idx}
                          speed={20}
                        />
                      </td>
                      <td
                        style={{
                          padding: '16px 18px',
                          fontSize: '0.84rem',
                          color: '#4A4A46',
                          lineHeight: 1.55,
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        {row.deliverable}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile (<768px) Responsive Stacked Grounded Cards with Authority Crests & Division Logos */}
            <div className="flex flex-col gap-3 md:hidden w-full max-w-full overflow-hidden">
              {filteredRows.map((row) => (
                <div
                  key={row.parameter}
                  className="rounded-2xl border border-black/8 bg-[#F8F6F0] p-4 font-sans shadow-xs w-full max-w-full box-border overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-white border border-black/8 flex items-center justify-center shrink-0">
                        <AuthorityLogo id={row.authorityId} size={18} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D23] truncate">
                        {row.authority}
                      </span>
                    </div>
                    <img
                      src={row.divisionLogo}
                      alt={row.divisionName}
                      style={{ height: '18px', maxWidth: '68px', width: 'auto', objectFit: 'contain' }}
                    />
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: '#111111',
                      margin: '0 0 6px 0',
                      lineHeight: 1.2,
                    }}
                  >
                    {row.parameter}
                  </h4>
                  <div className="text-[11px] font-semibold text-[#555555] bg-white px-2.5 py-0.5 rounded-full border border-black/8 inline-block mb-2 max-w-full truncate">
                    {row.framework}
                  </div>
                  <p className="text-xs text-[#4A4A46] leading-relaxed m-0 break-words">
                    {row.deliverable}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
