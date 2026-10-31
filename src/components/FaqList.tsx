'use client';

import React, { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import type { Question } from '@/content/divisions';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Questions that open in place (brand guidelines 2.6): the answer grows out of the row, the "+"
 * turns to "×", and only one answer is open at a time. Instant under reduced motion.
 */
export default function FaqList({ items }: { items: Question[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <ul className="faq-list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li key={item.q} className="faq-item">
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <motion.span
                  aria-hidden="true"
                  className="faq-icon"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT_EXPO }}
                >
                  <Plus size={18} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-label={item.q}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT_EXPO }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="faq-answer">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
