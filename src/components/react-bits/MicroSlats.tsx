"use client";

import React from 'react';

interface MicroSlatsProps {
  className?: string;
  count?: number;
  direction?: 'vertical' | 'horizontal';
  opacity?: number;
  color?: string;
  zIndex?: number;
  showTicks?: boolean;
}

export default function MicroSlats({
  className = '',
  count = 24,
  direction = 'vertical',
  opacity = 0.08,
  color = '#000000',
  zIndex = 1,
  showTicks = true,
}: MicroSlatsProps) {
  const slats = Array.from({ length: count }, (_, i) => i);

  if (direction === 'horizontal') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
        style={{ zIndex }}
      >
        <div className="flex h-full w-full flex-col justify-between">
          {slats.map((i) => (
            <div
              key={i}
              className="w-full transition-opacity duration-700"
              style={{
                height: i % 4 === 0 ? '1.5px' : '1px',
                backgroundColor: color,
                opacity: i % 4 === 0 ? opacity * 1.45 : opacity,
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
      style={{ zIndex }}
    >
      <div className="flex h-full w-full flex-row justify-between px-4">
        {slats.map((i) => {
          const isMajor = i % 4 === 0;
          return (
            <div
              key={i}
              className="relative h-full transition-opacity duration-700"
              style={{
                width: '1px',
                backgroundColor: color,
                opacity: isMajor ? opacity * 1.45 : opacity,
              }}
            >
              {isMajor && (
                <>
                  <span
                    style={{
                      position: 'absolute',
                      top: '18%',
                      left: '-3px',
                      width: '7px',
                      height: '1px',
                      backgroundColor: color,
                      opacity: Math.min(1, opacity * 2.2),
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '22%',
                      left: '-3px',
                      width: '7px',
                      height: '1px',
                      backgroundColor: color,
                      opacity: Math.min(1, opacity * 2.2),
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
