"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ImageWithLightbox } from '@/components/ImageLightbox';

interface PageHeroProps {
  title: string;
  tagline: string;
  breadcrumb: string;
  parent?: { label: string; href: string };
  badge?: string;
  statPill?: string;
  heroImage?: string;
  heroImageTag?: string;
  logo?: React.ReactNode;
}

export default function PageHero({
  title,
  tagline,
  breadcrumb,
  parent,
  badge,
  statPill,
  heroImage,
  heroImageTag,
  logo,
}: PageHeroProps) {
  return (
    <section
      style={{
        paddingTop: '132px',
        paddingBottom: '64px',
        position: 'relative',
        overflow: 'hidden',
        background: '#F4F1EA',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Breadcrumb */}
        <div
          className="animate-fade-in-up"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            fontSize: '0.82rem',
            color: '#666666',
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
          }}
        >
          <Link href="/" style={{ color: '#555555', textDecoration: 'none' }}>
            Home
          </Link>
          <ChevronRight size={13} />
          <Link href="/#divisions" style={{ color: '#555555', textDecoration: 'none' }}>
            Divisions
          </Link>
          <ChevronRight size={13} />
          {parent && (
            <>
              <Link href={parent.href} style={{ color: '#555555', textDecoration: 'none' }}>
                {parent.label}
              </Link>
              <ChevronRight size={13} />
            </>
          )}
          <span style={{ color: '#8C6D23', fontWeight: 700 }}>{breadcrumb}</span>
        </div>

        <div
          className="page-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: heroImage ? '1.15fr 0.85fr' : '1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <div>
            {/* Header row with transparent official logo and discipline title inline */}
            <div
              className="animate-fade-in-up"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                marginBottom: '22px',
              }}
            >
              {logo && (
                <>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      flexShrink: 0,
                    }}
                  >
                    {logo}
                  </div>
                  <span
                    aria-hidden="true"
                    style={{
                      width: '1.5px',
                      height: '44px',
                      backgroundColor: 'rgba(194, 159, 83, 0.55)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                </>
              )}

              <h1
                style={{
                  flex: 1,
                  minWidth: '220px',
                  fontSize: 'clamp(2rem, 3.4vw, 2.95rem)',
                  margin: 0,
                  fontWeight: 400,
                  color: '#111111',
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                {title}
              </h1>
            </div>

            <p
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: 'clamp(1.02rem, 1.6vw, 1.18rem)',
                color: '#4A4A46',
                maxWidth: '680px',
                lineHeight: 1.68,
                marginBottom: statPill ? '24px' : '0',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              {tagline}
            </p>

            {statPill && (
              <p className="margin-note animate-fade-in-up delay-300">{statPill}</p>
            )}
          </div>

          {heroImage && (
            <figure className="animate-fade-in-up delay-200" style={{ margin: 0 }}>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.08)', height: '340px' }}>
                <ImageWithLightbox
                  src={heroImage}
                  alt={heroImageTag || title}
                  title={title}
                  scope={tagline}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              {heroImageTag && <figcaption className="photo-caption">{heroImageTag}</figcaption>}
            </figure>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .page-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
