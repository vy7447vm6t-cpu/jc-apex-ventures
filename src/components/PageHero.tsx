"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  tagline: string;
  breadcrumb: string;
}

export default function PageHero({ title, tagline, breadcrumb }: PageHeroProps) {
  return (
    <section style={{
      paddingTop: '160px',
      paddingBottom: '80px',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid var(--color-border)'
    }}>
      {/* Background gradients */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: -1,
        background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
        opacity: 0.3
      }} />

      <div className="container">
        {/* Breadcrumb */}
        <div className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          <Link href="/" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/#services" style={{ color: 'var(--color-text-secondary)' }}>Divisions</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--color-accent)' }}>{breadcrumb}</span>
        </div>

        <h1 className="animate-fade-in-up delay-100" style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          marginBottom: '20px',
          fontWeight: 800
        }}>
          {title}
        </h1>
        
        <p className="animate-fade-in-up delay-200" style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
          color: 'var(--color-text-secondary)',
          maxWidth: '700px',
          lineHeight: 1.6
        }}>
          {tagline}
        </p>
      </div>
    </section>
  );
}
