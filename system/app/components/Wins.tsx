'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import achievementsData from '../data/achievements.json';
import SectionHead from './SectionHead';
import ImageModal from './ImageModal';

interface Achievement {
  id: string;
  title: string;
  date: string;
  description?: string;
  image: string[];
}

const WINS = achievementsData as Achievement[];

export default function Wins() {
  const [open, setOpen] = useState<Achievement | null>(null);

  return (
    <section id="wins" data-sec>
      <SectionHead
        num="04"
        label="Achievements"
        meta={`${WINS.length} wins · 1 championship`}
        verb="Recognized"
      />

      <div data-reveal>
        <div className="mount-stagger">
          {WINS.map((w, i) => {
            const photos = w.image.filter((s) => s && s.trim() !== '');
            const style = { '--stagger': `${i * 70}ms` } as CSSProperties;
            const inner = (
              <>
                <span className="win-date">{w.date}</span>
                <span className="win-main">
                  <span className="win-title">{w.title}</span>
                  {w.description && (
                    <span className="win-result block">{w.description}</span>
                  )}
                </span>
                {photos.length > 0 && (
                  <span className="win-open">view ↗</span>
                )}
              </>
            );
            return photos.length > 0 ? (
              <button
                key={w.id}
                type="button"
                className="win-row"
                style={style}
                onClick={() => setOpen(w)}
                aria-label={`View photos for ${w.title}`}
              >
                {inner}
              </button>
            ) : (
              <div key={w.id} className="win-row" style={style}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      <ImageModal
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        images={open?.image ?? []}
        title={open?.title ?? ''}
        description={open?.description}
      />
    </section>
  );
}
