'use client';

import Image from 'next/image';

interface BreadcrumbProps {
  path: string[];
  onNavigate: (index: number) => void;
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export default function Breadcrumb({ path, onNavigate, onBack, onForward, canGoBack, canGoForward }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1 bg-surface border border-border/40 rounded-lg px-2 py-1.5 w-full">
      {/* Back / Forward arrows */}
      <div className="flex items-center gap-0.5 mr-2">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className="p-1 rounded hover:bg-surface-elevated/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className="p-1 rounded hover:bg-surface-elevated/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Go forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Linux-style breadcrumb segments */}
      <div className="flex items-center gap-0.5 overflow-x-auto">
        {path.map((segment, index) => (
          <div key={index} className="flex items-center gap-0.5">
            {index > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
            <button
              onClick={() => onNavigate(index)}
              className={`breadcrumb-segment flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                index === path.length - 1
                  ? 'bg-shakespeare-700/15 text-shakespeare-700 border border-shakespeare-700/30'
                  : 'text-text-secondary hover:bg-surface-elevated/60 hover:text-text-primary'
              }`}
            >
              {index === 0 && (
                <Image src="/drive_icon.svg" alt="" width={14} height={14} className="shrink-0" />
              )}
              {segment}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
