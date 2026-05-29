"use client";

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { MessageCircle, ArrowUpRight, X } from 'lucide-react';

const tips = [
  "Looking for engineering or infrastructure partners? We bring the right teams together.",
  "Need help with MCGM, BEST, or municipal compliance? That's our speciality.",
  "From project financing to credit appraisal, we handle the financial complexity.",
  "Electrical contracts, renewable energy, interior fit-outs — one point of contact.",
];

export default function Clippy() {
  const [open, setOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [open]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Chat bubble */}
      <div
        style={{
          background: 'rgba(10, 19, 34, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--color-border-accent)',
          padding: open ? '20px' : '0px',
          borderRadius: '16px 16px 4px 16px',
          color: 'var(--color-text-primary)',
          fontSize: '0.9rem',
          width: open ? '280px' : '0px',
          maxHeight: open ? '300px' : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'bottom right',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '0.95rem' }}>
            JC Apex
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '2px' }}
          >
            <X size={16} />
          </button>
        </div>

        <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
          {tips[tipIndex]}
        </p>

        <a
          href="#contact"
          onClick={() => setOpen(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '16px',
            color: 'var(--color-accent)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Talk to us <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: open
            ? 'linear-gradient(135deg, var(--color-accent), #B8962E)'
            : 'var(--color-bg-elevated)',
          border: `1px solid ${open ? 'transparent' : 'var(--color-border-accent)'}`,
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: open
            ? '0 0 24px rgba(212, 175, 55, 0.35)'
            : '0 4px 16px rgba(0,0,0,0.5)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: open ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {open ? (
          <X size={22} color="var(--color-bg)" />
        ) : (
          <MessageCircle size={22} color="var(--color-accent)" />
        )}
      </button>
    </div>
  );
}
