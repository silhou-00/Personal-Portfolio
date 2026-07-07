'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import experienceData from '../data/experience.json';
import SectionHead from './SectionHead';

interface Experience {
  id: string;
  period: string;
  status: string;
  role: string;
  organization: string;
  logo: string | null;
  monogram: string;
  points: string[];
}

type Tab = 'work' | 'education';

const DATA = experienceData as { work: Experience[]; education: Experience[] };

export default function ExperienceList() {
  const [tab, setTab] = useState<Tab>('work');
  const rows = DATA[tab];

  return (
    <section id="work" data-sec>
      <SectionHead
        num="02"
        label="Experience"
        meta="2 active roles · since 2023"
        verb="Works"
      />

      <div
        className="xp-tabs"
        data-reveal
        role="tablist"
        aria-label="Experience type"
      >
        <span
          className="xp-tab-ind"
          style={{
            transform: tab === 'work' ? 'translateX(0)' : 'translateX(100%)',
          }}
          aria-hidden="true"
        />
        {(['work', 'education'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`xp-tab${tab === t ? ' is-active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t} ({DATA[t].length})
          </button>
        ))}
      </div>

      <div data-reveal>
        <div key={tab} className="xp-list mount-stagger" role="tabpanel">
          {rows.map((xp, i) => (
            <div
              key={xp.id}
              className="xp-row"
              style={{ '--stagger': `${i * 70}ms` } as CSSProperties}
            >
              <div className="xp-period">{xp.period}</div>
              <div>
                <div className="xp-role-line">
                  {xp.logo ? (
                    <span className="xp-logo">
                      <Image
                        src={xp.logo}
                        alt={`${xp.organization} logo`}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </span>
                  ) : (
                    <span className="xp-logo xp-logo-mono">
                      {xp.monogram}
                    </span>
                  )}
                  <span
                    className={`xp-status ${
                      xp.status === 'active' ? 'is-active' : 'is-done'
                    }`}
                    aria-label={xp.status === 'active' ? 'active' : 'ended'}
                  />
                  <span className="xp-role">{xp.role}</span>
                  <span className="xp-org">{xp.organization}</span>
                </div>
                <ul className="xp-points">
                  {xp.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
