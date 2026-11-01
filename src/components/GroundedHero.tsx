"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ClientMarquee from './ClientMarquee';
import { SpecularButton, TechText } from '@/components/react-bits';
import { Ambient, MicroSlats, PatternWaves, TargetCursor, useDesktopPointer } from '@/components/effects';
import { DIVISION_ONE_LINERS } from '@/content/messaging';
import { PHOTOS, photoCredit } from '@/content/photos';

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
  const heroRef = useRef<HTMLElement>(null);
  const desktop = useDesktopPointer();
  return (
    <section
      ref={heroRef}
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
      {/* Worli and the Sea Link under a flat Night overlay, so the headline reads on phones too. */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src={PHOTOS['hero-mumbai'].src}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 14, 20, 0.45)' }} />
      </div>

      {/* Silk waves over the photo that follow the pointer, and louvre slats with datum ticks like a drawing sheet. */}
      <Ambient opacity={0.28} blend="screen" zIndex={1}>
        <PatternWaves preset="silk" color="#ffffff" backgroundColor="#000000" fade="edges" interactive cursorSize={50} cursorStrength={0.6} />
      </Ambient>
      <Ambient zIndex={1}>
        <MicroSlats count={24} color="#FFFFFF" opacity={0.08} zIndex={1} showTicks />
      </Ambient>
      {desktop && <TargetCursor containerRef={heroRef} color="#C29F53" />}

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
          <TechText text="From HT electrical work at the Taj Mahal Palace" scrambleSpeed={28} maxScrambles={6} triggerOnHover style={{ fontFamily: 'inherit', display: 'inline' }} />{' '}
          <TechText text="to a 691.20 kWp solar plant in Bhiwandi." scrambleSpeed={28} maxScrambles={6} triggerOnHover style={{ fontFamily: 'inherit', display: 'inline', color: '#E8E4DA' }} />
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
          Six divisions in one office at Elphinstone, Mumbai: electrical, solar, utility paperwork, interiors, print and project
          loans. Whichever of them your building needs, you deal with one person.
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

      <p className="hero-photo-credit">
        {PHOTOS['hero-mumbai'].subject}. {photoCredit('hero-mumbai')}
      </p>

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
