"use client";

import React, { useState, useMemo } from 'react';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';

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
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: '#F4F1EA',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            marginBottom: '14px',
          }}
        >
          <img
            src="/images/logos/tvasta-dark.png"
            alt="Tvasta Official Brand Mark"
            style={{ height: '18px', width: 'auto', objectFit: 'contain' }}
          />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            [tvasta turnkey cost estimator]
          </span>
        </div>
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
          Plan Your Interior &amp; Space Planning Budget
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
          Select your usable floor space and preferred finishing tier for transparent turnkey cost estimation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px' }} className="calc-grid">
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Property Type */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#111111', marginBottom: '10px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
              Property Configuration:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
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
                      padding: '14px 10px',
                      borderRadius: '14px',
                      border: isSel ? '1.5px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                      background: isSel ? '#111111' : '#FFFFFF',
                      color: isSel ? '#FFFFFF' : '#333333',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: isSel ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none',
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
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                Usable Carpet Area:
              </label>
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-accent)', fontFamily: 'var(--font-sans, Inter, sans-serif)', fontVariantNumeric: 'tabular-nums' }}>
                {area} sq.ft.
              </span>
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
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '10px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
              Select Finishing Tier:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
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
                      padding: '14px 10px',
                      borderRadius: '14px',
                      border: isSel ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                      background: isSel ? 'var(--color-accent)' : '#FFFFFF',
                      color: isSel ? '#FFFFFF' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: isSel ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isSel ? '#FFFFFF' : 'var(--color-text-primary)' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: isSel ? '#FFFFFF' : 'var(--color-accent)', fontWeight: 600, marginTop: '2px' }}>
                      {t.rate}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: isSel ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-text-muted)', marginTop: '2px' }}>
                      {t.desc}
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
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.74rem',
                color: 'var(--color-accent)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                display: 'block',
              }}
            >
              [estimated turnkey budget]
            </span>
            <div
              style={{
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                marginTop: '6px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Rs {estimate.total.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginTop: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
              Base rate: <strong style={{ color: 'var(--color-text-primary)' }}>Rs {estimate.ratePerSqft}/sq.ft.</strong> (all civil + MEP included)
            </div>

            <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                <Clock size={16} color="var(--color-accent)" />
                <span>Estimated Schedule: <strong style={{ color: 'var(--color-text-primary)' }}>{estimate.timeline}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                <CheckCircle2 size={16} color="var(--color-accent)" />
                <span>Full architectural CAD blueprints and MEP plans</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                <CheckCircle2 size={16} color="var(--color-accent)" />
                <span>Dedicated site project manager on-site daily</span>
              </div>
            </div>
          </div>

          <a
            href="mailto:spacemgmt@jcapexv.com?subject=Interior%20Space%20Planning%20Inquiry"
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
              backgroundColor: 'var(--color-accent)',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              transition: 'background 0.2s ease',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            <span>Book Site Measurement &amp; Design Review</span>
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
