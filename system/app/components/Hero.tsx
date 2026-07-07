'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SOCIALS } from './Socials';

const TYPE_TEXT = 'assembling DevSecOps engineer';

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [hintHidden, setHintHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startDelay = setTimeout(
      () => {
        if (reduced) {
          setTyped(TYPE_TEXT);
          return;
        }
        interval = setInterval(() => {
          i += 1;
          setTyped(TYPE_TEXT.slice(0, i));
          if (i >= TYPE_TEXT.length) clearInterval(interval);
        }, 38);
      },
      reduced ? 0 : 950
    );
    return () => {
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setHintHidden(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero-section" id="top">
      <div className="hero-status">
        <span className="status-dot" />
        available_for_work
      </div>
      <div className="hero-grid">
        <div className="hero-left">
          <h1 className="hero-name">
            <span className="line-mask">
              <span className="line-inner">Mathew Angelo</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">Balanlay</span>
            </span>
          </h1>
          <p className="hero-type" aria-label={TYPE_TEXT}>
            <span aria-hidden="true">{typed}</span>
            <span className="type-caret" aria-hidden="true" />
          </p>
          <p className="hero-meta">
            BS Information Technology · University of Makati · Metro Manila
          </p>
          <div className="hero-socials">
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
        </div>
        <figure className="hero-photo">
          <span className="hero-photo-img">
            <Image
              src="/Profile.jpg"
              alt="Portrait of Mathew Angelo Balanlay"
              fill
              sizes="(max-width: 1023px) 280px, 360px"
              className="object-cover"
              priority
            />
          </span>
          <figcaption className="hero-photo-caption">
            fig. 01 · the operator
          </figcaption>
        </figure>
      </div>
      <p className={`hero-scroll-hint${hintHidden ? ' is-hidden' : ''}`}>
        scroll ↓
      </p>
    </section>
  );
}
