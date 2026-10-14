"use client";

import React from 'react';

interface MicroSlatsProps {
  className?: string;
  count?: number;
  direction?: 'vertical' | 'horizontal';
  opacity?: number;
  color?: string;
}

export default function MicroSlats({
  className = '',
  count = 24,
  direction = 'vertical',
  opacity = 0.04,
  color = '#000000',
}: MicroSlatsProps) {
  const slats = Array.from({ length: count }, (_, i) => i);

  if (direction === 'horizontal') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <div className="flex h-full w-full flex-col justify-between">
          {slats.map((i) => (
            <div
              key={i}
              className="w-full transition-opacity duration-700"
              style={{
                height: '1px',
                backgroundColor: color,
                opacity: opacity,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <div className="flex h-full w-full flex-row justify-between">
        {slats.map((i) => (
          <div
            key={i}
            className="h-full transition-opacity duration-700"
            style={{
              width: '1px',
              backgroundColor: color,
              opacity: opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
