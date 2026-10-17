"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ImageWithLightbox } from '@/components/ImageLightbox';
import MicroSlats from '@/components/react-bits/MicroSlats';

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
        background: 'linear-gradient(180deg, #F4F1EA 0%, #FFFFFF 100%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Subtle Architectural Louver Geometry */}
      <MicroSlats
        count={12}
        opacity={0.09}
        color="rgba(17, 17, 17, 0.35)"
        showTicks={true}
        zIndex={1}
      />

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
              <div
                className="animate-fade-in-up delay-300"
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
              >
                <div
                  className="metric-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    color: '#111111',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#C29F53',
                    }}
                  />
                  {statPill}
                </div>
              </div>
            )}
          </div>

          {heroImage && (
            <div
              className="animate-fade-in-up delay-200"
              style={{
                position: 'relative',
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                height: '340px',
              }}
            >
              {heroImageTag && (
                <div className="editorial-pill" style={{ zIndex: 10, pointerEvents: 'none' }}>
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: '#C29F53',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span>{heroImageTag}</span>
                </div>
              )}
              <ImageWithLightbox
                src={heroImage}
                alt={title}
                title={title}
                category={heroImageTag || breadcrumb}
                scope={tagline}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
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
