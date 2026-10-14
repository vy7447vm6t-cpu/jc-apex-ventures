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
    <div className={`relative flex flex-col gap-1 py-2 ${className}`}>
      {/* Background tracking line */}
      <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-black/10" />

      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className="relative flex items-center gap-4 py-2.5 px-2 text-left cursor-pointer group"
          >
            {/* Pip */}
            <div
              className={`relative z-10 h-6 w-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'border-[#111111] bg-[#111111] shadow-sm scale-110'
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
                className={`text-xs font-mono tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'font-bold text-[#111111]'
                    : 'text-[#777777] group-hover:text-[#111111]'
                }`}
              >
                {item.label}
              </span>
              {item.tag && (
                <span className="text-[10px] text-[#999999] font-mono">
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
