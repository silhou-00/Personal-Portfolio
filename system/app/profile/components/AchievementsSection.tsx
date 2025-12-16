'use client';

import { useState } from 'react';
import achievementsData from '../../data/achievements.json';
import ImageModal from '../../components/ImageModal';

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string[];
}

export default function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const achievements = achievementsData as Achievement[];

  return (
    <section className="section-container">
      <div className="glass-section p-6 sm:p-8">
        <h2 className="section-title">Achievements</h2>

        <div className="max-h-[400px] overflow-y-auto pr-2">
          <ul className="space-y-3">
            {achievements.map((achievement) => (
              <li key={achievement.id}>
                <button
                  onClick={() => setSelectedAchievement(achievement)}
                  className="clickable-bullet w-full text-left text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  <span className="font-medium text-base">{achievement.title}</span>
                  <span className="block text-sm text-text-muted mt-0.5">
                    {achievement.date}
                  </span>
                  <span className="block text-sm text-text-secondary mt-0.5">
                    {achievement.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Achievement Modal */}
      <ImageModal
        isOpen={selectedAchievement !== null}
        onClose={() => setSelectedAchievement(null)}
        images={(selectedAchievement?.image || []).slice(0, 5)}
        title={selectedAchievement?.title || ''}
        description={`${selectedAchievement?.date} - ${selectedAchievement?.description}`}
      />
    </section>
  );
}
