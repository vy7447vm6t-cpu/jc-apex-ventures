"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TechTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  maxScrambles?: number;
  triggerOnHover?: boolean;
  preserveSpaces?: boolean;
  style?: React.CSSProperties;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function TechText({
  text,
  className = '',
  scrambleSpeed = 28,
  maxScrambles = 6,
  triggerOnHover = true,
  preserveSpaces = true,
  style,
}: TechTextProps) {
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
    }, scrambleSpeed);
  };

  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isScramblingRef.current = false;
    };
  }, [text]);

  const hasCustomFont = Boolean(style?.fontFamily) || /font-(serif|sans)|tracking-/.test(className);
  const fontClasses = hasCustomFont ? '' : 'font-mono tracking-wider';

  return (
    <span
      className={`inline-block transition-colors duration-200 ${fontClasses} ${className}`}
      style={style}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
    >
      {displayText}
    </span>
  );
}
