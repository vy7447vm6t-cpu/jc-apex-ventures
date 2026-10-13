"use client";

import React, { useState, useMemo } from 'react';
import { Printer, Package, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PrintCalculator() {
  const [jobType, setJobType] = useState<'brochure' | 'packaging' | 'signage'>('brochure');
  const [quantity, setQuantity] = useState<number>(1000);
  const [finishOption, setFinishOption] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [sqft, setSqft] = useState<number>(50);

  const estimate = useMemo(() => {
    let baseTotal = 0;
    let turnaround = '3 to 5 business days';
    let unitLabel = '';

    if (jobType === 'brochure') {
      const perUnitBase = finishOption === 'standard' ? 24 : finishOption === 'premium' ? 38 : 55;
      baseTotal = quantity * perUnitBase;
      unitLabel = `Rs ${(baseTotal / quantity).toFixed(1)} / copy`;
      turnaround = quantity > 2000 ? '5 to 7 business days' : '3 to 4 business days';
    } else if (jobType === 'packaging') {
      const perBoxBase = finishOption === 'standard' ? 42 : finishOption === 'premium' ? 68 : 110;
      baseTotal = quantity * perBoxBase;
      unitLabel = `Rs ${(baseTotal / quantity).toFixed(1)} / carton`;
      turnaround = '7 to 10 business days';
    } else {
      // Signage per sq.ft.
      const perSqftRate = finishOption === 'standard' ? 140 : finishOption === 'premium' ? 260 : 420;
      baseTotal = sqft * perSqftRate;
      unitLabel = `Rs ${perSqftRate} / sq.ft.`;
      turnaround = '4 to 6 business days';
    }

    return {
      total: baseTotal,
      unitLabel,
      turnaround,
    };
  }, [jobType, quantity, finishOption, sqft]);

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 44px)',
        background: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.06)',
        maxWidth: '1040px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#C29F53',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: 'var(--font-mono, monospace)',
            display: 'inline-block',
            marginBottom: '8px',
          }}
        >
          [emudran print &amp; packaging estimator]
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
            fontWeight: 400,
            color: '#111111',
            letterSpacing: '-0.02em',
            margin: '0 0 8px 0',
            lineHeight: 1.15,
          }}
        >
          Calculate Print &amp; Packaging Investment
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
            fontSize: '0.96rem',
            color: '#555555',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Transparent pricing based on actual press capacity, paper stock, and specialty finishes.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px' }} className="calc-grid">
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 1. Job Type */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#111111', marginBottom: '10px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
              Select Product Category:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'brochure', label: 'Brochures & Catalogues', icon: Printer },
                { id: 'packaging', label: 'Box & Packaging', icon: Package },
                { id: 'signage', label: 'Signage & Displays', icon: Sparkles },
              ].map((t) => {
                const Icon = t.icon;
                const isSel = jobType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setJobType(t.id as any)}
                    style={{
                      padding: '14px 10px',
                      borderRadius: '14px',
                      border: isSel ? '1.5px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                      background: isSel ? '#111111' : '#FFFFFF',
                      color: isSel ? '#FFFFFF' : '#333333',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      boxShadow: isSel ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none',
                    }}
                  >
                    <Icon size={18} color={isSel ? '#C29F53' : '#666666'} />
                    <span style={{ textAlign: 'center' }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Scale / Quantity */}
          {jobType === 'signage' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                  Total Signage Area:
                </label>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#C29F53', fontFamily: 'var(--font-mono, monospace)' }}>
                  {sqft} sq.ft.
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#C29F53' }}
              />
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                  Order Volume:
                </label>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#C29F53', fontFamily: 'var(--font-mono, monospace)' }}>
                  {quantity} units
                </span>
              </div>
              <input
                type="range"
                min="250"
                max="5000"
                step="250"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#C29F53' }}
              />
            </div>
          )}

          {/* 3. Finish Tier */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#111111', marginBottom: '10px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
              Finishing &amp; Substrate Tier:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'standard', title: 'Standard', desc: 'Durable offset' },
                { id: 'premium', title: 'Premium', desc: 'Matte thermal + UV' },
                { id: 'luxury', title: 'Luxury', desc: 'Foil stamping & emboss' },
              ].map((f) => {
                const isSel = finishOption === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinishOption(f.id as any)}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '14px',
                      border: isSel ? '1.5px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                      background: isSel ? '#111111' : '#FFFFFF',
                      color: isSel ? '#FFFFFF' : '#333333',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      boxShadow: isSel ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none',
                    }}
                  >
                    <div>{f.title}</div>
                    <div style={{ fontSize: '0.7rem', color: isSel ? 'rgba(255, 255, 255, 0.7)' : '#777777', marginTop: '2px' }}>
                      {f.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div
          style={{
            padding: '30px',
            borderRadius: '20px',
            background: '#FAF8F5',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.76rem',
                color: '#C29F53',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'var(--font-mono, monospace)',
                display: 'block',
              }}
            >
              [estimated investment]
            </span>
            <div
              style={{
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)',
                fontWeight: 400,
                color: '#111111',
                marginTop: '6px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Rs {estimate.total.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.86rem', color: '#555555', marginTop: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
              Unit cost: <strong style={{ color: '#111111' }}>{estimate.unitLabel}</strong> (indicative)
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(0, 0, 0, 0.08)', margin: '20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#444444', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                <CheckCircle2 size={16} color="#C29F53" />
                <span>Production Turnaround: <strong style={{ color: '#111111' }}>{estimate.turnaround}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#444444', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                <CheckCircle2 size={16} color="#C29F53" />
                <span>Direct press-pass color calibration included</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: '#444444', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                <CheckCircle2 size={16} color="#C29F53" />
                <span>Creative Direction by Manish Ajgaonkar</span>
              </div>
            </div>
          </div>

          <a
            href="mailto:printmgmt@jcapexv.com?subject=Print%20Quotation%20Inquiry"
            style={{
              marginTop: '28px',
              padding: '14px 20px',
              borderRadius: '12px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: '#111111',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              transition: 'background 0.2s ease',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            <span>Request Press Proof &amp; Formal Quotation</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
