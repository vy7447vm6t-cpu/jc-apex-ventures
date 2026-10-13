"use client";

import React, { useState, useMemo } from 'react';
import { Home, Building2, CheckCircle2, ArrowRight, Palette, Layers, Clock } from 'lucide-react';

export default function InteriorCalculator() {
  const [propertyType, setPropertyType] = useState<'2bhk' | '3bhk' | 'commercial'>('2bhk');
  const [area, setArea] = useState<number>(850);
  const [tier, setTier] = useState<'standard' | 'premium' | 'luxury'>('premium');

  const estimate = useMemo(() => {
    let ratePerSqft = 2800;
    let days = 60;

    if (tier === 'standard') {
      ratePerSqft = 1850;
      days = area > 1200 ? 55 : 45;
    } else if (tier === 'premium') {
      ratePerSqft = 2850;
      days = area > 1200 ? 75 : 60;
    } else {
      ratePerSqft = 4400;
      days = area > 1200 ? 110 : 90;
    }

    const total = area * ratePerSqft;

    return {
      total,
      ratePerSqft,
      timeline: `${days} days turnkey execution`,
    };
  }, [propertyType, area, tier]);

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
          TVASTA Turnkey Cost Estimator
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
          Plan Your Interior & Space Planning Budget
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
          Select your usable floor space and preferred finishing tier for transparent turnkey cost estimation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px' }} className="calc-grid">
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Property Type */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
              Property Configuration:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: '2bhk', label: '2 BHK Flat', defaultArea: 850 },
                { id: '3bhk', label: '3 BHK Flat', defaultArea: 1350 },
                { id: 'commercial', label: 'Commercial Office', defaultArea: 1800 },
              ].map((p) => {
                const isSel = propertyType === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPropertyType(p.id as any);
                      setArea(p.defaultArea);
                    }}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: isSel ? '1px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSel ? 'rgba(194, 159, 83, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSel ? '#FFFFFF' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carpet Area Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF' }}>Usable Carpet Area:</label>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-accent)' }}>{area} sq.ft.</span>
            </div>
            <input
              type="range"
              min="400"
              max="3500"
              step="50"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-accent)' }}
            />
          </div>

          {/* Three Tiers */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
              Select Finishing Tier:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'standard', name: 'Standard', rate: 'Rs 1,850/sqft', desc: 'Durable essential modular' },
                { id: 'premium', name: 'Premium', rate: 'Rs 2,850/sqft', desc: 'Curated veneers & MEP' },
                { id: 'luxury', name: 'Luxury', rate: 'Rs 4,400/sqft', desc: 'Italian marble & bespoke' },
              ].map((t) => {
                const isSel = tier === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id as any)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: isSel ? '1px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSel ? 'rgba(194, 159, 83, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSel ? '#FFFFFF' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isSel ? '#FFFFFF' : 'inherit' }}>{t.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2px' }}>{t.rate}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{t.desc}</div>
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
              Estimated Turnkey Budget
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
              Base rate: <strong style={{ color: '#FFFFFF' }}>Rs {estimate.ratePerSqft}/sq.ft.</strong> (all civil + MEP included)
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                <Clock size={15} color="var(--color-accent)" />
                <span>Estimated Schedule: <strong style={{ color: '#FFFFFF' }}>{estimate.timeline}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--color-accent)" />
                <span>Full architectural CAD blueprints and MEP plans</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--color-accent)" />
                <span>Dedicated site project manager on-site daily</span>
              </div>
            </div>
          </div>

          <a
            href="mailto:spacemgmt@jcapexv.com?subject=Interior%20Space%20Planning%20Inquiry"
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
            <span>Book Site Measurement & Design Review <ArrowRight size={15} /></span>
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
