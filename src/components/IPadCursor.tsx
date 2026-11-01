"use client";

import React, { useEffect, useState, useRef } from 'react';

interface MorphTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
}

export default function IPadCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [morphTarget, setMorphTarget] = useState<MorphTarget | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const isDesktopRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDesktop = () => {
      isDesktopRef.current = Boolean(
        window.matchMedia &&
        window.matchMedia('(min-width: 1024px)').matches &&
        window.matchMedia('(pointer: fine)').matches
      );
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktopRef.current) {
        setVisible(false);
        return;
      }

      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setMorphTarget(null);
        return;
      }

      const interactive = target.closest<HTMLElement>(
        'a, button, [role="button"], input, select, textarea, [data-magnetic], .magnetic-target'
      );

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(interactive);
        const radius = computedStyle.borderRadius || '14px';

        setMorphTarget({
          x: rect.left - 4,
          y: rect.top - 3,
          width: rect.width + 8,
          height: rect.height + 6,
          borderRadius: radius === '0px' ? '8px' : radius,
        });
      } else {
        setMorphTarget(null);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
      setMorphTarget(null);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => {
      setIsClicking(false);
      setMorphTarget(null);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!visible) return null;

  const isMorphed = morphTarget !== null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[99999] hidden lg:block transition-all ease-out"
      style={{
        left: isMorphed ? `${morphTarget.x}px` : `${pos.x}px`,
        top: isMorphed ? `${morphTarget.y}px` : `${pos.y}px`,
        width: isMorphed ? `${morphTarget.width}px` : '18px',
        height: isMorphed ? `${morphTarget.height}px` : '18px',
        transform: isMorphed
          ? isClicking
            ? 'scale(0.97)'
            : 'scale(1.0)'
          : `translate(-50%, -50%) ${isClicking ? 'scale(0.85)' : 'scale(1.0)'}`,
        borderRadius: isMorphed ? morphTarget.borderRadius : '9999px',
        backgroundColor: isMorphed
          ? 'rgba(194, 159, 83, 0.14)'
          : 'rgba(194, 159, 83, 0.35)',
        backdropFilter: 'blur(12px) saturate(190%)',
        WebkitBackdropFilter: 'blur(12px) saturate(190%)',
        border: isMorphed
          ? '1px solid rgba(194, 159, 83, 0.5)'
          : '1.5px solid rgba(194, 159, 83, 0.75)',
        boxShadow: isMorphed
          ? '0 8px 24px -2px rgba(194, 159, 83, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45)'
          : '0 2px 10px rgba(194, 159, 83, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)',
        transitionProperty: 'left, top, width, height, border-radius, transform, background-color, border, box-shadow',
        transitionDuration: isMorphed ? '180ms' : '75ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}
