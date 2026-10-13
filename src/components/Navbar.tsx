"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Phone, ArrowUpRight, X } from 'lucide-react';

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const handleMouseEnter = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 25);
  };

  const handleMouseLeave = () => {
    setDisplay(text);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {display}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mumbaiTime, setMumbaiTime] = useState<string>('MUMBAI IST --:--:--');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setMumbaiTime('MUMBAI IST ' + formatted.toUpperCase());
      } catch {
        setMumbaiTime('MUMBAI IST');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const divisions = [
    { href: '/solis', label: 'Solis', tag: 'Solar & Pergolas' },
    { href: '/sanyog', label: 'Sanyog', tag: 'Utility & CGRF' },
    { href: '/grid-apex', label: 'Grid Apex', tag: 'HT/LT & Substations' },
    { href: '/tvasta', label: 'Tvasta', tag: 'Turnkey Interiors' },
    { href: '/emudran', label: 'eMudran', tag: 'Branding & Print' },
    { href: '/agrim', label: 'Agrim', tag: 'Project Advisory' },
  ];

  return (
    <>
      {/* ===== GROUNDED FLOATING ISLAND NAVIGATION ===== */}
      <div
        className="nav-menu-fixed-wrapper z-50"
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '18px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '1180px',
          zIndex: 100,
          pointerEvents: 'none',
          transition: 'top 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <header
          className="ios-glass"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 20px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(244, 241, 234, 0.88)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
            width: '100%',
          }}
        >
          {/* Brand Wordmark & Umbrella Mascot */}
          <Link
            href="/"
            aria-label="JC Apex Ventures Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#111111',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Logo width={26} height={26} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  letterSpacing: '-0.02em',
                  color: '#111111',
                }}
              >
                JC APEX
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  color: '#727272',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Ventures
              </span>
            </div>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <nav
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: '18px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
            }}
          >
            <Link
              href="/#projects"
              aria-label="View Builds and Projects"
              style={{ color: '#444444', textDecoration: 'none' }}
            >
              <ScrambleText text="Builds" />
            </Link>
            <span style={{ color: '#CCCCCC' }}>/</span>
            <Link
              href="/#divisions"
              aria-label="View Specialized Divisions"
              style={{ color: '#444444', textDecoration: 'none' }}
            >
              <ScrambleText text="Divisions" />
            </Link>
            <span style={{ color: '#CCCCCC' }}>/</span>
            <Link
              href="/solis"
              aria-label="Solis Solar Division"
              style={{ color: '#111111', fontWeight: 600, textDecoration: 'none' }}
            >
              <ScrambleText text="Solis" />
            </Link>
            <span style={{ color: '#CCCCCC' }}>/</span>
            <Link
              href="/#calculators"
              aria-label="Field Calculators"
              style={{ color: '#444444', textDecoration: 'none' }}
            >
              <ScrambleText text="Estimators" />
            </Link>
            <span style={{ color: '#CCCCCC' }}>/</span>
            <Link
              href="/studio"
              aria-label="Practice, Leadership and Studio"
              style={{ color: '#444444', textDecoration: 'none' }}
            >
              <ScrambleText text="Studio" />
            </Link>
          </nav>

          {/* Right: Live Mumbai Clock, Phone Action, Menu Trigger & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Live Mumbai Clock */}
            <div className="mumbai-clock hidden lg:block" style={{ paddingRight: '4px' }}>
              {mumbaiTime}
            </div>

            {/* Direct Telephone Action */}
            <a
              href="tel:+917021112664"
              aria-label="Call JC Apex Ventures"
              className="hidden md:flex"
              style={{
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono, monospace)',
                color: '#444444',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <Phone size={13} color="#111111" />
              <span>+91 70211 12664</span>
            </a>

            {/* Consultation Action Button */}
            <a
              href="#contact"
              aria-label="Consultation Enquiry"
              className="button is-icon hidden md:inline-flex"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                backgroundColor: '#111111',
                color: '#FFFFFF',
              }}
            >
              <ScrambleText text="Consultation" />
              <ArrowUpRight size={14} />
            </a>

            {/* Grounded 3-Dots Menu Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                color: '#111111',
                transition: 'all 0.2s ease',
              }}
            >
              {mobileOpen ? (
                <X size={18} />
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* ===== GROUNDED CURTAIN DRAWER OVERLAY ===== */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            backgroundColor: '#111111',
            color: '#FFFFFF',
            padding: '120px 32px 48px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                color: '#888888',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              Direct Division Navigation
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
                maxWidth: '1000px',
              }}
            >
              <Link
                href="/studio"
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingBottom: '16px',
                  color: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.74rem',
                    color: '#C29F53',
                    marginBottom: '4px',
                  }}
                >
                  Practice &amp; Leadership
                </div>
                <div
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 500,
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  Studio Dossier
                </div>
              </Link>
              {divisions.map((div) => (
                <Link
                  key={div.href}
                  href={div.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                    paddingBottom: '16px',
                    color: '#FFFFFF',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.74rem',
                      color: '#C29F53',
                      marginBottom: '4px',
                    }}
                  >
                    {div.tag}
                  </div>
                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 500,
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {div.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  color: '#C29F53',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>One International Centre, Mumbai [open maps]</span>
              </a>
              <div style={{ fontSize: '0.94rem', color: '#FFFFFF', marginTop: '4px' }}>
                Director: Jitendra Chavan | 36 Years Direct Utility Background
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a
                href="tel:+917021112664"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                +91 70211 12664
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="button is-icon is-alternate"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                <span>Direct Consultation</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
