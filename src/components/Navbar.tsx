"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

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

  const servicesLinks = [
    { href: '/solis', label: 'SOLIS (Solar Pergolas & EV Hubs)' },
    { href: '/sanyog', label: 'SANYOG (Utility Liaison & Licences)' },
    { href: '/grid-apex', label: 'GRID APEX (HT/LT Electrical & Waste Tech)' },
    { href: '/tvasta', label: 'TVASTA (Turnkey Interiors & Fit-out)' },
    { href: '/emudran', label: 'eMUDRAN (Branding & Luxury Print)' },
    { href: '/agrim', label: 'AGRIM (Project Finance Paperwork)' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled ? 'rgba(255, 255, 255, 0.84)' : 'rgba(255, 255, 255, 0.58)',
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          borderBottom: scrolled ? '1px solid rgba(232, 228, 218, 0.85)' : '1px solid transparent',
          padding: scrolled ? '12px 0' : '18px 0',
          boxShadow: scrolled ? '0 4px 24px -2px rgba(20, 23, 26, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.95)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <Logo width={36} height={36} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.2rem',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--color-text-primary)'
              }}>
                JC APEX
              </span>
              <span style={{
                fontSize: '0.66rem',
                color: 'var(--color-accent)',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
              }}>
                Ventures
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
            <Link
              href="/#about"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                transition: 'color 0.2s ease',
              }}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                fontFamily: 'inherit', transition: 'color 0.2s ease',
                padding: '4px 0',
              }}>
                Six Divisions <ChevronDown size={14} style={{ transition: 'transform 0.3s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              
              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  paddingTop: '16px', minWidth: '320px'
                }}>
                  <div
                    className="ios-glass"
                    style={{
                      padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px',
                      borderRadius: '18px'
                    }}
                  >
                    {servicesLinks.map(link => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        style={{
                          padding: '10px 14px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600,
                          color: pathname === link.href ? 'var(--color-accent)' : 'var(--color-text-primary)',
                          background: pathname === link.href ? 'var(--color-accent-pale)' : 'transparent',
                          transition: 'all 0.2s ease', display: 'block', textDecoration: 'none'
                        }}
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/solis"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: pathname === '/solis' ? 'var(--color-accent)' : 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s ease',
                textDecoration: 'none',
              }}
            >
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                display: 'inline-block',
              }} />
              Solis Solar Hub
            </Link>

            <Link
              href="/#expertise"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                transition: 'color 0.2s ease',
              }}
            >
              Why Us
            </Link>

            <a href="tel:+917021112664" className="btn-outline ios-glass-pill" style={{ padding: '8px 18px', fontSize: '0.86rem' }}>
              <Phone size={14} color="var(--color-accent)" /> +91 70211 12664
            </a>

            <Link href="#contact" className="btn-primary specular-sheen" style={{ padding: '9px 22px', fontSize: '0.88rem' }}>
              <span>Get in Touch</span>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(251, 251, 250, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            padding: '24px',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <Link href="/#about" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>About Us</Link>
          
          <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '8px 0', maxWidth: '240px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Six Divisions</span>
            {servicesLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-secondary)', textAlign: 'center' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '8px 0', maxWidth: '240px' }} />
          
          <Link
            href="/solis"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Solis Solar Hub & Calculator
          </Link>

          <Link href="#contact" className="btn-primary" style={{ marginTop: '16px' }}>
            <span>Get in Touch</span>
          </Link>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .dropdown-item:hover {
          background: var(--color-accent-pale) !important;
          color: var(--color-accent) !important;
        }
      `}</style>
    </>
  );
}
