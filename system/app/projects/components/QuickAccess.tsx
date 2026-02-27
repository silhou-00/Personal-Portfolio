'use client';

import { useState } from 'react';
import Image from 'next/image';

interface QuickAccessProps {
  currentCategory: string | null;
  onCategoryClick: (category: string) => void;
  onRootClick: () => void;
}

const categories = ['University', 'Personal', 'Hackathon'];

export default function QuickAccess({ currentCategory, onCategoryClick, onRootClick }: QuickAccessProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="quick-access-sidebar w-44 shrink-0 border-r border-border/40 bg-surface/50 overflow-y-auto h-full">
      {/* My Projects header — collapsible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-elevated/40 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 text-text-muted transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Image src="/folder_icon.svg" alt="" width={16} height={16} />
        <span>My Projects</span>
      </button>

      {/* Category links */}
      {isOpen && (
        <div className="pb-2">
          {/* Root: All Projects */}
          <button
            onClick={onRootClick}
            className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-sm transition-colors ${
              currentCategory === null
                ? 'text-shakespeare-700 bg-shakespeare-700/10 font-medium'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/40'
            }`}
          >
            <Image src="/folder_icon.svg" alt="" width={14} height={14} />
            All Projects
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat)}
              className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-sm transition-colors ${
                currentCategory === cat
                  ? 'text-shakespeare-700 bg-shakespeare-700/10 font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/40'
              }`}
            >
              <Image src="/folder_icon.svg" alt="" width={14} height={14} />
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
