import React from 'react';

/**
 * Section label: a short sentence-case line led by the apex dot. `number` is accepted so existing
 * calls keep compiling, but section numbers are no longer shown.
 */
export default function SectionEyebrow({
  tone = 'light',
  inset = false,
  children,
}: {
  number?: number;
  tone?: 'light' | 'dark';
  inset?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`eyebrow-row${tone === 'dark' ? ' is-dark' : ''}${inset ? ' is-inset' : ''}`}>
      <p className="eyebrow">{children}</p>
    </div>
  );
}
