'use client';

import { useState } from 'react';
import experience from '../data/experience.json';

type Entry = {
  id: string;
  period: string;
  status: string;
  role: string;
  organization: string;
  points: string[];
};

const GROUPS = [
  { key: 'work' as const, label: 'work' },
  { key: 'education' as const, label: 'education' },
];

export default function Experience() {
  const [group, setGroup] = useState<'work' | 'education'>('work');
  const rows = experience[group] as Entry[];

  return (
    <section className="shell band" id="xp">
      <div className="well g12">
        <h2 className="band-title">
          <span className="bn">01</span>Experience
        </h2>

        <div className="chips">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              className="chip"
              aria-pressed={group === g.key}
              onClick={() => setGroup(g.key)}
            >
              {g.label} {experience[g.key].length}
            </button>
          ))}
        </div>

        <div className="tbl">
          <div className="tr thead">
            <span className="k-when">period</span>
            <span className="k-what">role</span>
            <span className="k-flag">status</span>
          </div>
          {rows.map((r) => (
            <div className="tr" data-reveal key={r.id}>
              <span className="k-when">{r.period}</span>
              <span className="k-what">
                <span className="role">{r.role}</span>
                <span className="org">{r.organization}</span>
                {r.points.length > 0 && (
                  <ul className="pts">
                    {r.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </span>
              <span className={`k-flag${r.status === 'active' ? ' on' : ''}`}>
                {r.status === 'active' ? 'active' : 'ended'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
