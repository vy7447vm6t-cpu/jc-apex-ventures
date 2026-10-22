"use client";

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { MicroSlats, TechText, SpotlightCard, PatternWaves } from '@/components/react-bits';
import AuthorityLogo from './AuthorityLogos';

interface StatMetric {
  id: string;
  index: string;
  category: string;
  value: number;
  suffix: string;
  title: string;
  description: string;
  footerNode: React.ReactNode;
}

const STAT_METRICS: StatMetric[] = [
  {
    id: 'stat-practice',
    index: '01',
    category: 'Utility Practice',
    value: 36,
    suffix: '+',
    title: '36+ Years Direct Utility Practice',
    description:
      'Direct utility engineering and regulatory leadership under Director Jitendra Chavan across BEST, Adani Electricity, Tata Power, and MSEDCL.',
    footerNode: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AuthorityLogo id="best" size={22} />
          <AuthorityLogo id="adani" size={22} />
          <AuthorityLogo id="tata" size={22} />
          <AuthorityLogo id="msedcl" size={22} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#8C733E',
          }}
        >
          Dir. Jitendra Chavan
        </span>
      </div>
    ),
  },
  {
    id: 'stat-sanctions',
    index: '02',
    category: 'Statutory Clearances',
    value: 140,
    suffix: '+',
    title: '140+ Sanction & Liaison Engagements',
    description:
      'Statutory load sanctions, CGRF electricity grievance settlements, and turnkey commercial fit-out engineering delivered across Mumbai networks.',
    footerNode: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        {['MERC CGRF', 'PWD CEI', '11kV/33kV', 'Net-Metering'].map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.65rem',
              fontWeight: 650,
              color: '#333333',
              backgroundColor: '#F4F1EA',
              border: '1px solid rgba(194, 159, 83, 0.28)',
              padding: '3px 8px',
              borderRadius: '6px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 'stat-disciplines',
    index: '03',
    category: 'Practice Disciplines',
    value: 6,
    suffix: '',
    title: '6 Integrated Practice Disciplines',
    description:
      'Utility liaisoning (Sanyog), solar EPC (Solis), substation engineering (Grid Apex), architecture (Tvasta), packaging (eMudran), and project advisory (Agrim).',
    footerNode: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {[
          { name: 'Solis', src: '/images/logos/solis-official.png' },
          { name: 'Sanyog', src: '/images/logos/sanyog-official.png' },
          { name: 'Grid Apex', src: '/images/logos/grid-apex-official.png' },
          { name: 'Tvasta', src: '/images/logos/tvasta-dark.png' },
          { name: 'eMudran', src: '/images/logos/emudran-official.png' },
          { name: 'Agrim', src: '/images/logos/agrim-dark.png' },
        ].map((div) => (
          <img
            key={div.name}
            src={div.src}
            alt={div.name}
            style={{
              height: '16px',
              width: 'auto',
              maxWidth: '48px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ))}
      </div>
    ),
  },
];

function AnimeCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(target);
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
          const obj = { count: Math.max(1, Math.floor(target * 0.65)) };
          animate(obj, {
            count: target,
            duration: 650,
            ease: 'outExpo',
            onUpdate: () => {
              setVal(Math.round(obj.count));
            },
            onComplete: () => {
              setVal(target);
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

/** Individual stat card with staggered scroll-entrance */
function StatCard({ item, stagger }: { item: StatMetric; stagger: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}ms`,
        willChange: 'opacity, transform',
      }}
    >
      <SpotlightCard
        key={item.id}
        theme="light"
        className="why-stat-card text-left"
        spotlightColor="rgba(194, 159, 83, 0.14)"
        borderColor="rgba(194, 159, 83, 0.42)"
        style={{ textAlign: 'left' }}
        contentStyle={{ justifyContent: 'space-between', textAlign: 'left', height: '100%' }}
      >
        {/* Card Top Gold Hairline Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2.5px',
            background:
              'linear-gradient(90deg, rgba(194, 159, 83, 0.95) 0%, rgba(194, 159, 83, 0.35) 70%, rgba(194, 159, 83, 0.05) 100%)',
            borderRadius: '2px 2px 0 0',
          }}
        />

        {/* Upper zone: index + category + number */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          {/* Index badge + Category label row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '14px',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#8C733E',
                backgroundColor: 'rgba(194, 159, 83, 0.1)',
                border: '1px solid rgba(194, 159, 83, 0.2)',
                padding: '2px 7px',
                borderRadius: '5px',
                lineHeight: 1.6,
              }}
            >
              {item.index}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.72rem',
                fontWeight: 650,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8C733E',
                display: 'block',
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
          </div>

          {/* Big number */}
          <div
            className="stat-counter"
            style={{
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              fontSize: 'clamp(3.4rem, 5vw, 4.6rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#111111',
              margin: '0 0 4px 0',
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'left',
            }}
          >
            <AnimeCounter target={item.value} suffix={item.suffix} />
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(194, 159, 83, 0.3) 0%, rgba(0, 0, 0, 0.05) 100%)',
            marginBottom: '18px',
          }}
        />

        {/* Lower zone: title + description + footer */}
        <div style={{ textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
              flex: 1,
            }}
          >
            {item.description}
          </p>

          {/* Footer */}
          <div
            style={{
              paddingTop: '14px',
              marginTop: '16px',
              borderTop: '1px solid rgba(0, 0, 0, 0.07)',
            }}
          >
            {item.footerNode}
          </div>
        </div>
      </SpotlightCard>
    </div>
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
      {/* Background PatternWaves subtle texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'auto',
        }}
      >
        <PatternWaves
          preset="silk"
          color="#8C733E"
          backgroundColor="transparent"
          opacity={0.08}
          fade="edges"
          fadeSize={0.6}
          speed={0.15}
          depth={0.7}
          spacing={10}
          interactive
          cursorSize={60}
          cursorStrength={0.4}
          intro
        />
      </div>

      {/* Background Architectural MicroSlats Rhythm matching Hero 24-slat grid */}
      <MicroSlats count={24} color="#8C733E" opacity={0.11} zIndex={1} showTicks={true} />

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
          {STAT_METRICS.map((item, i) => (
            <StatCard key={item.id} item={item} stagger={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
