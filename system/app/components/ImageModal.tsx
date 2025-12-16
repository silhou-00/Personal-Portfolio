'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  description?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  images,
  title,
  description,
}: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out empty image strings
  const validImages = images.filter((img) => img && img.trim() !== '');

  if (!isOpen) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
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
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-text-secondary text-sm mb-4">{description}</p>
          )}

          {/* Image carousel */}
          {validImages.length > 0 ? (
            <div className="relative">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-background">
                <Image
                  src={validImages[currentIndex]}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Navigation buttons */}
              {validImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="carousel-btn carousel-btn-prev"
                    aria-label="Previous image"
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
                    aria-label="Next image"
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

              {/* Image counter */}
              {validImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-sm text-white">
                  {currentIndex + 1} / {validImages.length}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-background rounded-lg">
              <p className="text-text-muted">No images available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
