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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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

      {/* Files (projects) */}
      {files && files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {files.map((project) => (
            <button
              key={project.id}
              onClick={() => onFileClick(project)}
              className={`file-grid-item group flex flex-col items-center gap-2 p-4 rounded-lg transition-all cursor-pointer select-none ${
                selectedFileId === project.id
                  ? 'bg-shakespeare-700/15 ring-1 ring-shakespeare-700/40'
                  : 'hover:bg-shakespeare-700/10'
              }`}
            >
              <Image src="/file_icon.svg" alt="" width={48} height={48} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs text-text-primary font-medium text-center leading-tight line-clamp-2">{project.title}</span>
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
