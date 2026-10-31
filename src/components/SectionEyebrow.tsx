import React from 'react';

/**
 * Section eyebrow with its faint section number (brand guidelines 2.8.3). It replaces the
 * bracketed "[04 / ...]" labels: one per section, sentence-level words, no box or dot.
 */
export default function SectionEyebrow({
  number,
  tone = 'light',
  inset = false,
  children,
}: {
  number?: number;
  tone?: 'light' | 'dark';
  /** Inside a padded panel the number stays above the eyebrow, never out in the margin. */
  inset?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`eyebrow-row${tone === 'dark' ? ' is-dark' : ''}${inset ? ' is-inset' : ''}`}>
      {number !== undefined && (
        <span className="section-number" aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
      )}
      <p className="eyebrow">{children}</p>
    </div>
  );
}
