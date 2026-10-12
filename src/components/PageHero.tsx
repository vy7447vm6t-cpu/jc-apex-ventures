"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  tagline: string;
  breadcrumb: string;
  parent?: { label: string; href: string };
  badge?: string;
  statPill?: string;
  heroImage?: string;
  heroImageTag?: string;
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
}: PageHeroProps) {
  return (
    <section style={{
      paddingTop: '140px',
      paddingBottom: '60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 100%)',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
          <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} />
          <Link href="/#divisions" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Divisions</Link>
          <ChevronRight size={13} />
          {parent && (
            <>
              <Link href={parent.href} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>{parent.label}</Link>
              <ChevronRight size={13} />
            </>
          )}
          <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{breadcrumb}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: heroImage ? '1.15fr 0.85fr' : '1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            {badge && (
              <div className="animate-fade-in-up label" style={{ marginBottom: '18px' }}>
                <span className="label-dot" />
                {badge}
              </div>
            )}

            <h1 className="animate-fade-in-up delay-100" style={{ 
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', 
              marginBottom: '18px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
            }}>
              {title}
            </h1>
            
            <p className="animate-fade-in-up delay-200" style={{ 
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', 
              color: 'var(--color-text-secondary)',
              maxWidth: '680px',
              lineHeight: 1.7,
              marginBottom: statPill ? '24px' : '0'
            }}>
              {tagline}
            </p>

            {statPill && (
              <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div className="metric-pill">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                  {statPill}
                </div>
              </div>
            )}
          </div>

          {heroImage && (
            <div className="animate-fade-in-up delay-200" style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--color-border)',
              height: '320px',
            }}>
              {heroImageTag && (
                <div className="editorial-pill">
                  {heroImageTag}
                </div>
              )}
              <img
                src={heroImage}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          section > .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
