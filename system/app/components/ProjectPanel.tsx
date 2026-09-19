'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ExpandablePresence,
  ExpandableSurface,
} from '@/components/expandable-event-card';
import { useWheelToHorizontal } from './useWheelToHorizontal';

export type Project = {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  links?: { github?: string; demo?: string };
  image: string[];
};

/* The panel is not project-specific any more - certifications open into the
   same surface instead of a centre modal, so it takes a neutral payload. */
export type PanelItem = {
  id: string;
  kind: string;
  title: string;
  meta?: string;
  description?: string;
  images: string[];
  /* A document opens in the same panel as a project, but shows an embedded
     viewer instead of an image strip. */
  pdf?: string;
};

export function projectToPanel(p: Project): PanelItem {
  return {
    id: p.id,
    kind: p.category.toLowerCase(),
    title: p.title,
    meta: p.techStack.join(' / '),
    description: p.longDescription,
    images: p.image.filter(Boolean),
  };
}

/* The layout id every trigger for this item carries, so the panel knows which
   box to grow out of and shrink back into. */
export const panelLayoutId = (id: string) => `panel-${id}`;

export default function ProjectPanel({
  item,
  onClose,
  layoutId,
}: {
  item: PanelItem | null;
  onClose: () => void;
  /* Defaults to panelLayoutId(item.id); pass one when an item has more than
     one trigger (the resume does) so it grows out of the one that was used. */
  layoutId?: string;
}) {
  /* Keyed on the item so opening a different one remounts the panel. That is
     what resets the image index - resetting it with setState inside an effect
     would cost a second render pass on every open. Presence keeps it mounted
     long enough to shrink back into its trigger. */
  return (
    <ExpandablePresence>
      {item && (
        <Panel
          key={item.id}
          item={item}
          onClose={onClose}
          layoutId={layoutId ?? panelLayoutId(item.id)}
        />
      )}
    </ExpandablePresence>
  );
}

function Panel({
  item,
  onClose,
  layoutId,
}: {
  item: PanelItem;
  onClose: () => void;
  layoutId: string;
}) {
  const panel = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(1);

  const shots = item.images;

  const dismiss = onClose;

  useEffect(() => {
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dismiss]);

  /* Vertical wheel moves the strip sideways - see the hook for why it
     steps by whole figures instead of by the raw delta. */
  useWheelToHorizontal(strip);

  /* The count tracks the strip with an IntersectionObserver rooted on the
     strip itself - not a scroll listener. */
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const figs = Array.from(el.children);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const n = figs.indexOf(e.target) + 1;
          if (n > 0) setIndex(n);
        });
      },
      { root: el, threshold: 0.6 }
    );
    figs.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panel.current) return;
    const f = panel.current.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <ExpandableSurface
        layoutId={layoutId}
        onDismiss={dismiss}
        className={`ppanel${item.pdf ? ' is-doc' : ''}`}
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ppTitle"
        onKeyDown={trapTab}
      >
        <div className="pp-top">
          <span className="pp-cat">{item.kind}</span>
          <button className="pp-close" ref={closeBtn} onClick={dismiss}>
            [ close ]
          </button>
        </div>

        {item.pdf ? (
          /* A document gives every spare pixel to the viewer, so the meta sits
             on the title's own baseline instead of taking a row of its own. */
          <h3 id="ppTitle" className="pp-title-row">
            {item.title}
            {item.meta && <span className="pp-title-meta">{item.meta}</span>}
          </h3>
        ) : (
          <>
            <h3 id="ppTitle">{item.title}</h3>
            {item.meta && <p className="pp-stack">{item.meta}</p>}
            {item.description && <p className="pp-desc">{item.description}</p>}
          </>
        )}

        {item.pdf && (
          <div className="pp-doc">
            <iframe
              className="pp-pdf"
              src={`${item.pdf}#toolbar=0&navpanes=0&scrollbar=0&zoom=79.7`}
              title={item.title}
            />
            <div className="pp-actions">
              <a
                className="btn"
                href={item.pdf}
                target="_blank"
                rel="noreferrer noopener"
              >
                open file
              </a>
              <a className="btn" href={item.pdf} download>
                download
              </a>
            </div>
          </div>
        )}

        {!item.pdf && (
        <div className="pp-figs">
          {shots.length > 0 ? (
            <>
              <div
                className="pp-strip"
                ref={strip}
                tabIndex={0}
                role="group"
                aria-label={`${item.title} images, ${shots.length} total`}
              >
                {shots.map((src, n) => (
                  <figure key={src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${item.title}, image ${n + 1}`}
                      loading={n === 0 ? 'eager' : 'lazy'}
                    />
                  </figure>
                ))}
              </div>
              <p className="pp-count">
                {String(index).padStart(2, '0')} /{' '}
                {String(shots.length).padStart(2, '0')}
              </p>
              <div className="pp-bar">
                <i />
              </div>
            </>
          ) : (
            <p className="acc-none">no public media</p>
          )}
        </div>
        )}
    </ExpandableSurface>
  );
}
