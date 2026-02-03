import Image from 'next/image';
import skillsData from '../../data/skills.json';

interface Skill {
  name: string;
  icon: string;
}

interface SkillsData {
  webDevelopment: Skill[];
  networking: Skill[];
}

export default function SkillsSection() {
  const skills = skillsData as SkillsData;

  // Filter out empty skills
  const webDevSkills = skills.webDevelopment.filter(
    (skill) => skill.name && skill.icon
  );
  const networkingSkills = skills.networking.filter(
    (skill) => skill.name && skill.icon
  );

  return (
    <section className="section-container-compact">
      <div className="glass-section p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Web Development Section */}
          <div>
            <h3 className="text-sm font-semibold text-shakespeare-400 mb-4 uppercase tracking-wide">
              Web Development
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-72 overflow-y-auto pr-2">
              {webDevSkills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="relative w-10 h-10">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs text-text-secondary text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Networking/Cybersecurity Section */}
          <div>
            <h3 className="text-sm font-semibold text-shakespeare-400 mb-4 uppercase tracking-wide">
              Networking / Cybersecurity
            </h3>
            {networkingSkills.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-72 overflow-y-auto pr-2">
                {networkingSkills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <div className="relative w-10 h-10">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs text-text-secondary text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-36 bg-background/50 rounded-lg border border-border/30">
                <p className="text-text-muted italic text-sm">
                  Journey Just Started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
