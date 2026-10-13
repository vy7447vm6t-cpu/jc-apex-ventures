"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { X, ArrowUpRight, Phone, MessageSquare, Sun, FileText, Wrench, Palette, Sparkles } from 'lucide-react';

const divisionShortcuts = [
  { label: 'Solis Rooftop Solar & Pergola', href: '/solis', icon: Sun, desc: 'Calculate solar savings, pergola feasibility & subsidy' },
  { label: 'Sanyog Utility & CGRF Liaison', href: '/sanyog', icon: FileText, desc: 'Resolve power tariff disputes & sanctioned load changes' },
  { label: 'Grid Apex HT/LT & Waste Tech', href: '/grid-apex', icon: Wrench, desc: 'Heavy industrial power setups & patented zero-energy waste' },
  { label: 'Tvasta Turnkey Interior Fit-out', href: '/tvasta', icon: Palette, desc: 'Space planning, CAD drawings & 3-tier finishing' },
  { label: 'eMudran Branding & Packaging', href: '/emudran', icon: Sparkles, desc: 'Corporate brochures, box cartons & architectural signage' },
];

export default function Clippy() {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Guidance Hub Flyout */}
      {open && (
        <div
          className="ios-glass"
          style={{
            width: '360px',
            maxWidth: 'calc(100vw - 48px)',
            borderRadius: '24px',
            background: 'rgba(17, 21, 26, 0.94)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            border: '1px solid rgba(194, 159, 83, 0.4)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px rgba(255, 255, 255, 0.15)',
            padding: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(194, 159, 83, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Logo width={22} height={22} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    display: 'block',
                    lineHeight: 1.1,
                  }}
                >
                  JC Apex Desk Guide
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                  Select your requirement
                </span>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#FFFFFF',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Close assistant"
            >
              <X size={15} />
            </button>
          </div>

          {/* Quick Division Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
            {divisionShortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.2s ease',
                  }}
                  className="clippy-item"
                >
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: 'rgba(194, 159, 83, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} color="var(--color-accent)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--color-text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '2px',
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <ArrowUpRight size={13} color="var(--color-accent)" opacity={0.6} />
                </Link>
              );
            })}
          </div>

          {/* Direct Callback Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <a
              href="tel:+917021112664"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
              }}
            >
              <Phone size={13} color="var(--color-accent)" /> Call Desk
            </a>
            <a
              href="https://wa.me/917021112664?text=Hello%20JC%20Apex%20Ventures,%20I%20would%20like%20to%20inquire%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'rgba(37, 211, 102, 0.18)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                textDecoration: 'none',
              }}
            >
              <MessageSquare size={13} color="#25D366" /> WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating Animated Mascot Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open JC Apex Assistant"
        className="ios-glass"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(194, 159, 83, 0.5)',
          background: 'rgba(17, 21, 26, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5), inset 0 1px 1.5px rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: open ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {open ? (
          <X size={22} color="#FFFFFF" />
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo width={32} height={32} />
            <span
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#D4AF37',
                boxShadow: '0 0 8px #D4AF37',
              }}
            />
          </div>
        )}
      </button>

      <style jsx global>{`
        .clippy-item:hover {
          background: rgba(194, 159, 83, 0.12) !important;
          border-color: rgba(194, 159, 83, 0.3) !important;
        }
      `}</style>
    </div>
  );
}
