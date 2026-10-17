"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export interface AccordionGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
  image: string;
  specs: string[];
  logo?: string;
  division?: string;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  className?: string;
}

export default function AccordionGallery({
  items,
  className = '',
}: AccordionGalleryProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  return (
    <div className={`flex flex-col lg:flex-row gap-4 w-full h-[520px] ${className}`}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out border border-black/10 ${
              isActive ? 'lg:flex-[3] flex-[3]' : 'lg:flex-[1] flex-[1]'
            }`}
            style={{
              backgroundColor: '#F4F1EA',
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className={`object-cover transition-transform duration-700 ${
                  isActive ? 'scale-105 filter-none' : 'scale-100 brightness-75'
                }`}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(17, 17, 17, 0.92) 0%, rgba(17, 17, 17, 0.35) 60%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(17, 17, 17, 0.8) 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
              <div className="flex items-center gap-2 mb-2">
                {item.logo && (
                  <div className="h-6 w-6 rounded-md bg-white/90 p-0.5 flex items-center justify-center shrink-0">
                    <img
                      src={item.logo}
                      alt={item.title}
                      className="max-h-5 max-w-5 object-contain"
                    />
                  </div>
                )}
                {item.badge && (
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                    className="inline-block w-fit px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-[#C29F53] text-black"
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
                className="text-xl md:text-2xl text-white mb-1"
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
                className="text-xs text-white/80 tracking-wide mb-3"
              >
                {item.subtitle}
              </p>

              {isActive && (
                <div className="mt-2 pt-3 border-t border-white/20 transition-all duration-300">
                  <p
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                    className="text-sm text-white/90 line-clamp-2 mb-3"
                  >
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md text-white/90"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
