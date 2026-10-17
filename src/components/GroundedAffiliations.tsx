"use client";

import React, { useState } from 'react';
import AuthorityLogo from './AuthorityLogos';
import { MagicBento, TechText } from '@/components/react-bits';
import type { BentoCardData } from '@/components/react-bits/MagicBento';

interface DivisionBadge {
  name: string;
  logo: string;
}

interface AffiliationItem {
  id: string;
  num: string;
  category: 'discom' | 'statutory';
  acronym: string;
  name: string;
  scope: string;
  code: string;
  jurisdiction: string;
  sla: string;
  deliverables: string[];
  divisions: DivisionBadge[];
  icon: React.ReactNode;
}

const AFFILIATIONS: AffiliationItem[] = [
  {
    id: 'best',
    num: '01',
    category: 'discom',
    acronym: 'BEST UNDERTAKING',
    name: 'BEST Undertaking',
    scope: 'Island City HT/LT power load sanctions, meter room audits, and tariff re-categorization.',
    code: 'MERC Supply Code & Island City Grid Protocol',
    jurisdiction: 'Colaba to Sion / Mahim',
    sla: '14-21 Business Days',
    deliverables: ['LT/HT Load Upgrade', 'Tariff Re-Classification', 'Meter Room Audit'],
    divisions: [
      { name: 'Sanyog', logo: '/images/logos/sanyog-official.png' },
      { name: 'Solis', logo: '/images/logos/solis-official.png' },
    ],
    icon: <AuthorityLogo id="best" size={48} />,
  },
  {
    id: 'adani',
    num: '02',
    category: 'discom',
    acronym: 'AEML SUBURBAN GRID',
    name: 'Adani Electricity (AEML)',
    scope: 'Suburban HT/LT distribution clearances, bi-directional solar net-metering, and CGRF filings.',
    code: 'Smart Metering & Suburban Load Sanction Filing',
    jurisdiction: 'Bandra to Dahisar / Chembur',
    sla: '10-18 Business Days',
    deliverables: ['Solar Net-Metering', 'CGRF Petition', 'Substation NOC'],
    divisions: [
      { name: 'Sanyog', logo: '/images/logos/sanyog-official.png' },
      { name: 'Solis', logo: '/images/logos/solis-official.png' },
    ],
    icon: <AuthorityLogo id="adani" size={48} />,
  },
  {
    id: 'tatapower',
    num: '03',
    category: 'discom',
    acronym: 'TATA POWER (TPCL)',
    name: 'Tata Power (TPCL)',
    scope: 'Parallel distribution grid interconnection, changeover protocols, and industrial switchgear sync.',
    code: 'Solar Interconnection & Switchgear Clearances',
    jurisdiction: 'Greater Mumbai & MMR',
    sla: '12-21 Business Days',
    deliverables: ['Grid Changeover', 'Switchgear Sync', 'Green Tariff PPA'],
    divisions: [
      { name: 'Sanyog', logo: '/images/logos/sanyog-official.png' },
      { name: 'Grid Apex', logo: '/images/logos/grid-apex-official.png' },
    ],
    icon: <AuthorityLogo id="tata" size={48} />,
  },
  {
    id: 'msedcl',
    num: '04',
    category: 'discom',
    acronym: 'MAHAVITARAN (MSEDCL)',
    name: 'MSEDCL (Mahavitaran)',
    scope: 'Industrial 33kV/11kV express feeder sanctions, transformer bay approvals, and open access.',
    code: 'HT Substation Sanctions & Open Access',
    jurisdiction: 'Thane, Navi Mumbai & Konkan',
    sla: '21-35 Business Days',
    deliverables: ['33kV/11kV Feeder', 'Transformer Bay', 'Open Access Approval'],
    divisions: [
      { name: 'Grid Apex', logo: '/images/logos/grid-apex-official.png' },
      { name: 'Sanyog', logo: '/images/logos/sanyog-official.png' },
    ],
    icon: <AuthorityLogo id="msedcl" size={48} />,
  },
  {
    id: 'pwd',
    num: '05',
    category: 'statutory',
    acronym: 'PWD ELECTRICAL CEI',
    name: 'PWD Electrical Inspectorate',
    scope: 'Chief Electrical Inspector (CEI) drawing sanctions, earth-grid testing, and charging permissions.',
    code: 'CEA Measures Relating to Safety & Electric Supply',
    jurisdiction: 'Govt. of Maharashtra',
    sla: '7-14 Business Days',
    deliverables: ['CEI Drawing Sanction', 'Charging Permission', 'Earth Grid Audit'],
    divisions: [
      { name: 'Grid Apex', logo: '/images/logos/grid-apex-official.png' },
      { name: 'Sanyog', logo: '/images/logos/sanyog-official.png' },
    ],
    icon: <AuthorityLogo id="pwd" size={48} />,
  },
  {
    id: 'mpcb',
    num: '06',
    category: 'statutory',
    acronym: 'MPCB ENVIRONMENT',
    name: 'Pollution Control Board (MPCB)',
    scope: 'Zero-power thermal waste decomposition certification and industrial environmental consents.',
    code: 'Consent to Establish / Operate (CTE / CTO)',
    jurisdiction: 'State of Maharashtra',
    sla: 'Statutory Patent Verified',
    deliverables: ['CTE / CTO Consents', 'Zero-Energy Waste Tech', 'Emission Compliance'],
    divisions: [
      { name: 'Grid Apex', logo: '/images/logos/grid-apex-official.png' },
      { name: 'Agrim', logo: '/images/logos/agrim-dark.png' },
    ],
    icon: <AuthorityLogo id="mpcb" size={48} />,
  },
  {
    id: 'pmsuryaghar',
    num: '07',
    category: 'statutory',
    acronym: 'MNRE / MEDA PORTAL',
    name: 'PM Surya Ghar National Portal',
    scope: 'Central capital subsidy verification for residential and cooperative housing society solar plants.',
    code: 'MNRE / MEDA Rooftop Solar Verification (Up to ₹10.8L)',
    jurisdiction: 'Ministry of New & Renewable Energy',
    sla: 'Direct DBT Disbursal',
    deliverables: ['CHS ₹18,000/kW Subsidy', 'National Portal Dossier', 'DCR Module Audit'],
    divisions: [
      { name: 'Solis', logo: '/images/logos/solis-official.png' },
      { name: 'Agrim', logo: '/images/logos/agrim-dark.png' },
    ],
    icon: <AuthorityLogo id="pmsuryaghar" size={48} />,
  },
  {
    id: 'bee',
    num: '08',
    category: 'statutory',
    acronym: 'BEE / ECBC INDIA',
    name: 'Bureau of Energy Efficiency (BEE)',
    scope: 'Commercial building load profiling, power factor correction, and ECBC conservation compliance.',
    code: 'ECBC & PAT Scheme Statutory Compliance',
    jurisdiction: 'Ministry of Power, Govt. of India',
    sla: 'Star Rating Audit',
    deliverables: ['ECBC Envelope Audit', 'HVAC & Lighting Load', 'APFC Harmonics'],
    divisions: [
      { name: 'Tvasta', logo: '/images/logos/tvasta-dark.png' },
      { name: 'Grid Apex', logo: '/images/logos/grid-apex-official.png' },
    ],
    icon: <AuthorityLogo id="bee" size={48} />,
  },
  {
    id: 'mca',
    num: '09',
    category: 'statutory',
    acronym: 'MCA GOVT OF INDIA',
    name: 'Ministry of Corporate Affairs',
    scope: 'Registered engineering, utility liaisoning, and turnkey execution consortium headquarters.',
    code: 'CIN: U70200MH2023OPC411326',
    jurisdiction: 'Govt. of India (OPC Pvt. Ltd.)',
    sla: 'Active Statutory Entity',
    deliverables: ['Bankable DPR Filing', 'Turnkey Governance', 'Corporate Compliance'],
    divisions: [
      { name: 'Agrim', logo: '/images/logos/agrim-dark.png' },
      { name: 'eMudran', logo: '/images/logos/emudran-official.png' },
    ],
    icon: <AuthorityLogo id="mca" size={48} />,
  },
];

export default function GroundedAffiliations() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'discom' | 'statutory'>('all');

  const filteredAffiliations =
    activeFilter === 'all'
      ? AFFILIATIONS
      : AFFILIATIONS.filter((item) => item.category === activeFilter);

  const bentoCards: BentoCardData[] = filteredAffiliations.map((item) => ({
    id: item.id,
    title: item.name,
    subtitle: item.scope,
    badge: `${item.num} · ${item.jurisdiction}`,
    icon: item.icon,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
        {/* Deliverable Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {item.deliverables.map((deliv, dIdx) => (
            <span
              key={dIdx}
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.68rem',
                fontWeight: 600,
                color: '#333333',
                backgroundColor: '#F4F1EA',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '3px 9px',
                borderRadius: '6px',
              }}
            >
              {deliv}
            </span>
          ))}
        </div>

        {/* Coordinating JC Apex Division Transparent Logos Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: '12px',
            backgroundColor: 'rgba(244, 241, 234, 0.65)',
            border: '1px solid rgba(194, 159, 83, 0.22)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.64rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#777777',
            }}
          >
            Practice Desk
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {item.divisions.map((div, idx) => (
              <img
                key={idx}
                src={div.logo}
                alt={div.name}
                style={{
                  height: '20px',
                  width: 'auto',
                  maxWidth: '68px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <span style={{ color: '#8C733E', fontWeight: 600, fontSize: '0.73rem' }}>
          <TechText text={item.code} scrambleSpeed={20} maxScrambles={4} triggerOnHover={true} />
        </span>
        <span
          style={{
            color: '#111111',
            fontSize: '0.66rem',
            fontWeight: 700,
            backgroundColor: 'rgba(194, 159, 83, 0.16)',
            padding: '2px 8px',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
          }}
        >
          {item.sla}
        </span>
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
            marginBottom: '32px',
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

          {/* Interactive Jurisdiction Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F4F1EA',
              padding: '5px',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            {[
              { id: 'all', label: 'All 9 Jurisdictions' },
              { id: 'discom', label: 'Mumbai DISCOMs (04)' },
              { id: 'statutory', label: 'Statutory Bodies (05)' },
            ].map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as 'all' | 'discom' | 'statutory')}
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.74rem',
                    fontWeight: isSelected ? 650 : 500,
                    color: isSelected ? '#FFFFFF' : '#444444',
                    backgroundColor: isSelected ? '#111111' : 'transparent',
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Authority & Consortium Emblem Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '16px 24px',
            marginBottom: '32px',
            borderRadius: '20px',
            backgroundColor: '#F8F6F0',
            border: '1px solid rgba(194, 159, 83, 0.28)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8C733E',
              }}
            >
              Active Liaison Marks:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {AFFILIATIONS.map((item) => (
                <div
                  key={`strip-${item.id}`}
                  title={item.name}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px 4px 6px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                  }}
                >
                  <AuthorityLogo id={item.id} size={22} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.66rem',
                      fontWeight: 650,
                      color: '#222222',
                    }}
                  >
                    {item.acronym.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 9-Box MagicBento Grid with Cursor-Tracking Radial Gold Luminescence */}
        <MagicBento cards={bentoCards} />
      </div>
    </section>
  );
}
