"use client";

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" style={{
      borderTop: '1px solid var(--color-border)',
      padding: '80px 0 40px 0',
      background: 'rgba(255,255,255,0.015)',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '60px',
        marginBottom: '60px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Logo width={32} height={32} />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>
              JC APEX VENTURES
            </span>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '300px' }}>
            Infrastructure. Finance. Licensing. Growth.<br />
            When Values Drive the Journey, Destinations Become Divine.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.85rem', marginBottom: '20px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
            Quick Links
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
            <Link href="/#about" style={{ display: 'inline-block' }}>About Us</Link>
            <Link href="/#services" style={{ display: 'inline-block' }}>Services Hub</Link>
            <Link href="/#expertise" style={{ display: 'inline-block' }}>Expertise</Link>
            <Link href="/#contact" style={{ display: 'inline-block' }}>Getting Started</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.85rem', marginBottom: '20px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Jitendra Chavan</p>
            <a href="tel:+917021112664" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} color="var(--color-accent)" /> +91 70211 12664
            </a>
            <a href="mailto:admin@jcapexv.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} color="var(--color-accent)" /> admin@jcapexv.com
            </a>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.85rem', marginBottom: '20px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
            Office
          </h4>
          <div style={{ display: 'flex', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
            <MapPin size={16} color="var(--color-accent)" style={{ marginTop: '4px', flexShrink: 0 }} />
            <p style={{ lineHeight: 1.6 }}>
              Unit 801-802, 8th Floor,<br />
              One International Centre, Tower 1,<br />
              Senapati Bapat Marg,<br />
              Elphinstone, Mumbai 400013
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
      }}>
        <p>&copy; {new Date().getFullYear()} JC Apex Ventures (OPC) Pvt. Ltd.</p>
        <p>CIN registered under MCA, India | PAN | TAN</p>
      </div>
    </footer>
  );
}
