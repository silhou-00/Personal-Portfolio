import HeroSection from './profile/components/HeroSection';
import SkillsSection from './profile/components/SkillsSection';
import ExperienceSection from './profile/components/ExperienceSection';
import CertificationsSection from './profile/components/CertificationsSection';
import AchievementsSection from './profile/components/AchievementsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <AchievementsSection />
    </div>
  );
}
