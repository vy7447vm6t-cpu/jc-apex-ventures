'use client';

import React from 'react';
import { Ambient, MicroSlats, useDesktopPointer } from '@/components/effects';

/**
 * The louvre slats from the home hero, on the Studio's Night canvas: live WebGL slats with a gold
 * glint on desktops, the still drawing-sheet slats on phones.
 */
export default function StudioSlats() {
  const desktop = useDesktopPointer();
  return desktop ? (
    <Ambient opacity={0.7}>
      <MicroSlats preset="swell" color="#1B2333" glintColor="#C29F53" backgroundColor="#0B0E14" slatWidth={9} slatHeight={26} gap={4} interactive cursorSize={60} />
    </Ambient>
  ) : (
    <Ambient>
      <MicroSlats count={24} color="#FFFFFF" opacity={0.06} zIndex={0} showTicks />
    </Ambient>
  );
}
