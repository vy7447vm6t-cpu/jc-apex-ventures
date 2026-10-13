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
      className="ios-glass"
      style={{
        borderRadius: '24px',
        padding: '36px',
        background: 'rgba(17, 21, 26, 0.85)',
        border: '1px solid rgba(194, 159, 83, 0.35)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
        maxWidth: '960px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span
          style={{
            fontSize: '0.76rem',
            fontWeight: 700,
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          eMudran Live Production Estimator
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: '#FFFFFF',
            marginTop: '8px',
          }}
        >
          Calculate Print & Packaging Investment
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '620px',
            margin: '8px auto 0 auto',
          }}
        >
          Transparent pricing based on actual press capacity, paper stock, and specialty finishes.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px' }} className="calc-grid">
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* 1. Job Type */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
              Select Product Category:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
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
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: isSel ? '1px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSel ? 'rgba(194, 159, 83, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSel ? '#FFFFFF' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={18} color={isSel ? 'var(--color-accent)' : 'var(--color-text-muted)'} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Scale / Quantity */}
          {jobType === 'signage' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF' }}>Total Signage Area:</label>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-accent)' }}>{sqft} sq.ft.</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-accent)' }}
              />
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF' }}>Order Volume:</label>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-accent)' }}>{quantity} units</span>
              </div>
              <input
                type="range"
                min="250"
                max="5000"
                step="250"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-accent)' }}
              />
            </div>
          )}

          {/* 3. Finish Tier */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
              Finishing & Substrate Tier:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
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
                      padding: '10px 8px',
                      borderRadius: '12px',
                      border: isSel ? '1px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSel ? 'rgba(194, 159, 83, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSel ? '#FFFFFF' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <div>{f.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{f.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div
          className="ios-glass"
          style={{
            padding: '28px',
            borderRadius: '20px',
            background: 'rgba(10, 13, 16, 0.8)',
            border: '1px solid rgba(194, 159, 83, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.76rem', color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Estimated Investment
            </span>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.4rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginTop: '6px',
                lineHeight: 1.1,
              }}
            >
              Rs {estimate.total.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
              Unit cost: <strong style={{ color: '#FFFFFF' }}>{estimate.unitLabel}</strong> (indicative)
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--color-accent)" />
                <span>Production Turnaround: <strong style={{ color: '#FFFFFF' }}>{estimate.turnaround}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--color-accent)" />
                <span>Direct press-pass color calibration included</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--color-accent)" />
                <span>Creative Direction by Manish Ajgaonkar</span>
              </div>
            </div>
          </div>

          <a
            href="mailto:printmgmt@jcapexv.com?subject=Print%20Quotation%20Inquiry"
            className="btn-primary specular-sheen"
            style={{
              marginTop: '24px',
              padding: '12px 20px',
              borderRadius: '12px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.88rem',
            }}
          >
            <span>Request Press Proof & Formal Quotation <ArrowRight size={15} /></span>
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
