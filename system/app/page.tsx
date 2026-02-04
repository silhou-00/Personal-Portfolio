'use client';

import { useState } from 'react';
import HeroSection from './profile/components/HeroSection';
import SkillsSection from './profile/components/SkillsSection';
import ExperienceSection from './profile/components/ExperienceSection';
import CertificationsSection from './profile/components/CertificationsSection';
import AchievementsSection from './profile/components/AchievementsSection';
import HeroSidebar from './components/HeroSidebar';

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSidebar
        name="Mathew Angelo T. Balanlay"
        title="IT Student"
        country="Philippines"
        email="balanlaymathewangelo@gmail.com"
        aboutMe="Undergrad IT Student, Assembling DevSecOps Career"
        currentlyLearning={{
          label: 'Taking',
          course: 'ISC2 Cybersecurity',
          show: true,
        }}
        linkedIn="https://www.linkedin.com/in/mathew-14b703357/"
        github="https://github.com/silhou-00"
        facebook="https://www.facebook.com/MathewBalanlay/"
        profileImage="/Profile.jpg"
        onVisibilityChange={setSidebarVisible}
      />
      
      {/* Main content wrapper - shifts when sidebar is visible on large screens */}
      <div 
        className={`transition-all duration-400 ease-out ${
          sidebarVisible ? 'lg:pl-80' : ''
        }`}
      >
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <AchievementsSection />
      </div>
    </div>
  );
}
