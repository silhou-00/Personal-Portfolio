'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    longDescription: string;
    techStack: string[];
    links: {
      github: string;
      demo: string;
    };
    image: string[];
    video?: string;
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle open/close states with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setCurrentIndex(0);
    }
  }, [isOpen, project]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 250);
  };

  if (!shouldRender || !project) return null;

  // Filter out empty image strings
  const validImages = project.image.filter((img) => img && img.trim() !== '');
  
  // Create media array with video first (if exists), then images
  const hasVideo = project.video && project.video.trim() !== '';
  const totalMedia = (hasVideo ? 1 : 0) + validImages.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalMedia - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalMedia - 1 ? 0 : prev + 1));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Determine if current item is video (index 0 when video exists)
  const isCurrentVideo = hasVideo && currentIndex === 0;
  const currentImageIndex = hasVideo ? currentIndex - 1 : currentIndex;

  return (
    <div
      className={`modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-backdrop-close' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-xl overflow-hidden overflow-y-auto mt-20 ${isClosing ? 'animate-modal-close' : 'animate-modal-open'}`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            {project.title}
          </h3>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <span key={index} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-6">
            {project.links.github && project.links.github !== 'Private' && project.links.github !== 'Work in Progress' && project.links.github !== 'Still Hiding It :3' && project.links.github !== 'Unknown' && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-shakespeare-400 hover:text-accent transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.links.github && (project.links.github === 'Private' || project.links.github === 'Work in Progress' || project.links.github === 'Still Hiding It :3' || project.links.github === 'Unknown') && (
              <span className="inline-flex items-center gap-2 text-text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {project.links.github}
              </span>
            )}
            {project.links.demo && project.links.demo !== 'Work in Progress' && project.links.demo !== 'Will Deploy Soon' && project.links.demo !== 'Private' && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-shakespeare-400 hover:text-accent transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
            {project.links.demo && (project.links.demo === 'Work in Progress' || project.links.demo === 'Will Deploy Soon' || project.links.demo === 'Private') && (
              <span className="inline-flex items-center gap-2 text-text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {project.links.demo}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-6">
            {project.longDescription}
          </p>

          {/* Media carousel (video first, then images) */}
          {totalMedia > 0 ? (
            <div className="relative">
              <div 
                key={currentIndex}
                className="aspect-video relative rounded-lg overflow-hidden bg-background animate-carousel-fade"
              >
                {isCurrentVideo && project.video ? (
                  <video
                    src={project.video}
                    controls
                    autoPlay
                    muted
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={validImages[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              {/* Navigation buttons */}
              {totalMedia > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="carousel-btn carousel-btn-prev"
                    aria-label="Previous media"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="carousel-btn carousel-btn-next"
                    aria-label="Next media"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Media counter with video indicator */}
              {totalMedia > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-sm text-white flex items-center gap-2">
                  {isCurrentVideo && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {currentIndex + 1} / {totalMedia}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-background rounded-lg">
              <p className="text-text-muted">No media available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
