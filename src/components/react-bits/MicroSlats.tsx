// @ts-nocheck
"use client";

import React from 'react';
import MicroSlatsWebGL from './MicroSlatsWebGL';

interface MicroSlatsProps {
  className?: string;
  count?: number;
  direction?: 'vertical' | 'horizontal';
  opacity?: number;
  color?: string;
  zIndex?: number;
  showTicks?: boolean;
  // WebGL React Bits props:
  preset?: 'swell' | 'tide' | 'storm' | 'signal';
  glintColor?: string;
  backgroundColor?: string;
  slatWidth?: number;
  slatHeight?: number;
  gap?: number;
  roundness?: number;
  scale?: number;
  speed?: number;
  directionAngle?: number;
  chop?: number;
  stretch?: number;
  glint?: number;
  contrast?: number;
  perspective?: number;
  fog?: number;
  interactive?: boolean;
  cursorStrength?: number;
  cursorSize?: number;
  swirl?: number;
  trail?: number;
  lean?: number;
  intro?: boolean;
  introDuration?: number;
  paused?: boolean;
  style?: React.CSSProperties;
}

export default function MicroSlats(props: MicroSlatsProps) {
  // If WebGL props are passed, route to React Bits WebGL engine
  if (
    props.preset !== undefined ||
    props.slatWidth !== undefined ||
    props.slatHeight !== undefined ||
    props.glintColor !== undefined ||
    props.gap !== undefined ||
    props.roundness !== undefined ||
    props.swirl !== undefined ||
    props.trail !== undefined ||
    (props.interactive !== undefined && props.count === undefined)
  ) {
    return <MicroSlatsWebGL {...props} />;
  }

  // Otherwise render classic architectural CAD Louvers
  const {
    className = '',
    count = 24,
    direction = 'vertical',
    opacity = 0.08,
    color = '#000000',
    zIndex = 1,
    showTicks = true,
  } = props;

  const slats = Array.from({ length: count }, (_, i) => i);

  if (direction === 'horizontal') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
        style={{ zIndex }}
      >
        <div className="flex h-full w-full flex-col justify-between py-4">
          {slats.map((i) => {
            const isMajor = i % 4 === 0;
            return (
              <div
                key={i}
                className="relative w-full transition-opacity duration-700"
                style={{
                  height: isMajor ? '1.5px' : '1px',
                  backgroundColor: color,
                  opacity: isMajor ? opacity * 1.45 : opacity,
                }}
              >
                {isMajor && showTicks && (
                  <>
                    <span
                      style={{
                        position: 'absolute',
                        left: '18%',
                        top: '-3px',
                        height: '7px',
                        width: '1px',
                        backgroundColor: color,
                        opacity: Math.min(1, opacity * 2.2),
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '22%',
                        top: '-3px',
                        height: '7px',
                        width: '1px',
                        backgroundColor: color,
                        opacity: Math.min(1, opacity * 2.2),
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ zIndex }}
    >
      <div className="flex h-full w-full flex-row justify-between px-4">
        {slats.map((i) => {
          const isMajor = i % 4 === 0;
          return (
            <div
              key={i}
              className="relative h-full transition-opacity duration-700"
              style={{
                width: '1px',
                backgroundColor: color,
                opacity: isMajor ? opacity * 1.45 : opacity,
              }}
            >
              {isMajor && showTicks && (
                <>
                  <span
                    style={{
                      position: 'absolute',
                      top: '18%',
                      left: '-3px',
                      width: '7px',
                      height: '1px',
                      backgroundColor: color,
                      opacity: Math.min(1, opacity * 2.2),
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '22%',
                      left: '-3px',
                      width: '7px',
                      height: '1px',
                      backgroundColor: color,
                      opacity: Math.min(1, opacity * 2.2),
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
