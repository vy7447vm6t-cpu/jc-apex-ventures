"use client";

import React, { useRef, useState } from 'react';

export interface WheelOption {
  label: string;
  value: string | number;
  subtext?: string;
}

interface OptionWheelProps {
  options: WheelOption[];
  selectedValue: string | number;
  onChange: (value: any) => void;
  className?: string;
}

export default function OptionWheel({
  options,
  selectedValue,
  onChange,
  className = '',
}: OptionWheelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative flex items-center justify-center p-2 ${className}`}>
      {/* Outer iOS glass well */}
      <div className="relative flex items-center gap-2 overflow-x-auto py-2 px-3 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl shadow-inner no-scrollbar">
        {options.map((opt) => {
          const isSelected = opt.value === selectedValue;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`relative px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#111111] text-[#FFFFFF] shadow-md scale-105'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-black/5'
              }`}
            >
              {opt.label}
              {opt.subtext && (
                <span className="ml-1 opacity-70 text-[10px]">
                  ({opt.subtext})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
