"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DivisionLogo } from './DivisionLogos';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

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
      'Municipal and utility coordination across BEST, Adani Electricity (AEML), Tata Power (TPCL), and MSEDCL',
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
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeDivision = divisions[activeTab] || divisions[0];

  return (
    <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto' }}>
      {/* Container Grid: Left Switcher Rail + Right Expansive Monograph */}
      <div className="monograph-container-grid">
        {/* Left Navigation Rail */}
        <div className="monograph-rail">
          {divisions.map((div, idx) => {
            const isCurrent = idx === activeTab;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 18px',
                  borderRadius: '16px',
                  textAlign: 'left',
                  border: isCurrent
                    ? '1px solid rgba(0, 0, 0, 0.16)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  backgroundColor: isCurrent ? '#FFFFFF' : 'var(--color-grounded-stone)',
                  boxShadow: isCurrent ? '0 8px 24px rgba(0, 0, 0, 0.06)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
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
                      top: '18%',
                      bottom: '18%',
                      width: '3.5px',
                      borderRadius: '0 4px 4px 0',
                      backgroundColor: '#111111',
                    }}
                  />
                )}

                {/* Division Logo */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isCurrent ? 'var(--color-grounded-stone)' : '#FFFFFF',
                    flexShrink: 0,
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <DivisionLogo division={div.id} size={24} />
                </div>

                {/* Title & Tag */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: isCurrent ? '#111111' : '#444444',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {div.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span
                      className="rounded-full animate-pulse bg-emerald-500"
                      style={{ width: '6px', height: '6px', display: 'inline-block' }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        color: isCurrent ? '#C29F53' : '#888888',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {div.shortTag}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={15}
                  color={isCurrent ? '#111111' : '#AAAAAA'}
                  style={{
                    transform: isCurrent ? 'translateX(2px)' : 'translateX(0)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Right Expansive Monograph Viewport in Warm Architectural Paper */}
        <div
          style={{
            borderRadius: '22px',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.04)',
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
              backgroundColor: '#FAF8F5',
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
                filter: 'brightness(0.95) contrast(1.02)',
                transition: 'transform 0.5s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(17, 17, 17, 0.85) 0%, rgba(17, 17, 17, 0.2) 55%, transparent 100%)',
              }}
            />

            {/* Floating Category Pill */}
            <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                <Sparkles size={12} color="#C29F53" />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <DivisionLogo division={activeDivision.id} size={34} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontSize: '2.1rem',
                      fontWeight: 400,
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
                      fontSize: '0.8rem',
                      color: '#E8E4DA',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      fontFamily: 'var(--font-mono, monospace)',
                    }}
                  >
                    Strategic Practice Discipline of JC Apex
                  </p>
                </div>
              </div>

              <Link
                href={`/${activeDivision.id}`}
                className="button is-icon"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.82rem',
                  backgroundColor: '#FFFFFF',
                  color: '#111111',
                  borderRadius: '9999px',
                }}
              >
                <span>View Full Division</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Body Content in Warm Architectural Format */}
          <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {/* Editorial Lead Paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#333333',
                margin: 0,
              }}
            >
              {activeDivision.leadParagraph}
            </p>

            {/* Metrics Row in Stone Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
              }}
              className="monograph-metrics-row"
            >
              {activeDivision.metrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--color-grounded-stone)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      color: '#777777',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontSize: '1.6rem',
                      fontWeight: 400,
                      color: '#111111',
                      marginTop: '4px',
                      lineHeight: 1.1,
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Capability Pillars */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  color: '#888888',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '14px',
                }}
              >
                [core engineering pillars &amp; deliverables]
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
                className="monograph-pillars-grid"
              >
                {activeDivision.pillars.map((pillar, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      color: '#444444',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      color="#C29F53"
                      style={{ flexShrink: 0, marginTop: '3px' }}
                    />
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
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#C29F53" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.74rem',
                    color: '#777777',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Regulatory &amp; Associate Network:
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeDivision.associates?.map((assoc, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.74rem',
                      color: '#444444',
                      backgroundColor: 'var(--color-grounded-stone)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
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
