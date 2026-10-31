"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ClientMarquee from './ClientMarquee';
import { SpecularButton } from '@/components/react-bits';
import { CORE_LINE, DIVISION_ONE_LINERS } from '@/content/messaging';

// The six divisions in the messaging framework's order. A plain list replaces the "_01 to _06"
// logo strip, which was unreadable on phones (brand guidelines 2.8.2).
const HERO_DIVISIONS = [
  { slug: 'grid-apex', name: 'Grid Apex', href: '/grid-apex' },
  { slug: 'solis', name: 'Solis', href: '/solis' },
  { slug: 'sanyog', name: 'Sanyog', href: '/sanyog' },
  { slug: 'tvasta', name: 'Tvasta', href: '/tvasta' },
  { slug: 'emudran', name: 'eMudran', href: '/emudran' },
  { slug: 'agrim', name: 'Agrim', href: '/agrim' },
];

export interface GroundedHeroProps {
  onOpenConsultation?: (division?: string) => void;
}

export default function GroundedHero({ onOpenConsultation }: GroundedHeroProps = {}) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0B0E14',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Photograph with a flat Night overlay where text sits on it (2.8.1). */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src="/images/hero-architectural-facade.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 14, 20, 0.45)' }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(112px, 15vh, 144px) 24px 0',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <h1
          className="hero-serif-title"
          style={{
            fontSize: 'clamp(2.8rem, 6.8vw, 5.8rem)',
            lineHeight: 1.05,
            fontWeight: 400,
            color: '#FFFFFF',
            letterSpacing: '-0.025em',
            margin: '0 0 22px',
            maxWidth: '980px',
          }}
        >
          Engineering <span className="italic-span" style={{ fontStyle: 'italic', color: '#E8E4DA' }}>that operates.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.28rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '680px',
            lineHeight: 1.62,
            margin: '0 0 36px',
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          {CORE_LINE}
        </p>

        <div className="hero-cta-group" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <SpecularButton href="#divisions" variant="light" className="hero-cta-btn-light">
            Explore the divisions
          </SpecularButton>
          <SpecularButton
            href={onOpenConsultation ? undefined : '#contact'}
            onClick={onOpenConsultation ? () => onOpenConsultation() : undefined}
            variant="dark"
            className="hero-cta-btn-dark"
          >
            Enquire
          </SpecularButton>
        </div>
      </div>

      {/* The six divisions, each a link to its page. */}
      <nav aria-label="Divisions" style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', width: '100%', padding: '48px 24px 32px' }}>
        <ul className="hero-division-list">
          {HERO_DIVISIONS.map((division) => (
            <li key={division.slug}>
              <Link href={division.href} className="hero-division-link">
                <span className="hero-division-name">
                  {division.name}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
                <span className="hero-division-line">{DIVISION_ONE_LINERS[division.slug]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Client marquee: text only, opens into the full client list (brand guidelines 2.6) */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(11, 14, 20, 0.88)',
        }}
      >
        <ClientMarquee tone="dark" />
      </div>
    </section>
  );
}
