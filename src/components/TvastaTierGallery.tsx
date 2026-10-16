"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export interface TvastaTier {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  image: string;
  specs: string[];
  rate: string;
  turnaround: string;
}

interface TvastaTierGalleryProps {
  tiers: TvastaTier[];
}

export default function TvastaTierGallery({ tiers }: TvastaTierGalleryProps) {
  const [selectedTier, setSelectedTier] = useState<string>(tiers[1]?.id || tiers[0]?.id);
  const activeTier = tiers.find((t) => t.id === selectedTier) || tiers[0];

  return (
    <div className="max-w-5xl mx-auto w-full font-sans">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-block px-3.5 py-1 rounded-full bg-[#C29F53]/15 text-[#8C6D23] text-[11px] uppercase tracking-[0.12em] font-bold border border-[#C29F53]/30 mb-3">
          [ARCHITECTURAL FIT-OUT HORIZONS]
        </div>
        <h3
          style={{
            fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)',
            lineHeight: 1.15,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#111111',
            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
          }}
        >
          Interactive Three-Tier Execution &amp; Material Palette.
        </h3>
        <p className="text-sm text-[#4A4A46] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
          Select any tier below to review authentic photography, material finishes, acoustic isolation ratings, and delivery schedules.
        </p>

        {/* Tier Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {tiers.map((tier) => {
            const isSelected = tier.id === selectedTier;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className="px-5 py-2.5 rounded-full text-xs transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isSelected ? '#111111' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#4A4A46',
                  border: isSelected ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.12)',
                  fontWeight: isSelected ? 700 : 600,
                }}
              >
                {tier.badge} : {tier.subtitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tier Editorial Showcase */}
      <div
        className="rounded-3xl border border-black/8 bg-white overflow-hidden shadow-lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image Column */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[440px]">
            <Image
              src={activeTier.image}
              alt={activeTier.title}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full bg-[#C29F53] text-[#111111] text-[10px] font-bold uppercase tracking-wider mb-2">
                {activeTier.badge}
              </span>
              <div className="text-white text-xs font-semibold">
                Schedule: {activeTier.turnaround}
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs uppercase tracking-wider text-[#8C6D23] font-bold">
                  {activeTier.subtitle}
                </span>
                <span className="text-xs font-bold text-[#111111] bg-[#F4F1EA] border border-black/8 px-3 py-1 rounded-full tabular-nums">
                  Base: {activeTier.rate}
                </span>
              </div>

              <h4
                style={{
                  fontSize: '1.65rem',
                  lineHeight: 1.2,
                  fontWeight: 400,
                  color: '#111111',
                  marginBottom: '14px',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                {activeTier.title}
              </h4>

              <p className="text-sm text-[#4A4A46] leading-relaxed mb-6 font-sans">
                {activeTier.description}
              </p>

              <div className="pt-4 border-t border-black/8 mb-6">
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#666666] mb-3">
                  Finishing Schedule &amp; Specifications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTier.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-[#222222] font-medium font-sans">
                      <CheckCircle2 size={14} color="#C29F53" className="flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/8 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-semibold text-[#666666]">
                Dedicated Architect on-site daily
              </div>
              <Link
                href="/space-planning"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold hover:bg-[#222222] transition-colors"
              >
                <span>Explore 3-Tier Space Estimator</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
