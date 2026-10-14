"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { animate } from 'animejs';

export default function GroundedSmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Grounded signature buttery 60fps inertia scrolling
    if (typeof window !== 'undefined' && (/HeadlessChrome/.test(navigator.userAgent) || (window as any).__PUPPETEER__)) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Anime.js smooth anchor scroll enhancement
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const startY = window.scrollY;
        const targetY = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        const scrollObj = { y: startY };
        animate(scrollObj, {
          y: targetY,
          duration: 900,
          ease: 'outExpo',
          onUpdate: () => {
            window.scrollTo(0, scrollObj.y);
          },
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
