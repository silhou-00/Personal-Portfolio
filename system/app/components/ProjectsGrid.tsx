'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import projectsData from '../data/projects.json';
import SectionHead from './SectionHead';
import ProjectView from './ProjectView';

export interface Project {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  links: {
    github: string;
    demo: string;
  };
  image: string[];
  video?: string;
}

const PROJECTS = projectsData as Project[];
const CATEGORIES = [
  'all',
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

const MOBILE_PAGE_SIZE = 3;

export default function ProjectsGrid() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0);

  // On phones the grid paginates (3 cards per page) instead of
  // filling multiple screens of scroll
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const raf = requestAnimationFrame(() => setIsMobile(mq.matches));
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  const shown =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const pageCount = isMobile
    ? Math.max(1, Math.ceil(shown.length / MOBILE_PAGE_SIZE))
    : 1;
  const safePage = Math.min(page, pageCount - 1);
  const paged = isMobile
    ? shown.slice(
        safePage * MOBILE_PAGE_SIZE,
        safePage * MOBILE_PAGE_SIZE + MOBILE_PAGE_SIZE
      )
    : shown;

  return (
    <section id="ship" data-sec>
      <SectionHead
        num="03"
        label="Projects"
        meta={`${PROJECTS.length} projects shipped`}
        verb="Ships"
      />

      <div className="ship-filter" data-reveal>
        {CATEGORIES.map((cat) => {
          const count =
            cat === 'all'
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              className={`chip${filter === cat ? ' is-active' : ''}`}
              onClick={() => {
                setFilter(cat);
                setPage(0);
              }}
            >
              {cat.toLowerCase()} {count}
            </button>
          );
        })}
      </div>

      <div data-reveal>
        <div key={`${filter}-${safePage}`} className="ship-grid mount-stagger">
          {paged.map((p, i) => {
            const shot = p.image.find((img) => img && img.trim() !== '');
            const isLive = p.links.demo?.startsWith('http');
            return (
              <button
                key={p.id}
                type="button"
                className="ship-card"
                style={{ '--stagger': `${i * 60}ms` } as CSSProperties}
                onClick={() => setView(p)}
                aria-label={`Open ${p.title} details`}
              >
                <div className="ship-shot">
                  {shot ? (
                    <Image
                      src={shot}
                      alt={`${p.title} screenshot`}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="ship-shot-empty">
                      [ internal system · no public media ]
                    </div>
                  )}
                </div>
                <div className="ship-body">
                  <div className="ship-cat">{p.category.toLowerCase()}</div>
                  <div className="ship-title-line">
                    <span className="ship-title">{p.title}</span>
                    <span
                      className={`ship-status ${
                        isLive ? 'is-live' : 'is-private'
                      }`}
                    >
                      {isLive ? '● live' : '○ private'}
                    </span>
                  </div>
                  <p className="ship-desc">{p.shortDescription}</p>
                  <p className="ship-tech">
                    {p.techStack.slice(0, 3).join(' · ')}
                    {p.techStack.length > 3
                      ? ` · +${p.techStack.length - 3}`
                      : ''}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {pageCount > 1 && (
          <div className="ship-pager">
            <button
              type="button"
              className="chip"
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
            >
              ‹ prev
            </button>
            <span className="ship-pager-count">
              {safePage + 1} / {pageCount}
            </span>
            <button
              type="button"
              className="chip"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage(safePage + 1)}
            >
              next ›
            </button>
          </div>
        )}
      </div>

      {view && <ProjectView project={view} onClose={() => setView(null)} />}
    </section>
  );
}
