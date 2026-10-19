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
  const effectiveSpeed = Math.min(scrambleSpeed ?? speed ?? 16, 18);
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let step = 0;
    const totalSteps = 8;
    const originalText = text;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      step += 1;
      const progress = step / totalSteps;
      const revealCount = Math.floor(progress * originalText.length);

      if (step >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isScramblingRef.current = false;
        setDisplayText(originalText);
        return;
      }

      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (preserveSpaces && (char === ' ' || char === '·' || char === '/')) return char;
            if (index <= revealCount) {
              return originalText[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );
    }, effectiveSpeed);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    isScramblingRef.current = false;
    setDisplayText(text);
    if (trigger === 'mount') {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isScramblingRef.current = false;
    };
  }, [text, trigger]);

  useEffect(() => {
    if (active) {
      startScramble();
    } else {
      setDisplayText(text);
    }
  }, [active, text]);

  const hasCustomFont = Boolean(style?.fontFamily) || /font-(serif|sans)|tracking-/.test(className);
  const fontClasses = hasCustomFont ? '' : 'font-sans tracking-wider';

  return (
    <span
      className={`inline-block transition-colors duration-200 ${fontClasses} ${className}`}
      style={style}
      onMouseEnter={triggerOnHover || trigger === 'hover' ? startScramble : undefined}
      onMouseLeave={() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isScramblingRef.current = false;
        setDisplayText(text);
      }}
    >
      {displayText}
    </span>
  );
}
