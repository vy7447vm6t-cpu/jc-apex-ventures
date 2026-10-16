"use client";

import React, { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import AuthorityLogo from './AuthorityLogos';
import {
  MicroSlats,
  TechText,
  SpecularButton,
  ShapeWaves,
  InfiniteSpiral,
  TargetCursor,
  LogoLoop,
} from '@/components/react-bits';

interface HeroZone {
  id: string;
  num: string;
  label: string;
  category: string;
  image: string;
}

const HERO_ZONES: HeroZone[] = [
  {
    id: 'zone-01',
    num: '_01',
    label: 'Utility Distribution Grid',
    category: 'MERC Sanctions & Tariff Regularization',
    image: '/images/utility-metering-liaison.jpg',
  },
  {
    id: 'zone-02',
    num: '_02',
    label: 'Walkable Solar Pergola',
    category: '100% Usable Terrace Rooftop EPC',
    image: '/images/solar-pergola-rooftop.jpg',
  },
  {
    id: 'zone-03',
    num: '_03',
    label: '33kV Substation Panels',
    category: 'Industrial Switchgear & PWD Sanctions',
    image: '/images/electrical-substation.jpg',
  },
  {
    id: 'zone-04',
    num: '_04',
    label: 'Turnkey Corporate Fit-out',
    category: 'Commercial Space Planning & Execution',
    image: '/images/commercial_office_fitout.jpg',
  },
  {
    id: 'zone-05',
    num: '_05',
    label: 'Precision Packaging & Print',
    category: 'Rigid Boxes, Foil Branding & Signage',
    image: '/images/luxury-print-packaging.jpg',
  },
];

const REGULATORY_AUTHORITIES = [
  {
    id: 'reg-best',
    name: 'BEST Undertaking',
    category: 'Island City HT/LT Power Clearances',
    icon: <AuthorityLogo id="best" size={20} />,
  },
  {
    id: 'reg-adani',
    name: 'Adani Electricity (AEML)',
    category: 'Suburban Distribution & Net Metering',
    icon: <AuthorityLogo id="adani" size={20} />,
  },
  {
    id: 'reg-tata',
    name: 'Tata Power (TPCL)',
    category: 'MMR Grid Interconnection Protocols',
    icon: <AuthorityLogo id="tata" size={20} />,
  },
  {
    id: 'reg-msedcl',
    name: 'MSEDCL Mahavitaran',
    category: 'Industrial HT Feeder Clearances',
    icon: <AuthorityLogo id="msedcl" size={20} />,
  },
  {
    id: 'reg-pwd',
    name: 'PWD Electrical Inspectorate',
    category: 'CEI Statutory Safety Certification',
    icon: <AuthorityLogo id="pwd" size={20} />,
  },
  {
    id: 'reg-mpcb',
    name: 'Pollution Control Board (MPCB)',
    category: 'CTE / CTO Environmental Consents',
    icon: <AuthorityLogo id="mpcb" size={20} />,
  },
  {
    id: 'reg-mnre',
    name: 'PM Surya Ghar National Portal',
    category: 'National Solar Subsidy Verification',
    icon: <AuthorityLogo id="pmsuryaghar" size={20} />,
  },
  {
    id: 'reg-bee',
    name: 'Bureau of Energy Efficiency (BEE)',
    category: 'ECBC & PAT Scheme Statutory Compliance',
    icon: <AuthorityLogo id="bee" size={20} />,
  },
  {
    id: 'reg-mca',
    name: 'Ministry of Corporate Affairs (MCA)',
    category: 'Consortium Corporate Entity Verification',
    icon: <AuthorityLogo id="mca" size={20} />,
  },
  {
    id: 'reg-merc',
    name: 'MERC Sanctions',
    category: 'Maharashtra Electricity Regulatory Commission',
    icon: <AuthorityLogo id="merc" size={20} />,
  },
];

export default function GroundedHero() {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="hero-sticky-container"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#111111',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Precision Architectural CAD Crosshair Cursor (strictly desktop viewports) */}
      <TargetCursor containerRef={heroRef} color="#C29F53" />

      {/* MicroSlats Architectural Louver Rhythm with CAD Datum Ticks */}
      <MicroSlats count={24} color="#FFFFFF" opacity={0.10} zIndex={12} showTicks={true} />

      {/* Engineering Geometric Resonance Spiral */}
      <div
        className="pointer-events-none absolute top-24 right-10 z-[12] opacity-35 hidden lg:block"
        aria-hidden="true"
      >
        <InfiniteSpiral size={310} color="#C29F53" speed={0.004} />
      </div>

      {/* Background Images Layer with Crossfade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Default Baseline Image (One International Centre Facade) */}
        <img
          src="/images/hero-architectural-facade.jpg"
          alt="One International Centre Mumbai Facade"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: activeZone === null ? 0.92 : 0.15,
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'brightness(0.82) contrast(1.08)',
          }}
        />

        {/* 5 Hover/Tap Trigger Images */}
        {HERO_ZONES.map((zone, idx) => (
          <img
            key={zone.id}
            src={zone.image}
            alt={zone.label}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: activeZone === idx ? 0.95 : 0,
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: 'brightness(0.85) contrast(1.06)',
            }}
          />
        ))}

        {/* Ambient Vignette & Gradient Overlays for High Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(17,17,17,0.52) 0%, rgba(17,17,17,0.22) 42%, rgba(17,17,17,0.88) 100%)',
          }}
        />
      </div>

      {/* Bottom Horizon Wave Resonance */}
      <div
        className="pointer-events-none absolute bottom-24 left-0 w-full z-[12] opacity-35 overflow-hidden"
        aria-hidden="true"
      >
        <ShapeWaves color="#C29F53" height={95} waveCount={3} />
      </div>

      {/* 5 Invisible Hover Columns Triggering Image Crossfade (Desktop hover only) */}
      <div
        className="hidden md:grid"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          gridTemplateColumns: 'repeat(5, 1fr)',
          pointerEvents: 'auto',
        }}
        onMouseLeave={() => setActiveZone(null)}
      >
        {HERO_ZONES.map((zone, idx) => (
          <div
            key={`trigger-${zone.id}`}
            onMouseEnter={() => setActiveZone(idx)}
            onClick={() => setActiveZone(idx)}
            style={{ height: '100%', cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Hero Content (Overlaid above background images, strictly left-aligned) */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          padding: 'clamp(112px, 15vh, 144px) 24px 0 24px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          textAlign: 'left',
          pointerEvents: 'none',
        }}
      >
        {/* Split Mask Architectural Headline */}
        <div style={{ maxWidth: '980px', marginBottom: '22px', textAlign: 'left' }}>
          <h1
            className="hero-serif-title"
            style={{
              fontSize: 'clamp(2.8rem, 6.8vw, 5.8rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              textAlign: 'left',
              margin: 0,
            }}
          >
            <TechText
              text="Engineering"
              scrambleSpeed={28}
              maxScrambles={6}
              triggerOnHover={true}
              style={{ fontFamily: 'inherit' }}
            />{' '}
            <span className="italic-span" style={{ fontStyle: 'italic', color: '#E8E4DA' }}>
              <TechText
                text="That Operates."
                scrambleSpeed={28}
                maxScrambles={6}
                triggerOnHover={true}
                style={{ fontFamily: 'inherit', fontStyle: 'italic', color: '#E8E4DA' }}
              />
            </span>
          </h1>
        </div>

        {/* Subtitle Statement */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.28rem)',
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '680px',
            lineHeight: 1.62,
            marginBottom: '36px',
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            textAlign: 'left',
          }}
        >
          Consultancy, statutory liaisoning, and execution across Mumbai utility grids, renewable infrastructure, and commercial spaces.
        </p>

        {/* Grounded Action Buttons */}
        <div
          className="hero-cta-group"
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pointerEvents: 'auto',
          }}
        >
          <SpecularButton
            href="#divisions"
            variant="light"
            className="hero-cta-btn-light"
            icon={<ArrowUpRight size={16} />}
          >
            Explore Divisions
          </SpecularButton>
          <SpecularButton
            href="#contact"
            variant="dark"
            className="hero-cta-btn-dark"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>Initiate Consultation</span>
              <ArrowUpRight size={14} color="#C29F53" />
            </span>
          </SpecularButton>
        </div>
      </div>

      {/* Bottom Column Indicators */}
      <div
        className="hero-indicators-container"
        style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          padding: '0 24px 32px 24px',
          pointerEvents: 'none',
        }}
      >
        {/* Desktop View: 5-Column Architectural Grid */}
        <div className="hero-indicators-grid hidden md:grid" style={{ pointerEvents: 'auto' }}>
          {HERO_ZONES.map((zone, idx) => {
            const isHovered = activeZone === idx;
            const isFaded = activeZone !== null && !isHovered;
            return (
              <div
                key={`indicator-${zone.id}`}
                onClick={() => setActiveZone(activeZone === idx ? null : idx)}
                onMouseEnter={() => setActiveZone(idx)}
                style={{
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: isFaded ? 0.45 : 1,
                  transform: isHovered ? 'translateY(-2px)' : 'none',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                {/* Active state indicator line */}
                <div
                  style={{
                    height: '2px',
                    width: '100%',
                    backgroundColor: isHovered ? '#C29F53' : 'rgba(255, 255, 255, 0.22)',
                    boxShadow: isHovered ? '0 0 10px rgba(194, 159, 83, 0.65)' : 'none',
                    marginBottom: '10px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    borderRadius: '1px',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.78rem',
                    color: isHovered ? '#C29F53' : 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.04em',
                    marginBottom: '4px',
                    fontWeight: 650,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <TechText text={zone.num} />
                </div>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#FFFFFF',
                    fontWeight: isHovered ? 600 : 450,
                    lineHeight: 1.3,
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {zone.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Sleek Compact Segmented Pill Switcher */}
        <div className="flex md:hidden flex-col gap-2.5 w-full pointer-events-auto">
          {/* 5-Item Pill Navigation Strip */}
          <div
            className="flex items-center justify-between gap-1.5 p-1 rounded-full"
            style={{
              backgroundColor: 'rgba(17, 17, 17, 0.72)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {HERO_ZONES.map((zone, idx) => {
              const isSelected = activeZone === idx;
              return (
                <button
                  key={`mob-tab-${zone.id}`}
                  type="button"
                  onClick={() => setActiveZone(activeZone === idx ? null : idx)}
                  className="flex-1 py-1.5 px-2 rounded-full text-center transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? '#C29F53' : 'transparent',
                    color: isSelected ? '#111111' : 'rgba(255, 255, 255, 0.75)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    letterSpacing: '0.02em',
                    border: 'none',
                  }}
                >
                  {zone.num}
                </button>
              );
            })}
          </div>

          {/* Liquid Glass Zone Card */}
          <div
            className="p-3 rounded-2xl flex items-center justify-between gap-3"
            style={{
              backgroundColor: 'rgba(17, 17, 17, 0.78)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(194, 159, 83, 0.35)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="min-w-0 flex-1">
              <div
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 650,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {activeZone !== null ? HERO_ZONES[activeZone].label : 'Consortium Operating Infrastructure'}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: '#C29F53',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  lineHeight: 1.2,
                  marginTop: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {activeZone !== null ? HERO_ZONES[activeZone].category : 'One International Centre · Tap _01 to _05'}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {HERO_ZONES.map((_, i) => (
                <span
                  key={`dot-${i}`}
                  style={{
                    width: activeZone === i ? '14px' : '4px',
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: activeZone === i ? '#C29F53' : 'rgba(255, 255, 255, 0.25)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Low-Opacity LogoLoop Regulatory Authority Ribbon Along Bottom Baseline */}
      <div
        className="hero-regulatory-baseline"
        style={{
          position: 'relative',
          zIndex: 22,
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(17, 17, 17, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          paddingTop: '2px',
          paddingBottom: '2px',
          pointerEvents: 'auto',
        }}
      >
        <LogoLoop
          items={REGULATORY_AUTHORITIES}
          speed={32}
          theme="dark"
          className="opacity-70 hover:opacity-100 transition-opacity duration-300 py-2"
        />
      </div>

      {/* Progressive Edge Blur Panel at bottom of hero */}
      <div className="progressive-blur_wrap" />
    </section>
  );
}
