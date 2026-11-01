'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import type { FlowStep } from '@/content/divisions';

/**
 * A left-to-right flow of boxes (the PDF profiles' route and supply diagrams), built in HTML so
 * it reads at any width: a row on wide screens, a column on phones. Boxes appear in order and
 * the connectors draw between them as the diagram scrolls into view.
 */
export default function FlowDiagram({ steps, numbered = false, caption }: { steps: FlowStep[]; numbered?: boolean; caption?: string }) {
  return (
    <ScrollReveal>
      <figure style={{ margin: 0 }}>
        <ol className={`flow${steps.length > 4 ? ' is-long' : ''}`} style={{ '--flow-count': steps.length } as React.CSSProperties}>
          {steps.map((step, i) => (
            <li key={step.title} className={`flow-step${step.tone ? ` is-${step.tone}` : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
              {numbered && (
                <span className="flow-number" aria-hidden="true">
                  {i + 1}
                </span>
              )}
              <strong>{step.title}</strong>
              {step.text && <span>{step.text}</span>}
            </li>
          ))}
        </ol>
        {caption && <figcaption className="photo-caption">{caption}</figcaption>}
      </figure>
    </ScrollReveal>
  );
}
