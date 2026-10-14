"use client";

import React, { useEffect, useRef } from 'react';

interface ShapeWavesProps {
  className?: string;
  color?: string;
  height?: number;
  waveCount?: number;
}

export default function ShapeWaves({
  className = '',
  color = '#C29F53',
  height = 120,
  waveCount = 3,
}: ShapeWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, width, h);

      for (let j = 0; j < waveCount; j++) {
        ctx.beginPath();
        const freq = 0.015 + j * 0.005;
        const speed = 0.03 + j * 0.015;
        const amplitude = 18 + j * 8;
        const yOffset = h * 0.5 + Math.sin(step * 0.02 + j) * 10;

        for (let x = 0; x < width; x++) {
          const y = yOffset + Math.sin(x * freq + step * speed) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.25 + j * 0.2;
        ctx.stroke();
      }

      step += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, height, waveCount]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="h-full w-full pointer-events-none"
      />
    </div>
  );
}
