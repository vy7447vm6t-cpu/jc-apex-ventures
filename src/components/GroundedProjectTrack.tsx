"use client";

import React from 'react';
import SectionEyebrow from './SectionEyebrow';
import {
  ATTRIBUTION_LINES,
  PROJECTS,
  formatProjectDate,
  isShowable,
  keyFacts,
  trackRecord,
  type Project,
} from '@/content/track-record';

const DIVISION_NAMES: Record<Project['division'], string> = {
  'grid-apex': 'Grid Apex',
  solis: 'Solis',
  sanyog: 'Sanyog',
  tvasta: 'Tvasta',
  emudran: 'eMudran',
  agrim: 'Agrim',
};

function ProjectCard({ project }: { project: Project }) {
  const completed = project.kind === 'completed';
  const rows = [
    { label: 'Client', value: project.client },
    { label: 'Place', value: project.location },
    completed
      ? { label: 'Completed', value: formatProjectDate(project.date) }
      : { label: 'Status', value: project.statusNote ?? '' },
    ...(project.equipment ? [{ label: 'Modules', value: project.equipment }] : []),
  ];
  return (
    <article className="flat-card project-card">
      <p className="project-card-division">
        {DIVISION_NAMES[project.division]} · {completed ? 'Completed work' : 'Proposal'}
      </p>
      <h3 className="project-card-title">{project.title}</h3>
      <dl className="fact-rows">
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/**
 * Selected work from src/content/track-record.ts: cards with fact rows, a scroll-snap row on
 * phones. The 3D card deck and the view switcher are retired (brand guidelines 2.8.2).
 */
export default function GroundedProjectTrack() {
  const completed = trackRecord();
  const proposals = PROJECTS.filter((p) => p.kind === 'proposal' && isShowable(p.proof.status));
  const capacity = keyFacts().find((f) => f.id === 'solar-capacity');

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#F4F1EA',
        color: '#111111',
        padding: 'clamp(88px, 12vh, 128px) 24px',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <div id="builds" className="absolute top-0 pointer-events-none" style={{ scrollMarginTop: '104px' }} aria-hidden="true" />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <SectionEyebrow number={3}>Track record</SectionEyebrow>
        <div style={{ maxWidth: '760px', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            {capacity ? `${capacity.value} of solar power, built and handed over.` : 'Selected work.'}
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#4A4A46', margin: '0 0 8px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
            {capacity?.label}. Each completed project below has a completion certificate on file.
          </p>
          <p className="margin-note" style={{ fontSize: '18px' }}>{ATTRIBUTION_LINES.director}</p>
        </div>

        <div className="project-row">
          {completed.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {proposals.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
