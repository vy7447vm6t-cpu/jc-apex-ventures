"use client";

import React from 'react';

interface LedgerRow {
  parameter: string;
  authority: string;
  framework: string;
  deliverable: string;
}

const LEDGER_ROWS: LedgerRow[] = [
  {
    parameter: 'Island City Power Sanctions',
    authority: 'BEST Undertaking',
    framework: 'MERC Electricity Supply Code 2021',
    deliverable: 'HT and LT load release, meter shifting, and substation space allocation sanctions',
  },
  {
    parameter: 'Suburban Power Distribution',
    authority: 'Adani Electricity (AEML)',
    framework: 'MERC Grid Code & Distribution Rules',
    deliverable: 'Digital net-metering synchronization, commercial tariff audit, and load sanctioning',
  },
  {
    parameter: 'Urban Grid Interconnection',
    authority: 'Tata Power (TPCL)',
    framework: 'CEA Safety & Supply Regulations',
    deliverable: 'Rooftop solar grid synchronization, HT metering cabins, and capacitor bank compliance',
  },
  {
    parameter: 'Industrial & MMR Supply',
    authority: 'MSEDCL (Mahavitaran)',
    framework: 'Maharashtra Electricity Distribution Code',
    deliverable: 'Express industrial feeder sanctions, open access liaisoning, and power factor audits',
  },
  {
    parameter: 'Electrical Safety Clearances',
    authority: 'PWD Electrical Inspectorate',
    framework: 'CEA Safety Regulations 2023',
    deliverable: 'Substation energization certification and switchgear safety inspection approvals',
  },
  {
    parameter: 'Environmental Sanctions',
    authority: 'Pollution Control Board (MPCB)',
    framework: 'Pollution Control Acts & Solid Waste Rules',
    deliverable: 'Consent to Establish (CTE) and Consent to Operate (CTO) for processing units',
  },
  {
    parameter: 'Central Solar Subsidy',
    authority: 'PM Surya Ghar / MNRE',
    framework: 'National Rooftop Solar Guidelines',
    deliverable: 'Central financial assistance clearance up to Rs 78,000 (homes) and Rs 10.8 Lakhs (CHS)',
  },
  {
    parameter: 'Consumer Grievance Redressal',
    authority: 'MERC CGRF & Ombudsman',
    framework: 'Electricity Act 2003 (Section 42)',
    deliverable: 'Statutory representation for billing disputes, tariff reclassification, and recovery',
  },
  {
    parameter: 'Corporate Governance',
    authority: 'Ministry of Corporate Affairs (MCA)',
    framework: 'Companies Act 2013',
    deliverable: 'Registered OPC Private Limited. Corporate Identity Number: U70200MH2023OPC411326',
  },
];

export default function GroundedRecognition() {
  return (
    <section className="recognition-section">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
          <span className="text-eye-brow">[statutory framework ledger]</span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '960px', marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Statutory Recognition & Compliance Parameters
          </h3>
          <p
            style={{
              fontSize: '1.02rem',
              color: '#666666',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            A transparent ledger of government departments, regulatory frameworks, and engineering parameters governing our work across the Mumbai Metropolitan Region.
          </p>
        </div>

        {/* 4-Column Ledger Table (Responsive Container) */}
        <div
          style={{
            overflowX: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
          }}
        >
          <table className="recognition-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Discipline / Parameter</th>
                <th style={{ width: '22%' }}>Statutory Authority</th>
                <th style={{ width: '23%' }}>Regulatory Code</th>
                <th style={{ width: '30%' }}>Scope & Deliverables</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER_ROWS.map((row, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      fontWeight: 600,
                      color: '#111111',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {row.parameter}
                  </td>
                  <td
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.86rem',
                      color: '#444444',
                    }}
                  >
                    {row.authority}
                  </td>
                  <td
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.82rem',
                      color: '#666666',
                    }}
                  >
                    {row.framework}
                  </td>
                  <td
                    style={{
                      fontSize: '0.88rem',
                      color: '#555555',
                      lineHeight: 1.5,
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
      </div>
    </section>
  );
}
