'use client';

import { useState, useEffect } from 'react';

// Social media icons as inline SVGs - smaller size
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);

interface StickyContactBarProps {
  name: string;
  email: string;
  linkedIn: string;
  github: string;
  facebook: string;
}

export default function StickyContactBar({
  name,
  email,
  linkedIn,
  github,
  facebook,
}: StickyContactBarProps) {
  const [animationState, setAnimationState] = useState<'hidden' | 'sliding-in' | 'visible' | 'sliding-out'>('hidden');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeVisible = scrollPosition > 400;
      
      setAnimationState(prev => {
        if (shouldBeVisible && (prev === 'hidden' || prev === 'sliding-out')) {
          return 'sliding-in';
        } else if (!shouldBeVisible && (prev === 'visible' || prev === 'sliding-in')) {
          return 'sliding-out';
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationState(prev => {
      if (prev === 'sliding-in') return 'visible';
      if (prev === 'sliding-out') return 'hidden';
      return prev;
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
  };

  // Don't render when fully hidden
  if (animationState === 'hidden') return null;

  const animationClass = animationState === 'sliding-in' || animationState === 'visible' 
    ? 'animate-slide-in-left' 
    : 'animate-slide-out-left';

  return (
    <div 
      className={`fixed top-24 left-4 z-40 hidden md:block ${animationClass}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="sticky-contact-bar-vertical">
        {/* Name */}
        <div className="font-semibold text-sm text-text-primary text-center leading-tight">
          {name}
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-border/40" />
        
        {/* Email */}
        <button
          onClick={copyEmail}
          className="text-xs text-text-secondary hover:text-shakespeare-600 transition-colors text-center leading-tight"
          title="Click to copy email"
        >
          {email}
        </button>
        
        {/* Divider */}
        <div className="w-full h-px bg-border/40" />
        
        {/* Social Icons - horizontal row */}
        <div className="flex items-center justify-center gap-3">
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-shakespeare-600 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-shakespeare-600 transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-shakespeare-600 transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <button
            onClick={copyEmail}
            className="text-text-secondary hover:text-shakespeare-600 transition-colors"
            aria-label="Email"
          >
            <EmailIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
