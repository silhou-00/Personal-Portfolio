'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';
import type { Project } from './ProjectsGrid';

interface GalleryItem {
  type: 'video' | 'image';
  src: string;
  imgIndex: number;
}

/**
 * Full-page project takeover: sticky info column on the left,
 * snap-to-center gallery on the right. Clicking an unfocused item
 * centers it; clicking the focused image opens the fullscreen lightbox.
 * Browser back, Esc, X, and "back" all close it.
 */
export default function ProjectView({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const [focused, setFocused] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const validImages = project.image.filter((s) => s && s.trim() !== '');
  const hasVideo = !!(project.video && project.video.trim() !== '');
  const items: GalleryItem[] = [
    ...(hasVideo
      ? [{ type: 'video' as const, src: project.video!, imgIndex: -1 }]
      : []),
    ...validImages.map((src, i) => ({
      type: 'image' as const,
      src,
      imgIndex: i,
    })),
  ];

  const isLive = project.links.demo?.startsWith('http');
  const githubOk = project.links.github?.startsWith('http');
  const demoOk = isLive;

  const finishClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    setTimeout(onClose, 220);
  }, [onClose]);

  // History entry so the browser back button closes the takeover
  useEffect(() => {
    window.history.pushState({ pv: true }, '');
    const onPop = () => finishClose();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [finishClose]);

  const requestClose = useCallback(() => {
    // Consume the history entry we pushed; popstate finishes the close
    window.history.back();
  }, []);

  // Esc closes (unless the lightbox is open — that layer owns Esc then)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightbox === null) {
        requestClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestClose, lightbox]);

  // Lock page scroll behind the overlay
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Focused item = whichever is closest to the viewport center. Computed
  // on scroll so exactly one item is always highlighted (an observer band
  // can miss items depending on event order and item heights).
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const els = Array.from(
      root.querySelectorAll<HTMLElement>('[data-pv-index]')
    );
    if (els.length === 0) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rootRect = root.getBoundingClientRect();
      const centerY = rootRect.top + rootRect.height / 2;
      let best = 0;
      let bestDist = Infinity;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - centerY);
        if (d < bestDist) {
          bestDist = d;
          best = Number(el.dataset.pvIndex ?? 0);
        }
      });
      setFocused((prev) => (prev === best ? prev : best));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onItemClick = (idx: number, item: GalleryItem) => {
    if (focused !== idx) {
      scrollRef.current
        ?.querySelector(`[data-pv-index="${idx}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (item.type === 'image') {
      setLightbox(item.imgIndex);
    }
  };

  return (
    <div className={`pv-overlay${closing ? ' is-closing' : ''}`}>
      <div ref={scrollRef} className="pv-scroll overflow-y-auto">
        <div className="pv-topbar">
          <button type="button" className="pv-back" onClick={requestClose}>
            ← back to ./ship
          </button>
        </div>

        <div className="pv-body">
          <div className="pv-info">
            <h2 className="pv-title">{project.title}</h2>
            <p className="pv-sub">
              {project.category.toLowerCase()} ·{' '}
              <span className={isLive ? 'is-live' : ''}>
                {isLive ? '● live' : '○ private'}
              </span>
            </p>

            <h3 className="pv-heading">Overview</h3>
            <p className="pv-desc">{project.longDescription}</p>

            <h3 className="pv-heading">Tech stack</h3>
            <div className="pv-tech">
              {project.techStack.map((t) => (
                <span key={t} className="tech-pill">
                  {t}
                </span>
              ))}
            </div>

            <h3 className="pv-heading">Links</h3>
            <div className="pv-links">
              {githubOk ? (
                <a
                  className="pv-link"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github ↗
                </a>
              ) : (
                <span className="pv-link is-disabled">
                  github · {project.links.github.toLowerCase()}
                </span>
              )}
              {demoOk ? (
                <a
                  className="pv-link"
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  live demo ↗
                </a>
              ) : (
                <span className="pv-link is-disabled">
                  demo · {project.links.demo.toLowerCase()}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="pv-gallery">
              {items.length === 0 ? (
                <div className="pv-item is-focused">
                  <div className="pv-item-empty">
                    [ internal system · no public media ]
                  </div>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={`${item.type}-${idx}`}
                    data-pv-index={idx}
                    className={`pv-item${
                      focused === idx ? ' is-focused' : ''
                    }`}
                    onClick={() => onItemClick(idx, item)}
                    role={item.type === 'image' ? 'button' : undefined}
                    aria-label={
                      item.type === 'image'
                        ? `${project.title} image ${item.imgIndex + 1}${
                            focused === idx ? ' — open fullscreen' : ''
                          }`
                        : undefined
                    }
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        controls
                        muted
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={`${project.title} — image ${item.imgIndex + 1}`}
                        fill
                        sizes="(max-width: 1023px) 100vw, 58vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
            {items.length > 1 && (
              <div className="pv-counter">
                <span>
                  {focused + 1} / {items.length}
                </span>
              </div>
            )}
            {/* Spacer so the last gallery item can scroll to center */}
            {items.length > 1 && (
              <div className="pv-gallery-end" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={lightbox !== null}
        onClose={() => setLightbox(null)}
        images={validImages}
        title={project.title}
        initialIndex={lightbox ?? 0}
      />
    </div>
  );
}
