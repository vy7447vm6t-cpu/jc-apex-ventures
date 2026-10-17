"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const svgEl = svgRef.current;
    const path = pathRef.current;
    if (!svgEl || !path) return;

    let anim: any = null;

    const startAnimation = () => {
      try {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        anim = animate(path, {
          strokeDashoffset: 0,
          duration,
          ease: 'inOutCubic',
        });
        setHasAnimated(true);
      } catch {
        // Graceful fallback for environments where getTotalLength is not available
      }
    };

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              startAnimation();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(svgEl);

      return () => {
        observer.disconnect();
        if (anim && typeof anim.pause === 'function') {
          anim.pause();
        }
      };
    } else {
      startAnimation();
      return () => {
        if (anim && typeof anim.pause === 'function') {
          anim.pause();
        }
      };
    }
  }, [d, duration, hasAnimated]);

  return (
    <svg
      ref={svgRef}
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
