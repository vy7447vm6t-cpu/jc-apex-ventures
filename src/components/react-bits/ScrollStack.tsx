"use client";

import React from 'react';

export interface ScrollStackCard {
  id: string | number;
  /** Optional short marker in the corner box: a year or a step. */
  stepNumber?: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  specs?: string[];
  /** Accent for the corner box and badge; defaults to the group's gold. */
  accent?: string;
}

interface ScrollStackProps {
  cards: ScrollStackCard[];
  className?: string;
}

/**
 * Cards that stick and stack as the page scrolls, each one settling slightly in front of the last.
 * Flat white cards with a hairline; sentence-case labels.
 */
export default function ScrollStack({
  cards,
  className = '',
}: ScrollStackProps) {
  const total = cards.length;

  return (
    <div className={`scroll-stack relative flex flex-col gap-8 w-full max-w-4xl mx-auto py-12 ${className}`}>
      {cards.map((card, idx) => {
        const topOffset = `calc(104px + ${idx * 20}px)`;
        const depthScale = 1 - (total - 1 - idx) * 0.02;
        const accent = card.accent ?? '#8C6D23';

        return (
          <article
            key={card.id}
            className="scroll-stack-card sticky w-full rounded-2xl border border-black/10 bg-[#FFFFFF] p-7 md:p-10"
            style={{
              top: topOffset,
              zIndex: idx + 1,
              transform: `scale(${depthScale})`,
              transformOrigin: 'top center',
              marginTop: idx > 0 ? '-8px' : '0',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/8">
              <div className="flex items-center gap-4">
                {card.stepNumber && (
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: accent,
                      borderColor: `${accent}55`,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                    className="flex h-12 min-w-12 px-2 items-center justify-center rounded-xl border bg-white"
                  >
                    {card.stepNumber}
                  </span>
                )}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)',
                      fontWeight: 400,
                      color: '#111111',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.92rem',
                      color: '#4A4A46',
                      fontWeight: 500,
                      margin: '4px 0 0 0',
                    }}
                  >
                    {card.subtitle}
                  </p>
                </div>
              </div>
              {card.badge && (
                <span
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: accent,
                    borderColor: `${accent}55`,
                  }}
                  className="w-fit px-3 py-1 rounded-md border bg-white"
                >
                  {card.badge}
                </span>
              )}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                color: '#4A4A46',
                lineHeight: 1.65,
              }}
              className="mt-5 text-sm md:text-base"
            >
              {card.description}
            </p>

            {card.specs && card.specs.length > 0 && (
              <dl className="mt-5 grid gap-x-8 gap-y-2 pt-4 border-t border-black/8 sm:grid-cols-2">
                {card.specs.map((spec) => {
                  const [label, value] = spec.split(': ');
                  return (
                    <div key={spec} className="flex justify-between gap-4 text-sm" style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      <dt style={{ color: '#666666' }}>{value ? label : ''}</dt>
                      <dd style={{ margin: 0, color: '#111111', textAlign: 'right' }}>{value ?? label}</dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </article>
        );
      })}
    </div>
  );
}
