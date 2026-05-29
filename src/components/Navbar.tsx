"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Menu, X, ChevronDown } from 'lucide-react';

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

  const navLinks = [
    { href: '/#about', label: 'About Us' },
    { href: '/#expertise', label: 'Expertise' },
  ];

  const servicesLinks = [
    { href: '/print-management', label: 'Print Management & Design' },
    { href: '/licenses', label: 'Licences & Liaisoning' },
    { href: '/space-planning', label: 'Space Planning & Design' },
    { href: '/electricity-grievances', label: 'Electricity Grievances' },
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
          background: scrolled ? 'rgba(5, 10, 18, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo width={36} height={36} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.15rem',
                lineHeight: 1.1,
                letterSpacing: '0.5px',
              }}>
                JC APEX
              </span>
              <span style={{
                fontSize: '0.65rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
              }}>
                Ventures
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="desktop-nav">
            <Link
              href="/#about"
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                transition: 'color 0.3s ease',
              }}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)',
                fontFamily: 'inherit', transition: 'color 0.3s ease'
              }}>
                Divisions <ChevronDown size={14} style={{ transition: 'transform 0.3s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              
              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  paddingTop: '20px', minWidth: '260px'
                }}>
                  <div className="glass-panel" style={{
                    padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)', borderRadius: '16px'
                  }}>
                    {servicesLinks.map(link => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        style={{
                          padding: '12px 16px', borderRadius: '10px', fontSize: '0.9rem',
                          color: pathname === link.href ? 'var(--color-accent)' : 'var(--color-text-primary)',
                          background: pathname === link.href ? 'rgba(212,175,55,0.08)' : 'transparent',
                          transition: 'all 0.2s ease', display: 'block'
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
              href="/#expertise"
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                transition: 'color 0.3s ease',
              }}
            >
              Expertise
            </Link>

            <Link href="#contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
              <span>Get in Touch</span>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
            background: 'rgba(5, 10, 18, 0.95)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <Link href="/#about" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600 }}>About Us</Link>
          
          <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '12px 0', maxWidth: '200px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>Divisions</span>
            {servicesLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '12px 0', maxWidth: '200px' }} />
          
          <Link href="/#expertise" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600 }}>Expertise</Link>
          
          <Link href="#contact" className="btn-primary" style={{ marginTop: '24px' }}>
            <span>Get in Touch</span>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .dropdown-item:hover {
          background: rgba(255,255,255,0.05) !important;
          color: var(--color-accent) !important;
        }
      `}</style>
    </>
  );
}
