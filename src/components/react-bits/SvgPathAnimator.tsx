"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface SvgPathAnimatorProps {
  d: string;
  width?: number;
  height?: number;
  viewBox?: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  fill?: string;
  className?: string;
}

export default function SvgPathAnimator({
  d,
  width = 120,
  height = 120,
  viewBox = "0 0 100 100",
  strokeColor = "#C29F53",
  strokeWidth = 2,
  duration = 2000,
  fill = "none",
  className = "",
}: SvgPathAnimatorProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    try {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const anim = animate(path, {
        strokeDashoffset: 0,
        duration,
        ease: 'inOutCubic',
      });

      return () => {
        if (anim && typeof anim.pause === 'function') {
          anim.pause();
        }
      };
    } catch {
      // Graceful fallback for environments where getTotalLength is not available
    }
  }, [d, duration]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        ref={pathRef}
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
    </svg>
  );
}
