"use client";

import React, { useEffect, useState } from 'react';

interface GlowCursorProps {
  color?: string;
  size?: number;
}

export default function GlowCursor({
  color = 'rgba(194, 159, 83, 0.15)',
  size = 320,
}: GlowCursorProps) {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color} 0%, rgba(255, 255, 255, 0) 70%)`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
