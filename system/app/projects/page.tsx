'use client';

import { useState } from 'react';
import projectsData from '../data/projects.json';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';

interface Project {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  links: {
    github: string;
    demo: string;
  };
  image: string[];
  video?: string;
}

type FilterType = 'webdevelopment' | 'networking';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('webdevelopment');

  const projects = projectsData as Project[];

  // Filter projects by category
  const filteredProjects = projects.filter(
    (project) => project.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="section-container">
        {/* Header with title and filter tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Projects
          </h1>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button
              onClick={() => setActiveFilter('webdevelopment')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeFilter === 'webdevelopment'
                  ? 'bg-venus-700 text-white'
                  : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
              }`}
            >
              Web Dev
            </button>
            <button
              onClick={() => setActiveFilter('networking')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeFilter === 'networking'
                  ? 'bg-venus-700 text-white'
                  : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
              }`}
            >
              Networking
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-surface-elevated/30 rounded-lg border border-border/30">
            <p className="text-text-muted italic text-lg">
              Coming Soon
            </p>
          </div>
        )}
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
