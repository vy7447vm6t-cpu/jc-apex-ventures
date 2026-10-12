"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUpRight, X } from 'lucide-react';

const tips = [
  "Dealing with electricity bills or connection changes? SANYOG handles the utility paperwork.",
  "Planning rooftop solar, pergolas, or EV chargers? Solis designs, liaisons, and manages EPC execution.",
  "Need HT/LT electrical panels, wiring, or waste treatment? GRID APEX coordinates certified contractors.",
  "Need interior space planning or turnkey flat fit-out? TVASTA architects design and manage the work.",
  "Looking for logo design, packaging or signboards? eMUDRAN prints and installs under one roof.",
  "Need help preparing a project loan file? AGRIM compiles the papers for your chosen bank or lender.",
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
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--color-border-accent-light)',
          padding: open ? '20px' : '0px',
          borderRadius: '16px 16px 4px 16px',
          color: 'var(--color-text-primary)',
          fontSize: '0.9rem',
          width: open ? '290px' : '0px',
          maxHeight: open ? '320px' : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'bottom right',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-text-primary)' }}>
            JC Apex Assistant
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '2px' }}
          >
            <X size={16} />
          </button>
        </div>

        <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-secondary)', fontSize: '0.86rem' }}>
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
            fontWeight: 700,
            fontSize: '0.86rem',
            textDecoration: 'none',
          }}
        >
          Talk to us <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open assistant"
        style={{
          background: open ? 'var(--color-accent)' : '#FFFFFF',
          border: '1px solid var(--color-border-accent-light)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-lg)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: open ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {open ? (
          <X size={22} color="#FFFFFF" />
        ) : (
          <MessageCircle size={22} color="var(--color-accent)" />
        )}
      </button>
    </div>
  );
}
