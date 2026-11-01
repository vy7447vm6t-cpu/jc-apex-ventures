"use client";

import React, { useRef, useState, useEffect } from 'react';

export interface LineSidebarItem {
  id: string;
  label: string;
  tag?: string;
}

interface LineSidebarProps {
  items: LineSidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  variant?: 'light' | 'dark';
}

export default function LineSidebar({
  items,
  activeId,
  onSelect,
  className = '',
  variant = 'light',
}: LineSidebarProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorTop, setIndicatorTop] = useState(20);
  const [indicatorHeight, setIndicatorHeight] = useState(24);

  useEffect(() => {
    const updateIndicator = () => {
      const activeIdx = items.findIndex((item) => item.id === activeId);
      if (activeIdx >= 0 && buttonRefs.current[activeIdx]) {
        const btn = buttonRefs.current[activeIdx]!;
        setIndicatorTop(btn.offsetTop + 8);
        setIndicatorHeight(btn.offsetHeight - 16);
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeId, items]);

  return (
    <div className={`relative flex flex-col gap-1.5 py-2 font-sans ${className}`}>
      {/* Background tracking line */}
      <div
        className={`absolute left-[19px] top-5 bottom-5 w-[1.5px] ${
          variant === 'dark' ? 'bg-white/10' : 'bg-black/10'
        }`}
      />

      {/* Animated gold progress indicator tracking active item */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '18px',
          top: `${indicatorTop}px`,
          height: `${indicatorHeight}px`,
          width: '3.5px',
          borderRadius: '9999px',
          backgroundColor: '#C29F53',
          boxShadow: '0 0 10px rgba(194, 159, 83, 0.75)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {items.map((item, idx) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`relative flex items-center gap-3.5 py-2.5 px-2 rounded-xl text-left cursor-pointer group transition-all duration-200 ${
              isActive
                ? variant === 'dark'
                  ? 'bg-white/[0.08] shadow-xs border border-[rgba(194,159,83,0.35)]'
                  : 'bg-white/80 shadow-xs border border-black/8'
                : variant === 'dark'
                ? 'hover:bg-white/[0.04] border border-transparent'
                : 'hover:bg-black/[0.03]'
            }`}
          >
            {/* Pip */}
            <div
              className={`relative z-10 h-6 w-6 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                isActive
                  ? variant === 'dark'
                    ? 'border-[#C29F53] bg-[#0D1117] shadow-xs scale-105'
                    : 'border-[#111111] bg-[#111111] shadow-xs scale-105'
                  : variant === 'dark'
                  ? 'border-white/20 bg-white/5 group-hover:border-white/40'
                  : 'border-black/20 bg-[#F4F1EA] group-hover:border-black/40'
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? variant === 'dark'
                      ? 'bg-[#C29F53] shadow-[0_0_8px_#C29F53]'
                      : 'bg-[#C29F53]'
                    : 'bg-transparent'
                }`}
              />
            </div>

            {/* Label */}
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
                className={`text-xs tracking-[0.06em] uppercase transition-colors duration-200 ${
                  isActive
                    ? variant === 'dark'
                      ? 'font-bold text-[#FFFFFF]'
                      : 'font-bold text-[#111111]'
                    : variant === 'dark'
                    ? 'font-semibold text-[#8B949E] group-hover:text-[#FFFFFF]'
                    : 'font-semibold text-[#666666] group-hover:text-[#111111]'
                }`}
              >
                {item.label}
              </span>
              {item.tag && (
                <span
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                  className={`text-[11px] font-normal mt-0.5 ${
                    variant === 'dark' ? 'text-[#7D8590]' : 'text-[#777777]'
                  }`}
                >
                  {item.tag}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
