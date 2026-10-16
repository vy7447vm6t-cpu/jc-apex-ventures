"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { TechText, SpecularButton, ElectricBorder, MicroSlats } from '@/components/react-bits';

interface PracticeDiscipline {
  id: string;
  num: string;
  name: string;
  discipline: string;
  href: string;
  image: string;
  scope: string;
  statutoryMetric: string;
  leadAssociate: string;
  badge: string;
  logoLight: string;
  logoDark: string;
  isElectric?: boolean;
}

const DISCIPLINES: PracticeDiscipline[] = [
  {
    id: 'solis',
    num: '(01)',
    name: 'SOLIS',
    discipline: 'Clean Energy & Rooftop Infrastructure',
    href: '/solis',
    image: '/images/solis_pergola_solar.jpg',
    scope:
      'Elevated walkable solar pergolas, BIPV architectural glass, integrated EV charging hubs, and PM Surya Ghar central capital subsidy liaisoning.',
    statutoryMetric: '10.5 ft clearance · 150 km/h wind certified · Up to ₹10.8L society subsidy',
    leadAssociate: 'Jitendra Chavan (Director) & Solis EPC Engineering Network',
    badge: 'MNRE / DISCOM NET-METERING',
    logoLight: '/images/logos/solis-official.png',
    logoDark: '/images/logos/solis-logo-white.png',
    isElectric: true,
  },
  {
    id: 'sanyog',
    num: '(02)',
    name: 'SANYOG',
    discipline: 'Utility Liaisoning & Consumer Grievances',
    href: '/sanyog',
    image: '/images/sanyog_utility_infra.jpg',
    scope:
      'Power billing dispute resolution, commercial-to-residential tariff re-categorization, sanctioned load enhancements, and statutory representation before CGRF and the Electricity Ombudsman.',
    statutoryMetric: 'Electricity Act 2003 · BEST, Adani Electricity, Tata Power, MSEDCL jurisdiction',
    leadAssociate: 'Jitendra Chavan (36+ Years Direct Utility Engineering Practice)',
    badge: 'MERC REGULATORY PRACTICE',
    logoLight: '/images/logos/sanyog-official.png',
    logoDark: '/images/logos/sanyog-official.png',
    isElectric: true,
  },
  {
    id: 'grid-apex',
    num: '(03)',
    name: 'GRID APEX',
    discipline: 'Industrial Electrical & Waste Systems',
    href: '/grid-apex',
    image: '/images/grid_apex_transformer.jpg',
    scope:
      'Turnkey 33kV/11kV substations, VCB switchgear bays, busbar trunking, PWD Electrical Inspectorate approvals, and MPCB-certified patented zero-power thermal waste decomposition.',
    statutoryMetric: 'Central Government Patented · PWD Licensed Class-A execution',
    leadAssociate: 'Jitendra Chavan & Dr. Manoj Chavan (Patented Waste Decomposition Tech)',
    badge: 'PWD CLASS-A / MPCB CERTIFIED',
    logoLight: '/images/logos/grid-apex-official.png',
    logoDark: '/images/logos/grid-apex-white.png',
    isElectric: true,
  },
  {
    id: 'tvasta',
    num: '(04)',
    name: 'TVASTA',
    discipline: 'Turnkey Spatial Planning & Fit-Out',
    href: '/tvasta',
    image: '/images/tvasta_luxury_interior.jpg',
    scope:
      'Commercial office interiors, acoustic isolation zoning (STC 48), concealed low-voltage MEP distribution, and 3-tier architectural material execution.',
    statutoryMetric: 'CAD space planning · Zero contractor abandonment guarantee',
    leadAssociate: 'Tvasta Architectural & MEP Execution Consortium',
    badge: 'STC 48 ACOUSTIC EPC',
    logoLight: '/images/logos/tvasta-dark.png',
    logoDark: '/images/logos/tvasta-official.png',
    isElectric: false,
  },
  {
    id: 'emudran',
    num: '(05)',
    name: 'eMUDRAN',
    discipline: 'Visual Media & Production Engineering',
    href: '/emudran',
    image: '/images/luxury-print-packaging.jpg',
    scope:
      'Custom rigid packaging boxes, thermal foil stamping, corporate annual reports, architectural environmental signage, and automated press-pass color calibration.',
    statutoryMetric: '22+ years production supervision · High-precision offset & digital',
    leadAssociate: 'Manish Ajgaonkar (Creative Director) & Hemangi Patil (22+ Yrs Print Production)',
    badge: 'PRECISION PRODUCTION',
    logoLight: '/images/logos/emudran-official.png',
    logoDark: '/images/logos/emudran-white.png',
    isElectric: false,
  },
  {
    id: 'agrim',
    num: '(06)',
    name: 'AGRIM',
    discipline: 'Infrastructure Advisory & Financial Feasibility',
    href: '/agrim',
    image: '/images/banking-sanction-dossier.jpg',
    scope:
      'Detailed Project Report (DPR) preparation, 10-year CAPEX/NPV cashflow modeling, and bank submission documentation for industrial and EV charging networks.',
    statutoryMetric: 'Pure advisory & technical preparation (explicitly non-lender / non-NBFC)',
    leadAssociate: 'Agrim Financial Modeling & DPR Desk (Non-NBFC Advisory)',
    badge: 'BANKABLE DPR ADVISORY',
    logoLight: '/images/logos/agrim-dark.png',
    logoDark: '/images/logos/agrim-official.png',
    isElectric: false,
  },
];

export default function GroundedServices() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);
  const activeDiscipline = DISCIPLINES[activeIndex];

  return (
    <section
      id="divisions"
      className="services-section relative overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#111111',
        padding: 'clamp(100px, 13vh, 140px) 24px',
        position: 'relative',
        zIndex: 5,
        scrollMarginTop: '104px',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Architectural MicroSlats CAD Louvers with Datum Ticks */}
      <MicroSlats count={24} color="#8C733E" opacity={0.06} zIndex={1} showTicks={true} />
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '24px', textAlign: 'left' }}>
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
            [<TechText text="03 / PRACTICE DISCIPLINES" scrambleSpeed={26} maxScrambles={5} triggerOnHover={true} />]
          </span>
        </div>

        {/* Section Heading & Lead-in */}
        <div style={{ maxWidth: '1080px', marginBottom: '64px', textAlign: 'left' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
              lineHeight: 1.14,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: '#111111',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Structured engineering across statutory, renewable, and spatial infrastructure.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.02rem, 1.35vw, 1.18rem)',
              color: '#555555',
              lineHeight: 1.68,
              maxWidth: '860px',
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 350,
            }}
          >
            We coordinate technical filing, utility sanctioning, and physical execution through six dedicated consortium divisions. Each operating unit addresses a discrete regulatory or spatial bottleneck in the Mumbai Metropolitan Region.
          </p>
        </div>

        {/* Desktop View: Grounded 2-Column Split (List Left, Sticky Viewport Right) */}
        <div className="hidden md:grid services-grid" style={{ alignItems: 'start', gap: '48px' }}>
          {/* Left Column: Interactive Discipline List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {DISCIPLINES.map((item, idx) => {
              const isActive = activeIndex === idx;
              const showElectricRow = Boolean(item.isElectric && (isActive || item.id === 'grid-apex'));
              return (
                <ElectricBorder
                  key={item.id}
                  active={showElectricRow}
                  borderRadius={16}
                  glowColor={item.id === 'grid-apex' ? '#D4AF37' : '#C29F53'}
                  innerBg={isActive ? '#F4F1EA' : '#FFFFFF'}
                  style={{
                    transform: isActive ? 'translateX(4px)' : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                    opacity: isActive ? 1 : 0.65,
                  }}
                >
                  <div
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="services-item-card"
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      padding: '22px 26px',
                      borderRadius: '14px',
                    }}
                  >
                    {/* Header Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px 14px',
                        marginBottom: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.82rem',
                            fontWeight: 650,
                            color: isActive ? '#8C733E' : '#888888',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {item.num}
                        </span>
                        {/* Prominent Official Brand Logo */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '38px',
                            padding: '2px 0',
                          }}
                        >
                          <img
                            src={item.logoLight}
                            alt={item.name}
                            style={{
                              maxHeight: '36px',
                              maxWidth: item.id === 'tvasta' ? '150px' : item.id === 'emudran' ? '135px' : item.id === 'grid-apex' ? '140px' : '120px',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain',
                              filter: isActive ? 'none' : 'grayscale(15%) opacity(0.85)',
                              transition: 'all 0.3s ease',
                            }}
                          />
                          <span className="sr-only">{item.name}</span>
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: isActive ? '#8C733E' : '#888888',
                          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                          padding: isActive ? '3px 8px' : '0',
                          borderRadius: '6px',
                          border: isActive ? '1px solid rgba(194, 159, 83, 0.25)' : 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Discipline Subtitle */}
                    <div
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.92rem',
                        color: isActive ? '#222222' : '#666666',
                        fontWeight: 500,
                        marginBottom: isActive ? '12px' : '0',
                      }}
                    >
                      {item.discipline}
                    </div>

                    {/* Expanded Scope on Active */}
                    {isActive && (
                      <div style={{ marginTop: '10px' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.88rem',
                            lineHeight: 1.6,
                            color: '#555555',
                            margin: '0 0 12px 0',
                            fontWeight: 380,
                          }}
                        >
                          {item.scope}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              fontSize: '0.76rem',
                              color: '#8C733E',
                              fontWeight: 600,
                              backgroundColor: '#FFFFFF',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              display: 'inline-block',
                              border: '1px solid rgba(194, 159, 83, 0.25)',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {item.statutoryMetric}
                          </div>
                          <span
                            style={{
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              fontSize: '0.74rem',
                              color: '#666666',
                              fontWeight: 450,
                            }}
                          >
                            Lead Practice: {item.leadAssociate}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </ElectricBorder>
              );
            })}
          </div>

          {/* Right Column: Sticky Field Photography Viewport wrapped in ElectricBorder for Electrical Divisions */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <ElectricBorder
              active={Boolean(activeDiscipline.isElectric)}
              borderRadius={22}
              glowColor="#C29F53"
              innerBg="#111111"
            >
              <div
                style={{
                  position: 'relative',
                  height: '560px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#111111',
                  boxShadow: '0 20px 48px -8px rgba(0, 0, 0, 0.12)',
                }}
              >
                {/* Crossfading Background Field Photography */}
                {DISCIPLINES.map((item, idx) => (
                  <img
                    key={`desk-img-${item.id}`}
                    src={item.image}
                    alt={`${item.name} Field Operation`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: activeIndex === idx ? 1 : 0,
                      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: 'brightness(0.9) contrast(1.05)',
                    }}
                  />
                ))}

                {/* Gradient Mask for High Contrast */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.2) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Top-Right Electric Status Badge when active division is electrical */}
                {activeDiscipline.isElectric && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      zIndex: 10,
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(17, 17, 17, 0.78)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(194, 159, 83, 0.5)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '9999px',
                        backgroundColor: '#C29F53',
                        boxShadow: '0 0 8px #C29F53',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.66rem',
                        fontWeight: 650,
                        letterSpacing: '0.06em',
                        color: '#F4F1EA',
                        textTransform: 'uppercase',
                      }}
                    >
                      HT/LT Grid & Statutory Division
                    </span>
                  </div>
                )}

                {/* KokonutUI Apple Liquid Glass Floating Spec Capsule */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(28px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.75)',
                    borderRadius: '16px',
                    padding: '14px 18px',
                    boxShadow:
                      '0 14px 36px -6px rgba(0, 0, 0, 0.18), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    zIndex: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          height: '42px',
                          padding: '3px 8px',
                          borderRadius: '10px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        }}
                      >
                        <img
                          src={activeDiscipline.logoLight}
                          alt={`${activeDiscipline.name} Official Logo`}
                          style={{
                            maxHeight: '30px',
                            maxWidth: activeDiscipline.id === 'tvasta' ? '110px' : activeDiscipline.id === 'emudran' ? '100px' : '85px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                            fontSize: '1.3rem',
                            fontWeight: 400,
                            margin: 0,
                            color: '#111111',
                            lineHeight: 1.1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {activeDiscipline.name}
                        </h4>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.72rem',
                            color: '#666666',
                            fontWeight: 500,
                            display: 'block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {activeDiscipline.discipline}
                        </span>
                      </div>
                    </div>

                    <SpecularButton
                      href={activeDiscipline.href}
                      variant="dark"
                      className="!py-2 !px-3.5 !text-[0.72rem] !normal-case flex-shrink-0"
                      icon={<ArrowUpRight size={13} />}
                    >
                      Dossier
                    </SpecularButton>
                  </div>

                  {/* Decrypting TechText Statutory Metric */}
                  <div
                    style={{
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                      paddingTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#8C733E',
                      }}
                    >
                      Metric:
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.78rem',
                        color: '#333333',
                        fontWeight: 500,
                      }}
                    >
                      <TechText
                        key={activeDiscipline.statutoryMetric}
                        text={activeDiscipline.statutoryMetric}
                        scrambleSpeed={20}
                        maxScrambles={5}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </div>
        </div>

        {/* Mobile View: Fluid AccordionGallery (Tapping expands photo, specs, and link inline) */}
        <div className="flex flex-col md:hidden gap-4" style={{ textAlign: 'left' }}>
          {DISCIPLINES.map((item, idx) => {
            const isExpanded = mobileExpanded === idx;
            return (
              <div
                key={`mob-${item.id}`}
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#F8F6F0',
                  border: isExpanded ? '1px solid rgba(194, 159, 83, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isExpanded ? '0 8px 24px rgba(0, 0, 0, 0.06)' : 'none',
                }}
              >
                {/* Accordion Header Row */}
                <button
                  type="button"
                  onClick={() => setMobileExpanded(isExpanded ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  aria-expanded={isExpanded}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        minWidth: '56px',
                        height: '36px',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                      }}
                    >
                      <img
                        src={item.logoLight}
                        alt={`${item.name} Official Brand Mark`}
                        style={{
                          maxHeight: '26px',
                          maxWidth: '70px',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.72rem',
                            fontWeight: 650,
                            color: '#8C733E',
                          }}
                        >
                          {item.num}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                            fontSize: '1.35rem',
                            fontWeight: 400,
                            margin: 0,
                            color: '#111111',
                          }}
                        >
                          {item.name}
                        </h3>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.74rem',
                          color: '#666666',
                          fontWeight: 450,
                          display: 'block',
                        }}
                      >
                        {item.discipline}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    color="#444444"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {/* Accordion Body */}
                {isExpanded && (
                  <div style={{ padding: '0 20px 20px 20px' }}>
                    {/* Inline Photo */}
                    <div
                      style={{
                        position: 'relative',
                        height: '200px',
                        width: '100%',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '16px',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={`${item.name} Field Operation`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          background: 'rgba(17, 17, 17, 0.75)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontWeight: 500,
                        }}
                      >
                        {item.badge}
                      </div>
                    </div>

                    {/* Scope */}
                    <p
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        color: '#444444',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {item.scope}
                    </p>

                    {/* Statutory Metric */}
                    <div
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.76rem',
                        color: '#8C733E',
                        fontWeight: 600,
                        backgroundColor: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(194, 159, 83, 0.25)',
                        marginBottom: '16px',
                      }}
                    >
                      <TechText text={item.statutoryMetric} scrambleSpeed={18} maxScrambles={4} />
                    </div>

                    {/* Direct Jump CTA */}
                    <div style={{ width: '100%', marginTop: '4px' }}>
                      <SpecularButton
                        href={item.href}
                        variant="dark"
                        icon={<ArrowUpRight size={14} />}
                        className="w-full justify-center !py-2.5 !text-[0.78rem]"
                      >
                        Explore {item.name} Dossier
                      </SpecularButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
