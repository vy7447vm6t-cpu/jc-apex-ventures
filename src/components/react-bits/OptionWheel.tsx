"use client";

import React, { useRef, useState } from 'react';

export interface WheelOption {
  label: string;
  value: string | number;
  subtext?: string;
  logoSrc?: string;
  logoDark?: string;
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
  return (
    <div className={`relative flex items-center justify-center p-1.5 ${className}`}>
      {/* Outer KokonutUI iOS liquid glass well */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        }}
        className="relative flex items-center gap-2 overflow-x-auto py-1.5 px-2 rounded-full no-scrollbar max-w-full"
      >
        {options.map((opt) => {
          const isSelected = opt.value === selectedValue;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.78rem',
                fontWeight: isSelected ? 600 : 500,
                letterSpacing: '0.02em',
                backgroundColor: isSelected ? '#111111' : 'transparent',
                color: isSelected ? '#FFFFFF' : '#555555',
                border: isSelected ? '1px solid rgba(194, 159, 83, 0.45)' : '1px solid transparent',
                boxShadow: isSelected ? '0 4px 14px rgba(0, 0, 0, 0.16)' : 'none',
              }}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {opt.logoSrc && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    height: '22px',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={isSelected && opt.logoDark ? opt.logoDark : opt.logoSrc}
                    alt={opt.subtext || opt.label}
                    style={{ maxHeight: '18px', maxWidth: '64px', objectFit: 'contain', display: 'block' }}
                  />
                </span>
              )}
              <span>{opt.label}</span>
              {opt.subtext && !opt.logoSrc && (
                <span style={{ opacity: 0.72, fontSize: '0.7rem' }}>
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
