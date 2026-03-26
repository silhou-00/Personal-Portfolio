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

interface FileGridProps {
  folders?: string[];
  files?: Project[];
  selectedFileId: string | null;
  onFolderClick: (folder: string) => void;
  onFileClick: (project: Project) => void;
}

export default function FileGrid({ folders, files, selectedFileId, onFolderClick, onFileClick }: FileGridProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Folders */}
      {folders && folders.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => onFolderClick(folder)}
              className="file-grid-item group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-shakespeare-700/10 transition-all cursor-pointer select-none"
            >
              <Image src="/folder_icon.svg" alt="" width={48} height={48} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs text-text-primary font-medium text-center leading-tight">{folder}</span>
            </button>
          ))}
        </div>
      )}

      {/* Files (projects) — card view */}
      {files && files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {files.map((project) => (
            <button
              key={project.id}
              onClick={() => onFileClick(project)}
              className={`group flex flex-col rounded-xl overflow-hidden border transition-all cursor-pointer select-none text-left ${
                selectedFileId === project.id
                  ? 'border-shakespeare-600/60 ring-2 ring-shakespeare-600/30 shadow-md'
                  : 'border-border/40 hover:border-shakespeare-500/50 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video bg-surface-elevated overflow-hidden">
                {project.image && project.image.length > 0 ? (
                  <Image
                    src={project.image[0]}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image src="/file_icon.svg" alt="" width={40} height={40} className="opacity-40" />
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-3 bg-surface/80 flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-text-primary leading-tight line-clamp-1">{project.title}</span>
                <span className="text-xs text-text-muted leading-snug line-clamp-2">{project.shortDescription}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {(!folders || folders.length === 0) && (!files || files.length === 0) && (
        <div className="flex items-center justify-center h-full text-text-muted text-sm italic">
          This folder is empty
        </div>
      )}
    </div>
  );
}
