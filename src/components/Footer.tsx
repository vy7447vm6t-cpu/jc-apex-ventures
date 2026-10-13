"use client";

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#111111',
        color: '#FFFFFF',
        padding: '100px 24px 48px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 10,
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
            paddingBottom: '48px',
            marginBottom: '60px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <Logo width={32} height={32} />
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
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.72)',
                maxWidth: '480px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Multi-disciplinary engineering, utility liaisoning, solar EPC, interior fit-outs, and corporate packaging consortium headquartered in Mumbai.
            </p>
          </div>

          <div>
            <a
              href="mailto:admin@jcapexv.com"
              className="button is-icon"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#111111',
                padding: '0.85rem 1.6rem',
              }}
            >
              <span>Initiate Consultation</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          {/* Column 1: Divisions */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#888888',
                marginBottom: '18px',
              }}
            >
              Practice Divisions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/solis" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.94rem' }}>
                Solis (Rooftop Solar & Pergolas)
              </Link>
              <Link href="/sanyog" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Sanyog (Utility Liaisoning & CGRF)
              </Link>
              <Link href="/grid-apex" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Grid Apex (Substations & Switchgear)
              </Link>
              <Link href="/tvasta" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Tvasta (Corporate Interior Fit-outs)
              </Link>
              <Link href="/emudran" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                eMudran (Luxury Packaging & Print)
              </Link>
              <Link href="/agrim" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.94rem' }}>
                Agrim (Project Finance Advisory)
              </Link>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#888888',
                marginBottom: '18px',
              }}
            >
              Direct Channels
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.94rem', color: '#FFFFFF', fontWeight: 500 }}>
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
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#888888',
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
                <span>One International Centre, Tower 1,</span><br />
                <span>8th Floor, Units 801-802,</span><br />
                <span>Senapati Bapat Marg,</span><br />
                <span>Elphinstone, Mumbai 400013</span>
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: '#C29F53',
                    marginTop: '6px',
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
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#888888',
                marginBottom: '18px',
              }}
            >
              Statutory Transparency
            </div>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              On-site physical installation, electrical contracting, and fabrication works are executed by vetted, licensed partners under direct engineering supervision.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.76rem',
                color: '#C29F53',
              }}
            >
              36+ Years Direct Utility Practice
            </div>
          </div>
        </div>

        {/* Bottom Statutory Row */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.55)',
            fontFamily: 'var(--font-mono, monospace)',
          }}
          className="text-xs text-muted"
        >
          <div>
            &copy; 2026 JC Apex Ventures (OPC) Private Limited. All rights reserved.
          </div>
          <div>
            CIN (MCA): U70200MH2023OPC411326
          </div>
        </div>
      </div>
    </footer>
  );
}
