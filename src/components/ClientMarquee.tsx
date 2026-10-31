'use client';

/**
 * Client marquee (brand guidelines 2.6): a text-only strip of client names that slows on
 * hover under a "+" cursor and, on click, grows through a shared layout transition into the
 * full client list, grouped as in src/content/track-record.ts with each group's attribution.
 */

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import { clientGroups, marqueeClients } from '@/content/track-record';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const PIXELS_PER_MS = 0.04; // 40 px per second at full speed
const HOVER_SPEED = 0.25;
const GOLD = '#C29F53';

const PLUS_CURSOR =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'><circle cx='14' cy='14' r='12.5' fill='%23C29F53' stroke='%23111111' stroke-width='1.5'/><path d='M14 8.5v11M8.5 14h11' stroke='%23111111' stroke-width='2' stroke-linecap='round'/></svg>\") 14 14, pointer";

interface ClientMarqueeProps {
  /** Text colour of the strip: light text on dark bands, ink on light ones. */
  tone?: 'dark' | 'light';
}

export default function ClientMarquee({ tone = 'dark' }: ClientMarqueeProps) {
  const names = marqueeClients().map((client) => client.name);
  const groups = clientGroups();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const x = useMotionValue(0);
  const speed = useRef(1);
  const targetSpeed = useRef(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const ink = tone === 'dark' ? '#F0F3F6' : '#111111';
  const layoutTransition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT_EXPO };

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (reduceMotion || open || !track) return;
    speed.current += (targetSpeed.current - speed.current) * Math.min(1, delta / 260);
    const loop = track.scrollWidth / 2;
    let next = x.get() - PIXELS_PER_MS * delta * speed.current;
    if (loop > 0 && -next >= loop) next += loop;
    x.set(next);
  });

  // Focus goes back to the strip once it has been rendered again.
  const returnFocus = useRef(false);
  const close = useCallback(() => {
    returnFocus.current = true;
    setOpen(false);
  }, []);
  useEffect(() => {
    if (!open && returnFocus.current) {
      returnFocus.current = false;
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const strip = (
    <div ref={trackRef} style={{ display: 'flex', width: 'max-content' }} aria-hidden="true">
      {[0, 1].map((copy) => (
        <div key={copy} style={{ display: 'flex', alignItems: 'center' }}>
          {names.map((name) => (
            <span key={`${copy}-${name}`} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '15px', fontWeight: 500, color: ink, letterSpacing: '-0.005em' }}>{name}</span>
              <span
                style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, margin: '0 22px', flex: 'none' }}
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <LayoutGroup id="client-marquee">
      <div style={{ position: 'relative', height: 48 }}>
        {!open && (
          <motion.button
            ref={triggerRef}
            type="button"
            layoutId="client-marquee-surface"
            transition={{ layout: layoutTransition }}
            className="client-marquee-trigger"
            aria-expanded={open}
            aria-label={`Clients: ${names.join(', ')}. Open the full client list.`}
            onClick={() => setOpen(true)}
            onPointerEnter={() => (targetSpeed.current = HOVER_SPEED)}
            onPointerLeave={() => (targetSpeed.current = 1)}
            onFocus={() => (targetSpeed.current = HOVER_SPEED)}
            onBlur={() => (targetSpeed.current = 1)}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              width: '100%',
              background: 'transparent',
              border: 0,
              padding: 0,
              cursor: PLUS_CURSOR,
              borderRadius: 0,
            }}
          >
            <motion.div style={{ x, paddingLeft: 56 }}>{strip}</motion.div>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: GOLD,
                color: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                lineHeight: 1,
                fontWeight: 600,
              }}
            >
              +
            </span>
          </motion.button>
        )}
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="client-list-backdrop"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
                onClick={close}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 200,
                  background: 'rgba(11, 14, 20, 0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}
              >
                <motion.div
                  layoutId="client-marquee-surface"
                  transition={{ layout: layoutTransition }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  onClick={(event) => event.stopPropagation()}
                  className="client-list-panel"
                  style={{
                    width: 'min(980px, 100%)',
                    maxHeight: 'min(86vh, 900px)',
                    overflowY: 'auto',
                    background: '#FFFFFF',
                    color: '#111111',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body, Inter, sans-serif)',
                    borderRadius: 16,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={reduceMotion ? { duration: 0 } : { delay: 0.25, duration: 0.3 }}
                    style={{ padding: 'clamp(20px, 4vw, 40px)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                      <div>
                        <p className="client-list-eyebrow">Clients and credits</p>
                        <h2
                          id={titleId}
                          style={{
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                            fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)',
                            lineHeight: 1.1,
                            fontWeight: 400,
                            margin: 0,
                          }}
                        >
                          Who we have worked with.
                        </h2>
                      </div>
                      <button ref={closeRef} type="button" onClick={close} className="client-list-close" aria-label="Close the client list">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>

                    {groups.map((group) => (
                      <section key={group.id} style={{ marginTop: 32 }}>
                        <h3 style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>
                          {group.heading} <span style={{ color: '#666666', fontWeight: 400 }}>· {group.clients.length}</span>
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                            fontStyle: 'italic',
                            fontSize: 17,
                            color: '#4A4A46',
                            margin: '4px 0 12px',
                          }}
                        >
                          {group.attributionLine}
                        </p>
                        <table className="client-list-table">
                          <thead>
                            <tr>
                              <th scope="col">Client</th>
                              <th scope="col">Place</th>
                              <th scope="col">Work</th>
                              <th scope="col">Year</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.clients.map((client) => (
                              <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.place ?? ''}</td>
                                <td>{client.work}</td>
                                <td>{client.year ?? ''}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </section>
                    ))}
                    <p style={{ fontSize: 13, color: '#666666', marginTop: 24 }}>
                      Hotel names are given as they are today. Brand work is credited to our Creative Director and is not
                      presented as clients of JC Apex Ventures.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </LayoutGroup>
  );
}
