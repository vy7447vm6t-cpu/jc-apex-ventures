"use client";

import React, { useEffect, useRef } from 'react';

interface TargetCursorProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  targetSelector?: string;
  color?: string;
  className?: string;
}

export default function TargetCursor({
  containerRef,
  targetSelector = '.cursor-target, a, button, [role="button"], [data-cursor-target]',
  color = '#C29F53',
  className = '',
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
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

    const updateCursor = (
      x: number,
      y: number,
      w: number,
      h: number,
      active: boolean,
      isSnapped: boolean
    ) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.setProperty('--cursor-x', `${x}px`);
      el.style.setProperty('--cursor-y', `${y}px`);
      el.style.setProperty('--cursor-w', `${w}px`);
      el.style.setProperty('--cursor-h', `${h}px`);
      el.style.setProperty('--cursor-opacity', active ? '1' : '0');
      el.style.setProperty('--bracket-size', isSnapped ? '10px' : '7px');
      el.style.setProperty('--bracket-radius', isSnapped ? '4px' : '1px');
      el.style.setProperty('--bracket-glow', isSnapped ? `0 0 8px ${color}` : 'none');
      el.style.setProperty('--dot-opacity', isSnapped ? '0' : '0.9');
      el.style.setProperty(
        '--cursor-transition',
        isSnapped
          ? 'left 0.2s cubic-bezier(0.16, 1, 0.3, 1), top 0.2s cubic-bezier(0.16, 1, 0.3, 1), width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease'
          : 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease'
      );
    };

    const handleMove = (e: MouseEvent) => {
      if (!checkIsDesktop()) {
        updateCursor(-100, -100, 28, 28, false, false);
        return;
      }

      const clientX = e.clientX;
      const clientY = e.clientY;
      const targetNode = e.target as HTMLElement | null;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (containerRef && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const inside =
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom;

          if (!inside) {
            updateCursor(-100, -100, 28, 28, false, false);
            return;
          }
        }

        // Check if hovering a magnetic snap target inside containerRef
        const matchedEl = targetNode?.closest?.(targetSelector) as HTMLElement | null;

        if (
          matchedEl &&
          (!containerRef?.current || containerRef.current.contains(matchedEl))
        ) {
          const tRect = matchedEl.getBoundingClientRect();
          // Ignore oversized full-screen overlays
          if (tRect.width > 16 && tRect.width < 680 && tRect.height > 16 && tRect.height < 260) {
            const centerX = tRect.left + tRect.width / 2;
            const centerY = tRect.top + tRect.height / 2;
            // Subtle magnetic pull toward pointer
            const pullX = (clientX - centerX) * 0.1;
            const pullY = (clientY - centerY) * 0.1;

            updateCursor(
              centerX + pullX,
              centerY + pullY,
              tRect.width + 10,
              tRect.height + 10,
              true,
              true
            );
            return;
          }
        }

        updateCursor(clientX, clientY, 28, 28, true, false);
      });
    };

    const handleLeave = () => {
      updateCursor(-100, -100, 28, 28, false, false);
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
  }, [containerRef, targetSelector, color]);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 hidden lg:block ${className}`}
      style={{
        left: 'var(--cursor-x, -100px)',
        top: 'var(--cursor-y, -100px)',
        width: 'var(--cursor-w, 28px)',
        height: 'var(--cursor-h, 28px)',
        transform: 'translate(-50%, -50%)',
        opacity: 'var(--cursor-opacity, 0)',
        transition:
          'var(--cursor-transition, width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease)',
      }}
      aria-hidden="true"
    >
      {/* Top-Left Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'var(--bracket-size, 7px)',
          height: 'var(--bracket-size, 7px)',
          borderTop: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          borderTopLeftRadius: 'var(--bracket-radius, 1px)',
          boxShadow: 'var(--bracket-glow, none)',
          transition: 'all 0.2s ease',
        }}
      />
      {/* Top-Right Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'var(--bracket-size, 7px)',
          height: 'var(--bracket-size, 7px)',
          borderTop: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          borderTopRightRadius: 'var(--bracket-radius, 1px)',
          boxShadow: 'var(--bracket-glow, none)',
          transition: 'all 0.2s ease',
        }}
      />
      {/* Bottom-Left Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 'var(--bracket-size, 7px)',
          height: 'var(--bracket-size, 7px)',
          borderBottom: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          borderBottomLeftRadius: 'var(--bracket-radius, 1px)',
          boxShadow: 'var(--bracket-glow, none)',
          transition: 'all 0.2s ease',
        }}
      />
      {/* Bottom-Right Corner Bracket */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 'var(--bracket-size, 7px)',
          height: 'var(--bracket-size, 7px)',
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          borderBottomRightRadius: 'var(--bracket-radius, 1px)',
          boxShadow: 'var(--bracket-glow, none)',
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
          opacity: 'var(--dot-opacity, 0.9)',
          transition: 'opacity 0.15s ease',
          boxShadow: `0 0 6px ${color}`,
        }}
      />
    </div>
  );
}
