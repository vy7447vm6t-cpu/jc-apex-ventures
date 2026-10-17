"use client";

import React from 'react';

interface CrtWarpProps {
  children: React.ReactNode;
  className?: string;
  enableCurvature?: boolean;
  enableScanlines?: boolean;
}

export default function CrtWarp({
  children,
  className = '',
  enableCurvature = true,
  enableScanlines = true,
}: CrtWarpProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-black/15 bg-[#0F1318] text-[#E8E4DA] shadow-2xl ${className}`}
      style={{
        boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.7), 0 16px 40px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Content wrapper */}
      <div
        className="relative z-10 p-6 font-sans text-sm tabular-nums"
        style={{
          transform: enableCurvature ? 'perspective(600px) rotateX(1deg)' : 'none',
        }}
      >
        {children}
      </div>

      {/* Scanline pattern overlay */}
      {enableScanlines && (
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.6) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px',
          }}
        />
      )}

      {/* Screen phosphor glow and corner vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 65%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />
    </div>
  );
}
