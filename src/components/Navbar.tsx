"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const divisions = [
    { href: '/solis', label: 'Solis', tag: 'Solar & Pergolas' },
    { href: '/sanyog', label: 'Sanyog', tag: 'Utility & CGRF' },
    { href: '/grid-apex', label: 'Grid Apex', tag: 'HT/LT & Waste Tech' },
    { href: '/tvasta', label: 'Tvasta', tag: 'Turnkey Interiors' },
    { href: '/emudran', label: 'eMudran', tag: 'Branding & Print' },
    { href: '/agrim', label: 'Agrim', tag: 'Project Finance Files' },
  ];

  return (
    <>
      {/* ===== MINIMALIST FLOATING ISLAND NAVIGATION ===== */}
      <div
        className="z-50"
        style={{
          position: 'fixed',
          top: scrolled ? '14px' : '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          width: 'calc(100% - 32px)',
          maxWidth: '1160px',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <header
          className="ios-glass"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 18px',
            borderRadius: '100px',
            background: 'rgba(17, 21, 26, 0.84)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            border: '1px solid rgba(194, 159, 83, 0.35)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 1.5px rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Brand Lockup */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              paddingRight: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Logo width={28} height={28} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                }}
              >
                JC APEX
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1,
                  marginTop: '3px',
                }}
              >
                Ventures
              </span>
            </div>
          </Link>

          {/* Center Navigation Capsule */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="desktop-nav hidden md:flex"
          >
            <Link
              href="/#about"
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                padding: '6px 14px',
                borderRadius: '100px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              className="nav-link-pill"
            >
              About
            </Link>

            {/* Division Switcher Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                className="nav-link-pill"
              >
                Divisions{' '}
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '12px',
                    minWidth: '340px',
                  }}
                >
                  <div
                    className="ios-glass"
                    style={{
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      borderRadius: '20px',
                      background: 'rgba(17, 21, 26, 0.94)',
                      border: '1px solid rgba(194, 159, 83, 0.35)',
                      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    {divisions.map((div) => {
                      const isActive = pathname === div.href;
                      return (
                        <Link
                          key={div.href}
                          href={div.href}
                          onClick={() => setDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            background: isActive ? 'rgba(194, 159, 83, 0.16)' : 'transparent',
                            transition: 'all 0.2s ease',
                          }}
                          className="division-dropdown-item"
                        >
                          <div>
                            <span
                              style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: isActive ? 'var(--color-accent)' : '#FFFFFF',
                              }}
                            >
                              {div.label}
                            </span>
                            <span
                              style={{
                                display: 'block',
                                fontSize: '0.74rem',
                                color: 'var(--color-text-muted)',
                              }}
                            >
                              {div.tag}
                            </span>
                          </div>
                          <ArrowUpRight size={14} color="var(--color-accent)" opacity={isActive ? 1 : 0.6} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dedicated Solis Highlight Pill */}
            <Link
              href="/solis"
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: pathname === '/solis' ? '#FFFFFF' : 'var(--color-text-secondary)',
                padding: '6px 14px',
                borderRadius: '100px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                background: pathname === '/solis' ? 'rgba(194, 159, 83, 0.2)' : 'transparent',
                border: pathname === '/solis' ? '1px solid rgba(194, 159, 83, 0.4)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
              className="nav-link-pill"
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  boxShadow: '0 0 8px var(--color-accent)',
                  display: 'inline-block',
                }}
              />
              Solis Solar
            </Link>

            <Link
              href="/#expertise"
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                padding: '6px 14px',
                borderRadius: '100px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              className="nav-link-pill"
            >
              Why Us
            </Link>
          </nav>

          {/* Right Action Cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="tel:+917021112664"
              className="desktop-nav"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '100px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease',
              }}
            >
              <Phone size={13} color="var(--color-accent)" />
              <span>+91 70211 12664</span>
            </a>

            <Link
              href="#contact"
              className="btn-primary specular-sheen"
              style={{
                padding: '8px 18px',
                fontSize: '0.82rem',
                borderRadius: '100px',
              }}
            >
              <span>Consult Desk</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle md:hidden"
              aria-label="Toggle navigation menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(10, 13, 16, 0.96)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '18px',
            padding: '24px',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <Logo width={44} height={44} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF' }}>
            JC APEX VENTURES
          </span>

          <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '8px 0', maxWidth: '260px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
              Strategic Divisions
            </span>
            {divisions.map((div) => (
              <Link
                key={div.href}
                href={div.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                }}
              >
                {div.label} ({div.tag})
              </Link>
            ))}
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '8px 0', maxWidth: '260px' }} />

          <a
            href="tel:+917021112664"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-accent)',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <Phone size={16} /> +91 70211 12664
          </a>

          <Link href="#contact" className="btn-primary" style={{ marginTop: '12px' }}>
            <span>Connect with Us</span>
          </Link>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        .nav-link-pill:hover {
          color: #FFFFFF !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
        .division-dropdown-item:hover {
          background: rgba(194, 159, 83, 0.14) !important;
        }
      `}</style>
    </>
  );
}
