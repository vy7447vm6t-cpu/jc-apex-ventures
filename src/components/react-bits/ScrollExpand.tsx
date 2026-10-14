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
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Fraction of container visible
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height * 0.5))
      );

      const currentScale = initialScale + (finalScale - initialScale) * progress;
      const currentRadius = 32 - 16 * progress;

      setScale(currentScale);
      setBorderRadius(currentRadius);
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
        }}
      >
        {children}
      </div>
    </div>
  );
}
