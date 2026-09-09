'use client';

import { useEffect, useRef, useState } from 'react';
import certifications from '../data/certifications.json';
import achievements from '../data/achievements.json';
import ProjectPanel, { type PanelItem } from './ProjectPanel';
import { useWheelToHorizontal } from './useWheelToHorizontal';

type Cert = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  logo: string;
  image: string[];
};

type Award = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string[];
};

const DUR = 180;

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/* "December 2025" -> "2025.12", so the key column is fixed-width mono. */
function stamp(date: string) {
  const parts = date.trim().toLowerCase().split(/\s+/);
  const month = MONTHS.indexOf(parts[0]);
  const year = parts.find((p) => /^\d{4}$/.test(p)) ?? date;
  return month >= 0 ? `${year}.${String(month + 1).padStart(2, '0')}` : year;
}

export default function Certifications() {
  const certs = certifications as Cert[];
  const awards = achievements as Award[];

  const [panel, setPanel] = useState<PanelItem | null>(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [closingIndex, setClosingIndex] = useState<number | null>(null);

  const timer = useRef<number | null>(null);
  const heads = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  /* Only one award panel is open at a time, so a single ref follows whichever
     strip is currently on screen. openIndex rebinds the listener when the
     open panel changes and the ref points at a different node. */
  const openStrip = useRef<HTMLDivElement | null>(null);

  /* Single-select accordion. The closing panel animates shut while the
     opening one animates open in the same 180ms pass, so both halves read.
     A pending timer is cleared on every click, so a fast second click
     cannot strand a panel mid-animation. */
  const select = (i: number) => {
    if (i === openIndex) return;
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previous = openIndex;
    setOpenIndex(i);
    if (reduce) return;
    setClosingIndex(previous);
    timer.current = window.setTimeout(() => {
      setClosingIndex(null);
      timer.current = null;
    }, DUR);
  };

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  useWheelToHorizontal(openStrip, openIndex);

  const onHeadKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    heads.current[(i + step + awards.length) % awards.length]?.focus();
  };

  return (
    <section className="shell band" id="credentials">
      <div className="well g12">
        <h2 className="band-title">
          <span className="bn">03</span>Credentials
          <span
            className="micro"
            style={{ color: 'var(--grey)', fontWeight: 400 }}
          >
            {certs.length + awards.length} records
          </span>
        </h2>

        {/* Both groups carry the same label treatment - neither outranks the
            other, they are just two kinds of the same thing. */}
        <div className="group-label">
          <span className="gl-name">Certifications</span>
          <span>{certs.length}</span>
        </div>

        <div className="rowlist first">
          {certs.map((c) => (
            <button
              className="prow"
              key={c.id}
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setPanel({
                  id: c.id,
                  kind: c.issuer,
                  title: c.title,
                  meta: c.date,
                  images: c.image.filter(Boolean),
                });
              }}
            >
              <span className="p-when">{c.date}</span>
              <span className="p-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt="" />
              </span>
              <span className="p-what">{c.title}</span>
              <span className="p-go">-&gt;</span>
            </button>
          ))}
        </div>

        <div className="group-label spaced">
          <span className="gl-name">Awards</span>
          <span>{awards.length}</span>
        </div>

        <div className="acc" id="awards">
          {awards.map((a, i) => {
            const isOpen = i === openIndex;
            const isClosing = i === closingIndex;
            const shots = a.image.filter(Boolean);
            return (
              <div key={a.id} style={{ display: 'contents' }}>
                <button
                  className="acc-h"
                  id={`ah${i}`}
                  ref={(el) => {
                    heads.current[i] = el;
                  }}
                  aria-expanded={isOpen}
                  aria-disabled={isOpen || undefined}
                  aria-controls={`ap${i}`}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onHeadKey(e, i)}
                >
                  <span className="acc-when">{stamp(a.date)}</span>
                  <span className="acc-title">{a.title}</span>
                  <span className="acc-mark">{isOpen ? 'open' : '->'}</span>
                </button>

                <div
                  className={[
                    'acc-p',
                    isOpen ? 'is-open' : '',
                    isOpen && closingIndex !== null ? 'is-opening' : '',
                    isClosing ? 'is-closing' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  id={`ap${i}`}
                  role="region"
                  aria-labelledby={`ah${i}`}
                  hidden={!isOpen && !isClosing}
                >
                  <div className="acc-inner">
                    <p className="acc-desc">{a.description}</p>
                    {shots.length > 0 ? (
                      <div
                        className="acc-imgs"
                        ref={isOpen ? openStrip : undefined}
                        tabIndex={0}
                        role="group"
                        aria-label={`${a.title} images, ${shots.length} total`}
                      >
                        {shots.map((src, n) => (
                          <figure key={src}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`${a.title}, image ${n + 1}`}
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                          </figure>
                        ))}
                      </div>
                    ) : (
                      /* ach_04 ships an empty image array, so this state is
                         required, not optional. */
                      <p className="acc-none">no images on record</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectPanel
        item={panel}
        onClose={() => {
          setPanel(null);
          lastTrigger.current?.focus();
        }}
      />
    </section>
  );
}
