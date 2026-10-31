'use client';

import React, { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { ATTRIBUTION_LINES, formatCapacity, formatProjectDate, trackRecord } from '@/content/track-record';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const SECTORS: Record<string, string> = { government: 'Government building', industrial: 'Industrial' };

/**
 * Completed solar plants as a bar chart (Solis guidelines 3.2): grey bars, the largest plant in
 * Sun Yellow with an Ink outline, a title that states the finding. Bars grow when the chart
 * scrolls into view, and each row opens in place to show the plant's scope and equipment.
 */
export default function SolarPlants() {
  const plants = trackRecord('solis');
  const largest = plants.reduce((a, b) => ((b.capacity?.value ?? 0) > (a.capacity?.value ?? 0) ? b : a));
  const max = largest.capacity?.value ?? 1;
  const [open, setOpen] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div style={{ display: 'grid', gap: '28px' }}>
      <p className="margin-note">{ATTRIBUTION_LINES.director}</p>
      <ScrollReveal>
        <figure style={{ margin: 0 }}>
          <p className="plant-chart-title">
            The largest plant, {formatCapacity(largest.capacity!)} in {largest.location.split(', ').pop()}, was completed in{' '}
            {formatProjectDate(largest.date)}.
          </p>
          <ul className="plant-chart">
            {plants.map((p, i) => {
              const isOpen = open === p.id;
              const panelId = `${baseId}-${p.id}`;
              const share = ((p.capacity?.value ?? 0) / max) * 100;
              return (
                <li key={p.id} className={`plant-row${p.id === largest.id ? ' is-highlight' : ''}`}>
                  <button
                    type="button"
                    className="plant-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : p.id)}
                  >
                    <span className="plant-name">
                      <strong>{p.client}</strong>
                      <span>
                        {p.location} · {formatProjectDate(p.date)}
                      </span>
                    </span>
                    <span className="plant-bar-track" aria-hidden="true">
                      <span className="plant-bar" style={{ width: `${Math.max(2, share)}%`, transitionDelay: `${150 + i * 120}ms` }} />
                    </span>
                    <span className="plant-value">{formatCapacity(p.capacity!)}</span>
                    <motion.span
                      aria-hidden="true"
                      className="faq-icon"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT_EXPO }}
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="details"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT_EXPO }}
                        style={{ overflow: 'hidden' }}
                      >
                        <dl className="fact-rows plant-details">
                          <div>
                            <dt>Sector</dt>
                            <dd>{SECTORS[p.sector] ?? p.sector}</dd>
                          </div>
                          <div>
                            <dt>Scope</dt>
                            <dd>{p.scope}</dd>
                          </div>
                          <div>
                            <dt>Equipment</dt>
                            <dd>{p.equipment ?? 'Not stated'}</dd>
                          </div>
                          <div>
                            <dt>Value</dt>
                            <dd>{p.valueBracket ?? 'Not stated'}</dd>
                          </div>
                        </dl>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          <figcaption className="photo-caption">
            Source: completion certificates on file. Capacities as stated in each certificate; the 2016 plant is stated in kW. Values
            are rounded. Select a plant to see its scope.
          </figcaption>
        </figure>
      </ScrollReveal>
    </div>
  );
}
