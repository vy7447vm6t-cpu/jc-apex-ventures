"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface AccordionGalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  logo?: string;
  href: string;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  className?: string;
}

/**
 * Expanding photo panels (brand guidelines 2.8.2, reworked): the panel under the pointer or
 * keyboard focus widens. Text sits on a flat Night overlay; no badges, chips or numbering.
 */
export default function AccordionGallery({ items, className = '' }: AccordionGalleryProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  return (
    <div className={`flex flex-row gap-3.5 w-full h-[480px] ${className}`}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            onFocusCapture={() => setActiveId(item.id)}
            className={`relative overflow-hidden rounded-2xl border transition-[flex-grow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              isActive ? 'flex-[3.6] border-[#C29F53]/60' : 'flex-[1] border-white/10'
            }`}
            style={{ backgroundColor: '#0B0E14' }}
          >
            <Image src={item.image} alt="" fill sizes="(max-width: 1280px) 60vw, 45vw" className="object-cover" />
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-colors duration-500 motion-reduce:transition-none"
              style={{ backgroundColor: isActive ? 'rgba(11, 14, 20, 0.45)' : 'rgba(11, 14, 20, 0.62)' }}
            />

            <Link
              href={item.href}
              className="absolute inset-0 p-5 flex flex-col justify-end text-white no-underline focus-visible:outline-2 focus-visible:outline-[#C29F53] focus-visible:-outline-offset-4"
            >
              {item.logo && (
                <img
                  src={item.logo}
                  alt=""
                  style={{
                    height: isActive ? '30px' : '22px',
                    maxWidth: isActive ? '140px' : '90px',
                    width: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'left',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                />
              )}
              <span
                style={{ fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif', lineHeight: 1.15 }}
                className={`${isActive ? 'text-2xl' : 'text-base'} inline-flex items-center gap-2`}
              >
                {item.title}
                {isActive && <ArrowUpRight size={18} color="#C29F53" aria-hidden="true" />}
              </span>
              <span
                style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
                className={isActive ? 'mt-2 text-sm leading-relaxed text-white/90 max-w-[420px]' : 'sr-only'}
              >
                {item.description}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
