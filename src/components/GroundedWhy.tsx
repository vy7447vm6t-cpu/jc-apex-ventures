"use client";

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { MicroSlats, TechText, SpotlightCard } from '@/components/react-bits';

interface StatMetric {
  id: string;
  category: string;
  value: number;
  suffix: string;
  title: string;
  description: string;
}

const STAT_METRICS: StatMetric[] = [
  {
    id: 'stat-practice',
    category: 'Utility Practice',
    value: 36,
    suffix: '+',
    title: '36+ Years Direct Utility Practice',
    description:
      'Direct utility engineering and regulatory leadership under Director Jitendra Chavan across BEST, Adani Electricity, Tata Power, and MSEDCL.',
  },
  {
    id: 'stat-sanctions',
    category: 'Statutory Clearances',
    value: 140,
    suffix: '+',
    title: '140+ Sanction & Liaison Engagements',
    description:
      'Statutory load sanctions, CGRF electricity grievance settlements, and turnkey commercial fit-out engineering delivered across Mumbai networks.',
  },
  {
    id: 'stat-disciplines',
    category: 'Practice Disciplines',
    value: 6,
    suffix: '',
    title: '6 Integrated Practice Disciplines',
    description:
      'Utility liaisoning (Sanyog), solar EPC (Solis), substation engineering (Grid Apex), architecture (Tvasta), packaging (eMudran), and project advisory (Agrim).',
  },
];

function AnimeCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const targetToObserve = el.closest('#about') || el;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { count: 0 };
          animate(obj, {
            count: target,
            duration: 1600,
            ease: 'outExpo',
            onUpdate: () => {
              setVal(Math.round(obj.count));
            },
          });
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(targetToObserve);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elementRef} aria-label={`${target}${suffix}`}>
      {val}
      {suffix}
    </span>
  );
}

export default function GroundedWhy() {
  return (
    <section
      id="about"
      className="section_layout60 relative overflow-hidden text-left"
      style={{
        backgroundColor: '#F4F1EA',
        color: '#111111',
        padding: 'clamp(112px, 14vh, 144px) 24px clamp(84px, 10vh, 112px) 24px',
        position: 'relative',
        zIndex: 5,
        scrollMarginTop: '100px',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
      }}
    >
      {/* Background Architectural MicroSlats Rhythm matching Hero 24-slat grid */}
      <MicroSlats count={24} color="#000000" opacity={0.045} />

      {/* Anchor destination for header studio navigation */}
      <div id="studio" style={{ position: 'absolute', top: '-100px', left: 0, visibility: 'hidden' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2, textAlign: 'left' }}>
        {/* Eyebrow Label with TechText Scramble */}
        <div className="eye-brow-container" style={{ marginBottom: '24px', textAlign: 'left' }}>
          <span
            className="text-eye-brow"
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.74rem',
              fontWeight: 650,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8C733E',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              textAlign: 'left',
            }}
          >
            [<TechText text="our why" scrambleSpeed={28} maxScrambles={6} triggerOnHover={true} style={{ fontFamily: 'inherit' }} />]
          </span>
        </div>

        {/* Manifesto Heading & Narrative Statement */}
        <div style={{ maxWidth: '1080px', marginBottom: '56px', textAlign: 'left' }}>
          <h2
            className="manifesto-serif-headline"
            style={{
              fontSize: 'clamp(2.3rem, 4.4vw, 3.6rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: '#111111',
              margin: '0 0 28px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              textAlign: 'left',
            }}
          >
            In Mumbai, engineering disconnected from statutory liaisoning guarantees delay. Clearances without technical precision fail under scrutiny.{' '}
            <span style={{ fontStyle: 'italic', color: '#111111' }}>
              We resolve both as a single discipline.
            </span>
          </h2>

          <div
            style={{
              maxWidth: '860px',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: 'clamp(1.02rem, 1.35vw, 1.16rem)',
              lineHeight: 1.68,
              color: '#444444',
              fontWeight: 350,
              textAlign: 'left',
            }}
          >
            <p style={{ margin: '0 0 18px 0', textAlign: 'left', lineHeight: 1.68 }}>
              Urban infrastructure across the Mumbai Metropolitan Region operates within a dense matrix of legacy grid codes, high-tension distribution corridors, and four distinct distribution licensees: BEST across the island city, Adani Electricity and Tata Power across suburban districts, and MSEDCL throughout regional industrial circles. In this operating environment, statutory clearances are not procedural formalities. They dictate structural load safety, transformer step-down configurations, and fault-level coordination.
            </p>
            <p style={{ margin: 0, textAlign: 'left', lineHeight: 1.68 }}>
              Treating architectural spatial design, HT/LT substation engineering, and utility clearances as isolated silos creates expensive revisions and regulatory stall. Directed by Jitendra Chavan with over 36 years of direct engineering experience inside Mumbai electrical utilities, JC Apex Ventures integrates technical calculation with statutory compliance from inception: ensuring rooftop solar pergolas, corporate fit-outs, and grid substations operate legally, reliably, and on schedule.
            </p>
          </div>
        </div>

        {/* 3-Column Grounded Stat Item List in KokonutUI Liquid Glass Cards */}
        <div className="layout60_grid" style={{ textAlign: 'left' }}>
          {STAT_METRICS.map((item) => (
            <SpotlightCard
              key={item.id}
              theme="light"
              className="why-stat-card text-left"
              spotlightColor="rgba(194, 159, 83, 0.12)"
              borderColor="rgba(194, 159, 83, 0.35)"
              style={{ textAlign: 'left' }}
              contentStyle={{ justifyContent: 'space-between', textAlign: 'left' }}
            >
              {/* Card Top Gold Hairline Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '24px',
                  right: '24px',
                  height: '2px',
                  background:
                    'linear-gradient(90deg, rgba(194, 159, 83, 0.85) 0%, rgba(194, 159, 83, 0.15) 100%)',
                  borderRadius: '2px',
                }}
              />

              <div style={{ marginBottom: '18px', textAlign: 'left' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.72rem',
                    fontWeight: 650,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#8C733E',
                    display: 'block',
                    marginBottom: '8px',
                    textAlign: 'left',
                  }}
                >
                  <TechText
                    text={item.category}
                    scrambleSpeed={28}
                    maxScrambles={6}
                    triggerOnHover={true}
                    style={{ fontFamily: 'inherit' }}
                  />
                </span>
                <div
                  className="stat-counter"
                  style={{
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    fontSize: 'clamp(3.4rem, 5vw, 4.6rem)',
                    fontWeight: 400,
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    color: '#111111',
                    margin: '4px 0 8px 0',
                    fontVariantNumeric: 'tabular-nums',
                    textAlign: 'left',
                  }}
                >
                  <AnimeCounter target={item.value} suffix={item.suffix} />
                </div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '1.02rem',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: '#111111',
                    margin: '0 0 8px 0',
                    lineHeight: 1.35,
                    textAlign: 'left',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: '#555555',
                    margin: 0,
                    fontWeight: 380,
                    textAlign: 'left',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
