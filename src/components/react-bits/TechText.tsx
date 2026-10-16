"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TechTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  speed?: number;
  maxScrambles?: number;
  triggerOnHover?: boolean;
  trigger?: 'hover' | 'mount' | 'always' | string;
  active?: boolean;
  preserveSpaces?: boolean;
  style?: React.CSSProperties;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function TechText({
  text,
  className = '',
  scrambleSpeed,
  speed,
  maxScrambles = 6,
  triggerOnHover = true,
  trigger,
  active,
  preserveSpaces = true,
  style,
}: TechTextProps) {
  const effectiveSpeed = scrambleSpeed ?? speed ?? 28;
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const originalText = text;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split('')
          .map((char, index) => {
            if (preserveSpaces && char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isScramblingRef.current = false;
        setDisplayText(originalText);
      }

      iteration += 1 / (maxScrambles / 3);
    }, effectiveSpeed);
  };

  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isScramblingRef.current = false;
    };
  }, [text]);

  useEffect(() => {
    if (active) {
      startScramble();
    }
  }, [active]);

  const hasCustomFont = Boolean(style?.fontFamily) || /font-(serif|sans)|tracking-/.test(className);
  const fontClasses = hasCustomFont ? '' : 'font-sans tracking-wider';

  return (
    <span
      className={`inline-block transition-colors duration-200 ${fontClasses} ${className}`}
      style={style}
      onMouseEnter={triggerOnHover || trigger === 'hover' ? startScramble : undefined}
    >
      {displayText}
    </span>
  );
}
