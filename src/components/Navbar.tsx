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
  const [mumbaiTime, setMumbaiTime] = useState<string>('MUMBAI IST --:--:--');
  const pathname = usePathname();
  const lastScrollY = React.useRef(0);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);

  const isMenuOpen = divisionsHover || divisionsOpen;

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
      setDivisionsOpen(false);
    }, 280);
  };

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (isMenuOpen) {
      setDivisionsHover(false);
      setDivisionsOpen(false);
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
    handleDismissMenu();
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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
    {
      href: '/solis',
      label: 'Solis',
      domainTag: 'Bespoke Solar & Elevated Pergolas',
      keyMetric: '0 to 500 kWp | PM Surya Ghar',
      summary: 'Turnkey rooftop PV arrays, walkable terrace pergolas, and net metering liaisoning.',
      logo: '/images/logos/solis-official.png',
      logoDark: '/images/logos/solis-logo-white.png',
      bg: '#FFFFFF',
      accent: '#1E3FD8',
      tag: 'Solar & Pergolas',
      vectorIcon: 'sun',
    },
    {
      href: '/grid-apex',
      label: 'Grid Apex',
      domainTag: 'High-Tension Substations & Grid',
      keyMetric: '11kV/33kV | MPCB & CEA',
      summary: 'Turnkey 11kV/33kV substation bays, vacuum switchgear panels, and CEA compliance.',
      logo: '/images/logos/grid-apex-official.png',
      logoDark: '/images/logos/grid-apex-white.png',
      bg: '#111111',
      accent: '#0284C7',
      tag: 'HT/LT & Substations',
      vectorIcon: 'zap',
    },
    {
      href: '/tvasta',
      label: 'Tvasta',
      domainTag: 'Turnkey Architecture & Space Planning',
      keyMetric: 'STC 52 | Turnkey Fit-Outs',
      summary: 'Turnkey interior fit-outs, 3D space planning, modular joinery, and STC acoustic partitioning.',
      logo: '/images/logos/tvasta-dark.png',
      logoDark: '/images/logos/tvasta-official.png',
      bg: '#FFFFFF',
      accent: '#D72A1B',
      tag: 'Turnkey Interiors',
      vectorIcon: 'layout',
    },
    {
      href: '/sanyog',
      label: 'Sanyog',
      domainTag: 'HT/LT Regulatory Liaisoning',
      keyMetric: '36+ Years Utility Authority',
      summary: 'MERC regulatory appeals, sanctioned load upgrades, and statutory electricity grievance resolution.',
      logo: '/images/logos/sanyog-official.png',
      logoDark: '/images/logos/sanyog-official.png',
      bg: '#FFFFFF',
      accent: '#2C5ED4',
      tag: 'Utility & CGRF',
      vectorIcon: 'plug',
    },
    {
      href: '/emudran',
      label: 'eMudran',
      domainTag: 'CMYK & Digital Stamping',
      keyMetric: 'Heidelberg Offset | 1200 GSM',
      summary: 'Luxury rigid presentation boxes, micro-foil thermal stamping, and architectural corporate signage.',
      logo: '/images/logos/emudran-official.png',
      logoDark: '/images/logos/emudran-white.png',
      bg: '#FFFFFF',
      accent: '#4338CA',
      tag: 'Branding & Print',
      vectorIcon: 'printer',
    },
    {
      href: '/agrim',
      label: 'Agrim',
      domainTag: 'Agro-Infrastructure & Project Advisory',
      keyMetric: 'Bankable DPRs | DSCR Modeling',
      summary: 'Bankable DPR file assembly, financial feasibility modeling, and agro-infrastructure advisory.',
      logo: '/images/logos/agrim-dark.png',
      logoDark: '/images/logos/agrim-official.png',
      bg: '#FFFFFF',
      accent: '#047857',
      tag: 'Project Advisory',
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
          className="kokonut-nav-pill ios-glass backdrop-blur-md relative"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 18px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(246, 244, 238, 0.52) 100%)',
            backdropFilter: 'blur(32px) saturate(210%)',
            WebkitBackdropFilter: 'blur(32px) saturate(210%)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 16px 40px -6px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.04), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
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
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
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
              aria-label="View Builds and Projects"
              style={{ color: '#222222', textDecoration: 'none' }}
            >
              <ScrambleText text="Builds" />
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
                  color: isMenuOpen || ['/solis', '/sanyog', '/grid-apex', '/tvasta', '/emudran', '/agrim'].includes(pathname) ? '#8C733E' : '#222222',
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
                    color: '#8C733E',
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
              aria-label="Solis Solar Division"
              style={{
                color: pathname === '/solis' ? '#8C733E' : '#222222',
                fontWeight: pathname === '/solis' ? 650 : 500,
                textDecoration: 'none',
              }}
            >
              <ScrambleText text="Solis" />
            </Link>
            <span style={{ color: 'rgba(0, 0, 0, 0.18)' }}>/</span>
            <Link
              href="/#calculators"
              aria-label="Field Calculators"
              style={{ color: '#222222', textDecoration: 'none' }}
            >
              <ScrambleText text="Estimators" />
            </Link>
            <span style={{ color: 'rgba(0, 0, 0, 0.18)' }}>/</span>
            <Link
              href="/studio"
              aria-label="Practice, Leadership and Studio"
              style={{
                color: pathname === '/studio' ? '#8C733E' : '#222222',
                fontWeight: pathname === '/studio' ? 650 : 500,
                textDecoration: 'none',
              }}
            >
              <ScrambleText text="Studio" />
            </Link>
          </nav>

          {/* Right: Live Mumbai Clock, Phone Action, Menu Trigger & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Live Mumbai Clock in KokonutUI Liquid Glass Pill */}
            <div
              className="mumbai-clock hidden xl:flex"
              style={{
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.75)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0, 0, 0, 0.04)',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontVariantNumeric: 'tabular-nums',
                fontSize: '0.68rem',
                letterSpacing: '0.04em',
                color: '#222222',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  boxShadow: '0 0 6px rgba(22, 163, 74, 0.6)',
                  display: 'inline-block',
                }}
              />
              <span>{mumbaiTime}</span>
            </div>

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
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.75)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0, 0, 0, 0.04)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <Phone size={13} color="#111111" />
              <span>+91 70211 12664</span>
            </a>

            {/* Consultation Action Button with KokonutUI Liquid Glass */}
            <a
              href="#contact"
              aria-label="Consultation Enquiry"
              className="hidden md:inline-flex specular-sheen"
              style={{
                alignItems: 'center',
                gap: '6px',
                padding: '7px 18px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 600,
                backgroundColor: '#111111',
                color: '#FFFFFF',
                borderRadius: '9999px',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <ScrambleText text="Consultation" />
              <ArrowUpRight size={14} color="#C29F53" />
            </a>

            {/* Mobile Menu Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
              className="flex md:hidden items-center justify-center shrink-0"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.75)',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
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
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 244, 238, 0.75) 100%)',
                backdropFilter: 'blur(24px) saturate(190%)',
                WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                border: '1px solid rgba(255, 255, 255, 0.85)',
                boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.06), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Popover Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/8 px-1">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#16A34A',
                      boxShadow: '0 0 8px rgba(22, 163, 74, 0.6)',
                      display: 'inline-block',
                    }}
                  />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#111111]">
                    Consortium Operating Divisions
                  </span>
                </div>
                <span className="text-[11px] text-[#666666] font-medium hidden sm:inline">
                  Direct Access to 6 Specialized Engineering Practices
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
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: isActive
                          ? '1px solid rgba(194, 159, 83, 0.50)'
                          : '1px solid rgba(255, 255, 255, 0.80)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
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
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md"
                            style={{
                              backgroundColor: 'rgba(0, 0, 0, 0.05)',
                              color: '#555555',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {div.keyMetric}
                          </span>
                        </div>

                        <div className="text-[10.5px] font-medium text-[#222222] mt-0.5 leading-snug truncate">
                          {div.domainTag}
                        </div>

                        <div className="text-[9.5px] text-[#666666] mt-1 line-clamp-1 leading-normal">
                          {div.summary}
                        </div>
                      </div>

                      <ArrowUpRight
                        size={12}
                        className="text-[#999999] opacity-0 group-hover:opacity-100 group-hover:text-[#C29F53] transition-all shrink-0 mt-0.5"
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
                  className="text-[11px] font-semibold text-[#8C733E] hover:underline flex items-center gap-1 no-underline"
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
              Builds &amp; Projects
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
              Studio Dossier
            </Link>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontVariantNumeric: 'tabular-nums',
                fontSize: '0.76rem',
                letterSpacing: '0.08em',
                color: '#888888',
                textTransform: 'uppercase',
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.72rem',
                          color: '#C29F53',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {div.domainTag}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.10)',
                          color: '#DDDDDD',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {div.keyMetric}
                      </span>
                    </div>
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
                        color: '#999999',
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
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontVariantNumeric: 'tabular-nums',
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
