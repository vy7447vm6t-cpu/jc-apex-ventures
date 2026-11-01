import React from 'react';
import Image from 'next/image';
import { PHOTOS, photoCredit, type PhotoKey } from '@/content/photos';

/** The client hotels we have licensed photographs of, in the order they are shown. */
export const HOTEL_PHOTOS: PhotoKey[] = [
  'hotel-taj-palace',
  'hotel-trident-oberoi-nariman-point',
  'hotel-taj-wellington-mews',
  'hotel-taj-lands-end',
  'hotel-trident-bkc',
];

/**
 * Client hotels, photographed by others under CC licences. Three over two on wide screens, a swipe
 * row on phones. Captions name the property and credit the photographer, below the photo.
 */
export default function HotelGallery({ photos = HOTEL_PHOTOS }: { photos?: PhotoKey[] }) {
  return (
    <div>
      <div className="hotel-gallery">
        {photos.map((key) => (
          <figure key={key} className="hotel-gallery-item">
            <div className="hotel-gallery-frame">
              <Image src={PHOTOS[key].src} alt={PHOTOS[key].subject} fill sizes="(max-width: 760px) 82vw, 40vw" style={{ objectFit: 'cover' }} />
            </div>
            <figcaption className="photo-caption">
              <span className="hotel-gallery-name">{PHOTOS[key].subject}</span> {photoCredit(key)}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="photo-caption">Photographs show the properties, not our installations.</p>
    </div>
  );
}
