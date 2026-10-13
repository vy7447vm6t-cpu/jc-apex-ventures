"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  href: string;
  image: string;
  description: string;
  spec: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'sanyog',
    name: 'Sanyog',
    tagline: 'Utility Liaisoning & CGRF Redressal',
    href: '/sanyog',
    image: '/images/sanyog_utility_infra.jpg',
    description:
      'Electricity tariff auditing, sanctioned load releases, meter room statutory regularizations, and consumer grievance representation before MERC forums across Mumbai.',
    spec: 'BEST / Adani / Tata Power / MSEDCL Jurisdiction',
  },
  {
    id: 'grid-apex',
    name: 'Grid Apex',
    tagline: 'Industrial Substations & Switchgear',
    href: '/grid-apex',
    image: '/images/grid_apex_transformer.jpg',
    description:
      'Engineering 33kV/11kV electrical substations, industrial LT switchgear distribution panels, capacitor banks, and PWD electrical inspectorate compliance clearances.',
    spec: '33kV / 11kV Substation EPC & PWD Inspectorate',
  },
  {
    id: 'solis',
    name: 'Solis',
    tagline: 'Rooftop Solar & Pergola EPC',
    href: '/solis',
    image: '/images/solis_pergola_solar.jpg',
    description:
      'Elevated walkable solar pergolas preserving 100% usable terrace space, mono PERC bi-facial arrays, EV chargers, and PM Surya Ghar central subsidy workflows.',
    spec: '100% Usable Terrace Footprint | Net-Metering EPC',
  },
  {
    id: 'tvasta',
    name: 'Tvasta',
    tagline: 'Turnkey Architectural Fit-Outs',
    href: '/tvasta',
    image: '/images/tvasta_luxury_interior.jpg',
    description:
      'Executive corporate headquarters, acoustic ceilings, HVAC electrical coordination, and bespoke spatial engineering for modern commercial establishments.',
    spec: 'Turnkey Architectural Space Planning & Interior EPC',
  },
  {
    id: 'emudran',
    name: 'eMudran',
    tagline: 'Luxury Packaging & Precision Print',
    href: '/emudran',
    image: '/images/emudran_luxury_branding.jpg',
    description:
      'Custom rigid presentation boxes, micro-embossed foil packaging, corporate security stationery, and durable architectural outdoor signage.',
    spec: 'Rigid Boxes, Thermal Foil Stamping & Signage',
  },
  {
    id: 'agrim',
    name: 'Agrim',
    tagline: 'Project Advisory & Waste Management',
    href: '/agrim',
    image: '/images/waste-management-tech.jpg',
    description:
      'Statutory project finance file assembly, bank credit syndication DPRs, and solid waste processing technology compliance liaisoning.',
    spec: 'Credit DPR Documentation & MPCB Consent Filing',
  },
];

export default function GroundedServices() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = SERVICES[activeIndex];

  return (
    <section id="divisions" className="services-section">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container services">
          <span className="text-eye-brow">[our divisions]</span>
        </div>

        {/* 2-Column Grounded Services Directory Layout */}
        <div className="services-grid">
          {/* Left Column: Interactive Slash-Separated Titles & Active Detail */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                  lineHeight: 1.25,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                {SERVICES.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  const isLast = idx === SERVICES.length - 1;
                  return (
                    <React.Fragment key={item.id}>
                      <span
                        className={`services-hover-item ${isActive ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        style={{
                          color: isActive ? '#111111' : '#999999',
                          fontWeight: isActive ? 500 : 400,
                          cursor: 'pointer',
                          transition: 'color 0.2s ease',
                          display: 'inline',
                        }}
                      >
                        {item.name}
                      </span>
                      {!isLast && (
                        <span style={{ color: '#CCCCCC', margin: '0 12px', fontWeight: 300 }}>
                          /
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </h3>
            </div>

            {/* Active Service Description Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '36px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#727272',
                  marginBottom: '10px',
                }}
              >
                {activeService.tagline}
              </div>

              <h4
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: '#111111',
                  marginBottom: '14px',
                  letterSpacing: '-0.015em',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                {activeService.name} Division
              </h4>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: '#555555',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                {activeService.description}
              </p>

              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.82rem',
                  color: '#444444',
                  backgroundColor: '#F4F1EA',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  display: 'inline-block',
                  marginBottom: '28px',
                }}
              >
                {activeService.spec}
              </div>

              <div>
                <Link
                  href={activeService.href}
                  className="button is-icon"
                  style={{
                    backgroundColor: '#111111',
                    color: '#FFFFFF',
                    padding: '0.75rem 1.4rem',
                  }}
                >
                  <span>Explore {activeService.name}</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Photo Crossfade Viewport */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '520px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              backgroundColor: '#111111',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            }}
          >
            {SERVICES.map((item, idx) => (
              <img
                key={`img-${item.id}`}
                src={item.image}
                alt={item.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: activeIndex === idx ? 1 : 0,
                  transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'brightness(0.92) contrast(1.04)',
                }}
              />
            ))}

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(17,17,17,0.85) 0%, transparent 100%)',
                color: '#FFFFFF',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Verified Field Archive
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                {activeService.name} / {activeService.tagline}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
