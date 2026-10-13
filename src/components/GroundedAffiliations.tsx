"use client";

import React from 'react';

interface AffiliationItem {
  id: string;
  name: string;
  scope: string;
  code: string;
  jurisdiction: string;
}

const AFFILIATIONS: AffiliationItem[] = [
  {
    id: 'best',
    name: 'BEST Undertaking',
    scope: 'Island City Power Sanctions',
    code: 'MERC Supply Code Compliance',
    jurisdiction: 'Colaba to Sion / Mahim',
  },
  {
    id: 'adani',
    name: 'Adani Electricity (AEML)',
    scope: 'Suburban HT/LT Distribution',
    code: 'Smart Metering & Load Sanction Filing',
    jurisdiction: 'Bandra to Dahisar / Chembur',
  },
  {
    id: 'tatapower',
    name: 'Tata Power (TPCL)',
    scope: 'City & Suburban Distribution',
    code: 'Solar Interconnection & Switchgear Clearances',
    jurisdiction: 'Greater Mumbai & MMR',
  },
  {
    id: 'msedcl',
    name: 'MSEDCL (Mahavitaran)',
    scope: 'Industrial & Commercial Power Supply',
    code: 'HT Substation Sanctions & Open Access',
    jurisdiction: 'Thane, Navi Mumbai & Konkan',
  },
  {
    id: 'pwd',
    name: 'PWD Maharashtra',
    scope: 'Electrical Inspectorate Licensing',
    code: 'Central Electricity Authority (CEA) Safety Rules',
    jurisdiction: 'Govt. of Maharashtra',
  },
  {
    id: 'mpcb',
    name: 'Pollution Control Board (MPCB)',
    scope: 'Solid Waste & Environmental Consents',
    code: 'Consent to Establish / Operate (CTE / CTO)',
    jurisdiction: 'State of Maharashtra',
  },
  {
    id: 'pmsuryaghar',
    name: 'PM Surya Ghar National Portal',
    scope: 'Central Solar Subsidy Disbursal',
    code: 'MNRE / MEDA Rooftop Solar Verification',
    jurisdiction: 'Govt. of India',
  },
  {
    id: 'bee',
    name: 'Bureau of Energy Efficiency (BEE)',
    scope: 'Energy Conservation & Auditing',
    code: 'ECBC & PAT Scheme Statutory Compliance',
    jurisdiction: 'Ministry of Power, Govt. of India',
  },
  {
    id: 'mca',
    name: 'Ministry of Corporate Affairs',
    scope: 'Corporate Identity Verification',
    code: 'CIN: U70200MH2023OPC411326',
    jurisdiction: 'Govt. of India (OPC Pvt. Ltd.)',
  },
];

export default function GroundedAffiliations() {
  return (
    <section className="section_logo6">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label & Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div className="eye-brow-container" style={{ margin: 0 }}>
            <span className="text-eye-brow">[institutional accreditations]</span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.78rem',
              color: '#888888',
            }}
          >
            Statutory Grid & Regulatory Authorities
          </span>
        </div>

        {/* 9-Box Hairline Bordered Grid */}
        <div className="logo_list">
          {AFFILIATIONS.map((item) => (
            <div key={item.id} className="logo_wrapper">
              {/* Corner crosshairs */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  color: '#CCCCCC',
                }}
              >
                +
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#727272',
                    marginBottom: '8px',
                  }}
                >
                  {item.jurisdiction}
                </div>
                <h4
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: '#111111',
                    letterSpacing: '-0.015em',
                    margin: '0 0 8px 0',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  {item.name}
                </h4>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#444444',
                    lineHeight: 1.4,
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  {item.scope}
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  color: '#666666',
                  borderTop: '1px solid #EEEEEE',
                  paddingTop: '12px',
                  marginTop: '16px',
                }}
              >
                {item.code}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
