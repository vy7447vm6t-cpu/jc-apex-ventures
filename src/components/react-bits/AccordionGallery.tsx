"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import SpecularButton from './SpecularButton';
import TechText from './TechText';

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
  href?: string;
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
    <div className={`flex flex-col lg:flex-row gap-3.5 w-full min-h-[520px] lg:h-[520px] ${className}`}>
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            onMouseEnter={() => setActiveId(item.id)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out border ${
              isActive
                ? 'lg:flex-[3.6] min-h-[340px] lg:min-h-0 border-[#C29F53]/50 shadow-2xl'
                : 'lg:flex-[1] min-h-[86px] lg:min-h-0 border-black/10'
            }`}
            style={{
              backgroundColor: '#111111',
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={`object-cover transition-transform duration-700 ${
                  isActive ? 'scale-105 filter-none' : 'scale-100 brightness-75'
                }`}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(17, 17, 17, 0.94) 0%, rgba(17, 17, 17, 0.42) 58%, rgba(17, 17, 17, 0.15) 100%)'
                    : 'linear-gradient(to top, rgba(17, 17, 17, 0.88) 0%, rgba(17, 17, 17, 0.35) 100%)',
                }}
              />
            </div>

            {/* Top Index & Badge Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: isActive ? '#C29F53' : 'rgba(255, 255, 255, 0.75)',
                  letterSpacing: '0.06em',
                }}
              >
                {`(${String(index + 1).padStart(2, '0')})`}
              </span>
              {isActive && item.badge && (
                <span
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                  className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#C29F53] text-[#111111]"
                >
                  <TechText text={item.badge} scrambleSpeed={18} maxScrambles={4} />
                </span>
              )}
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white z-10">
              <div className="flex items-center gap-3 mb-2">
                {item.logo && (
                  <img
                    src={item.logo}
                    alt={item.title}
                    style={{
                      height: isActive ? '30px' : '22px',
                      maxWidth: isActive ? '125px' : '90px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      filter: item.logo.includes('sanyog') ? 'brightness(0) invert(1)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                )}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  fontWeight: 400,
                  lineHeight: 1.18,
                }}
                className={`${isActive ? 'text-xl md:text-2xl' : 'text-base'} text-white mb-1 transition-all`}
              >
                {item.subtitle || item.title}
              </h3>

              {isActive && (
                <div className="mt-2 pt-3 border-t border-white/15 transition-all duration-300">
                  <p
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                    className="text-xs md:text-sm text-white/90 line-clamp-3 mb-3 leading-relaxed"
                  >
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.specs.map((spec, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          }}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md text-white/95 border border-white/15"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    {item.href && (
                      <SpecularButton
                        href={item.href}
                        variant="light"
                        className="!py-1.5 !px-3.5 !text-[0.72rem] shrink-0"
                        icon={<ArrowUpRight size={13} />}
                      >
                        Dossier
                      </SpecularButton>
                    )}
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
