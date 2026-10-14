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
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C29F53]/15 font-mono text-base font-bold text-[#C29F53] border border-[#C29F53]/30">
                  {card.stepNumber}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#111111]">
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono text-[#666666]">
                    {card.subtitle}
                  </p>
                </div>
              </div>
              {card.badge && (
                <span className="w-fit px-3 py-1 text-xs font-mono uppercase tracking-wider font-semibold rounded-full bg-black/5 text-[#111111] border border-black/10">
                  {card.badge}
                </span>
              )}
            </div>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#555555]">
              {card.description}
            </p>

            {card.specs && card.specs.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-black/5">
                {card.specs.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#F4F1EA] text-[#222222]"
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
