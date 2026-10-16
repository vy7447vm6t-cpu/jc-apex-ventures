"use client";

import React from 'react';
import AuthorityLogo from './AuthorityLogos';
import { MagicBento, TechText } from '@/components/react-bits';
import type { BentoCardData } from '@/components/react-bits/MagicBento';

interface AffiliationItem {
  id: string;
  num: string;
  name: string;
  scope: string;
  code: string;
  jurisdiction: string;
  icon: React.ReactNode;
}

const AFFILIATIONS: AffiliationItem[] = [
  {
    id: 'best',
    num: '01',
    name: 'BEST Undertaking',
    scope: 'Island City HT/LT power load sanctions, meter room audits, and tariff re-categorization.',
    code: 'MERC Supply Code & Island City Grid Protocol',
    jurisdiction: 'Colaba to Sion / Mahim',
    icon: <AuthorityLogo id="best" size={36} />,
  },
  {
    id: 'adani',
    num: '02',
    name: 'Adani Electricity (AEML)',
    scope: 'Suburban HT/LT distribution clearances, bi-directional solar net-metering, and CGRF filings.',
    code: 'Smart Metering & Suburban Load Sanction Filing',
    jurisdiction: 'Bandra to Dahisar / Chembur',
    icon: <AuthorityLogo id="adani" size={36} />,
  },
  {
    id: 'tatapower',
    num: '03',
    name: 'Tata Power (TPCL)',
    scope: 'Parallel distribution grid interconnection, changeover protocols, and industrial switchgear sync.',
    code: 'Solar Interconnection & Switchgear Clearances',
    jurisdiction: 'Greater Mumbai & MMR',
    icon: <AuthorityLogo id="tata" size={36} />,
  },
  {
    id: 'msedcl',
    num: '04',
    name: 'MSEDCL (Mahavitaran)',
    scope: 'Industrial 33kV/11kV express feeder sanctions, transformer bay approvals, and open access.',
    code: 'HT Substation Sanctions & Open Access',
    jurisdiction: 'Thane, Navi Mumbai & Konkan',
    icon: <AuthorityLogo id="msedcl" size={36} />,
  },
  {
    id: 'pwd',
    num: '05',
    name: 'PWD Electrical Inspectorate',
    scope: 'Chief Electrical Inspector (CEI) drawing sanctions, earth-grid testing, and charging permissions.',
    code: 'CEA Measures Relating to Safety & Electric Supply',
    jurisdiction: 'Govt. of Maharashtra',
    icon: <AuthorityLogo id="pwd" size={36} />,
  },
  {
    id: 'mpcb',
    num: '06',
    name: 'Pollution Control Board (MPCB)',
    scope: 'Zero-power thermal waste decomposition certification and industrial environmental consents.',
    code: 'Consent to Establish / Operate (CTE / CTO)',
    jurisdiction: 'State of Maharashtra',
    icon: <AuthorityLogo id="mpcb" size={36} />,
  },
  {
    id: 'pmsuryaghar',
    num: '07',
    name: 'PM Surya Ghar National Portal',
    scope: 'Central capital subsidy verification for residential and cooperative housing society solar plants.',
    code: 'MNRE / MEDA Rooftop Solar Verification (Up to ₹10.8L)',
    jurisdiction: 'Ministry of New & Renewable Energy',
    icon: <AuthorityLogo id="pmsuryaghar" size={36} />,
  },
  {
    id: 'bee',
    num: '08',
    name: 'Bureau of Energy Efficiency (BEE)',
    scope: 'Commercial building load profiling, power factor correction, and ECBC conservation compliance.',
    code: 'ECBC & PAT Scheme Statutory Compliance',
    jurisdiction: 'Ministry of Power, Govt. of India',
    icon: <AuthorityLogo id="bee" size={36} />,
  },
  {
    id: 'mca',
    num: '09',
    name: 'Ministry of Corporate Affairs',
    scope: 'Registered engineering, utility liaisoning, and turnkey execution consortium headquarters.',
    code: 'CIN: U70200MH2023OPC411326',
    jurisdiction: 'Govt. of India (OPC Pvt. Ltd.)',
    icon: <AuthorityLogo id="mca" size={36} />,
  },
];

export default function GroundedAffiliations() {
  const bentoCards: BentoCardData[] = AFFILIATIONS.map((item) => ({
    id: item.id,
    title: item.name,
    subtitle: item.scope,
    badge: `${item.num} · ${item.jurisdiction}`,
    icon: item.icon,
    footer: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <span style={{ color: '#8C733E', fontWeight: 600 }}>
          <TechText text={item.code} scrambleSpeed={20} maxScrambles={4} triggerOnHover={true} />
        </span>
        <span style={{ color: '#999999', fontSize: '0.7rem' }}>+</span>
      </div>
    ),
  }));

  return (
    <section
      id="affiliations"
      className="section_logo6 relative overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#111111',
        padding: 'clamp(96px, 12vh, 136px) 24px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
        scrollMarginTop: '104px',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label & Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '20px',
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
                [<TechText text="05 / INSTITUTIONAL ACCREDITATIONS" scrambleSpeed={24} maxScrambles={5} triggerOnHover={true} />]
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.3rem)',
                lineHeight: 1.15,
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#111111',
                margin: 0,
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              Statutory coordination across Mumbai distribution networks and national regulatory bodies.
            </h2>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#8C733E',
              backgroundColor: '#F4F1EA',
              padding: '8px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(194, 159, 83, 0.28)',
            }}
          >
            9 Statutory Jurisdictions
          </span>
        </div>

        {/* 9-Box MagicBento Grid with Cursor-Tracking Radial Gold Luminescence */}
        <MagicBento cards={bentoCards} />
      </div>
    </section>
  );
}
