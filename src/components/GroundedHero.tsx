"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';

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
    image: '/images/utility-power-grid.jpg',
  },
  {
    id: 'zone-02',
    num: '_02',
    label: 'Walkable Solar Pergola',
    category: '100% Usable Terrace Rooftop EPC',
    image: '/images/solis_canopy_page1.jpg',
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
    image: '/images/architectural-interior.jpg',
  },
  {
    id: 'zone-05',
    num: '_05',
    label: 'Precision Packaging & Print',
    category: 'Rigid Boxes, Foil Branding & Signage',
    image: '/images/luxury-print-packaging.jpg',
  },
];

export default function GroundedHero() {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  return (
    <section
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
            opacity: activeZone === null ? 0.95 : 0.2,
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'brightness(0.85) contrast(1.05)',
          }}
        />

        {/* 5 Hover Trigger Images */}
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
              filter: 'brightness(0.88) contrast(1.05)',
            }}
          />
        ))}

        {/* Ambient Vignette & Gradient Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(17,17,17,0.45) 0%, rgba(17,17,17,0.2) 40%, rgba(17,17,17,0.85) 100%)',
          }}
        />
      </div>

      {/* 5 Invisible Hover Columns Triggering Image Crossfade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          display: 'grid',
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
            onTouchStart={() => setActiveZone(idx)}
            style={{ height: '100%', cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Hero Content (Overlaid above background images, below column triggers or with pointer-events auto) */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          padding: '140px 32px 0 32px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          pointerEvents: 'none',
        }}
      >


        {/* Split Mask Architectural Headline */}
        <div style={{ maxWidth: '960px', marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: 'clamp(3rem, 6.8vw, 5.8rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              margin: 0,
            }}
          >
            Engineering <span style={{ fontStyle: 'italic', color: '#E8E4DA' }}>That Operates.</span>
          </h1>
        </div>

        {/* Subtitle Statement */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '680px',
            lineHeight: 1.6,
            marginBottom: '36px',
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
            fontWeight: 300,
          }}
        >
          Consultancy, statutory liaisoning, and execution across Mumbai utility grids, renewable infrastructure, and commercial spaces.
        </p>

        {/* Grounded Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            alignItems: 'center',
            pointerEvents: 'auto',
          }}
        >
          <a
            href="#divisions"
            className="button is-icon"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: 'none',
              padding: '0.85rem 1.75rem',
            }}
          >
            <span style={{ fontWeight: 600 }}>Explore Divisions</span>
            <ArrowUpRight size={16} />
          </a>
          <a
            href="tel:+917021112664"
            className="button is-icon is-alternate"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '0.85rem 1.5rem',
            }}
          >
            <Phone size={15} color="#FFFFFF" />
            <span>+91 70211 12664</span>
          </a>
        </div>
      </div>

      {/* Bottom 5 Column Indicators (Grounded Signature Hover Cards) */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          padding: '0 32px 40px 32px',
          pointerEvents: 'none',
        }}
      >
        <div className="hero-indicators-grid">
          {HERO_ZONES.map((zone, idx) => {
            const isHovered = activeZone === idx;
            return (
              <div
                key={`indicator-${zone.id}`}
                onClick={() => setActiveZone(idx)}
                style={{
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: activeZone === null ? 0.7 : isHovered ? 1 : 0.35,
                  transform: isHovered ? 'translateY(-2px)' : 'none',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    color: isHovered ? '#FFFFFF' : '#888888',
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                    fontWeight: 500,
                  }}
                >
                  {zone.num}
                </div>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#FFFFFF',
                    fontWeight: isHovered ? 600 : 400,
                    lineHeight: 1.3,
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  {zone.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progressive Edge Blur Panel at bottom of hero */}
      <div className="progressive-blur_wrap" />
    </section>
  );
}
