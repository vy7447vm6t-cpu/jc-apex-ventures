"use client";

import React from 'react';

export interface ScrollStackCard {
  id: string | number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  specs?: string[];
}

interface ScrollStackProps {
  cards: ScrollStackCard[];
  className?: string;
}

export default function ScrollStack({
  cards,
  className = '',
}: ScrollStackProps) {
  return (
    <div className={`relative flex flex-col gap-8 w-full max-w-4xl mx-auto py-12 ${className}`}>
      {cards.map((card, idx) => {
        return (
          <div
            key={card.id}
            className="sticky top-28 w-full rounded-3xl border border-black/10 bg-[#FFFFFF] p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
            style={{
              zIndex: idx + 1,
              marginTop: idx > 0 ? '-16px' : '0',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/8">
              <div className="flex items-center gap-4">
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#8C733E',
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C29F53]/15 border border-[#C29F53]/35"
                >
                  {card.stepNumber}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontSize: '1.55rem',
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
                      fontSize: '0.76rem',
                      color: '#666666',
                      fontWeight: 550,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      margin: '2px 0 0 0',
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
                    fontSize: '0.7rem',
                    fontWeight: 650,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                  className="w-fit px-3 py-1 rounded-full bg-[#F4F1EA] text-[#8C733E] border border-[#C29F53]/30"
                >
                  {card.badge}
                </span>
              )}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                color: '#444444',
                lineHeight: 1.65,
              }}
              className="mt-5 text-sm md:text-base"
            >
              {card.description}
            </p>

            {card.specs && card.specs.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-black/8">
                {card.specs.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#F4F1EA] text-[#222222] border border-black/6"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
