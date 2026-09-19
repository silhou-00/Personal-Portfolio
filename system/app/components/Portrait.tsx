'use client';

import { useState } from 'react';
import { GridReveal } from '@/components/ui/grid-reveal';

/* The grid builds the photo on first load; hovering swaps the source to the
   ASCII plate, and GridReveal restarts its reveal on every src change, so the
   same grid carries both directions. */
export default function Portrait({ alt }: { alt: string }) {
  const [ascii, setAscii] = useState(false);

  return (
    <figure
      className="mh-portrait"
      onPointerEnter={() => setAscii(true)}
      onPointerLeave={() => setAscii(false)}
    >
      <GridReveal
        src={ascii ? '/ascii-profile.png' : '/Profile.jpg'}
        alt={alt}
        aspect={1}
        estimatedDuration={1200}
      />
    </figure>
  );
}
