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
  theme?: 'light' | 'dark';
}

export default function LogoLoop({
  items,
  speed = 28,
  direction = 'left',
  className = '',
  theme = 'light',
}: LogoLoopProps) {
  // Duplicate list to create seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full overflow-hidden py-3 select-none group ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div
        className="flex gap-6 w-max transition-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `logoLoopAnimation ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={
              isDark
                ? "flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-sm transition-all hover:bg-white/[0.09] hover:border-[#C29F53]/40 hover:scale-[1.02]"
                : "flex items-center gap-3 px-4 py-2 rounded-full border border-black/8 bg-white/70 backdrop-blur-md shadow-sm transition-all hover:bg-white hover:scale-105"
            }
          >
            {item.icon && (
              <div className={isDark ? "text-[#C29F53]/90 shrink-0" : "text-[#C29F53] shrink-0"}>
                {item.icon}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span
                className={
                  isDark
                    ? "text-[11px] font-mono font-medium tracking-wider text-white/90 whitespace-nowrap"
                    : "text-xs font-mono font-bold tracking-wider text-[#111111] whitespace-nowrap"
                }
              >
                {item.name}
              </span>
              {item.category && (
                <>
                  <span className={isDark ? "text-white/20 text-[10px]" : "text-black/20 text-[10px]"}>•</span>
                  <span
                    className={
                      isDark
                        ? "text-[10px] text-[#C29F53]/80 font-mono tracking-tight whitespace-nowrap"
                        : "text-[10px] text-[#777777] font-mono whitespace-nowrap"
                    }
                  >
                    {item.category}
                  </span>
                </>
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
