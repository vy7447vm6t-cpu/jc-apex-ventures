'use client';

/**
 * The react-bits effects, loaded on demand. Each WebGL or canvas effect is code-split, mounts only
 * while its section is near the screen (so its GPU context is freed when you scroll away), and is
 * left out entirely for visitors who ask for reduced motion.
 */

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'motion/react';

export const PatternWaves = dynamic(() => import('./react-bits/PatternWaves'), { ssr: false });
export const MicroSlats = dynamic(() => import('./react-bits/MicroSlats'), { ssr: false });
export const FluxLines = dynamic(() => import('./react-bits/FluxLines'), { ssr: false });
export const GradientASCII = dynamic(() => import('./react-bits/GradientASCII'), { ssr: false });
export const GridScan = dynamic(() => import('./react-bits/GridScan').then((m) => m.GridScan ?? m.default), { ssr: false });
export const CrtWarp = dynamic(() => import('./react-bits/CrtWarp'), { ssr: false });
export const FaultyTerminal = dynamic(() => import('./react-bits/FaultyTerminal'), { ssr: false });
export const HoloCard = dynamic(() => import('./react-bits/HoloCard'), { ssr: false });
export const TargetCursor = dynamic(() => import('./react-bits/TargetCursor'), { ssr: false });
export const GlowCursor = dynamic(() => import('./react-bits/GlowCursor'), { ssr: false });

/** True on wide screens with a fine pointer (a mouse or trackpad). */
export function useDesktopPointer(): boolean {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return desktop;
}

/**
 * A background layer for an effect: absolutely positioned, behind the content, mounted only while
 * near the viewport. `desktopOnly` keeps the heaviest effects off phones.
 */
export function Ambient({
  children,
  desktopOnly = false,
  opacity = 1,
  blend,
  zIndex = 0,
}: {
  children: React.ReactNode;
  desktopOnly?: boolean;
  opacity?: number;
  blend?: React.CSSProperties['mixBlendMode'];
  zIndex?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const reduce = useReducedMotion();
  const desktop = useDesktopPointer();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '200px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const show = near && !reduce && (!desktopOnly || desktop);
  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex, pointerEvents: 'none', opacity, mixBlendMode: blend, overflow: 'hidden' }}>
      {show && children}
    </div>
  );
}
