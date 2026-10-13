"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DivisionLogo } from './DivisionLogos';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sun, Award, Building, Sparkles } from 'lucide-react';

interface DivisionData {
  id: string;
  name: string;
  shortTag: string;
  category: string;
  leadParagraph: string;
  image: string;
  imageAlt: string;
  href: string;
  pillars: string[];
  metrics: { label: string; value: string }[];
  associates: string[];
}

const divisions: DivisionData[] = [
  {
    id: 'solis',
    name: 'SOLIS Clean Energy',
    shortTag: 'Solar & Mobility',
    category: 'Solar EPC, Elevated Pergolas & EV Hubs',
    leadParagraph: 'Solis transforms residential and commercial terraces into high-yield clean energy generators. Our elevated pergola structures preserve 100% of usable floor area for society residents while harvesting peak Mumbai sunlight.',
    image: '/images/solar-pergola-rooftop.jpg',
    imageAlt: 'Walkable Pergola Solar Rooftop Installation',
    href: '/solis',
    pillars: [
      'Elevated walk-under pergola canopies lifting panels 8 to 10 feet overhead',
      'Architectural semi-transparent BIPV solar glass with 30% natural light transmittance',
      'Direct liaisoning for PM Surya Ghar Muft Bijli Yojana subsidies up to Rs 10.8 Lakhs',
      'Integrated AC and DC electric vehicle charging hubs linked to solar distribution boards',
    ],
    metrics: [
      { label: 'Terrace Usability', value: '100% Open' },
      { label: 'Wind Load Rating', value: '150 km/h' },
      { label: 'Max Subsidy Support', value: 'Rs 10.8L' },
    ],
    associates: ['PM Surya Ghar', 'MNRE Standards', 'Tier-1 TopCon Modules', 'Discom Net Metering'],
  },
  {
    id: 'sanyog',
    name: 'SANYOG Utility Liaison',
    shortTag: 'Power Liaisoning',
    category: 'Government Power Liaisoning & CGRF Grievance Redressal',
    leadParagraph: 'Backed by 36 years of direct utility engineering experience, Sanyog resolves high-friction power supply hurdles, tariff disputes, and regulatory permissions across Mumbai utilities.',
    image: '/images/sanyog_utility_infra.jpg',
    imageAlt: 'Mumbai High Voltage Utility Power Infrastructure',
    href: '/sanyog',
    pillars: [
      'Representation before Consumer Grievance Redressal Forums (CGRF) and Electricity Ombudsman',
      'Sanctioned load enhancements, HT/LT substation approvals, and single to three-phase conversions',
      'Government PWD electrical contractor license renewals and compliance filings',
      'Municipal and utility coordination across BEST, Adani Electricity, Tata Power, and MSEDCL',
    ],
    metrics: [
      { label: 'Utility Experience', value: '36+ Years' },
      { label: 'Utility Coverage', value: 'All 4 Discoms' },
      { label: 'Regulatory Track', value: 'CGRF & PWD' },
    ],
    associates: ['BEST Undertaking', 'Adani Electricity (AEML)', 'Tata Power (TPCL)', 'MSEDCL', 'PWD Maharashtra'],
  },
  {
    id: 'grid-apex',
    name: 'GRID APEX Engineering',
    shortTag: 'HT/LT Infrastructure',
    category: 'HT/LT Electrical Engineering & Patented Waste Tech',
    leadParagraph: 'Grid Apex delivers heavy industrial and commercial power distribution setups alongside patented solid waste disposal technology certified by state environmental boards.',
    image: '/images/electrical-substation.jpg',
    imageAlt: 'High Tension Electrical Substation and Switchgear',
    href: '/grid-apex',
    pillars: [
      'Turnkey high-tension substation installations, transformer testing, and HT panel wiring',
      'LT distribution switchboards, busbar trunking systems, and industrial earthing grids',
      'Patented zero-energy solid waste disposal machine operating with zero external power consumption',
      'Full compliance coordination with Maharashtra Pollution Control Board (MPCB) regulations',
    ],
    metrics: [
      { label: 'Voltage Coverage', value: '11kV / 22kV / 33kV' },
      { label: 'Waste Tech Patent', value: 'Central Govt' },
      { label: 'State Certification', value: 'MPCB Approved' },
    ],
    associates: ['MPCB Certified', 'Central Govt Patent', 'Vetted EPC Contractors', 'Heavy Electrical Partners'],
  },
  {
    id: 'tvasta',
    name: 'TVASTA Architecture',
    shortTag: 'Space Planning',
    category: 'Turnkey Space Planning, Civil Fit-outs & Interior Design',
    leadParagraph: 'Tvasta brings engineered aesthetics to residential and commercial environments. Delivered across three transparent tiers, our architects combine structural discipline with tailored material selection.',
    image: '/images/architectural-interior.jpg',
    imageAlt: 'Contemporary Turnkey Architectural Interior',
    href: '/tvasta',
    pillars: [
      'Comprehensive turnkey civil, electrical, plumbing, and carpentry execution under one desk',
      'Three clearly defined tiers: Standard (durable essentials), Premium (curated modular finishes), Luxury (bespoke architectural craftsmanship)',
      'Detailed CAD space planning, MEP layout drafting, and material specification schedules',
      'Zero contractor abandonment: rigorous timeline milestones with dedicated site supervision',
    ],
    metrics: [
      { label: 'Execution Tiers', value: '3 Defined Tiers' },
      { label: 'Project Scope', value: 'Civil to MEP' },
      { label: 'Design Quality', value: 'Turnkey Delivery' },
    ],
    associates: ['Registered Architects', 'Interior Designers', 'Turnkey Fit-out Teams', 'MEP Specialists'],
  },
  {
    id: 'emudran',
    name: 'eMUDRAN Visual Media',
    shortTag: 'Branding & Print',
    category: 'Corporate Branding, Packaging & Complete Print Production',
    leadParagraph: 'Under the creative direction of industry veteran Manish Ajgaonkar and production head Hemangi Patil (22+ years experience), eMudran bridges elite brand concepts with high-volume industrial press runs.',
    image: '/images/luxury-print-packaging.jpg',
    imageAlt: 'Premium Packaging and Corporate Print Production',
    href: '/emudran',
    pillars: [
      'Brand identity development, packaging box engineering, and FMCG carton structural design',
      'High-speed offset and digital printing for corporate catalogues, annual reports, and brochures',
      'Architectural signage, acrylic signboards, LED letter fabrication, and retail visual displays',
      'Direct press pass quality control ensuring precise CMYK ink fidelity on every production run',
    ],
    metrics: [
      { label: 'Production Mastery', value: '22+ Years' },
      { label: 'Press Infrastructure', value: 'Offset & Digital' },
      { label: 'Packaging Scope', value: 'Cartons to Signage' },
    ],
    associates: ['Manish Ajgaonkar (Creative)', 'Hemangi Patil (Production)', 'Industrial Print Facility', 'Signage Fabrication'],
  },
  {
    id: 'agrim',
    name: 'AGRIM Finance Prep',
    shortTag: 'Project Loan Files',
    category: 'Administrative Project Loan & Bank Dossier Preparation',
    leadParagraph: 'Agrim compiles airtight financial and technical documentation required by institutional lenders. We operate strictly as an administrative file preparation desk to accelerate bank committee reviews.',
    image: '/images/project-finance-binder.jpg',
    imageAlt: 'Institutional Banking Sanction Dossier Documentation',
    href: '/agrim',
    pillars: [
      'Comprehensive project feasibility compilation, CMA data structuring, and revenue projections',
      'Statutory engineering asset valuations and machinery paperwork organization',
      'Bank committee presentation files formatted to specific nationalized and private bank guidelines',
      'Strict legal boundary: operates purely as a consulting prep desk, not as a lender, NBFC, or bank',
    ],
    metrics: [
      { label: 'Preparation Standard', value: 'Bank Committee Ready' },
      { label: 'Documentation', value: 'Full CMA & Tech' },
      { label: 'Role Clarity', value: 'Consultancy Prep' },
    ],
    associates: ['Technical Valuers', 'Chartered Engineers', 'Dossier Specialists', 'Institutional Formats'],
  },
];

export default function InteractiveTabbedMonograph() {
  const [activeId, setActiveId] = useState<string>('solis');
  const activeDivision = divisions.find((d) => d.id === activeId) || divisions[0];

  return (
    <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto' }}>
      {/* Container Grid: Left Switcher Rail + Right Expansive Monograph */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '24px',
          alignItems: 'stretch',
        }}
        className="monograph-container-grid"
      >
        {/* Left Navigation Rail */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          className="monograph-rail"
        >
          {divisions.map((div) => {
            const isCurrent = div.id === activeId;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setActiveId(div.id)}
                className="ios-glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  borderRadius: '18px',
                  textAlign: 'left',
                  border: isCurrent
                    ? '1px solid rgba(194, 159, 83, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  background: isCurrent
                    ? 'rgba(194, 159, 83, 0.12)'
                    : 'rgba(17, 21, 26, 0.6)',
                  boxShadow: isCurrent
                    ? '0 8px 24px rgba(194, 159, 83, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s var(--ease-out-expo)',
                  position: 'relative',
                  width: '100%',
                }}
              >
                {/* Active Indicator Bar */}
                {isCurrent && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: '4px',
                      borderRadius: '0 4px 4px 0',
                      background: 'var(--color-accent)',
                      boxShadow: '0 0 10px var(--color-accent)',
                    }}
                  />
                )}

                {/* Division Logo */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                    flexShrink: 0,
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <DivisionLogo division={div.id} size={28} />
                </div>

                {/* Title & Tag */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      color: isCurrent ? '#FFFFFF' : 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-heading)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {div.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="rounded-full animate-pulse bg-emerald-400" style={{ width: '6px', height: '6px', display: 'inline-block' }} />
                    <span
                      style={{
                        fontSize: '0.74rem',
                        color: isCurrent ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {div.shortTag}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={16}
                  color={isCurrent ? 'var(--color-accent)' : 'var(--color-text-muted)'}
                  style={{
                    opacity: isCurrent ? 1 : 0.4,
                    transform: isCurrent ? 'translateX(2px)' : 'translateX(0)',
                    transition: 'all 0.2s ease',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Right Expansive Monograph Viewport */}
        <div
          className="ios-glass"
          style={{
            borderRadius: '26px',
            overflow: 'hidden',
            background: 'rgba(17, 21, 26, 0.75)',
            border: '1px solid rgba(194, 159, 83, 0.3)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Visual Showcase Banner */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '300px',
              overflow: 'hidden',
              background: '#0A0D10',
            }}
          >
            <img
              src={activeDivision.image}
              alt={activeDivision.imageAlt}
              className="object-cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.9) contrast(1.05)',
                transition: 'transform 0.5s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(17, 21, 26, 0.95) 0%, rgba(17, 21, 26, 0.3) 60%, transparent 100%)',
              }}
            />

            {/* Floating Category Pill */}
            <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  background: 'rgba(10, 13, 16, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(194, 159, 83, 0.35)',
                }}
              >
                <Sparkles size={12} color="var(--color-accent)" />
                {activeDivision.category}
              </span>
            </div>

            {/* Bottom Title Lockup */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                right: 24,
                zIndex: 2,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(10, 13, 16, 0.9)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(194, 159, 83, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <DivisionLogo division={activeDivision.id} size={38} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    {activeDivision.name}
                  </h3>
                  <p
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '0.84rem',
                      color: 'var(--color-accent)',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                    }}
                  >
                    A Strategic Division of JC Apex Ventures
                  </p>
                </div>
              </div>

              <Link
                href={`/${activeDivision.id}`}
                className="btn-primary specular-sheen"
                style={{
                  padding: '9px 22px',
                  fontSize: '0.86rem',
                  borderRadius: '100px',
                }}
              >
                <span>View Full Portfolio <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>

          {/* Body Content */}
          <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Editorial Lead Paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.12rem',
                lineHeight: 1.7,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {activeDivision.leadParagraph}
            </p>

            {/* Metrics Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              className="monograph-metrics-row"
            >
              {activeDivision.metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                    {m.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Capability Pillars */}
            <div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '14px',
                }}
              >
                Core Pillars & Capabilities
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="monograph-pillars-grid">
                {activeDivision.pillars.map((pillar, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Associate & Certification Trust Strip */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--color-accent)" />
                <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Associate & Standard Network:
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeDivision.associates.map((assoc, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {assoc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 960px) {
          .monograph-container-grid {
            grid-template-columns: 1fr !important;
          }
          .monograph-rail {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .monograph-rail {
            grid-template-columns: 1fr !important;
          }
          .monograph-pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .monograph-metrics-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
