'use client';

import { useState } from 'react';
import projectsData from '../data/projects.json';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  links: {
    github: string;
    demo: string;
  };
  image: string[];
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = projectsData as Project[];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="section-container">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-8 text-center">
          Projects
        </h1>

        {/* Projects Grid - no internal scrollbar, page scrolls instead */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}
