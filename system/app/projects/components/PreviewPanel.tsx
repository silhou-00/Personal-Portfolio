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
      <div className="preview-panel w-72 shrink-0 border-l border-border/40 bg-surface/50 p-4 flex flex-col items-center justify-center h-full">
        <Image src="/folder_icon.svg" alt="" width={64} height={64} className="opacity-40 mb-3" />
        <p className="text-text-muted text-sm text-center">Select a file to preview</p>
      </div>
    );
  }

  // Folder info state (no file selected, just folder summary)
  if (!project && folderInfo) {
    return (
      <div className="preview-panel w-72 shrink-0 border-l border-border/40 bg-surface/50 p-4 flex flex-col items-center justify-center h-full">
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
    <div className="preview-panel w-72 shrink-0 border-l border-border/40 bg-surface/50 overflow-y-auto h-full">
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
