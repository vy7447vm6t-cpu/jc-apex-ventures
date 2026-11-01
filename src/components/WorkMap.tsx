'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { HOTEL_AREAS, MAP_CREDIT, MUMBAI_REGION, PLACES, project } from '@/content/places';
import { PROJECTS, clientGroups, formatCapacity, formatProjectDate, isShowable, trackRecord } from '@/content/track-record';

interface Pin {
  n: number;
  kind: 'hotel' | 'solar';
  at: [number, number];
  title: string;
  /** Hotel names in the area, or the plant's capacity, place and date. */
  detail: string[];
}

/** "A 19-floor housing society" reads "a 19-floor housing society" mid-sentence. */
const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/**
 * Where we have worked: the Mumbai region with numbered pins for the hotel areas and the solar
 * plants, and the key beside it. Pointing at a row lights its pin, and pointing at a pin lights
 * its row. Pins drop in when the map scrolls into view.
 */
export default function WorkMap({ show = 'all' }: { show?: 'all' | 'hotels' }) {
  const [active, setActive] = useState<number | null>(null);
  const hotels = clientGroups().find((g) => g.id === 'hospitality')?.clients ?? [];
  const plants = show === 'all' ? trackRecord('solis') : [];
  const proposals = PROJECTS.filter((p) => show === 'all' && p.division === 'solis' && p.kind === 'proposal' && isShowable(p.proof.status));

  const inArea = (towns: string[]) => hotels.filter((h) => towns.some((t) => (h.place ?? '').startsWith(t)));
  const hotelPins: Pin[] = HOTEL_AREAS.map(([area, towns], i) => ({
    n: i + 1,
    kind: 'hotel',
    at: project(PLACES[area]),
    title: area,
    detail: inArea(towns).map((h) => h.name),
  }));
  const solarPins: Pin[] = plants.map((p, i) => ({
    n: hotelPins.length + i + 1,
    kind: 'solar',
    at: project(PLACES[p.id]),
    title: p.client,
    detail: [`${p.capacity ? formatCapacity(p.capacity) : ''} · ${p.location} · ${formatProjectDate(p.date)}`],
  }));
  const pins = [...hotelPins, ...solarPins];
  const mapped = new Set(hotelPins.flatMap((p) => p.detail));
  const elsewhere = hotels.filter((h) => !mapped.has(h.name));

  const hover = (n: number) => ({
    onMouseEnter: () => setActive(n),
    onMouseLeave: () => setActive(null),
  });

  const keyRow = (pin: Pin) => (
    <li key={pin.n} className={`work-key-row${active === pin.n ? ' is-active' : ''}`} {...hover(pin.n)}>
      <span className={`work-key-pin is-${pin.kind}`} aria-hidden="true">
        {pin.n}
      </span>
      <div>
        <strong>{pin.title}</strong>
        {pin.kind === 'hotel' ? (
          <ul className="work-key-names">
            {pin.detail.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <span>{pin.detail[0]}</span>
        )}
      </div>
    </li>
  );

  const { proj, paths } = MUMBAI_REGION;

  return (
    <ScrollReveal className="work-map">
      <figure className="work-map-figure">
        <svg viewBox={`0 0 ${proj.width} ${proj.height}`} role="img" aria-label={show === 'all' ? 'Map of the Mumbai region with the hotel areas and solar plants listed beside it' : 'Map of the Mumbai region with the hotel areas listed beside it'}>
          <defs>
            <clipPath id="work-map-clip">
              <rect width={proj.width} height={proj.height} />
            </clipPath>
          </defs>
          <g clipPath="url(#work-map-clip)">
            {paths.map((p) => (
              <path key={p.name} d={p.d} className="work-map-land" />
            ))}
          </g>
          {pins.map((pin, i) => (
            <g key={pin.n} transform={`translate(${pin.at[0].toFixed(1)} ${pin.at[1].toFixed(1)})`} {...hover(pin.n)}>
              <g className={`work-map-pin is-${pin.kind}${active === pin.n ? ' is-active' : ''}`} style={{ transitionDelay: `${200 + i * 70}ms` }}>
                <title>{pin.kind === 'hotel' ? `${pin.title}: ${pin.detail.join('; ')}` : `${pin.title}: ${pin.detail[0]}`}</title>
                {pin.kind === 'hotel' ? <circle r={24} /> : <rect x={-23} y={-23} width={46} height={46} rx={11} />}
                <text y={10} textAnchor="middle">
                  {pin.n}
                </text>
              </g>
            </g>
          ))}
        </svg>
        <figcaption className="photo-caption">Mumbai region. {MAP_CREDIT}</figcaption>
      </figure>

      <div className="work-key">
        <h3>
          Hotels <span>HT electrical work{show === 'all' ? ' · Grid Apex' : ''}</span>
        </h3>
        <ol>{hotelPins.map(keyRow)}</ol>
        {elsewhere.length > 0 && (
          <p className="work-key-note">
            Outside this map: {elsewhere.map((h) => (h.place && !h.name.includes(h.place) ? `${h.name}, ${h.place}` : h.name)).join(', and ')}.
          </p>
        )}
        {show === 'all' && (
          <>
            <Link href="/grid-apex" className="work-key-link">
              Grid Apex <ArrowUpRight size={15} aria-hidden="true" />
            </Link>

            <h3 style={{ marginTop: '32px' }}>
              Solar power plants <span>Solis</span>
            </h3>
            <ol>{solarPins.map(keyRow)}</ol>
            {proposals.map((p) => (
              <p key={p.id} className="work-key-note">
                Proposal: {lower(p.title)} for {lower(p.client)} in {p.location}. {p.statusNote}.
              </p>
            ))}
            <Link href="/solis" className="work-key-link">
              Solis <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </>
        )}
      </div>
    </ScrollReveal>
  );
}
