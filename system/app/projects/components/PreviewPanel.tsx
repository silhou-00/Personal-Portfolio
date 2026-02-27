'use client';

import Image from 'next/image';

interface Project {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  links: { github: string; demo: string };
  image: string[];
  video?: string;
}

interface PreviewPanelProps {
  project: Project | null;
  folderInfo?: { name: string; itemCount: number } | null;
  onViewFull: () => void;
}

export default function PreviewPanel({ project, folderInfo, onViewFull }: PreviewPanelProps) {
  if (!project && !folderInfo) {
    return (
      <div className="preview-panel w-72 shrink-0 border-l border-border/40 bg-surface/50 p-4 flex flex-col items-center justify-center">
        <Image src="/folder_icon.svg" alt="" width={64} height={64} className="opacity-40 mb-3" />
        <p className="text-text-muted text-sm text-center">Select a file to preview</p>
      </div>
    );
  }

  // Folder info state (no file selected, just folder summary)
  if (!project && folderInfo) {
    return (
      <div className="preview-panel w-72 shrink-0 border-l border-border/40 bg-surface/50 p-4 flex flex-col items-center justify-center">
        <Image src="/folder_icon.svg" alt="" width={64} height={64} className="mb-3" />
        <p className="text-text-primary font-semibold text-sm">{folderInfo.name}</p>
        <p className="text-text-muted text-xs mt-1">{folderInfo.itemCount} item{folderInfo.itemCount !== 1 ? 's' : ''}</p>
      </div>
    );
  }

  if (!project) return null;

  const validImages = project.image.filter((img) => img && img.trim() !== '');
  const thumbnailImage = validImages.length > 0 ? validImages[0] : null;

  return (
    <div className="preview-panel w-72 shrink-0 border-l border-border/40 bg-surface/50 overflow-y-auto">
      <div className="p-4 flex flex-col gap-3">
        {/* Thumbnail */}
        {thumbnailImage && (
          <div className="aspect-video relative rounded-lg overflow-hidden bg-background border border-border/30">
            <Image
              src={thumbnailImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-text-primary leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-xs leading-relaxed">
          {project.longDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-pill text-[10px] px-2 py-0.5 select-none">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 text-xs">
          {project.links.github && project.links.github !== 'Private' && project.links.github !== 'Unknown' && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-shakespeare-400 hover:text-accent transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.links.github && (project.links.github === 'Private' || project.links.github === 'Unknown') && (
            <span className="text-text-muted flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {project.links.github}
            </span>
          )}
          {project.links.demo && project.links.demo !== 'Private' && project.links.demo !== 'Work in Progress' && project.links.demo !== 'Will Deploy Soon' && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-shakespeare-400 hover:text-accent transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </a>
          )}
        </div>

        {/* View Full Project Button */}
        <button
          onClick={onViewFull}
          className="btn-primary text-sm py-2 px-4 w-full justify-center mt-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Full Project
        </button>
      </div>
    </div>
  );
}
