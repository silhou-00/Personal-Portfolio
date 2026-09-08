'use client';

import { useCallback, useEffect, useState } from 'react';
import site from '../data/site.json';
import Marks from './Marks';
import ProjectPanel, { type PanelItem } from './ProjectPanel';

/* The hero is a stage too. It was previously excluded, which is why clicking
   the brand scrolled to the top but left "experience" marked as current -
   nothing was ever observing #top, so the last section to intersect stayed
   highlighted. */
const STAGES = [
  { id: 'top', n: '00', label: 'm.balanlay', brand: true },
  { id: 'xp', n: '01', label: 'experience' },
  { id: 'build', n: '02', label: 'build' },
  { id: 'credentials', n: '03', label: 'credentials' },
  { id: 'contact', n: '04', label: 'contact' },
];

/* Where the "you are here" line sits, as a fraction of the viewport. */
const LINE = 0.42;

/* The resume opens in the same side panel projects and certifications use,
   rather than throwing the reader out to a raw PDF tab. The panel still
   carries a button to open the file itself. */
const RESUME_PANEL: PanelItem = {
  id: 'resume',
  kind: 'document',
  title: 'Resume',
  meta: 'PDF · 1 page · updated 2026-07',
  images: [],
  pdf: site.resume,
};

export default function Rail() {
  const [active, setActive] = useState('top');
  const [resumeOpen, setResumeOpen] = useState(false);

  /* Read positions and decide, rather than trusting whichever entry the
     observer happened to report last.

     The old version set the active stage from each intersecting entry in the
     callback, so the answer depended on the ORDER entries arrived in - which
     is why scrolling down from the hero skipped Experience and landed on
     Build, while scrolling up found Experience correctly. Same geometry, two
     different answers, purely from iteration order.

     This asks a question with only one answer: which is the last stage whose
     top edge has passed the line? Direction cannot change it. */
  const recompute = useCallback(() => {
    const line = window.innerHeight * LINE;

    /* The end of the document is a special case: Contact is the last thing on
       the page, so once you are scrolled to the bottom there is no scroll left
       to push its top edge above the line. If the page cannot scroll further,
       the last stage is where you are. */
    /* 120px of slack, not 2px. Sub-pixel rounding, the scrollbar, and mobile
       browser chrome all mean the arithmetic rarely lands exactly on zero,
       and being a few pixels short left the last stage unreachable. */
    const atEnd =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 120;
    if (atEnd) {
      setActive(STAGES[STAGES.length - 1].id);
      return;
    }

    let current = STAGES[0].id;
    for (const stage of STAGES) {
      const el = document.getElementById(stage.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= line) current = stage.id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    /* The observer is only a trigger to re-read positions - it is not the
       thing making the decision. Thresholds keep it firing across the whole
       transit of a band rather than once at its edge. No scroll listener. */
    const io = new IntersectionObserver(recompute, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    STAGES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    const endEl = document.getElementById('page-end');
    if (endEl) io.observe(endEl);

    /* No priming call needed: an IntersectionObserver always delivers an
       initial callback for every element it starts observing, so the first
       recompute happens on its own. */
    window.addEventListener('resize', recompute);
    return () => {
      io.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, [recompute]);

  const activeIndex = Math.max(
    0,
    STAGES.findIndex((s) => s.id === active)
  );

  return (
    <>
      <nav className="topbar">
        <a
          className="brand"
          href="#top"
          aria-current={active === 'top' ? 'true' : undefined}
        >
          m.balanlay
        </a>
        <button
          className="meta linklike"
          style={{ color: 'var(--ink)' }}
          onClick={() => setResumeOpen(true)}
        >
          resume
        </button>
        <span className="progress-bar" aria-hidden="true" />
      </nav>

      <aside className="side">
        {/* The stage graph: a spine with a node per section. Nodes behind the
            reader are filled, the current one is red, the ones ahead are
            hollow - the same reading a CI stage list gives. */}
        <nav className="index" aria-label="Sections">
          {STAGES.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={[
                'stage',
                s.brand ? 'is-brand' : '',
                i < activeIndex ? 'is-done' : '',
                i === activeIndex ? 'is-now' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={active === s.id ? 'true' : undefined}
            >
              {!s.brand && <span className="n">{s.n}</span>}
              {s.label}
            </a>
          ))}
        </nav>

        <div className="side-foot">
          <Marks />
          <button className="btn" onClick={() => setResumeOpen(true)}>
            resume
          </button>
        </div>
        <span className="progress-rail" aria-hidden="true" />
      </aside>

      <ProjectPanel
        item={resumeOpen ? RESUME_PANEL : null}
        onClose={() => setResumeOpen(false)}
      />
    </>
  );
}
