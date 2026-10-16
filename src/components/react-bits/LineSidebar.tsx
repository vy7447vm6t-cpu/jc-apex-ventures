"use client";

import React from 'react';

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
}

export default function LineSidebar({
  items,
  activeId,
  onSelect,
  className = '',
}: LineSidebarProps) {
  return (
    <div className={`relative flex flex-col gap-1.5 py-2 font-sans ${className}`}>
      {/* Background tracking line */}
      <div className="absolute left-[19px] top-5 bottom-5 w-[1.5px] bg-black/10" />

      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`relative flex items-center gap-3.5 py-2.5 px-2 rounded-xl text-left cursor-pointer group transition-all duration-200 ${
              isActive ? 'bg-white/80 shadow-xs border border-black/8' : 'hover:bg-black/[0.03]'
            }`}
          >
            {/* Pip */}
            <div
              className={`relative z-10 h-6 w-6 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                isActive
                  ? 'border-[#111111] bg-[#111111] shadow-xs scale-105'
                  : 'border-black/20 bg-[#F4F1EA] group-hover:border-black/40'
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#C29F53]' : 'bg-transparent'
                }`}
              />
            </div>

            {/* Label */}
            <div className="flex flex-col">
              <span
                className={`text-xs tracking-[0.06em] uppercase transition-colors duration-200 ${
                  isActive
                    ? 'font-bold text-[#111111]'
                    : 'font-semibold text-[#666666] group-hover:text-[#111111]'
                }`}
              >
                {item.label}
              </span>
              {item.tag && (
                <span className="text-[11px] text-[#777777] font-normal mt-0.5">
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
