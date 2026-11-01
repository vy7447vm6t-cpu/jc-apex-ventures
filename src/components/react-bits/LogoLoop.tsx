"use client";

import React from 'react';

export interface LogoLoopItem {
  id: string;
  name: string;
  category?: string;
  icon?: React.ReactNode;
}

interface LogoLoopProps {
  items: LogoLoopItem[];
  speed?: number; // duration in seconds
  direction?: 'left' | 'right';
  className?: string;
  theme?: 'light' | 'dark';
  /** Name for the list read to screen readers. */
  label?: string;
}

/**
 * A slow, endless row of names separated by the group's apex dot. Text only: no logos, so nothing
 * suggests an endorsement. It slows right down on hover, and stops for reduced motion. Screen
 * readers get the list once; the two repeats that make the loop seamless are hidden from them.
 */
export default function LogoLoop({
  items,
  speed = 28,
  direction = 'left',
  className = '',
  theme = 'light',
  label,
}: LogoLoopProps) {
  const isDark = theme === 'dark';
  const sets = [0, 1, 2];

  return (
    <div
      className={`logo-loop relative w-full overflow-hidden py-3 select-none ${isDark ? 'is-dark' : ''} ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="logo-loop-track flex w-max"
        style={{
          animation: `logoLoopAnimation ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {sets.map((set) => (
          <ul key={set} className="logo-loop-set" aria-hidden={set > 0 ? true : undefined} aria-label={set === 0 ? label : undefined}>
            {items.map((item) => (
              <li key={item.id}>
                {item.icon && <span className="logo-loop-icon">{item.icon}</span>}
                <span className="logo-loop-name">{item.name}</span>
                {item.category && <span className="logo-loop-category">{item.category}</span>}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
