"use client";

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" style={{
      borderTop: '1px solid var(--color-border)',
      padding: '80px 0 40px 0',
      background: 'var(--color-bg-alt)',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '48px',
        marginBottom: '60px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Logo width={34} height={34} />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
              JC APEX VENTURES
            </span>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, maxWidth: '340px', marginBottom: '16px' }}>
            A consultancy group based in Mumbai. Six focused divisions across electricity liaisoning, electrical contracting, rooftop solar, interior design, branding and print, and project finance paperwork.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
            On-site engineering, installation and fabrication work is carried out by vetted, licensed partner contractors.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', marginBottom: '20px', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
            Our Divisions & Hubs
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '0.92rem', fontWeight: 500 }}>
            <Link href="/solis" style={{ color: 'var(--color-accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              SOLIS (Solar EPC & EV Hub) <ArrowRight size={13} />
            </Link>
            <Link href="/sanyog">SANYOG (Utility Liaison & Licences)</Link>
            <Link href="/grid-apex">GRID APEX (Electrical & Waste Systems)</Link>
            <Link href="/tvasta">TVASTA (Interiors & Turnkey Fit-out)</Link>
            <Link href="/emudran">eMUDRAN (Branding & Luxury Print)</Link>
            <Link href="/agrim">AGRIM (Project Finance Paperwork)</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', marginBottom: '20px', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
            Contact & Office
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
            <p style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>Jitendra Chavan, Director</p>
            <a href="tel:+917021112664" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} color="var(--color-accent)" /> +91 70211 12664
            </a>
            <a href="mailto:Solis@jcapexv.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} color="var(--color-accent)" /> Solis@jcapexv.com (Solar & EV)
            </a>
            <a href="mailto:admin@jcapexv.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} color="var(--color-accent)" /> admin@jcapexv.com
            </a>
            <a href="mailto:emudran@jcapexv.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} color="var(--color-accent)" /> emudran@jcapexv.com
            </a>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', marginBottom: '20px', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
            Registered Office
          </h4>
          <div style={{ display: 'flex', gap: '10px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
            <MapPin size={18} color="var(--color-accent)" style={{ marginTop: '3px', flexShrink: 0 }} />
            <p style={{ lineHeight: 1.65 }}>
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
        fontSize: '0.82rem',
      }}>
        <p>&copy; {new Date().getFullYear()} JC Apex Ventures (OPC) Pvt. Ltd.</p>
        <p>CIN: U70200MH2023OPC411326 | Registered with Ministry of Corporate Affairs, India</p>
      </div>
    </footer>
  );
}
