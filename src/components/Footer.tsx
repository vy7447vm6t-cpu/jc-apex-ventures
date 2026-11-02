"use client";

import React from 'react';
import { logoSize } from '@/content/logos';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, Mail, MapPin, ArrowUpRight, Download } from 'lucide-react';
import { SpecularButton } from '@/components/react-bits';

// Labels are the division page titles.
const DIVISION_FOOTER_LOGOS = [
  {
    name: 'Solis',
    role: 'Solar, pergolas and EV charging',
    href: '/solis',
    logo: '/images/logos/solis-logo-white.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Sanyog',
    role: 'Power connections and bill disputes',
    href: '/sanyog',
    logo: '/images/logos/sanyog-official.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Grid Apex',
    role: 'HT and LT electrical work',
    href: '/grid-apex',
    logo: '/images/logos/grid-apex-white.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Tvasta',
    role: 'Interior design and fit-out',
    href: '/tvasta',
    logo: '/images/logos/tvasta-official.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'eMudran',
    role: 'Brand, packaging, signage and print',
    href: '/emudran',
    logo: '/images/logos/emudran-white.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
  {
    name: 'Agrim',
    role: 'Project loan coordination',
    href: '/agrim',
    logo: '/images/logos/agrim-official.png',
    bg: 'rgba(255, 255, 255, 0.08)',
  },
];

// Division inboxes, as the company profile lists them (page 9).
const INBOXES: [string, string][] = [
  ['admin@jcapexv.com', 'General, Grid Apex, eMudran (WhatsApp preferred), Agrim'],
  ['solis@jcapexv.com', 'Solis'],
  ['licenses@jcapexv.com', 'Sanyog: connections and licences'],
  ['consumercmpl@jcapexv.com', 'Sanyog: bill disputes and complaints'],
  ['spacemgmt@jcapexv.com', 'Tvasta'],
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
              One accountable desk for your building&apos;s power, energy and fit-out: engineering, approvals and execution together.
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
              letterSpacing: '0',
              color: '#999999',
              marginBottom: '18px',
            }}
          >
            The six divisions
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DIVISION_FOOTER_LOGOS.map((div) => (
              <Link
                key={div.name}
                href={div.href}
                className="group relative flex flex-col justify-between rounded-2xl p-4 border border-white/10 hover:border-[#C29F53]/70 transition-all duration-300 no-underline overflow-hidden"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.035)' }}
              >
                <div
                  className="h-12 rounded-xl flex items-center justify-center px-3 mb-3 overflow-hidden border border-white/10 group-hover:border-[#C29F53]/30 transition-all"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                >
                  <img
                    src={div.logo}
                    {...logoSize(div.logo)}
                    loading="lazy"
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
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0',
                color: '#999999',
                marginBottom: '18px',
              }}
            >
              Divisions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/solis" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.94rem' }}>
                Solis · Solar, pergolas and EV charging
              </Link>
              <Link href="/sanyog" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Sanyog · Power connections and bill disputes
              </Link>
              <Link href="/grid-apex" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Grid Apex · HT and LT electrical work
              </Link>
              <Link href="/tvasta" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Tvasta · Interior design and fit-out
              </Link>
              <Link href="/emudran" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                eMudran · Brand, packaging, signage and print
              </Link>
              <Link href="/agrim" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Agrim · Project loan coordination
              </Link>
              <Link href="/studio" style={{ color: '#D4B56A', textDecoration: 'none', fontSize: '0.94rem', fontWeight: 500 }}>
                Our studio
              </Link>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0',
                color: '#999999',
                marginBottom: '18px',
              }}
            >
              Contact
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
              {INBOXES.map(([email, who]) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  <Mail size={14} color="#C29F53" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span>
                    {email}
                    <span style={{ display: 'block', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.55)' }}>{who}</span>
                  </span>
                </a>
              ))}
              <a
                href="/profiles/JC-Apex-Ventures-Company-Profile.pdf"
                download
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '0.92rem' }}
              >
                <Download size={14} color="#C29F53" />
                <span>Company profile (PDF)</span>
              </a>
            </div>
          </div>

          {/* Column 3: Corporate Registered Office */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0',
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
                <span>Units 801–802, 8th Floor, Tower 1,</span><br />
                <span>One International Centre,</span><br />
                <span>Senapati Bapat Marg, Elphinstone,</span><br />
                <span>Mumbai 400013</span>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontWeight: 700,
                    letterSpacing: '0',
                    color: '#C29F53',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </a>
          </div>

          {/* Column 4: Leadership */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0',
                color: '#999999',
                marginBottom: '18px',
              }}
            >
              Leadership
            </div>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'rgba(255, 255, 255, 0.78)',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              Incorporated in 2023. The company is new; the experience behind it is not.
            </p>
          </div>
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
            &copy; 2026 JC Apex Ventures (OPC) Pvt. Ltd. All rights reserved.
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
          // Scale and lift only: fading the wordmark left its small print below contrast until fully scrolled.
          transition: 'transform 0.12s ease-out',
          transformOrigin: 'center center',
        }}
      >
        <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase text-[#C29F53] mb-3 sm:mb-4">
          JC Apex Ventures · Mumbai
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

        <div className="text-[11px] sm:text-[11px] tracking-[0.16em] uppercase text-white/70 mt-3 sm:mt-4 font-sans text-center">
          ONE INTERNATIONAL CENTRE · ELPHINSTONE · MUMBAI 400013
        </div>
      </div>
    </div>
  </footer>
);
}
