"use client";

import React, { useEffect, useRef } from 'react';

interface InfiniteSpiralProps {
  className?: string;
  color?: string;
  size?: number;
  speed?: number;
}

export default function InfiniteSpiral({
  className = '',
  color = '#C29F53',
  size = 280,
  speed = 0.008,
}: InfiniteSpiralProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);

      const arms = 3;
      const points = 120;

      for (let arm = 0; arm < arms; arm++) {
        ctx.beginPath();
        const armOffset = (arm * Math.PI * 2) / arms;

        for (let i = 0; i < points; i++) {
          const t = i / points;
          const r = t * (size * 0.44);
          const theta = t * 6 * Math.PI + angle + armOffset;
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.4 + arm * 0.15;
        ctx.stroke();
      }

      ctx.restore();
      angle += speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, size, speed]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="pointer-events-none"
      />
    </div>
  );
}
