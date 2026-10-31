"use client";

import React, { useRef } from 'react';

export interface UnderlineTab {
  value: string;
  label: string;
  /** Second line under the label, such as the division name. */
  note?: string;
}

/**
 * Underline tabs (brand guidelines 2.8.2): replaces the pill option wheel where tabs are needed.
 * Arrow keys move between tabs; the selected tab carries a 2 px Ink underline.
 */
export default function UnderlineTabs({
  tabs,
  value,
  onChange,
  label,
  idPrefix,
}: {
  tabs: UnderlineTab[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  idPrefix: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(tabs[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="underline-tabs">
      {tabs.map((tab, i) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.value}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="underline-tab"
          >
            <span>{tab.label}</span>
            {tab.note && <span className="underline-tab-note">{tab.note}</span>}
          </button>
        );
      })}
    </div>
  );
}
