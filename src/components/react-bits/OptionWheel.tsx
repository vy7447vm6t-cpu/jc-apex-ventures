"use client";

import React, { useRef, useState, useEffect } from 'react';

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
  onChange: (value: string | number) => void;
  className?: string;
}

export default function OptionWheel({
  options,
  selectedValue,
  onChange,
  className = '',
}: OptionWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
    opacity: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  useEffect(() => {
    const updateIndicator = () => {
      const activeIdx = options.findIndex((opt) => opt.value === selectedValue);
      if (activeIdx >= 0 && buttonRefs.current[activeIdx]) {
        const btn = buttonRefs.current[activeIdx]!;
        setIndicatorStyle({
          top: btn.offsetTop,
          left: btn.offsetLeft,
          width: btn.offsetWidth,
          height: btn.offsetHeight,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    const timer = setTimeout(updateIndicator, 60);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [selectedValue, options]);

  return (
    <div className={`relative flex items-center justify-start p-1 max-w-full ${className}`}>
      {/* Tactile Apple iOS liquid glass segmented well */}
      <div
        ref={containerRef}
        role="tablist"
        aria-orientation="horizontal"
        style={{
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow:
            '0 8px 24px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        }}
        className="relative flex flex-wrap items-center gap-1.5 py-1.5 px-2 rounded-2xl sm:rounded-full max-w-full"
      >
        {/* Sliding 2D magnetic spring indicator pill with specular rim lighting */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: `${indicatorStyle.top}px`,
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            height: `${indicatorStyle.height}px`,
            opacity: indicatorStyle.opacity,
            borderRadius: '9999px',
            backgroundColor: '#111111',
            boxShadow:
              '0 4px 14px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(194, 159, 83, 0.45)',
            pointerEvents: 'none',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {options.map((opt, idx) => {
          const isSelected = opt.value === selectedValue;
          const isSanyog = Boolean(opt.logoSrc && opt.logoSrc.includes('sanyog'));
          return (
            <button
              key={String(opt.value)}
              ref={(el) => {
                buttonRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => {
                let targetIdx = -1;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  targetIdx = (idx + 1) % options.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  targetIdx = (idx - 1 + options.length) % options.length;
                } else if (e.key === 'Home') {
                  e.preventDefault();
                  targetIdx = 0;
                } else if (e.key === 'End') {
                  e.preventDefault();
                  targetIdx = options.length - 1;
                }
                if (targetIdx >= 0) {
                  onChange(options[targetIdx].value);
                  buttonRefs.current[targetIdx]?.focus();
                }
              }}
              style={{
                position: 'relative',
                zIndex: 2,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.78rem',
                fontWeight: isSelected ? 600 : 500,
                letterSpacing: '0.01em',
                color: isSelected ? '#FFFFFF' : '#333333',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                transition: 'color 0.25s ease',
              }}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full whitespace-nowrap cursor-pointer hover:text-[#111111]"
            >
              {opt.logoSrc && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    height: '22px',
                    paddingRight: '6px',
                    borderRight: isSelected
                      ? '1px solid rgba(194, 159, 83, 0.45)'
                      : '1px solid rgba(0, 0, 0, 0.12)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={isSelected && opt.logoDark ? opt.logoDark : opt.logoSrc}
                    alt={opt.subtext || opt.label}
                    style={{
                      height: isSanyog ? '22px' : '18px',
                      width: 'auto',
                      maxWidth: '68px',
                      objectFit: 'contain',
                      display: 'block',
                      filter:
                        isSelected && isSanyog
                          ? 'brightness(0) invert(1)'
                          : isSelected && opt.logoDark === opt.logoSrc
                          ? 'brightness(1.15)'
                          : 'none',
                    }}
                  />
                </span>
              )}
              <span>{opt.label}</span>
              {opt.subtext && !opt.logoSrc && (
                <span style={{ opacity: 0.72, fontSize: '0.68rem' }}>
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
