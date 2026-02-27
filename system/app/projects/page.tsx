'use client';

import { useState, useRef, useCallback } from 'react';
import projectsData from '../data/projects.json';
import Breadcrumb from './components/Breadcrumb';
import QuickAccess from './components/QuickAccess';
import FileGrid from './components/FileGrid';
import PreviewPanel from './components/PreviewPanel';
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

const categories = ['University', 'Personal', 'Hackathon'];

export default function ProjectsPage() {
  const projects = projectsData as Project[];

  // Navigation state
  const [currentPath, setCurrentPath] = useState<string[]>(['My Projects']);
  const [historyStack, setHistoryStack] = useState<string[][]>([['My Projects']]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Selection state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Click tracking for double-click-within-3s behavior
  const lastClickRef = useRef<{ id: string; time: number } | null>(null);

  // Determine what to show based on current path
  const isAtRoot = currentPath.length === 1; // ["My Projects"]
  const currentCategory = currentPath.length >= 2 ? currentPath[1] : null;
  const filteredProjects = currentCategory
    ? projects.filter((p) => p.category === currentCategory)
    : [];

  // Navigation helpers
  const navigateTo = useCallback((newPath: string[]) => {
    setCurrentPath(newPath);
    setSelectedProject(null);
    // Add to history, trimming forward history
    setHistoryStack((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, newPath];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(historyStack[newIndex]);
      setSelectedProject(null);
    }
  }, [historyIndex, historyStack]);

  const goForward = useCallback(() => {
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(historyStack[newIndex]);
      setSelectedProject(null);
    }
  }, [historyIndex, historyStack]);

  const handleBreadcrumbNavigate = useCallback((index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    navigateTo(newPath);
  }, [currentPath, navigateTo]);

  const handleFolderClick = useCallback((folder: string) => {
    navigateTo([...currentPath, folder]);
  }, [currentPath, navigateTo]);

  const handleCategoryClick = useCallback((category: string) => {
    navigateTo(['My Projects', category]);
  }, [navigateTo]);

  const handleRootClick = useCallback(() => {
    navigateTo(['My Projects']);
  }, [navigateTo]);

  // File click: single click = preview, same file within 3s = modal
  const handleFileClick = useCallback((project: Project) => {
    const now = Date.now();
    const last = lastClickRef.current;

    if (last && last.id === project.id && now - last.time < 3000) {
      // Double click within 3s — open modal
      setModalProject(project);
      lastClickRef.current = null;
    } else {
      // Single click — select for preview
      setShowMobilePreview(true);
      setSelectedProject(project);
      lastClickRef.current = { id: project.id, time: now };
    }
  }, []);

  // Folder info for preview panel when no file is selected
  const folderInfo = isAtRoot
    ? { name: 'My Projects', itemCount: categories.length }
    : currentCategory
      ? { name: currentCategory, itemCount: filteredProjects.length }
      : null;

  return (
    <div className="h-screen bg-background pt-16 pb-2 flex flex-col">
      <div className="section-container flex-1 flex flex-col py-2">
        {/* File Explorer Container */}
        <div className="file-explorer bg-surface rounded-xl border border-border/40 overflow-hidden shadow-lg flex-1 flex flex-col">
          {/* Top Bar: Breadcrumb */}
          <div className="px-3 py-2 border-b border-border/40 bg-surface-elevated/30">
            <Breadcrumb
              path={currentPath}
              onNavigate={handleBreadcrumbNavigate}
              onBack={goBack}
              onForward={goForward}
              canGoBack={historyIndex > 0}
              canGoForward={historyIndex < historyStack.length - 1}
            />
          </div>

          {/* Main Body: Quick Access + Files + Preview */}
          <div className="flex flex-1 min-h-0 relative">
            {/* Left: Quick Access Sidebar — hidden on mobile */}
            <div className="hidden md:block">
              <QuickAccess
                currentCategory={currentCategory}
                onCategoryClick={handleCategoryClick}
                onRootClick={handleRootClick}
              />
            </div>

            {/* Center: File Grid */}
            <FileGrid
              folders={isAtRoot ? categories : undefined}
              files={!isAtRoot ? filteredProjects : undefined}
              selectedFileId={selectedProject?.id ?? null}
              onFolderClick={handleFolderClick}
              onFileClick={handleFileClick}
            />

            {/* Right: Preview Panel — hidden on mobile, slide-over on tablet */}
            <div className={`hidden lg:block`}>
              <PreviewPanel
                project={selectedProject}
                folderInfo={!selectedProject ? folderInfo : null}
                onViewFull={() => {
                  if (selectedProject) setModalProject(selectedProject);
                }}
              />
            </div>

            {/* Mobile/Tablet Preview Overlay */}
            {showMobilePreview && selectedProject && (
              <div className="lg:hidden absolute inset-0 z-10 bg-surface/95 backdrop-blur-sm overflow-y-auto">
                <div className="p-4">
                  <button
                    onClick={() => setShowMobilePreview(false)}
                    className="mb-3 flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to files
                  </button>
                  <PreviewPanel
                    project={selectedProject}
                    folderInfo={null}
                    onViewFull={() => {
                      if (selectedProject) setModalProject(selectedProject);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Quick Access Bar — shown only on mobile */}
          <div className="md:hidden border-t border-border/40 bg-surface-elevated/30 px-2 py-1.5 flex items-center gap-1 overflow-x-auto">
            <button
              onClick={handleRootClick}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                currentCategory === null ? 'bg-shakespeare-700/15 text-shakespeare-700' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  currentCategory === cat ? 'bg-shakespeare-700/15 text-shakespeare-700' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={modalProject !== null}
        onClose={() => setModalProject(null)}
        project={modalProject}
      />
    </div>
  );
}
