"use client";

import React, { useState } from 'react';
import SolarCalculator from '@/components/SolarCalculator';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';

export default function GroundedCalculators() {
  const [activeTab, setActiveTab] = useState<'solar' | 'print' | 'interior'>('solar');

  return (
    <section id="calculators" className="section" style={{ backgroundColor: 'var(--color-grounded-stone)', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
          <span className="text-eye-brow">[field engineering estimators]</span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '960px', marginBottom: '40px' }}>
          <h3
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Interactive Project Estimators
          </h3>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#666666',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Compute rooftop solar pergola sizing, packaging production volumes, or commercial space planning budgets using our verified mathematical schedules.
          </p>
        </div>

        {/* Grounded Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}
        >
          {[
            { id: 'solar', label: '(01) Solar & Walkable Pergola (Solis)' },
            { id: 'print', label: '(02) Print & Packaging Run (eMudran)' },
            { id: 'interior', label: '(03) Commercial Interior Fit-Out (Tvasta)' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: isActive ? '#111111' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#444444',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Calculator Mounting Surface */}
        <div className="grounded-calculator-wrapper">
          {activeTab === 'solar' && <SolarCalculator />}
          {activeTab === 'print' && <PrintCalculator />}
          {activeTab === 'interior' && <InteriorCalculator />}
        </div>
      </div>
    </section>
  );
}
