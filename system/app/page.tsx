'use client';

import HeroSection from './profile/components/HeroSection';
import SkillsSection from './profile/components/SkillsSection';
import ExperienceSection from './profile/components/ExperienceSection';
import CertificationsSection from './profile/components/CertificationsSection';
import AchievementsSection from './profile/components/AchievementsSection';
import StickyContactBar from './components/StickyContactBar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <StickyContactBar
        name="Mathew Angelo T. Balanlay"
        email="balanlaymathewangelo@gmail.com"
        linkedIn="https://www.linkedin.com/in/mathew-14b703357/"
        github="https://github.com/silhou-00"
        facebook="https://www.facebook.com/MathewBalanlay/"
      />
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <AchievementsSection />
    </div>
  );
}
