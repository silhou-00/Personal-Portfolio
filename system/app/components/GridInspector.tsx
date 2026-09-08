'use client';

import { useEffect, useState } from 'react';

/* Press G to paint the 12-column grid the whole page is snapped to. A debug
   view shipped deliberately - the columns already exist in the CSS, this only
   makes them visible. The overlay mirrors .shell's padding and .well's width,
   so what it draws is the grid the page actually uses, not an approximation. */
export default function GridInspector() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'g' && e.key !== 'G') return;
      /* never steal the key from a field, a shortcut, or an open dialog */
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)))
        return;
      setOn((v) => !v);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('grid-on', on);
    return () => document.documentElement.classList.remove('grid-on');
  }, [on]);

  return (
    <>
      <div className="gridlayer" aria-hidden="true">
        <div className="cols">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i}>
              <b>{String(i + 1).padStart(2, '0')}</b>
            </i>
          ))}
        </div>
      </div>
      <p className="gridhint" aria-hidden="true">
        grid · 12 columns · 12px gutter · 1240px max · press G to hide
      </p>
    </>
  );
}
