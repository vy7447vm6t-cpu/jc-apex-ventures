"use client";

import React, { useState, useRef } from 'react';
import AuthorityLogo from './AuthorityLogos';
import { TechText, FluxLines, MicroSlats } from '@/components/react-bits';

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
    code: 'MNRE / MEDA Rooftop Solar Verification (Up to ₹18k/kW, ₹90L cap)',
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

/**
 * GPU-accelerated CSS 3D Holographic Foil Card.
 * Uses perspective(1000px) and rotateX/rotateY with direct DOM property mutation,
 * dynamic iridescent gold foil gradient, and specular micro-borders.
 * Offloads 9 WebGL contexts, eliminating Safari and mobile multi-context limits.
 */
function FoilAffiliationCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);

    // Tilt bounded within +/- 7 degrees for poised architectural elegance
    const tiltX = (0.5 - y) * 14;
    const tiltY = (x - 0.5) * 14;

    el.style.setProperty('--card-tilt-x', `${tiltX.toFixed(2)}deg`);
    el.style.setProperty('--card-tilt-y', `${tiltY.toFixed(2)}deg`);
    el.style.setProperty('--foil-x', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--foil-y', `${(y * 100).toFixed(1)}%`);
    el.style.setProperty('--glare-opacity', '1');
    el.style.setProperty(
      '--foil-angle',
      `${(Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90).toFixed(1)}deg`
    );
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--card-tilt-x', '0deg');
    el.style.setProperty('--card-tilt-y', '0deg');
    el.style.setProperty('--glare-opacity', '0');
    el.style.setProperty('--foil-x', '50%');
    el.style.setProperty('--foil-y', '50%');
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className="w-full flex justify-center"
      style={{
        perspective: '1000px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '20px',
          transform:
            'rotateX(var(--card-tilt-x, 0deg)) rotateY(var(--card-tilt-y, 0deg)) translateZ(0)',
          transformStyle: 'preserve-3d',
          transition:
            'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.3s ease',
          boxShadow:
            '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 12px 32px -4px rgba(194, 159, 83, 0.08)',
          willChange: 'transform',
        }}
      >
        {/* Dynamic Iridescent Gold Foil Sheen Layer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            pointerEvents: 'none',
            borderRadius: '20px',
            opacity: 'var(--glare-opacity, 0)',
            transition: 'opacity 0.28s ease',
            background:
              'radial-gradient(circle 380px at var(--foil-x, 50%) var(--foil-y, 50%), rgba(255, 236, 179, 0.4) 0%, rgba(212, 175, 55, 0.22) 35%, rgba(140, 115, 62, 0.08) 65%, transparent 85%), linear-gradient(var(--foil-angle, 135deg), rgba(255, 215, 0, 0.08) 0%, rgba(220, 180, 70, 0.16) 25%, rgba(255, 240, 190, 0.28) 50%, rgba(180, 140, 50, 0.12) 75%, rgba(212, 175, 55, 0.08) 100%)',
            mixBlendMode: 'color-dodge',
          }}
        />

        {/* Specular Micro-Borders Highlight */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
            borderRadius: '20px',
            padding: '1px',
            background:
              'radial-gradient(360px circle at var(--foil-x, 50%) var(--foil-y, 50%), rgba(212, 175, 55, 0.85), rgba(194, 159, 83, 0.3) 40%, rgba(194, 159, 83, 0.12) 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {children}
      </div>
    </div>
  );
}

export default function GroundedAffiliations() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'discom' | 'statutory'>('all');

  const filteredAffiliations =
    activeFilter === 'all'
      ? AFFILIATIONS
      : AFFILIATIONS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="affiliations"
      className="section_logo6 relative overflow-hidden"
      style={{
        backgroundColor: '#F8F6F0',
        color: '#111111',
        padding: 'clamp(96px, 12vh, 136px) 24px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
        scrollMarginTop: '104px',
        position: 'relative',
      }}
    >
      {/* Background WebGL FluxLines Canvas Layer */}
      <div
        className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
        style={{ opacity: 0.65 }}
        aria-hidden="true"
      >
        <FluxLines
          colors={['#ffffff', '#ffffff', '#ffffff']}
          glow={2}
          rimWidth={0.2}
          lineWidth={1}
          flowDirection="down"
          mouseInteraction
          clickSwirl
        />
        {/* Soft radial scrim to ensure text and cards maintain clarity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 90% 80% at 50% 20%, rgba(248, 246, 240, 0.75) 0%, rgba(244, 241, 234, 0.85) 60%, rgba(244, 241, 234, 0.96) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Subtle Architectural Louvers */}
      <MicroSlats count={20} color="#8C733E" opacity={0.06} zIndex={1} showTicks={true} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
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
              backgroundColor: '#FFFFFF',
              padding: '5px',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
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
            marginBottom: '36px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(194, 159, 83, 0.28)',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
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

        {/* 9-Box Interactive CSS 3D Holographic Foil Card Grid with Prismatic Tilt & Foil Glints */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredAffiliations.map((item) => {
            return (
              <FoilAffiliationCard key={item.id}>
                <div
                  style={{
                    padding: '24px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '18px',
                    border: '1px solid rgba(194, 159, 83, 0.32)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
                  }}
                >
                    {/* Top Section */}
                    <div>
                      {/* Jurisdiction Pill + Authority Emblem */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '16px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            color: '#8C733E',
                            backgroundColor: '#F4F1EA',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(194, 159, 83, 0.25)',
                          }}
                        >
                          {item.num} · {item.jurisdiction}
                        </span>
                        <div
                          style={{
                            padding: '4px',
                            borderRadius: '9999px',
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(0,0,0,0.05)',
                          }}
                        >
                          <AuthorityLogo id={item.id} size={30} />
                        </div>
                      </div>

                      {/* Acronym & Title */}
                      <div style={{ marginBottom: '10px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.64rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#8C733E',
                            display: 'block',
                            marginBottom: '4px',
                          }}
                        >
                          {item.acronym}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                            fontSize: '1.45rem',
                            lineHeight: 1.15,
                            fontWeight: 400,
                            color: '#111111',
                            margin: 0,
                          }}
                        >
                          {item.name}
                        </h3>
                      </div>

                      {/* Scope text */}
                      <p
                        style={{
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.84rem',
                          lineHeight: 1.55,
                          color: '#555555',
                          margin: '0 0 14px 0',
                          fontWeight: 380,
                        }}
                      >
                        {item.scope}
                      </p>

                      {/* Deliverable Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {item.deliverables.map((deliv, dIdx) => (
                          <span
                            key={dIdx}
                            style={{
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              fontSize: '0.66rem',
                              fontWeight: 600,
                              color: '#333333',
                              backgroundColor: '#F4F1EA',
                              border: '1px solid rgba(0, 0, 0, 0.08)',
                              padding: '2px 8px',
                              borderRadius: '6px',
                            }}
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div
                      style={{
                        paddingTop: '14px',
                        marginTop: '16px',
                        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      {/* Practice Desk Coordination */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#888888',
                          }}
                        >
                          Practice Desk
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {item.divisions.map((div, dIdx) => (
                            <img
                              key={dIdx}
                              src={div.logo}
                              alt={div.name}
                              style={{
                                height: '17px',
                                width: 'auto',
                                maxWidth: '54px',
                                objectFit: 'contain',
                                display: 'block',
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Regulatory Code & SLA Pill */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          paddingTop: '2px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: '#8C733E',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <TechText text={item.code} scrambleSpeed={20} maxScrambles={4} triggerOnHover={true} />
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.64rem',
                            fontWeight: 700,
                            color: '#111111',
                            backgroundColor: 'rgba(194, 159, 83, 0.18)',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.sla}
                        </span>
                      </div>
                    </div>
                  </div>
                </FoilAffiliationCard>
              );
            })}
        </div>
      </div>
    </section>
  );
}
