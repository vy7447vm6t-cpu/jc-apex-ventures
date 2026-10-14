"use client";

import React from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: number;
  duration?: number;
}

export default function ElectricBorder({
  children,
  className = '',
  glowColor = '#C29F53',
  borderRadius = 20,
  duration = 4,
}: ElectricBorderProps) {
  return (
    <div
      className={`relative p-[1px] overflow-hidden group ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Animated spinning conical gradient */}
      <div
        className="absolute inset-[-150%] pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${glowColor} 330deg, transparent 360deg)`,
          animation: `electricSpin ${duration}s linear infinite`,
        }}
      />

      {/* Inner surface */}
      <div
        className="relative h-full w-full bg-[#FFFFFF] backdrop-blur-xl"
        style={{
          borderRadius: `${Math.max(0, borderRadius - 1)}px`,
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
