"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  location: string;
  category: string;
  metric: string;
  image: string;
  href: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'abhilasha-chs',
    title: 'Abhilasha CHS Walkable Rooftop Solar Pergola',
    location: 'Kandivali West, Mumbai',
    category: 'Renewable Infrastructure / Solis',
    metric: '55.55 kWp (101 Bi-Facial Panels) | 100% Usable Terrace Footprint',
    image: '/images/solar-pergola-rooftop.jpg',
    href: '/solis',
  },
  {
    id: 'substation-switchgear',
    title: '33kV Substation Switchgear & HT Sanction',
    location: 'Thane Industrial Zone, MMR',
    category: 'Industrial Electrical / Grid Apex',
    metric: '1600 kVA Transformer | PWD Electrical Inspectorate Sanctions',
    image: '/images/electrical-substation.jpg',
    href: '/grid-apex',
  },
  {
    id: 'one-international-centre',
    title: 'One International Centre Corporate Fit-out',
    location: 'Elphinstone, Lower Parel, Mumbai',
    category: 'Turnkey Commercial Interior / Tvasta',
    metric: 'Corporate Headquarters | Acoustic Zoning & Integrated MEP',
    image: '/images/architectural-interior.jpg',
    href: '/tvasta',
  },
  {
    id: 'rigid-box-packaging',
    title: 'Luxury Rigid Packaging & Corporate Stationery',
    location: 'Mumbai Corporate Portfolio',
    category: 'Packaging & Identity / eMudran',
    metric: 'Thermal Micro-Foil Embossing | Precision Paperboard Engineering',
    image: '/images/luxury-print-packaging.jpg',
    href: '/emudran',
  },
];

export default function GroundedProjectTrack() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="project-section-track">
      {/* Edge Progressive Blurs */}
      <div className="progressive-blur_wrap-2 blur-edge-left" />
      <div className="progressive-blur_wrap-2 blur-edge-right" />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px 40px 32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
              <span className="text-eye-brow" style={{ color: '#888888' }}>
                [selected builds & sanctions]
              </span>
            </div>
            <h3
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                color: '#FFFFFF',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                margin: 0,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              Documented Field Execution.
            </h3>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll left through projects"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll right through projects"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Reel */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '28px',
          overflowX: 'auto',
          padding: '20px 32px 40px 32px',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            style={{
              flex: '0 0 clamp(320px, 42vw, 540px)',
              scrollSnapAlign: 'start',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '560px',
              backgroundColor: '#1E2124',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <img
              src={study.image}
              alt={study.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) contrast(1.05)',
                transition: 'transform 0.5s ease',
              }}
            />

            {/* Gradient Mask Over Card */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.4) 45%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Content Container */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    color: '#C29F53',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {study.category}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.76rem',
                    color: '#999999',
                  }}
                >
                  {study.location}
                </span>
              </div>

              <h4
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                {study.title}
              </h4>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: 1.5,
                  marginBottom: '20px',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                {study.metric}
              </p>

              <div>
                <Link
                  href={study.href}
                  className="button is-icon is-alternate"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.84rem',
                    padding: '8px 16px',
                  }}
                >
                  <span>Case Study Dossier</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
