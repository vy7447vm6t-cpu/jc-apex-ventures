"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export interface DepthCarouselItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  location?: string;
  metric?: string;
  outcome?: string;
  onClick?: () => void;
}

interface DepthCarouselProps {
  items: DepthCarouselItem[];
  className?: string;
  onSelect?: (item: DepthCarouselItem) => void;
}

export default function DepthCarousel({
  items,
  className = '',
  onSelect,
}: DepthCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  return (
    <div className={`relative flex flex-col items-center justify-center w-full py-6 md:py-10 ${className}`}>
      {/* Responsive 3D Stage with Expanded Desktop Footprint */}
      <div
        className="relative h-[400px] sm:h-[440px] md:h-[520px] w-full max-w-[640px] md:max-w-[880px] lg:max-w-[980px] flex items-center justify-center overflow-visible"
        style={{ perspective: '1400px' }}
      >
        {items.map((item, idx) => {
          const offset = idx - activeIndex;
          const isCurrent = idx === activeIndex;

          let transform = '';
          let opacity = 0;
          let zIndex = 0;

          if (isCurrent) {
            transform = 'translateX(0px) translateZ(100px) rotateY(0deg) scale(1)';
            opacity = 1;
            zIndex = 20;
          } else if (offset === -1 || (idx === items.length - 1 && activeIndex === 0)) {
            transform =
              'translateX(calc(-1 * clamp(90px, 22vw, 220px))) translateZ(-80px) rotateY(16deg) scale(0.86)';
            opacity = 0.65;
            zIndex = 10;
          } else if (offset === 1 || (idx === 0 && activeIndex === items.length - 1)) {
            transform =
              'translateX(clamp(90px, 22vw, 220px)) translateZ(-80px) rotateY(-16deg) scale(0.86)';
            opacity = 0.65;
            zIndex = 10;
          } else {
            transform = 'translateX(0px) translateZ(-220px) scale(0.7)';
            opacity = 0;
            zIndex = 0;
          }

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isCurrent) {
                  item.onClick?.();
                  onSelect?.(item);
                } else {
                  setActiveIndex(idx);
                }
              }}
              className="absolute w-[min(320px,calc(100vw-48px))] sm:w-[380px] md:w-[560px] lg:w-[620px] h-[360px] sm:h-[400px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out shadow-2xl border border-black/10 bg-white"
              style={{
                transform,
                opacity,
                zIndex,
                boxShadow: isCurrent
                  ? '0 24px 60px -12px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(194, 159, 83, 0.35)'
                  : '0 12px 32px -8px rgba(0, 0, 0, 0.12)',
              }}
            >
              {/* Card Photo Viewport */}
              <div className="relative w-full h-[180px] sm:h-[200px] md:h-[260px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

                {/* Top Tags Bar */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span
                    style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
                    className="px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-wider rounded-full bg-white/95 backdrop-blur-md text-[#111111] shadow-sm"
                  >
                    {item.tag}
                  </span>
                  {item.location && (
                    <span
                      style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
                      className="px-2.5 py-1 text-[10px] md:text-[11px] font-medium rounded-full bg-black/60 backdrop-blur-md text-[#F4F1EA] border border-white/15"
                    >
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Bottom Photo Caption / Metric on larger screens */}
                {item.metric && (
                  <div className="absolute bottom-3 left-3 right-3 z-10 hidden md:block pointer-events-none">
                    <span className="inline-block px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-medium text-[#E8D9B5] border border-[#C29F53]/40">
                      {item.metric}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body Information Zone */}
              <div className="p-4 sm:p-5 md:p-6 bg-white flex flex-col justify-between h-[180px] sm:h-[200px] md:h-[220px]">
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontWeight: 400,
                      lineHeight: 1.18,
                    }}
                    className="text-lg sm:text-xl md:text-2xl text-[#111111] line-clamp-2"
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
                    className="text-xs sm:text-sm text-[#555555] line-clamp-2 mt-2 leading-relaxed"
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-3 border-t border-black/8 flex items-center justify-between gap-3">
                  <span
                    style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
                    className="text-[11px] md:text-xs text-[#8C733E] font-semibold tracking-wide uppercase"
                  >
                    {item.outcome ? item.outcome : 'Statutory & CAD Dossier'}
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] group-hover:text-[#8C733E]">
                    <span>Inspect CAD</span>
                    <ArrowUpRight size={14} className="text-[#8C733E]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous item"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/12 bg-white/90 backdrop-blur-md transition-all hover:bg-white hover:scale-105 shadow-sm"
        >
          <ChevronLeft size={19} color="#111111" />
        </button>
        <span
          style={{
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
            fontVariantNumeric: 'tabular-nums',
          }}
          className="text-xs md:text-sm font-semibold text-[#444444]"
        >
          {activeIndex + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next item"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/12 bg-white/90 backdrop-blur-md transition-all hover:bg-white hover:scale-105 shadow-sm"
        >
          <ChevronRight size={19} color="#111111" />
        </button>
      </div>
    </div>
  );
}
