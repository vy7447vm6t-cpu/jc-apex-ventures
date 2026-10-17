"use client";

import React, { useRef, useState, useEffect } from 'react';

interface ScrollExpandProps {
  children: React.ReactNode;
  className?: string;
  initialScale?: number;
  finalScale?: number;
}

export default function ScrollExpand({
  children,
  className = '',
  initialScale = 0.92,
  finalScale = 1.0,
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(initialScale);
  const [borderRadius, setBorderRadius] = useState(32);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Fraction of container visible: 0 when entering, 1 when centered/fully expanded
          const progress = Math.max(
            0,
            Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height * 0.4))
          );

          const currentScale = initialScale + (finalScale - initialScale) * progress;
          // Smoothly transitions all the way down to 0px at full expansion
          const currentRadius = Math.max(0, Math.round(32 * (1 - progress)));

          setScale(currentScale);
          setBorderRadius(currentRadius);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialScale, finalScale]);

  return (
    <div ref={containerRef} className={`w-full transition-all duration-300 ease-out ${className}`}>
      <div
        className="w-full overflow-hidden transition-all duration-200"
        style={{
          transform: `scale(${scale})`,
          borderRadius: `${borderRadius}px`,
          willChange: 'transform, border-radius',
        }}
      >
        {children}
      </div>
    </div>
  );
}
