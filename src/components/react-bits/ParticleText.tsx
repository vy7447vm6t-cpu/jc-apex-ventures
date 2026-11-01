"use client";

import React, { useEffect, useRef } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
  fontSize?: number;
  particleColor?: string;
}

export default function ParticleText({
  text,
  className = '',
  fontSize = 36,
  particleColor = '#111111',
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isLoopRunning = false;
    let isVisible = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = 800;
    const height = 100;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Draw offscreen text to get pixel coordinates
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    offCtx.fillStyle = '#000000';
    offCtx.font = `italic 400 ${fontSize}px "Instrument Serif", Georgia, serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, width / 2, height / 2);

    const imgData = offCtx.getImageData(0, 0, width, height).data;
    const particles: {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
    }[] = [];

    const step = 2;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        if (imgData[index + 3] > 110) {
          particles.push({
            x: x + (Math.random() - 0.5) * 90,
            y: y + (Math.random() - 0.5) * 50,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    }

    const render = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const cursor = cursorRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interactive cursor repulsion physics
        if (cursor.active) {
          const dxC = p.x - cursor.x;
          const dyC = p.y - cursor.y;
          const dist = Math.sqrt(dxC * dxC + dyC * dyC);
          const repelRadius = 65;
          if (dist < repelRadius && dist > 0) {
            const force = ((repelRadius - dist) / repelRadius) * 5.5;
            p.vx += (dxC / dist) * force;
            p.vy += (dyC / dist) * force;
          }
        }

        // Return to origin spring physics
        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        p.vx = p.vx * 0.86 + dx * 0.08;
        p.vy = p.vy * 0.86 + dy * 0.08;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = particleColor;
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isLoopRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    let observer: IntersectionObserver | null = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isVisible = true;
              startLoop();
            } else {
              isVisible = false;
              stopLoop();
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(container);
    } else {
      isVisible = true;
      startLoop();
    }

    return () => {
      if (observer) observer.disconnect();
      stopLoop();
    };
  }, [text, fontSize, particleColor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    cursorRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    cursorRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center cursor-crosshair ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '800px', height: '100px' }}
        className="max-w-full"
      />
    </div>
  );
}
