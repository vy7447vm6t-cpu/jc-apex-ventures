"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlexCarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface FlexCarouselProps {
  items: FlexCarouselItem[];
  className?: string;
  itemClassName?: string;
  gap?: number;
  autoPlay?: boolean;
  interval?: number;
}

export default function FlexCarousel({
  items,
  className = '',
  itemClassName = '',
  gap = 20,
  autoPlay = false,
  interval = 4000,
}: FlexCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
    const container = containerRef.current;
    const children = container.children;
    if (children[clampedIndex]) {
      const child = children[clampedIndex] as HTMLElement;
      container.scrollTo({
        left: child.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
      setCurrentIndex(clampedIndex);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    scrollToIndex(prevIdx);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Scroll track */}
      <div
        ref={containerRef}
        className="flex w-full overflow-x-auto scroll-smooth py-4 no-scrollbar"
        style={{
          gap: `${gap}px`,
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`flex-shrink-0 transition-all duration-300 ${itemClassName}`}
            style={{
              scrollSnapAlign: 'start',
            }}
          >
            {item.content}
          </div>
        ))}
      </div>

      {/* Control bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="h-1.5 transition-all duration-300 rounded-full"
              style={{
                width: idx === currentIndex ? '24px' : '6px',
                backgroundColor: idx === currentIndex ? '#C29F53' : 'rgba(0, 0, 0, 0.15)',
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md transition-all hover:bg-white hover:scale-105"
          >
            <ChevronLeft size={16} color="#111111" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-md transition-all hover:bg-white hover:scale-105"
          >
            <ChevronRight size={16} color="#111111" />
          </button>
        </div>
      </div>
    </div>
  );
}
