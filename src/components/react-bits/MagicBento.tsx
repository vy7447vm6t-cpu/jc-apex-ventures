"use client";

import React, { useRef, useState } from 'react';

export interface BentoCardData {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  content?: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

interface MagicBentoProps {
  cards: BentoCardData[];
  className?: string;
}

export default function MagicBento({
  cards,
  className = '',
}: MagicBentoProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ${className}`}
    >
      {cards.map((card) => {
        const colClass =
          card.colSpan === 3
            ? 'lg:col-span-3 md:col-span-2'
            : card.colSpan === 2
            ? 'lg:col-span-2 md:col-span-2'
            : 'col-span-1';

        const rowClass = card.rowSpan === 2 ? 'row-span-2' : 'row-span-1';

        return (
          <div
            key={card.id}
            className={`group relative rounded-3xl border border-black/8 bg-white/80 p-8 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${colClass} ${rowClass}`}
          >
            {/* Dynamic mouse spotlight reflection */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(194, 159, 83, 0.12), transparent 80%)`,
              }}
            />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                {card.badge && (
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.68rem',
                      fontWeight: 650,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#8C733E',
                      backgroundColor: 'rgba(194, 159, 83, 0.14)',
                      border: '1px solid rgba(194, 159, 83, 0.32)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                    }}
                  >
                    {card.badge}
                  </span>
                )}
                {card.icon && (
                  <div className="text-[#8C733E] transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                )}
              </div>

              <h4
                style={{
                  color: '#111111',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  fontSize: '1.45rem',
                  margin: '0 0 8px 0',
                }}
              >
                {card.title}
              </h4>
              <p
                style={{
                  color: '#555555',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  lineHeight: 1.6,
                  fontSize: '0.9rem',
                  margin: 0,
                }}
              >
                {card.subtitle}
              </p>

              {card.content && <div className="mt-4">{card.content}</div>}
            </div>

            {card.footer && (
              <div
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.76rem',
                  color: '#666666',
                  fontWeight: 500,
                }}
                className="mt-6 pt-4 border-t border-black/8"
              >
                {card.footer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
