'use client';

import { useEffect } from 'react';

/**
 * One scroll engine for the page:
 * - [data-reveal]  blur-up reveals via a shared IntersectionObserver
 * - [data-scrub]   section verbs fill with ink, scrubbed by scroll position
 *
 * A MutationObserver re-scans the DOM whenever nodes are added, so elements
 * that (re)mount later — tab panels, filtered grids, hot reloads — are
 * picked up instead of staying invisible.
 */
export default function ScrollFx() {
  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let verbs: HTMLElement[] = [];

    const io = reduced
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add('is-revealed');
                io?.unobserve(en.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );

    const scan = () => {
      document
        .querySelectorAll('[data-reveal]:not(.is-revealed)')
        .forEach((el) => {
          if (reduced || !io) {
            el.classList.add('is-revealed');
          } else {
            io.observe(el);
          }
        });
      verbs = Array.from(
        document.querySelectorAll<HTMLElement>('[data-scrub]')
      );
    };

    scan();

    const mo = new MutationObserver((muts) => {
      if (muts.some((m) => m.addedNodes.length > 0)) scan();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduced) return;
      const vh = window.innerHeight;
      // Near the bottom nothing scrolls further, so verbs still on screen
      // (e.g. PING ME) blend to a full fill regardless of exact pixels.
      const maxScroll =
        document.documentElement.scrollHeight - vh;
      const remaining = Math.max(0, maxScroll - window.scrollY);
      const endBoost =
        remaining < vh * 0.3 ? 1 - remaining / (vh * 0.3) : 0;
      verbs.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const p = Math.max(
          0,
          Math.min(1, (vh * 0.85 - rect.top) / (vh * 0.3))
        );
        el.style.setProperty(
          '--fill',
          `${(Math.max(p, endBoost) * 100).toFixed(1)}%`
        );
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      mo.disconnect();
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
