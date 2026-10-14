"use client";

import React from 'react';

export interface LogoLoopItem {
  id: string;
  name: string;
  category?: string;
  icon?: React.ReactNode;
}

interface LogoLoopProps {
  items: LogoLoopItem[];
  speed?: number; // duration in seconds
  direction?: 'left' | 'right';
  className?: string;
}

export default function LogoLoop({
  items,
  speed = 28,
  direction = 'left',
  className = '',
}: LogoLoopProps) {
  // Duplicate list to create seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 select-none group ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <div
        className="flex gap-8 w-max transition-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `logoLoopAnimation ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/8 bg-white/70 backdrop-blur-md shadow-sm transition-all hover:bg-white hover:scale-105"
          >
            {item.icon && <div className="text-[#C29F53]">{item.icon}</div>}
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold tracking-wider text-[#111111] whitespace-nowrap">
                {item.name}
              </span>
              {item.category && (
                <span className="text-[10px] text-[#777777] font-mono whitespace-nowrap">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes logoLoopAnimation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>
    </div>
  );
}
