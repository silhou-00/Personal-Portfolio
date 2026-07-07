'use client';

import { useEffect, useRef } from 'react';
import { SOCIALS } from './Socials';

const LINKS = [
  { href: '#summary', label: 'summary' },
  { href: '#work', label: 'work' },
  { href: '#ship', label: 'ship' },
  { href: '#wins', label: 'wins' },
  { href: '#certs', label: 'certs' },
  { href: '#ping', label: 'ping' },
];

/** Desktop: fixed left sidebar with links + socials + vertical progress.
 *  Mobile (<1024px): slim top bar with brand + resume + progress hairline. */
export default function Nav() {
  const hbarRef = useRef<HTMLSpanElement>(null);
  const vbarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      const pct = `${(p * 100).toFixed(2)}%`;
      if (hbarRef.current) hbarRef.current.style.width = pct;
      if (vbarRef.current) vbarRef.current.style.height = pct;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -56 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile / tablet top bar */}
      <nav className="site-nav">
        <a className="nav-brand" href="#top" onClick={(e) => go(e, '#top')}>
          m.balanlay
        </a>
        <a
          className="nav-resume"
          href="/portfolio/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          resume
        </a>
        <span className="nav-progress" ref={hbarRef} aria-hidden="true" />
      </nav>

      {/* Desktop sidebar */}
      <aside className="side-nav">
        <a className="nav-brand" href="#top" onClick={(e) => go(e, '#top')}>
          m.balanlay
        </a>
        <div className="side-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="side-bottom">
          <div className="side-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a
            className="nav-resume side-resume"
            href="/portfolio/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>
        </div>
        <span className="side-progress" ref={vbarRef} aria-hidden="true" />
      </aside>
    </>
  );
}
