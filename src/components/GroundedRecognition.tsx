"use client";

import React, { useState, useEffect } from 'react';
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
  jurisdictionBadge: string;
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
    jurisdictionBadge: 'MUNICIPAL DISCOM · ISLAND CITY',
    framework: 'MERC Electricity Supply Code 2021',
    deliverable: 'HT and LT load release, meter shifting, and substation space allocation sanctions',
    category: 'discom',
    divisionLogo: '/images/logos/sanyog-white.png',
    divisionName: 'Sanyog',
    divisionHref: '/sanyog',
  },
  {
    parameter: 'Suburban Power Distribution',
    authority: 'Adani Electricity (AEML)',
    authorityId: 'adani',
    jurisdictionBadge: 'PRIVATE DISCOM · SUBURBAN MMR',
    framework: 'MERC Grid Code & Distribution Rules',
    deliverable: 'Digital net-metering synchronization, commercial tariff audit, and load sanctioning',
    category: 'discom',
    divisionLogo: '/images/logos/sanyog-white.png',
    divisionName: 'Sanyog',
    divisionHref: '/sanyog',
  },
  {
    parameter: 'Urban Grid Interconnection',
    authority: 'Tata Power (TPCL)',
    authorityId: 'tata',
    jurisdictionBadge: 'PRIVATE DISCOM · URBAN MMR',
    framework: 'CEA Safety & Supply Regulations',
    deliverable: 'Rooftop solar grid synchronization, HT metering cabins, and capacitor bank compliance',
    category: 'discom',
    divisionLogo: '/images/logos/solis-logo-white.png',
    divisionName: 'Solis',
    divisionHref: '/solis',
  },
  {
    parameter: 'Industrial & MMR Supply',
    authority: 'MSEDCL (Mahavitaran)',
    authorityId: 'msedcl',
    jurisdictionBadge: 'STATE DISCOM · INDUSTRIAL MMR',
    framework: 'Maharashtra Electricity Distribution Code',
    deliverable: 'Express industrial feeder sanctions, open access liaisoning, and power factor audits',
    category: 'discom',
    divisionLogo: '/images/logos/grid-apex-white.png',
    divisionName: 'Grid Apex',
    divisionHref: '/grid-apex',
  },
  {
    parameter: 'Electrical Safety Clearances',
    authority: 'PWD Electrical Inspectorate',
    authorityId: 'pwd',
    jurisdictionBadge: 'STATUTORY INSPECTORATE',
    framework: 'CEA Safety Regulations 2023',
    deliverable: 'Substation energization certification and switchgear safety inspection approvals',
    category: 'safety',
    divisionLogo: '/images/logos/grid-apex-white.png',
    divisionName: 'Grid Apex',
    divisionHref: '/grid-apex',
  },
  {
    parameter: 'Environmental Sanctions',
    authority: 'Pollution Control Board (MPCB)',
    authorityId: 'mpcb',
    jurisdictionBadge: 'STATE POLLUTION BOARD',
    framework: 'Pollution Control Acts & Solid Waste Rules',
    deliverable: 'Consent to Establish (CTE) and Consent to Operate (CTO) for processing units',
    category: 'env',
    divisionLogo: '/images/logos/grid-apex-white.png',
    divisionName: 'Grid Apex',
    divisionHref: '/grid-apex',
  },
  {
    parameter: 'Central Solar Subsidy',
    authority: 'PM Surya Ghar / MNRE',
    authorityId: 'pmsuryaghar',
    jurisdictionBadge: 'CENTRAL MNRE PORTAL',
    framework: 'National Rooftop Solar Guidelines',
    deliverable: 'Central financial assistance clearance up to Rs 78,000 (homes) and Rs 10.8 Lakhs (CHS)',
    category: 'env',
    divisionLogo: '/images/logos/solis-logo-white.png',
    divisionName: 'Solis',
    divisionHref: '/solis',
  },
  {
    parameter: 'Consumer Grievance Redressal',
    authority: 'MERC CGRF & Ombudsman',
    authorityId: 'merc',
    jurisdictionBadge: 'APPELLATE & OMBUDSMAN',
    framework: 'Electricity Act 2003 (Section 42)',
    deliverable: 'Statutory representation for billing disputes, tariff reclassification, and recovery',
    category: 'safety',
    divisionLogo: '/images/logos/sanyog-white.png',
    divisionName: 'Sanyog',
    divisionHref: '/sanyog',
  },
  {
    parameter: 'Corporate Governance',
    authority: 'Ministry of Corporate Affairs (MCA)',
    authorityId: 'mca',
    jurisdictionBadge: 'CENTRAL MINISTRY · ROC MUMBAI',
    framework: 'Companies Act 2013',
    deliverable: 'Registered OPC Private Limited. Corporate Identity Number: U70200MH2023OPC411326',
    category: 'corporate',
    divisionLogo: '/images/logos/agrim-official.png',
    divisionName: 'Agrim',
    divisionHref: '/agrim',
  },
];

const CATEGORY_TELEMETRY_RIBBON: Record<string, { label: string; status: 'nominal' | 'active' | 'synced'; tag: string }[]> = {
  all: [
    { label: 'MERC SUPPLY CODE 2021 §4.12', status: 'nominal', tag: 'DISCOM' },
    { label: 'CEA SAFETY 2023 REG 43', status: 'active', tag: 'SAFETY' },
    { label: '100% REGULATORY AUDIT NOMINAL', status: 'nominal', tag: 'AUDIT' },
    { label: 'MMR DISCOM INTERCONNECTION ACTIVE', status: 'synced', tag: 'GRID' },
  ],
  discom: [
    { label: 'BEST ISLAND CITY HT/LT DESK', status: 'nominal', tag: 'COLABA-MAHIM' },
    { label: 'ADANI SUBURBAN NET-METER SLA 15D', status: 'active', tag: 'BANDRA-DAHISAR' },
    { label: 'TATA POWER PARALLEL GRID SYNC', status: 'nominal', tag: 'TROMBAY-MMR' },
    { label: 'MSEDCL MIDC EXPRESS FEEDER', status: 'synced', tag: 'THANE-TTC' },
  ],
  safety: [
    { label: 'PWD CEI 33kV/11kV DIELECTRIC TEST', status: 'nominal', tag: 'CERTIFIED' },
    { label: 'MERC CGRF SECTION 42(5) DOCKET', status: 'active', tag: 'OMBUDSMAN' },
    { label: 'IS 3043 EARTHING IMPEDANCE < 1.0Ω', status: 'nominal', tag: 'VERIFIED' },
    { label: 'CLASS-A CONTRACTOR SIGN-OFF', status: 'synced', tag: 'STATUTORY' },
  ],
  env: [
    { label: 'MPCB CTE/CTO THERMAL WASTE PASS', status: 'nominal', tag: 'ZERO EMISSION' },
    { label: 'PM SURYA GHAR NATIONAL PORTAL', status: 'synced', tag: 'CENTRAL MNRE' },
    { label: 'CHS SUBSIDY SLAB ₹10.8L CAP SYNC', status: 'nominal', tag: 'SOCIETY CFA' },
    { label: 'RESIDENTIAL ₹78,000 SUBSIDY ACTIVE', status: 'active', tag: 'DIRECT BENEFIT' },
  ],
  corporate: [
    { label: 'MCA ROC CIN U70200MH2023OPC411326', status: 'nominal', tag: 'MUMBAI ROC' },
    { label: 'COMPANIES ACT 2013 COMPLIANT', status: 'synced', tag: 'OPC PRIVATE LTD' },
    { label: 'PURE INFRASTRUCTURE ADVISORY', status: 'nominal', tag: 'NON-NBFC' },
    { label: 'ANNUAL ROC STATUTORY COMPLIANCE', status: 'active', tag: 'ACTIVE FILING' },
  ],
};

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
  const [liveTime, setLiveTime] = useState<string>('IST 10:42:15');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setLiveTime(`IST ${istTime}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredRows =
    activeCategory === 'all'
      ? LEDGER_ROWS
      : LEDGER_ROWS.filter((r) => r.category === activeCategory);

  const activeLogs = TELEMETRY_LOGS[activeCategory] || TELEMETRY_LOGS.all;
  const ribbonItems = CATEGORY_TELEMETRY_RIBBON[activeCategory] || CATEGORY_TELEMETRY_RIBBON.all;

  return (
    <section
      id="recognition"
      className="recognition-section relative overflow-hidden"
      style={{
        backgroundColor: '#0A0D10',
        padding: 'clamp(84px, 10vw, 132px) clamp(20px, 4vw, 48px)',
        borderTop: '1px solid rgba(194, 159, 83, 0.2)',
        borderBottom: '1px solid rgba(194, 159, 83, 0.15)',
        scrollMarginTop: '104px',
        position: 'relative',
        color: '#FFFFFF',
      }}
    >
      {/* Background WebGL FaultyTerminal Canvas Layer */}
      <div
        className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
        style={{ minHeight: '100%', height: '100%', width: '100%' }}
        aria-hidden="true"
      >
        <FaultyTerminal
          tint="#A7EF9E"
          glyphs="blocks"
          scale={1.5}
          digitSize={1.2}
          timeScale={0.5}
          brightness={0.75}
          glow={0.5}
          persistence={0.5}
          mouseStrength={0.5}
          mouseGlow={0.6}
          curvature={0.1}
          vignette={0.25}
          clickEffect="glitch"
        />
        {/* Layered Liquid Glass & Radial Scrim for Razor-Sharp Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(10, 13, 16, 0.76) 0%, rgba(10, 13, 16, 0.88) 55%, rgba(8, 11, 14, 0.98) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Subtle CAD Louver Geometry */}
      <MicroSlats count={20} color="#C29F53" opacity={0.05} zIndex={1} showTicks={true} />

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
              color: '#C29F53',
            }}
          >
            [<TechText text="09 / STATUTORY FRAMEWORK LEDGER" scrambleSpeed={22} maxScrambles={4} triggerOnHover={true} />]
          </span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '960px', marginBottom: '28px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Statutory Recognition &amp; Compliance Parameters.
          </h2>
          <p
            style={{
              fontSize: '1.02rem',
              color: '#E8E4DA',
              lineHeight: 1.65,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            A transparent ledger of government departments, regulatory frameworks, and engineering parameters governing our work across the Mumbai Metropolitan Region. Filter by regulatory jurisdiction below.
          </p>
        </div>

        {/* Dynamic Telemetry Status Ribbon */}
        <div
          className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-8 pb-4 border-b border-white/10 text-xs font-mono tabular-nums"
          style={{ fontFamily: 'var(--font-mono, "Geist Mono", monospace)' }}
        >
          {ribbonItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 ${
                i === 0
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : i === 1
                  ? 'bg-[#C29F53]/10 border border-[#C29F53]/30 text-[#E3B341]'
                  : i === 2
                  ? 'hidden sm:flex bg-sky-500/10 border border-sky-500/30 text-sky-400'
                  : 'hidden md:flex bg-white/5 border border-white/10 text-[#8B949E]'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  item.status === 'nominal'
                    ? 'bg-emerald-400 animate-pulse'
                    : item.status === 'active'
                    ? 'bg-[#C29F53]'
                    : 'bg-sky-400'
                }`}
              />
              <span className="tracking-wider uppercase text-[10px] font-semibold">{item.label}</span>
            </div>
          ))}
          <div className="ml-auto hidden xl:flex items-center gap-2 text-[10px] text-[#7D8590] tracking-wider uppercase">
            <span>CLOCK: {liveTime}</span>
            <span className="text-emerald-400">● 100% NOMINAL</span>
          </div>
        </div>

        {/* Interactive Layout: LineSidebar + Live Telemetry Terminal + Ledger Table / Mobile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-full overflow-hidden">
          {/* Left Rail: LineSidebar Jurisdiction Filter + Live Statutory Telemetry Console (Sticky on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full max-w-full overflow-hidden lg:sticky lg:top-28">
            {/* Jurisdiction Index Card with Dark Liquid Glass */}
            <div
              className="rounded-2xl p-4 sm:p-5 w-full max-w-full overflow-hidden shadow-2xl transition-all duration-200"
              style={{
                backgroundColor: 'rgba(17, 21, 26, 0.85)',
                backdropFilter: 'blur(24px) saturate(190%)',
                WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                border: '1px solid rgba(194, 159, 83, 0.25)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
              }}
            >
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C29F53]">
                  Jurisdiction Index
                </div>
                <div className="text-[10px] font-mono tracking-wider uppercase text-[#8B949E] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {filteredRows.length} {filteredRows.length === 1 ? 'Framework' : 'Frameworks'}
                </div>
              </div>
              <LineSidebar
                items={JURISDICTION_FILTERS}
                activeId={activeCategory}
                onSelect={(id) => setActiveCategory(id)}
                variant="dark"
              />
            </div>

            {/* Live Statutory Telemetry Console wrapped in CrtWarp (Desktop & Tablet) */}
            <div className="w-full">
              <CrtWarp enableCurvature={false} enableScanlines={true} className="!p-0 !rounded-2xl overflow-hidden">
                <div
                  className="rounded-2xl border border-[rgba(167,239,158,0.25)] bg-[#0D1117]/95 text-[#C9D1D9] font-mono tabular-nums text-xs overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: '0 14px 40px rgba(0, 0, 0, 0.55), inset 0 0 16px rgba(167, 239, 158, 0.04)',
                  }}
                >
                  {/* Terminal Title Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#161B22]/90 border-b border-[#30363D]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-3 w-3 rounded-full bg-[#FF5F56] shrink-0" />
                      <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shrink-0" />
                      <span className="h-3 w-3 rounded-full bg-[#27C93F] shrink-0" />
                      <span className="ml-2 text-[11px] text-[#8B949E] tracking-wider uppercase font-semibold truncate">
                        MERC / CEA Statutory Telemetry
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#3FB950] font-semibold tracking-wider shrink-0">
                      <span className="h-2 w-2 rounded-full bg-[#2EA043] animate-pulse" />
                      ONLINE
                    </div>
                  </div>

                  {/* Telemetry Stream Body */}
                  <div className="p-4 flex flex-col gap-2.5 max-h-[300px] overflow-y-auto no-scrollbar bg-black/40">
                    <div className="flex items-center justify-between gap-2 text-[10px] text-[#7D8590] border-b border-white/5 pb-1.5 mb-1.5 font-mono">
                      <span>CH: MMR-DESK/FEED-09</span>
                      <span className="hidden sm:inline">{liveTime}</span>
                      <span>LATENCY: 1.1ms</span>
                    </div>
                    {activeLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2 leading-relaxed text-[11px]">
                        <span className="text-[#7D8590] select-none shrink-0 font-mono">[{log.timestamp}]</span>
                        <span className="text-[#E3B341] font-semibold shrink-0">{log.source}:</span>
                        <span
                          className={
                            log.status === 'success'
                              ? 'text-[#3FB950]'
                              : log.status === 'warn'
                              ? 'text-[#FFA657]'
                              : 'text-[#58A6FF]'
                          }
                        >
                          {log.message}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-[#7D8590] mt-1 pt-1 border-t border-white/5 text-[11px]">
                      <span className="text-[#3FB950]">❯</span>
                      <span className="text-[#8B949E] tracking-wider uppercase text-[10px] truncate">
                        MONITORING {activeCategory.toUpperCase()} COMPLIANCE LEDGER
                      </span>
                      <span className="inline-block w-2 h-3.5 bg-[#A7EF9E] animate-pulse ml-auto shrink-0" />
                    </div>
                  </div>
                </div>
              </CrtWarp>
            </div>
          </div>

          {/* Right Viewport: Desktop 4-Column Hairline Table + Mobile Stacked Cards */}
          <div className="lg:col-span-8 w-full max-w-full overflow-hidden">
            {/* Desktop & Tablet Table */}
            <div
              className="hidden md:flex flex-col justify-between w-full overflow-hidden"
              style={{
                backgroundColor: 'rgba(17, 21, 26, 0.82)',
                backdropFilter: 'blur(24px) saturate(190%)',
                WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                borderRadius: '20px',
                border: '1px solid rgba(194, 159, 83, 0.25)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
                minHeight: '480px',
              }}
            >
              <div style={{ overflowX: 'auto', width: '100%' }}>
                <table className="recognition-table" style={{ width: '100%', borderCollapse: 'collapse', margin: 0 }}>
                  <thead>
                    <tr
                      style={{
                        backgroundColor: 'rgba(22, 27, 34, 0.95)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <th
                        style={{
                          width: '26%',
                          padding: '18px 22px',
                          textAlign: 'left',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#8B949E',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        Discipline &amp; Desk
                      </th>
                      <th
                        style={{
                          width: '26%',
                          padding: '18px 22px',
                          textAlign: 'left',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#8B949E',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        Statutory Authority
                      </th>
                      <th
                        style={{
                          width: '22%',
                          padding: '18px 22px',
                          textAlign: 'left',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#8B949E',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        Regulatory Code
                      </th>
                      <th
                        style={{
                          width: '26%',
                          padding: '18px 22px',
                          textAlign: 'left',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#8B949E',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
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
                          borderBottom: idx === filteredRows.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                          backgroundColor: hoveredRow === idx ? 'rgba(194, 159, 83, 0.08)' : 'transparent',
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <td
                          style={{
                            padding: '20px 22px',
                            fontWeight: 600,
                            fontSize: '0.92rem',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            verticalAlign: 'middle',
                          }}
                        >
                          <div style={{ marginBottom: '10px', color: '#FFFFFF', fontWeight: 600 }}>{row.parameter}</div>
                          <Link
                            href={row.divisionHref}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(194,159,83,0.3)] bg-white/[0.04] hover:bg-[#C29F53]/15 hover:border-[#C29F53] transition-all duration-200 group text-decoration-none"
                            aria-label={`Explore ${row.divisionName} statutory practice`}
                          >
                            <img
                              src={row.divisionLogo}
                              alt=""
                              style={{
                                height: row.divisionLogo.includes('sanyog') ? '18px' : '16px',
                                maxWidth: '72px',
                                width: 'auto',
                                objectFit: 'contain',
                              }}
                            />
                            {row.divisionLogo.includes('sanyog') && (
                              <span className="text-[10px] font-bold tracking-wider uppercase text-[#E8E4DA] group-hover:text-white transition-colors">
                                Sanyog
                              </span>
                            )}
                            <span className="text-[10px] font-bold text-[#C29F53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                              ↗
                            </span>
                          </Link>
                        </td>
                        <td
                          style={{
                            padding: '20px 22px',
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            verticalAlign: 'middle',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(194, 159, 83, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                              }}
                            >
                              <AuthorityLogo id={row.authorityId} size={24} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-white font-semibold text-[0.88rem] leading-snug">
                                {row.authority}
                              </span>
                              <span className="text-[10px] font-mono tracking-wider uppercase text-[#8B949E] mt-0.5">
                                {row.jurisdictionBadge}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: '20px 22px',
                            fontFamily: 'var(--font-mono, "Geist Mono", monospace)',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#E3B341',
                            verticalAlign: 'middle',
                          }}
                        >
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-[rgba(194,159,83,0.25)] font-mono text-[0.8rem] text-[#E3B341] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E3B341]/80 shrink-0" />
                            <TechText
                              text={row.framework}
                              trigger="hover"
                              active={hoveredRow === idx}
                              speed={20}
                            />
                          </div>
                        </td>
                        <td
                          style={{
                            padding: '20px 22px',
                            fontSize: '0.86rem',
                            color: '#E8E4DA',
                            lineHeight: 1.65,
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            verticalAlign: 'middle',
                          }}
                        >
                          {row.deliverable}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Status Strip */}
              <div className="flex items-center justify-between px-6 py-3.5 bg-white/[0.02] border-t border-white/5 text-[11px] font-mono text-[#8B949E]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STATUTORY FRAMEWORK STATUS: 100% REGULATORY AUDIT NOMINAL</span>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                  <span>ACTIVE JURISDICTION: {activeCategory.toUpperCase()}</span>
                  <span>ENTRIES: {filteredRows.length} OF {LEDGER_ROWS.length}</span>
                </div>
              </div>
            </div>

            {/* Mobile (<768px) Responsive Stacked Grounded Cards with Authority Crests & Division Logos */}
            <div className="flex flex-col gap-3.5 md:hidden w-full max-w-full overflow-hidden">
              {filteredRows.map((row) => (
                <div
                  key={row.parameter}
                  className="rounded-2xl border border-[rgba(194,159,83,0.25)] p-4 font-sans shadow-lg w-full max-w-full box-border overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(17, 21, 26, 0.88)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <AuthorityLogo id={row.authorityId} size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#C29F53] truncate">
                          {row.authority}
                        </span>
                        <span className="text-[9px] font-mono tracking-wider uppercase text-[#8B949E]">
                          {row.jurisdictionBadge}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={row.divisionHref}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-[rgba(194,159,83,0.3)] text-decoration-none group hover:border-[#C29F53]"
                      aria-label={`Explore ${row.divisionName} practice`}
                    >
                      <img
                        src={row.divisionLogo}
                        alt=""
                        style={{
                          height: row.divisionLogo.includes('sanyog') ? '17px' : '15px',
                          maxWidth: '64px',
                          width: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                      {row.divisionLogo.includes('sanyog') && (
                        <span className="text-[10px] font-bold text-[#E8E4DA] group-hover:text-white uppercase">Sanyog</span>
                      )}
                      <span className="text-[10px] font-bold text-[#C29F53]">↗</span>
                    </Link>
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: '0 0 8px 0',
                      lineHeight: 1.2,
                    }}
                  >
                    {row.parameter}
                  </h4>
                  <div className="text-[11px] font-mono font-semibold text-[#E3B341] bg-white/5 px-2.5 py-1 rounded-full border border-white/10 inline-block mb-2.5 max-w-full truncate">
                    {row.framework}
                  </div>
                  <p className="text-xs text-[#E8E4DA] leading-relaxed m-0 break-words">
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
