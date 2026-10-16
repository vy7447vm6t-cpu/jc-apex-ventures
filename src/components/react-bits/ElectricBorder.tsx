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
  innerBg = 'transparent',
  style = {},
}: ElectricBorderProps) {
  const effectiveGlow = glowColor || color || '#C29F53';
  const radiusNum =
    typeof borderRadius === 'number'
      ? borderRadius
      : parseInt(String(borderRadius), 10) || 20;

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      style={{
        padding: active ? '2px' : '1px',
        borderRadius: `${radiusNum}px`,
        backgroundColor: active ? 'rgba(194, 159, 83, 0.22)' : 'rgba(0, 0, 0, 0.08)',
        boxShadow: active ? `0 0 22px -4px rgba(194, 159, 83, 0.35)` : 'none',
        transition: 'box-shadow 0.35s ease, background-color 0.35s ease',
        ...style,
      }}
    >
      {/* Animated dual-arc spinning conical gradient */}
      {active && (
        <div
          className="absolute inset-[-150%] pointer-events-none"
          style={{
            background: `conic-gradient(from 45deg at 50% 50%, transparent 0deg, ${effectiveGlow} 55deg, #F5D78E 75deg, transparent 105deg, transparent 180deg, ${effectiveGlow} 235deg, #F5D78E 255deg, transparent 285deg, transparent 360deg)`,
            animation: `electricSpin ${duration}s linear infinite`,
          }}
        />
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

      <style jsx global>{`
        @keyframes electricSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
