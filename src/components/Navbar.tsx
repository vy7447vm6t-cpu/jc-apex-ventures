"use client";

import React, { useEffect, useState } from 'react';
import { logoSize } from '@/content/logos';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { DIVISION_ONE_LINERS, PROOF_LINE } from '@/content/messaging';
import { Phone, ArrowUpRight, X } from 'lucide-react';

// Enquiry section of each page; every other page has its enquiry block at #contact.
// Every page's enquiry form sits in #contact (the division template, Studio and the home page).
const ENQUIRY_ANCHORS: Record<string, string> = {};

const WHATSAPP_URL = `https://wa.me/917021112664?text=${encodeURIComponent('Hello JC Apex Ventures, I would like to enquire about a project.')}`;

// Navigation labels are plain text; scrambling text is retired (brand guidelines 2.8.2).
function ScrambleText({ text }: { text: string }) {
  return <span>{text}</span>;
}

function renderDivisionIcon(key: string) {
  switch (key) {
    case 'sun':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C29F53" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'zap':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'layout':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D72A1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case 'plug':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2C5ED4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22v-5M9 8V2M15 8V2M6 8h12a3 3 0 0 1 3 3v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a3 3 0 0 1 3-3z" />
        </svg>
      );
    case 'printer':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      );
    case 'landmark':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 20 7 4 7" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [divisionsHover, setDivisionsHover] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = React.useRef(0);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);

  const isMenuOpen = divisionsHover || divisionsOpen;
  const enquireHref = ENQUIRY_ANCHORS[pathname] ?? '#contact';

  const handleOpenMenu = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setDivisionsHover(true);
  };

  const handleCloseMenu = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setDivisionsHover(false);
    }, 280);
  };

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (divisionsOpen) {
      setDivisionsOpen(false);
      setDivisionsHover(false);
    } else {
      setDivisionsOpen(true);
    }
  };

  const handleDismissMenu = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setDivisionsHover(false);
    setDivisionsOpen(false);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      handleDismissMenu();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        handleDismissMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleDismissMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Footer auto-retract awareness: hide navbar near bottom of page
      // so it never obstructs the monument sticky JC APEX VENTURES wordmark in Footer
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (currentScrollY + clientHeight);
      if (distanceFromBottom < 480) {
        setHidden(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 60) {
        setHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;
      if (Math.abs(diff) > 15) {
        handleDismissMenu();
      }
      if (Math.abs(diff) < 8) return;

      if (diff > 0 && currentScrollY > 100) {
        setHidden(true);
      } else if (diff < 0) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const divisions = [
    {
      href: '/solis',
      label: 'Solis',
      summary: DIVISION_ONE_LINERS['solis'],
      logo: '/images/logos/solis-official.png',
      logoDark: '/images/logos/solis-logo-white.png',
      bg: '#FFFFFF',
      accent: '#1E3FD8',
      vectorIcon: 'sun',
    },
    {
      href: '/grid-apex',
      label: 'Grid Apex',
      summary: DIVISION_ONE_LINERS['grid-apex'],
      logo: '/images/logos/grid-apex-official.png',
      logoDark: '/images/logos/grid-apex-white.png',
      bg: '#111111',
      accent: '#0284C7',
      vectorIcon: 'zap',
    },
    {
      href: '/tvasta',
      label: 'Tvasta',
      summary: DIVISION_ONE_LINERS['tvasta'],
      logo: '/images/logos/tvasta-dark.png',
      logoDark: '/images/logos/tvasta-official.png',
      bg: '#FFFFFF',
      accent: '#D72A1B',
      vectorIcon: 'layout',
    },
    {
      href: '/sanyog',
      label: 'Sanyog',
      summary: DIVISION_ONE_LINERS['sanyog'],
      logo: '/images/logos/sanyog-official.png',
      logoDark: '/images/logos/sanyog-official.png',
      bg: '#FFFFFF',
      accent: '#2C5ED4',
      vectorIcon: 'plug',
    },
    {
      href: '/emudran',
      label: 'eMudran',
      summary: DIVISION_ONE_LINERS['emudran'],
      logo: '/images/logos/emudran-official.png',
      logoDark: '/images/logos/emudran-white.png',
      bg: '#FFFFFF',
      accent: '#4338CA',
      vectorIcon: 'printer',
    },
    {
      href: '/agrim',
      label: 'Agrim',
      summary: DIVISION_ONE_LINERS['agrim'],
      logo: '/images/logos/agrim-dark.png',
      logoDark: '/images/logos/agrim-official.png',
      bg: '#FFFFFF',
      accent: '#047857',
      vectorIcon: 'landmark',
    },
  ];

  return (
    <>
      {/* ===== APPLE KOKONUTUI FLOATING LIQUID GLASS NAVIGATION ===== */}
      <div
        ref={popoverRef}
        className="nav-menu-fixed-wrapper z-50"
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '18px',
          left: '50%',
          transform: hidden && !mobileOpen ? 'translateX(-50%) translateY(-150%)' : 'translateX(-50%) translateY(0)',
          width: 'calc(100% - 32px)',
          maxWidth: '1180px',
          zIndex: 100,
          pointerEvents: hidden && !mobileOpen ? 'none' : 'auto',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <header
          className="kokonut-nav-pill relative"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 18px',
            borderRadius: '9999px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            width: '100%',
            position: 'relative',
            overflow: 'visible',
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
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Logo width={26} height={26} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontWeight: 650,
                  fontSize: '0.96rem',
                  letterSpacing: '-0.02em',
                  color: '#111111',
                }}
              >
                JC APEX
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: '0.72rem',
                  color: '#666666',
                  letterSpacing: '0',
                  fontWeight: 500,
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
              gap: '14px',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.82rem',
              letterSpacing: '-0.01em',
              fontWeight: 500,
            }}
          >
            <Link
              href="/#projects"
              onClick={handleDismissMenu}
              aria-label="Clients and projects"
              style={{ color: '#222222', textDecoration: 'none' }}
            >
              <ScrambleText text="Clients" />
            </Link>
            <span style={{ color: 'rgba(0, 0, 0, 0.18)' }}>/</span>
            <div
              className="relative"
              onMouseEnter={handleOpenMenu}
              onMouseLeave={handleCloseMenu}
            >
              <button
                type="button"
                onClick={handleToggleMenu}
                onMouseEnter={handleOpenMenu}
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                aria-label="View Specialized Divisions"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: isMenuOpen || ['/solis', '/sanyog', '/grid-apex', '/tvasta', '/emudran', '/agrim'].includes(pathname) ? '#8C6D23' : '#222222',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: isMenuOpen || ['/solis', '/sanyog', '/grid-apex', '/tvasta', '/emudran', '/agrim'].includes(pathname) ? 650 : 500,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                <ScrambleText text="Divisions" />
                <span
                  style={{
                    fontSize: '0.62rem',
                    padding: '1px 5px',
                    borderRadius: '9999px',
                    background: 'rgba(194, 159, 83, 0.18)',
                    color: '#8C6D23',
                    border: '1px solid rgba(194, 159, 83, 0.35)',
                    fontWeight: 700,
                  }}
                >
                  6
                </span>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            <span style={{ color: 'rgba(0, 0, 0, 0.18)' }}>/</span>
            <Link
              href="/solis"
              onClick={handleDismissMenu}
              aria-label="Solis Solar Division"
              style={{
                color: pathname === '/solis' ? '#8C6D23' : '#222222',
                fontWeight: pathname === '/solis' ? 650 : 500,
                textDecoration: 'none',
              }}
            >
              <ScrambleText text="Solis" />
            </Link>
            <span style={{ color: 'rgba(0, 0, 0, 0.18)' }}>/</span>
            <Link
              href="/#calculators"
              onClick={handleDismissMenu}
              aria-label="Field Calculators"
              style={{ color: '#222222', textDecoration: 'none' }}
            >
              <ScrambleText text="Estimators" />
            </Link>
            <span style={{ color: 'rgba(0, 0, 0, 0.18)' }}>/</span>
            <Link
              href="/studio"
              onClick={handleDismissMenu}
              aria-label="Practice, Leadership and Studio"
              style={{
                color: pathname === '/studio' ? '#8C6D23' : '#222222',
                fontWeight: pathname === '/studio' ? 650 : 500,
                textDecoration: 'none',
              }}
            >
              <ScrambleText text="Studio" />
            </Link>
          </nav>

          {/* Right: Phone Action, Menu Trigger & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Direct Telephone Action */}
            <a
              href="tel:+917021112664"
              aria-label="Call JC Apex Ventures"
              className="hidden lg:flex"
              style={{
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 500,
                color: '#111111',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <Phone size={13} color="#111111" />
              <span>+91 70211 12664</span>
            </a>

            {/* Enquire: jumps to this page's enquiry section (brand guidelines 2.8.2, replaces the concierge) */}
            <a
              href={enquireHref}
              onClick={handleDismissMenu}
              className="hidden md:inline-flex nav-enquire"
            >
              Enquire
            </a>

            {/* Mobile Menu Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
              className="flex md:hidden items-center justify-center shrink-0"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                color: '#111111',
                transition: 'all 0.2s ease',
                flexShrink: 0,
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

        {/* Authentic iOS Liquid Glass Dropdown Showcase for All 6 Divisions */}
        {isMenuOpen && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-[760px] max-w-[calc(100vw-32px)] z-50 pointer-events-auto"
            onMouseEnter={handleOpenMenu}
            onMouseLeave={handleCloseMenu}
          >
            <div
              className="p-4 sm:p-5 rounded-[26px]"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                animation: 'dropdownInnerFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {/* Popover Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/8 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#111111]">
                    The six divisions
                  </span>
                </div>
                <span className="text-[11px] text-[#666666] font-medium hidden sm:inline">
                  Each with its own inbox
                </span>
              </div>

              {/* 2-Column Grid of Elevated Division Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {divisions.map((div) => {
                  const isActive = pathname === div.href;
                  return (
                    <Link
                      key={div.href}
                      href={div.href}
                      onClick={handleDismissMenu}
                      className="flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 no-underline group relative overflow-hidden"
                      style={{
                        background: isActive
                          ? 'rgba(194, 159, 83, 0.14)'
                          : 'rgba(255, 255, 255, 0.65)',
                        border: isActive
                          ? '1px solid rgba(194, 159, 83, 0.50)'
                          : '1px solid rgba(255, 255, 255, 0.80)',
                      }}
                    >
                      {/* Authentic Brand Emblem */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-xs transition-transform duration-200 group-hover:scale-105"
                        style={{
                          backgroundColor: div.href === '/grid-apex' ? '#111111' : '#FFFFFF',
                          border: '1px solid rgba(0, 0, 0, 0.09)',
                        }}
                      >
                        <img
                          src={div.logo}
                          {...logoSize(div.logo)}
                          alt={`${div.label} official brand emblem`}
                          className="max-h-7 max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-xs font-bold text-[#111111] group-hover:text-[#C29F53] transition-colors flex items-center gap-1.5">
                            {div.label}
                            <span className="opacity-75 group-hover:opacity-100 transition-opacity">
                              {renderDivisionIcon(div.vectorIcon)}
                            </span>
                          </span>

                        </div>

                        <div className="text-[11px] text-[#4A4A46] mt-1 line-clamp-2 leading-snug">
                          {div.summary}
                        </div>
                      </div>

                      <ArrowUpRight
                        size={12}
                        className="text-[#666666] opacity-0 group-hover:opacity-100 group-hover:text-[#C29F53] transition-all shrink-0 mt-0.5"
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Popover Footer */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/8 px-1">
                <Link
                  href="/#calculators"
                  onClick={handleDismissMenu}
                  className="text-[11px] font-semibold text-[#555555] hover:text-[#111111] flex items-center gap-1 no-underline"
                >
                  <span>Interactive Field Calculators</span>
                  <ArrowUpRight size={11} />
                </Link>
                <Link
                  href="/studio"
                  onClick={handleDismissMenu}
                  className="text-[11px] font-semibold text-[#8C6D23] hover:underline flex items-center gap-1 no-underline"
                >
                  <span>Studio &amp; Practice Leadership</span>
                  <ArrowUpRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        )}
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
            padding: '108px 24px 40px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Mobile Top Quick Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '28px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '0.80rem',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.14)',
              }}
            >
              Home
            </Link>
            <Link
              href="/#projects"
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '0.80rem',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.14)',
              }}
            >
              Clients and projects
            </Link>
            <Link
              href="/#calculators"
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '0.80rem',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.14)',
              }}
            >
              Field Calculators
            </Link>
            <Link
              href="/studio"
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(194, 159, 83, 0.18)',
                color: '#C29F53',
                fontSize: '0.80rem',
                fontWeight: 600,
                border: '1px solid rgba(194, 159, 83, 0.35)',
              }}
            >
              Our studio
            </Link>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontVariantNumeric: 'tabular-nums',
                fontSize: '0.76rem',
                letterSpacing: '0',
                color: '#666666',
                marginBottom: '20px',
              }}
            >
              Direct Division Navigation (6 Specialized Practices)
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
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: '0.74rem',
                    color: '#C29F53',
                    marginBottom: '4px',
                  }}
                >
                  Practice &amp; Leadership
                </div>
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 500,
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  Our studio
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        color: '#FFFFFF',
                      }}
                    >
                      {div.label}
                    </div>
                    <div
                      style={{
                        fontSize: '0.82rem',
                        color: '#666666',
                        marginTop: '4px',
                        lineHeight: 1.4,
                      }}
                    >
                      {div.summary}
                    </div>
                  </div>
                  <div
                    style={{
                      height: '46px',
                      width: '64px',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      backgroundColor: div.href === '/grid-apex' ? '#1E1E1E' : '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.20)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={div.logo}
                      {...logoSize(div.logo)}
                      alt={`${div.label} official logo`}
                      style={{ maxHeight: '28px', maxWidth: '52px', objectFit: 'contain' }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '28px',
              marginTop: '36px',
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
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: '0.76rem',
                  color: '#C29F53',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>One International Centre, Mumbai (open in Google Maps)</span>
              </a>
              <div style={{ fontSize: '0.94rem', color: '#FFFFFF', marginTop: '4px' }}>
                {PROOF_LINE}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a
                href="tel:+917021112664"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                +91 70211 12664
              </a>
              <a
                href={enquireHref}
                onClick={() => setMobileOpen(false)}
                className="button is-icon is-alternate"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                <span>Enquire</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Phones only: a small WhatsApp button in the corner, clear of the content column. */}
      {!mobileOpen && (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-fab" aria-label="Message JC Apex Ventures on WhatsApp">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
          </svg>
        </a>
      )}
    </>
  );
}
