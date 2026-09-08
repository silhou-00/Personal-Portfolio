'use client';

import { useMemo, useState } from 'react';
import projects from '../data/projects.json';
import ProjectPanel, {
  projectToPanel,
  type Project,
} from './ProjectPanel';

const VISIBLE = 4;

function isUrl(v?: string) {
  return Boolean(v && v.startsWith('http'));
}
function isLive(p: Project) {
  return isUrl(p.links?.demo);
}

/* The deployment strip reads off the record, never off a hand-kept flag:
   a public repo fills `src`, a live demo fills `demo` and `prod`. A project
   with neither is internal, which is a state worth showing rather than an
   absence worth apologising for. */
function envState(p: Project) {
  const src = isUrl(p.links?.github);
  const demo = isUrl(p.links?.demo);
  return { src, demo, prod: demo, internal: !src && !demo };
}

export default function BuildWall() {
  const all = projects as Project[];
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    all.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [
      { key: 'all', label: 'all', count: all.length },
      ...[...counts.entries()].map(([key, count]) => ({
        key,
        label: key.toLowerCase(),
        count,
      })),
    ];
  }, [all]);

  const shown = cat === 'all' ? all : all.filter((p) => p.category === cat);
  const lead = shown.slice(0, VISIBLE);
  const rest = shown.slice(VISIBLE);

  const plate = (p: Project, reveal: boolean) => (
    <button
      className="plate"
      key={p.id}
      {...(reveal ? { 'data-reveal': '' } : {})}
      onClick={() => setOpen(p)}
    >
      {p.image.length > 0 && p.image[0] ? (
        <span className="shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image[0]} alt={p.title} loading="lazy" />
        </span>
      ) : (
        /* Same 16/9 box as a card with a screenshot - a card with no image is
           still the same card. No red rule here; it would make the one card
           without a picture the loudest thing in the row. */
        <span className="shot shot-empty">
          <span className="meta">no public media</span>
        </span>
      )}
      <span className="body">
        <span className="cat">{p.category.toLowerCase()}</span>
        <h3>
          {p.title}{' '}
          <span className={`st${isLive(p) ? ' live' : ''}`}>
            {isLive(p) ? '[LIVE]' : '[PRIVATE]'}
          </span>
        </h3>
        {(() => {
          const env = envState(p);
          return (
            <span className="envrow">
              <span className={env.src ? 'on' : undefined}>src</span>
              <span className={env.demo ? 'on' : undefined}>demo</span>
              <span className={env.internal ? 'warn' : env.prod ? 'on' : undefined}>
                {env.internal ? 'internal' : 'prod'}
              </span>
            </span>
          );
        })()}
      </span>
    </button>
  );

  return (
    <section className="shell band" id="build">
      <div className="well g12">
        <h2 className="band-title">
          <span className="bn">02</span>Build
        </h2>

        <div className="chips">
          {categories.map((c) => (
            <button
              key={c.key}
              className="chip"
              aria-pressed={cat === c.key}
              onClick={() => setCat(c.key)}
            >
              {c.label} {c.count}
            </button>
          ))}
        </div>

        <div className="wall">{lead.map((p) => plate(p, true))}</div>
        <div className="rail-bar">
          <i />
        </div>

        {rest.length > 0 && (
          <details className="disc">
            <summary>
              <span className="disc-plus">
                <span className="when-closed">[ + ]</span>
                <span className="when-open">[ - ]</span>
              </span>
              <span className="when-closed">{rest.length} more</span>
              <span className="when-open">hide</span>
            </summary>
            <div className="disc-grid">{rest.map((p) => plate(p, false))}</div>
          </details>
        )}
      </div>

      <ProjectPanel
        item={open ? projectToPanel(open) : null}
        onClose={() => setOpen(null)}
      />
    </section>
  );
}
