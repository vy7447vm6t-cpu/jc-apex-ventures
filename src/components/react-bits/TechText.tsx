"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TechTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  maxScrambles?: number;
  triggerOnHover?: boolean;
  preserveSpaces?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#*+~<>[]{}';

export default function TechText({
  text,
  className = '',
  scrambleSpeed = 30,
  maxScrambles = 8,
  triggerOnHover = true,
  preserveSpaces = true,
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
    };
  }, [text]);

  return (
    <span
      className={`inline-block font-mono tracking-wider transition-colors duration-200 ${className}`}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
    >
      {displayText}
    </span>
  );
}
