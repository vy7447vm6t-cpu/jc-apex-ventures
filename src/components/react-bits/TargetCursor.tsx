"use client";

import React, { useEffect, useState } from 'react';

interface TargetCursorProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  color?: string;
}

export default function TargetCursor({
  color = '#C29F53',
}: TargetCursorProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!active) setActive(true);
    };

    const handleLeave = () => {
      setActive(false);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-150"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: active ? 1 : 0,
      }}
    >
      {/* Target Reticle */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: '32px', height: '32px' }}
      >
        <div
          className="absolute h-full w-[1px]"
          style={{ backgroundColor: color, opacity: 0.7 }}
        />
        <div
          className="absolute w-full h-[1px]"
          style={{ backgroundColor: color, opacity: 0.7 }}
        />
        <div
          className="h-3 w-3 rounded-full border"
          style={{ borderColor: color, opacity: 0.9 }}
        />
        {/* Coordinates readout */}
        <div
          className="absolute top-5 left-5 text-[9px] font-mono tracking-tighter whitespace-nowrap px-1 py-0.5 rounded bg-black/80 text-white"
        >
          X:{Math.round(pos.x)} Y:{Math.round(pos.y)}
        </div>
      </div>
    </div>
  );
}
