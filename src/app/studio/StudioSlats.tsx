'use client';

import React from 'react';
import { Ambient, MicroSlats } from '@/components/effects';

/** The louvre slats from the home hero, faint on the Studio's Night canvas. */
export default function StudioSlats() {
  return (
    <Ambient>
      <MicroSlats count={24} color="#FFFFFF" opacity={0.06} zIndex={0} showTicks />
    </Ambient>
  );
}
