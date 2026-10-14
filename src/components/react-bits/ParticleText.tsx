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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    const width = 600;
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
    const particles: { x: number; y: number; originX: number; originY: number; vx: number; vy: number }[] = [];

    const step = 4;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        if (imgData[index + 3] > 128) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    }

    let progress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        p.vx = p.vx * 0.88 + dx * 0.08;
        p.vy = p.vy * 0.88 + dy * 0.08;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = particleColor;
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }

      progress += 0.02;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, fontSize, particleColor]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: '600px', height: '100px' }}
        className="max-w-full"
      />
    </div>
  );
}
