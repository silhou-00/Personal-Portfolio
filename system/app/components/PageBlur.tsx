'use client';

import { useEffect, useState } from 'react';
import { EdgeBlur } from '@/components/ui/edge-blur';

/* Progressive edge blur (components/ui/edge-blur.tsx), pinned to the viewport
   over the content column - never over the rail or the mobile top bar (see
   .page-blur).

   Each edge only shows when there is content past it: the top one once the
   page has scrolled, the bottom one until the end is reached. Otherwise it
   would blur the hero on load and the last lines of the page. Two
   IntersectionObservers on 1px sentinels decide that - no scroll listener. */
export default function PageBlur() {
  const [atTop, setAtTop] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const start = document.getElementById('page-start');
    const end = document.getElementById('page-end');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === start) setAtTop(e.isIntersecting);
        if (e.target === end) setAtEnd(e.isIntersecting);
      });
    });
    if (start) io.observe(start);
    if (end) io.observe(end);
    return () => io.disconnect();
  }, []);

  return (
    <div className="page-blur" aria-hidden="true">
      <EdgeBlur edge="top" className={atTop ? 'pb-off' : 'pb-on'} />
      <EdgeBlur edge="bottom" className={atEnd ? 'pb-off' : 'pb-on'} />
    </div>
  );
}
