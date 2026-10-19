"use client";

import React, { useEffect, useState, useRef } from 'react';

interface TargetCursorProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  targetSelector?: string;
  color?: string;
  className?: string;
}

interface SnapRect {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
}

export default function TargetCursor({
  containerRef,
  targetSelector = '.cursor-target, a, button, [role="button"], [data-cursor-target]',
  color = '#C29F53',
  className = '',
}: TargetCursorProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [snappedRect, setSnappedRect] = useState<SnapRect | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIsDesktop = () => {
      return Boolean(
        window.matchMedia &&
          window.matchMedia('(min-width: 1024px)').matches &&
          window.matchMedia('(pointer: fine)').matches
      );
    };

    const handleMove = (e: MouseEvent) => {
      if (!checkIsDesktop()) {
        setActive(false);
        setSnappedRect(null);
        return;
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (containerRef && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (!inside) {
            setActive(false);
            setSnappedRect(null);
            return;
          }
        }

        setPos({ x: e.clientX, y: e.clientY });
        setActive(true);

        // Check if hovering a magnetic snap target inside containerRef
        const targetNode = e.target as HTMLElement | null;
        const matchedEl = targetNode?.closest?.(targetSelector) as HTMLElement | null;

        if (
          matchedEl &&
          (!containerRef?.current || containerRef.current.contains(matchedEl))
        ) {
          const tRect = matchedEl.getBoundingClientRect();
          // Ignore oversized full-screen overlays
          if (tRect.width > 16 && tRect.width < 680 && tRect.height > 16 && tRect.height < 260) {
            const computedRadius = window.getComputedStyle(matchedEl).borderRadius || '10px';
            const centerX = tRect.left + tRect.width / 2;
            const centerY = tRect.top + tRect.height / 2;
            // Subtle magnetic pull toward pointer
            const pullX = (e.clientX - centerX) * 0.1;
            const pullY = (e.clientY - centerY) * 0.1;

            setSnappedRect({
              x: centerX + pullX,
              y: centerY + pullY,
              width: tRect.width + 10,
              height: tRect.height + 10,
              borderRadius: computedRadius,
            });
            return;
          }
        }

        setSnappedRect(null);
      });
    };

    const handleLeave = () => {
      setActive(false);
      setSnappedRect(null);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('scroll', handleLeave, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleLeave);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [containerRef, targetSelector]);

  const isSnapped = Boolean(snappedRect);
  const displayX = snappedRect ? snappedRect.x : pos.x;
  const displayY = snappedRect ? snappedRect.y : pos.y;
  const displayW = snappedRect ? snappedRect.width : 28;
  const displayH = snappedRect ? snappedRect.height : 28;

  return (
    <div
      className={`pointer-events-none fixed z-50 hidden lg:block ${className}`}
      style={{
        left: `${displayX}px`,
        top: `${displayY}px`,
        width: `${displayW}px`,
        height: `${displayH}px`,
        transform: 'translate(-50%, -50%)',
        opacity: active && pos.x >= 0 ? 1 : 0,
        transition: isSnapped
          ? 'left 0.22s cubic-bezier(0.16, 1, 0.3, 1), top 0.22s cubic-bezier(0.16, 1, 0.3, 1), width 0.24s cubic-bezier(0.16, 1, 0.3, 1), height 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease'
          : 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease',
      }}
      aria-hidden="true"
    >
      {/* Top-Left Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isSnapped ? '10px' : '7px',
          height: isSnapped ? '10px' : '7px',
          borderTop: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          borderTopLeftRadius: isSnapped ? '4px' : '1px',
          boxShadow: isSnapped ? `0 0 8px ${color}` : 'none',
          transition: 'all 0.2s ease',
        }}
      />
      {/* Top-Right Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: isSnapped ? '10px' : '7px',
          height: isSnapped ? '10px' : '7px',
          borderTop: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          borderTopRightRadius: isSnapped ? '4px' : '1px',
          boxShadow: isSnapped ? `0 0 8px ${color}` : 'none',
          transition: 'all 0.2s ease',
        }}
      />
      {/* Bottom-Left Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: isSnapped ? '10px' : '7px',
          height: isSnapped ? '10px' : '7px',
          borderBottom: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          borderBottomLeftRadius: isSnapped ? '4px' : '1px',
          boxShadow: isSnapped ? `0 0 8px ${color}` : 'none',
          transition: 'all 0.2s ease',
        }}
      />
      {/* Bottom-Right Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: isSnapped ? '10px' : '7px',
          height: isSnapped ? '10px' : '7px',
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          borderBottomRightRadius: isSnapped ? '4px' : '1px',
          boxShadow: isSnapped ? `0 0 8px ${color}` : 'none',
          transition: 'all 0.2s ease',
        }}
      />

      {/* Center Precision Dot (fades out when brackets snap around a target) */}
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '4px',
          height: '4px',
          borderRadius: '9999px',
          backgroundColor: color,
          transform: 'translate(-50%, -50%)',
          opacity: isSnapped ? 0 : 0.9,
          transition: 'opacity 0.15s ease',
          boxShadow: `0 0 6px ${color}`,
        }}
      />
    </div>
  );
}
