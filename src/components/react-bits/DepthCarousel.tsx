"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface DepthCarouselItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
}

interface DepthCarouselProps {
  items: DepthCarouselItem[];
  className?: string;
}

export default function DepthCarousel({
  items,
  className = '',
}: DepthCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  return (
    <div className={`relative flex flex-col items-center justify-center w-full py-8 ${className}`}>
      {/* 3D Stage */}
      <div
        className="relative h-[380px] w-full max-w-[640px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {items.map((item, idx) => {
          const offset = idx - activeIndex;
          const absOffset = Math.abs(offset);
          const isCurrent = idx === activeIndex;

          let transform = '';
          let opacity = 0;
          let zIndex = 0;

          if (isCurrent) {
            transform = 'translateX(0px) translateZ(80px) rotateY(0deg) scale(1)';
            opacity = 1;
            zIndex = 20;
          } else if (offset === -1 || (idx === items.length - 1 && activeIndex === 0)) {
            transform = 'translateX(-160px) translateZ(-60px) rotateY(18deg) scale(0.85)';
            opacity = 0.65;
            zIndex = 10;
          } else if (offset === 1 || (idx === 0 && activeIndex === items.length - 1)) {
            transform = 'translateX(160px) translateZ(-60px) rotateY(-18deg) scale(0.85)';
            opacity = 0.65;
            zIndex = 10;
          } else {
            transform = 'translateX(0px) translateZ(-180px) scale(0.7)';
            opacity = 0;
            zIndex = 0;
          }

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className="absolute w-[320px] md:w-[420px] h-[300px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out shadow-2xl border border-black/10"
              style={{
                transform,
                opacity,
                zIndex,
                backgroundColor: '#FFFFFF',
              }}
            >
              <div className="relative w-full h-[180px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-white/90 backdrop-blur-md text-[#111111]">
                  {item.tag}
                </span>
              </div>
              <div className="p-4 bg-white flex flex-col justify-between h-[120px]">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#111111] line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#666666] line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md transition-all hover:bg-white hover:scale-105"
        >
          <ChevronLeft size={18} color="#111111" />
        </button>
        <span className="text-xs font-mono text-[#666666]">
          {activeIndex + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md transition-all hover:bg-white hover:scale-105"
        >
          <ChevronRight size={18} color="#111111" />
        </button>
      </div>
    </div>
  );
}
