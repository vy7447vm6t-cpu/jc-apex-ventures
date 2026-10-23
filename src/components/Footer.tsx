"use client";

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { SpecularButton } from '@/components/react-bits';
import LogoLoop, { LogoLoopItem } from '@/components/react-bits/LogoLoop';

const REGULATORY_RIBBON_ITEMS: LogoLoopItem[] = [
  { id: 'best', name: 'BEST Undertaking', category: 'DISCOM Island City' },
  { id: 'adani', name: 'Adani Electricity (AEML)', category: 'DISCOM Suburbs' },
  { id: 'tata', name: 'Tata Power (TPCL)', category: 'DISCOM Suburbs' },
  { id: 'msedcl', name: 'MSEDCL', category: 'DISCOM Regional MMR' },
  { id: 'merc', name: 'MERC', category: 'Regulatory Commission' },
  { id: 'mnre', name: 'MNRE / PM Surya Ghar', category: 'Central CFA' },
  { id: 'meda', name: 'MEDA', category: 'State Renewable Energy' },
  { id: 'cei', name: 'PWD Electrical Inspectorate (CEI)', category: 'Statutory Safety' },
  { id: 'mca', name: 'Ministry of Corporate Affairs (MCA)', category: 'ROC Mumbai' },
];

const DIVISION_FOOTER_LOGOS = [
  {
    name: 'Solis',
    role: 'Solar & Pergolas',
    href: '/solis',
    logo: '/images/logos/solis-logo-white.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Sanyog',
    role: 'Utility Liaison',
    href: '/sanyog',
    logo: '/images/logos/sanyog-official.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Grid Apex',
    role: 'HT/LT & Waste',
    href: '/grid-apex',
    logo: '/images/logos/grid-apex-white.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Tvasta',
    role: 'Spatial Fit-Out',
    href: '/tvasta',
    logo: '/images/logos/tvasta-official.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'eMudran',
    role: 'Print & Packaging',
    href: '/emudran',
    logo: '/images/logos/emudran-white.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Agrim',
    role: 'Project Finance DPR',
    href: '/agrim',
    logo: '/images/logos/agrim-official.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
];

export default function Footer() {
  const footerRef = React.useRef<HTMLElement>(null);
  const [revealProgress, setRevealProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Distance remaining to reach the bottom of the footer
      const remaining = rect.bottom - windowHeight;
      const revealZone = 380;
      const progress = Math.max(0, Math.min(1, 1 - remaining / revealZone));
      setRevealProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-sans, Inter, sans-serif)',
        scrollMarginTop: '104px',
        overflow: 'visible',
      }}
    >
      {/* 1. Main Footer Curtain Container (Opaque, z-10) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#111111',
          color: '#FFFFFF',
          padding: '96px 24px 48px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Top Row: Wordmark & Direct Action */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: '44px',
            marginBottom: '44px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <Logo width={34} height={34} />
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontWeight: 600,
                  fontSize: '1.4rem',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                }}
              >
                JC APEX VENTURES
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '1.02rem',
                color: 'rgba(255, 255, 255, 0.72)',
                maxWidth: '520px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Multi-disciplinary engineering, utility liaisoning, solar EPC, interior fit-outs, and corporate packaging consortium headquartered in Mumbai.
            </p>
          </div>

          <div>
            <SpecularButton href="mailto:admin@jcapexv.com" variant="gold">
              <span>Initiate Consultation</span>
              <ArrowUpRight size={15} />
            </SpecularButton>
          </div>
        </div>

        {/* Official 6-Division Brand Identity Showcase Strip */}
        <div
          style={{
            marginBottom: '56px',
            paddingBottom: '44px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#999999',
              marginBottom: '18px',
            }}
          >
            [CONSORTIUM OPERATING DIVISIONS]
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DIVISION_FOOTER_LOGOS.map((div) => (
              <Link
                key={div.name}
                href={div.href}
                className="group relative flex flex-col justify-between rounded-2xl p-4 border border-white/10 hover:border-[#C29F53]/70 transition-all duration-300 no-underline overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.035)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Subtle top edge liquid glass specular sheen */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div
                  className="h-12 rounded-xl flex items-center justify-center px-3 mb-3 overflow-hidden border border-white/10 group-hover:border-[#C29F53]/30 transition-all"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                >
                  <img
                    src={div.logo}
                    alt={`${div.name} official logo`}
                    style={{
                      filter: div.name === 'Sanyog' ? 'brightness(0) invert(1)' : 'none',
                    }}
                    className="max-h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#D4B56A] transition-colors">
                      {div.name}
                    </div>
                    <div className="text-[10px] text-white/60">{div.role}</div>
                  </div>
                  <ArrowUpRight size={13} className="text-white/40 group-hover:text-[#D4B56A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          {/* Column 1: Divisions */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '18px',
              }}
            >
              Practice Divisions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/solis" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.94rem' }}>
                Solis (Rooftop Solar &amp; Pergolas)
              </Link>
              <Link href="/sanyog" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Sanyog (Utility Liaisoning &amp; CGRF)
              </Link>
              <Link href="/grid-apex" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Grid Apex (Substations &amp; Switchgear)
              </Link>
              <Link href="/tvasta" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Tvasta (Corporate Interior Fit-outs)
              </Link>
              <Link href="/emudran" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                eMudran (Luxury Packaging &amp; Print)
              </Link>
              <Link href="/agrim" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Agrim (Project Finance Advisory)
              </Link>
              <Link href="/studio" style={{ color: '#D4B56A', textDecoration: 'none', fontSize: '0.94rem', fontWeight: 500 }}>
                Studio Practice &amp; Leadership
              </Link>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '18px',
              }}
            >
              Direct Channels
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.94rem', color: '#FFFFFF', fontWeight: 600 }}>
                Jitendra Chavan, Director
              </div>
              <a
                href="tel:+917021112664"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <Phone size={14} color="#C29F53" />
                <span>+91 70211 12664</span>
              </a>
              <a
                href="mailto:solis@jcapexv.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                }}
              >
                <Mail size={14} color="#C29F53" />
                <span>solis@jcapexv.com</span>
              </a>
              <a
                href="mailto:admin@jcapexv.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                }}
              >
                <Mail size={14} color="#C29F53" />
                <span>admin@jcapexv.com</span>
              </a>
            </div>
          </div>

          {/* Column 3: Corporate Registered Office */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '18px',
              }}
            >
              Headquarters
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open One International Centre Mumbai in Google Maps"
              style={{
                display: 'flex',
                gap: '10px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              <MapPin size={18} color="#C29F53" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                <span>One International Centre, Tower 2,</span><br />
                <span>8th Floor, Units 801-802,</span><br />
                <span>Senapati Bapat Marg,</span><br />
                <span>Elphinstone, Mumbai 400013</span>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#C29F53',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>[open in google maps]</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </a>
          </div>

          {/* Column 4: Regulatory Transparency */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '18px',
              }}
            >
              Statutory Transparency
            </div>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(255, 255, 255, 0.68)',
                lineHeight: 1.6,
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              On-site physical installation, electrical contracting, and fabrication works are executed by vetted, licensed partners under direct engineering supervision.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#C29F53',
              }}
            >
              36+ Years Direct Utility Practice
            </div>
          </div>
        </div>

        {/* Statutory & Regulatory Authority Infinite Ribbon */}
        <div style={{ marginTop: '36px', marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(194, 159, 83, 0.75)',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            [ DISCOM &amp; STATUTORY REGULATORY FRAMEWORKS ]
          </div>
          <LogoLoop items={REGULATORY_RIBBON_ITEMS} speed={28} theme="dark" className="border-y border-white/10" />
        </div>

        {/* Bottom Statutory Row */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.55)',
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
          }}
          className="text-xs text-muted"
        >
          <div>
            &copy; 2026 JC Apex Ventures (OPC) Private Limited. All rights reserved.
          </div>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>
            CIN (MCA): U70200MH2023OPC411326
          </div>
        </div>
      </div>
    </div>

    {/* 2. Sticky Bottom Big Logo Reveal (Amplitude Effect, z-0) */}
    <div
      className="sticky bottom-0 z-0 bg-[#07090C] text-white flex flex-col justify-center items-center h-[280px] sm:h-[340px] lg:h-[420px] left-0 right-0 px-5 pb-12 pt-8 overflow-hidden select-none border-t border-white/5"
    >
      {/* Subtle background CAD grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div
        className="relative z-10 w-full max-w-[1340px] mx-auto flex flex-col items-center"
        style={{
          transform: `scale(${0.80 + revealProgress * 0.20}) translateY(${(1 - revealProgress) * 20}px)`,
          opacity: 0.25 + revealProgress * 0.75,
          transition: 'transform 0.12s ease-out, opacity 0.12s ease-out',
          transformOrigin: 'center center',
        }}
      >
        <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase text-[#C29F53] mb-3 sm:mb-4">
          [ MULTI-DISCIPLINARY ENGINEERING CONSORTIUM · MUMBAI ]
        </div>

        <div className="w-full">
          <svg
            viewBox="0 0 1050 140"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[160px] sm:max-h-[220px] drop-shadow-2xl"
          >
            {/* Master JC Apex Umbrella Emblem */}
            <g transform="translate(15, 6)">
              <circle
                cx="50"
                cy="18"
                r="10"
                fill="#D4AF37"
                style={{
                  filter: revealProgress > 0.6 ? 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.8))' : 'none',
                  transition: 'filter 0.3s ease',
                }}
              />
              <path
                d="M15 55 Q 50 15 85 55"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M24 55 Q 50 25 76 55"
                stroke="#C29F53"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M50 48 L 50 95 Q 50 115 36 115 Q 28 115 28 108"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* Grand Architectural Instrument Serif Wordmark */}
            <text
              x="135"
              y="114"
              textLength="895"
              lengthAdjust="spacing"
              fill="#FFFFFF"
              fontFamily="var(--font-serif-display), 'Instrument Serif', Georgia, serif"
              fontSize="132"
              fontWeight="400"
            >
              JC APEX VENTURES
            </text>
          </svg>
        </div>

        <div className="text-[9px] sm:text-[11px] tracking-[0.16em] uppercase text-white/40 mt-3 sm:mt-4 font-sans text-center">
          ONE INTERNATIONAL CENTRE · ELPHINSTONE · MUMBAI 400013
        </div>
      </div>
    </div>
  </footer>
);
}
