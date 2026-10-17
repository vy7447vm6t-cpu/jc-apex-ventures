"use client";

import React from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  color?: string;
  borderRadius?: number | string;
  duration?: number;
  active?: boolean;
  division?: string;
  innerBg?: string;
  style?: React.CSSProperties;
}

export default function ElectricBorder({
  children,
  className = '',
  glowColor,
  color,
  borderRadius = 20,
  duration = 3.6,
  active = true,
  division,
  innerBg = 'transparent',
  style = {},
}: ElectricBorderProps) {
  const effectiveGlow = glowColor || color || '#C29F53';
  const radiusNum =
    typeof borderRadius === 'number'
      ? borderRadius
      : parseInt(String(borderRadius), 10) || 20;

  // Reserved strictly for electrical divisions (Solis, Sanyog, Grid Apex)
  const isElectrical =
    !division ||
    ['solis', 'sanyog', 'grid-apex', 'gridapex'].includes(division.toLowerCase());
  const isActuallyActive = active && isElectrical;

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      style={{
        borderRadius: `${radiusNum}px`,
        boxShadow: isActuallyActive ? '0 0 22px -4px rgba(194, 159, 83, 0.35)' : 'none',
        transition: 'box-shadow 0.35s ease',
        ...style,
      }}
    >
      {/* 1.5px Traveling Laser Perimeter Ring via CSS Mask Exclusion */}
      {isActuallyActive && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            padding: '1.5px',
            borderRadius: `${radiusNum}px`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
        >
          <div
            className="absolute inset-[-150%]"
            style={{
              background: `conic-gradient(from 45deg at 50% 50%, transparent 0deg, ${effectiveGlow} 55deg, #F5D78E 75deg, transparent 105deg, transparent 180deg, ${effectiveGlow} 235deg, #F5D78E 255deg, transparent 285deg, transparent 360deg)`,
              animation: `electricSpin ${duration}s linear infinite`,
            }}
          />
        </div>
      )}

      {/* Inner surface */}
      <div
        className="relative h-full w-full"
        style={{
          backgroundColor: innerBg,
          borderRadius: `${Math.max(0, radiusNum - 2)}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
