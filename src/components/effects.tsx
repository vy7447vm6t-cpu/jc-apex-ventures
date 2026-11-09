'use client';

/**
 * The react-bits effects, loaded on demand. Each WebGL or canvas effect is code-split, mounts only
 * while its section is near the screen (so its GPU context is freed when you scroll away), and is
 * left out entirely for visitors who ask for reduced motion.
 */

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';

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
export const NetworkGraph = dynamic(() => import('./NetworkGraph'), { ssr: false });
export const InfiniteSpiral = dynamic(() => import('./react-bits/InfiniteSpiral'), { ssr: false });
export const ShapeWaves = dynamic(() => import('./react-bits/ShapeWaves'), { ssr: false });
export const ParticleText = dynamic(() => import('./react-bits/ParticleText'), { ssr: false });

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

/**
 * Mounts its children only once they come within 600 px of the screen, and keeps them mounted
 * after that. Used for the estimators, whose scripts are the heaviest on the page.
 */
export function LazyMount({ children, minHeight = 480 }: { children: React.ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setShow(true), { rootMargin: '600px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [show]);
  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show && children}
    </div>
  );
}

/**
 * A headline that rises into place word by word the first time it scrolls into view. Screen
 * readers get the plain sentence; with reduced motion it is simply there.
 */
export function RevealWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const words = text.split(' ');
  // CSS transitions (globals.css, .reveal-words) run on the compositor, so a busy main thread
  // can never leave a headline hidden; reduced motion shows the words at once.
  return (
    <span ref={ref} className={`reveal-words${inView ? ' is-shown' : ''}${className ? ` ${className}` : ''}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className="reveal-word-mask">
              <span className="reveal-word" style={{ transitionDelay: `${delay + i * 0.045}s` }}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}

/**
 * Moves its child against the scroll inside a clipped frame: a slow parallax for hero photos.
 * `strength` is the travel in pixels over the frame's pass through the screen.
 */
export function ParallaxLayer({ children, strength = 80, zoom = 0.08 }: { children: React.ReactNode; strength?: number; zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, strength]);
  const scale = useTransform(scrollYProgress, [0, 1], [1 + zoom / 2, 1 + zoom]);
  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div style={reduce ? { position: 'absolute', inset: 0 } : { position: 'absolute', inset: 0, y, scale, willChange: 'transform' }}>{children}</motion.div>
    </div>
  );
}
