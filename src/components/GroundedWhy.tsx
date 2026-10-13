"use client";

import React from 'react';

export default function GroundedWhy() {
  return (
    <section id="about" className="section_layout60">
      <div id="studio" style={{ position: 'relative', top: '-100px', visibility: 'hidden' }} />
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container">
          <span className="text-eye-brow">[our why]</span>
        </div>

        {/* Manifesto Heading */}
        <div style={{ maxWidth: '1080px', marginBottom: '80px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 28px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            We navigate Mumbai regulatory protocols, utility sanctions, and commercial spaces with engineering rigor. Not in spite of the city constraints, but because of them.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              color: '#555555',
              lineHeight: 1.7,
              maxWidth: '820px',
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 300,
            }}
          >
            With over 36 years of direct engineering experience inside Mumbai electrical utilities, JC Apex Ventures bridges technical reality and statutory documentation. From resolving long-standing DISCOM billing anomalies to engineering elevated walkable solar pergolas, our practice is grounded in measurable outcomes.
          </p>
        </div>

        {/* 3-Column Grounded Stat Item List */}
        <div className="layout60_grid">
          {/* Stat 1 */}
          <div className="layout60_item">
            <div className="text-eye-brow" style={{ marginBottom: '12px' }}>
              Years of Practice
            </div>
            <div className="stat-counter">36+</div>
            <p
              style={{
                fontSize: '0.94rem',
                color: '#666666',
                lineHeight: 1.5,
                marginTop: '12px',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              Direct utility engineering and regulatory background across BEST, AEML, Tata Power, and MSEDCL networks.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="layout60_item">
            <div className="text-eye-brow" style={{ marginBottom: '12px' }}>
              Projects & Sanctions
            </div>
            <div className="stat-counter">140+</div>
            <p
              style={{
                fontSize: '0.94rem',
                color: '#666666',
                lineHeight: 1.5,
                marginTop: '12px',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              Statutory load releases, CGRF electricity grievance settlements, and turnkey commercial fit-outs delivered.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="layout60_item">
            <div className="text-eye-brow" style={{ marginBottom: '12px' }}>
              Specialized Disciplines
            </div>
            <div className="stat-counter">6</div>
            <p
              style={{
                fontSize: '0.94rem',
                color: '#666666',
                lineHeight: 1.5,
                marginTop: '12px',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              Utility liaisoning, HT grid engineering, rooftop solar EPC, interior design, packaging, and project advisory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
