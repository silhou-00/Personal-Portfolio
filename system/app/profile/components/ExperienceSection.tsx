'use client';

import { useState } from 'react';
import Image from 'next/image';
import experienceData from '../../data/experience.json';

interface Experience {
  id: number;
  category: string;
  role: string;
  organization: string;
  date: string;
  logo: string;
  description: string;
}

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<'education' | 'work'>(
    'education'
  );

  const experiences = experienceData as Experience[];

  const filteredExperiences = experiences.filter(
    (exp) => exp.category === activeFilter
  );

  return (
    <section className="section-container">
      <div className="glass-section overflow-hidden">
        {/* Full-width stretched filter tabs */}
        <div className="flex w-full">
          <button
            onClick={() => setActiveFilter('work')}
            className={`flex-1 py-3 text-center font-medium transition-all ${
              activeFilter === 'work'
                ? 'bg-venus-700 text-white'
                : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
            }`}
          >
            Work
          </button>
          <button
            onClick={() => setActiveFilter('education')}
            className={`flex-1 py-3 text-center font-medium transition-all ${
              activeFilter === 'education'
                ? 'bg-venus-700 text-white'
                : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
            }`}
          >
            Education
          </button>
        </div>

        {/* Experience Content - taller height to show 3 items */}
        <div className="p-6 sm:p-8 min-h-[450px] max-h-[550px] overflow-y-auto">
          {activeFilter === 'work' && filteredExperiences.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] bg-background/30 rounded-lg border border-border/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-venus-600 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-base text-text-secondary mb-1">
                Open to opportunities
              </p>
              <p className="text-sm text-text-muted">
                Currently looking for Job or Internship
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 sm:left-7 top-0 bottom-0 w-px bg-border/50" />

              {/* Timeline items */}
              <div className="space-y-0">
                {filteredExperiences.map((exp, index) => (
                  <div 
                    key={exp.id} 
                    className={`relative flex gap-4 sm:gap-5 ${
                      index !== filteredExperiences.length - 1 ? 'pb-6' : ''
                    }`}
                  >
                    {/* Logo with timeline dot effect */}
                    <div className="shrink-0 relative z-10">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-background border-2 border-border">
                        <Image
                          src={exp.logo}
                          alt={exp.organization}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-xs text-text-muted mb-1">{exp.date}</p>
                      <h4 className="text-base font-semibold text-text-primary">
                        {exp.organization}
                      </h4>
                      <p className="text-sm text-venus-400 mb-2">{exp.role}</p>
                      <ul className="list-disc list-outside ml-4 text-text-secondary text-sm space-y-1">
                        <li>{exp.description}</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
