"use client";

import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  enableTilt?: boolean;
  spotlightColor?: string;
  borderColor?: string;
  contentStyle?: React.CSSProperties;
  theme?: 'dark' | 'light';
}

export default function SpotlightCard({
  children,
  className = '',
  style = {},
  contentStyle = {},
  enableTilt = true,
  spotlightColor,
  borderColor,
  theme = 'dark',
  ...props
}: SpotlightCardProps) {
  const isLight = theme === 'light';
  const defaultSpotlight = isLight ? 'rgba(194, 159, 83, 0.12)' : 'rgba(194, 159, 83, 0.14)';
  const defaultBorder = isLight ? 'rgba(194, 159, 83, 0.35)' : 'rgba(194, 159, 83, 0.45)';
  const activeSpotlight = spotlightColor ?? defaultSpotlight;
  const activeBorder = borderColor ?? defaultBorder;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Bounded within +/- 3.5 degrees for poised architectural elegance
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;
      el.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    }
  }, [enableTilt]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
      el.style.setProperty('--mouse-x', '-999px');
      el.style.setProperty('--mouse-y', '-999px');
    }
  }, []);

  const baseGlassClass = isLight ? 'ios-liquid-glass' : 'glass-panel ios-glass';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseGlassClass} ${className}`}
      style={{
        position: 'relative',
        transform: enableTilt && isHovered
          ? 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(-4px)'
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
          : 'transform 0.5s var(--ease-out-expo), box-shadow 0.5s var(--ease-out-expo)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {/* Specular Edge Refraction Mask (iOS dynamic glass border highlight) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: isHovered
            ? `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${activeBorder}, transparent 60%)`
            : 'transparent',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 4,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Caustic Ambient Spotlight Bloom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: isHovered
            ? `radial-gradient(550px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${activeSpotlight}, transparent 65%)`
            : 'transparent',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Inner card content */}
      <div style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column', ...contentStyle }}>
        {children}
      </div>
    </div>
  );
}
