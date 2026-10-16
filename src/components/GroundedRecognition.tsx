"use client";

import React, { useState } from 'react';
import LineSidebar, { LineSidebarItem } from '@/components/react-bits/LineSidebar';
import TechText from '@/components/react-bits/TechText';

interface LedgerRow {
  parameter: string;
  authority: string;
  framework: string;
  deliverable: string;
  category: 'discom' | 'safety' | 'env' | 'corporate';
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
    framework: 'MERC Electricity Supply Code 2021',
    deliverable: 'HT and LT load release, meter shifting, and substation space allocation sanctions',
    category: 'discom',
  },
  {
    parameter: 'Suburban Power Distribution',
    authority: 'Adani Electricity (AEML)',
    framework: 'MERC Grid Code & Distribution Rules',
    deliverable: 'Digital net-metering synchronization, commercial tariff audit, and load sanctioning',
    category: 'discom',
  },
  {
    parameter: 'Urban Grid Interconnection',
    authority: 'Tata Power (TPCL)',
    framework: 'CEA Safety & Supply Regulations',
    deliverable: 'Rooftop solar grid synchronization, HT metering cabins, and capacitor bank compliance',
    category: 'discom',
  },
  {
    parameter: 'Industrial & MMR Supply',
    authority: 'MSEDCL (Mahavitaran)',
    framework: 'Maharashtra Electricity Distribution Code',
    deliverable: 'Express industrial feeder sanctions, open access liaisoning, and power factor audits',
    category: 'discom',
  },
  {
    parameter: 'Electrical Safety Clearances',
    authority: 'PWD Electrical Inspectorate',
    framework: 'CEA Safety Regulations 2023',
    deliverable: 'Substation energization certification and switchgear safety inspection approvals',
    category: 'safety',
  },
  {
    parameter: 'Environmental Sanctions',
    authority: 'Pollution Control Board (MPCB)',
    framework: 'Pollution Control Acts & Solid Waste Rules',
    deliverable: 'Consent to Establish (CTE) and Consent to Operate (CTO) for processing units',
    category: 'env',
  },
  {
    parameter: 'Central Solar Subsidy',
    authority: 'PM Surya Ghar / MNRE',
    framework: 'National Rooftop Solar Guidelines',
    deliverable: 'Central financial assistance clearance up to Rs 78,000 (homes) and Rs 10.8 Lakhs (CHS)',
    category: 'env',
  },
  {
    parameter: 'Consumer Grievance Redressal',
    authority: 'MERC CGRF & Ombudsman',
    framework: 'Electricity Act 2003 (Section 42)',
    deliverable: 'Statutory representation for billing disputes, tariff reclassification, and recovery',
    category: 'safety',
  },
  {
    parameter: 'Corporate Governance',
    authority: 'Ministry of Corporate Affairs (MCA)',
    framework: 'Companies Act 2013',
    deliverable: 'Registered OPC Private Limited. Corporate Identity Number: U70200MH2023OPC411326',
    category: 'corporate',
  },
];

export default function GroundedRecognition() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const filteredRows =
    activeCategory === 'all'
      ? LEDGER_ROWS
      : LEDGER_ROWS.filter((r) => r.category === activeCategory);

  return (
    <section
      id="recognition"
      className="recognition-section"
      style={{
        backgroundColor: '#FFFFFF',
        padding: 'clamp(80px, 9vw, 128px) clamp(20px, 4vw, 48px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        scrollMarginTop: '104px',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans), Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#666666',
            }}
          >
            [09 / STATUTORY FRAMEWORK LEDGER]
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
            A transparent ledger of government departments, regulatory frameworks, and engineering parameters governing our work across the Mumbai Metropolitan Region. Filter by jurisdiction using the LineSidebar index.
          </p>
        </div>

        {/* Interactive Layout: LineSidebar + Ledger Table / Mobile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Rail: LineSidebar Jurisdiction Filter */}
          <div className="lg:col-span-3 rounded-2xl bg-[#F4F1EA] p-4 border border-black/8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666666] mb-2 px-2">
              Jurisdiction Index
            </div>
            <LineSidebar
              items={JURISDICTION_FILTERS}
              activeId={activeCategory}
              onSelect={(id) => setActiveCategory(id)}
            />
          </div>

          {/* Right Viewport: Desktop 4-Column Hairline Table + Mobile Stacked Cards */}
          <div className="lg:col-span-9">
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
                    <th style={{ width: '24%', padding: '16px 18px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Discipline / Parameter
                    </th>
                    <th style={{ width: '22%', padding: '16px 18px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Statutory Authority
                    </th>
                    <th style={{ width: '24%', padding: '16px 18px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Regulatory Code
                    </th>
                    <th style={{ width: '30%', padding: '16px 18px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555555', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
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
                          padding: '18px',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: '#111111',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        {row.parameter}
                      </td>
                      <td
                        style={{
                          padding: '18px',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.86rem',
                          fontWeight: 500,
                          color: '#333333',
                        }}
                      >
                        {row.authority}
                      </td>
                      <td
                        style={{
                          padding: '18px',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.82rem',
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
                          padding: '18px',
                          fontSize: '0.86rem',
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

            {/* Mobile (<768px) Zero-Scroll Hairline Cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {filteredRows.map((row) => (
                <div
                  key={row.parameter}
                  className="rounded-2xl border border-black/8 bg-[#F4F1EA]/50 p-4 font-sans"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D23]">
                      {row.authority}
                    </span>
                    <span className="text-[11px] font-semibold text-[#555555] bg-white px-2.5 py-0.5 rounded-full border border-black/8">
                      {row.framework}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-[#111111] mb-1">
                    {row.parameter}
                  </h4>
                  <p className="text-xs text-[#4A4A46] leading-relaxed m-0">
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
