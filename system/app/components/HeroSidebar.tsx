'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Social media icons
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface HeroSidebarProps {
  name: string;
  title: string;
  country: string;
  email: string;
  aboutMe: string;
  currentlyLearning?: {
    label: string;
    course: string;
    show: boolean;
  };
  linkedIn: string;
  github: string;
  facebook: string;
  profileImage: string;
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function HeroSidebar({
  name,
  title,
  country,
  email,
  aboutMe,
  currentlyLearning,
  linkedIn,
  github,
  facebook,
  profileImage,
  onVisibilityChange,
}: HeroSidebarProps) {
  const [animationState, setAnimationState] = useState<'hidden' | 'sliding-in' | 'visible' | 'sliding-out'>('hidden');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show sidebar after scrolling past hero section (roughly 500px)
      const shouldBeVisible = scrollPosition > 500;
      
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
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Notify parent of visibility changes
  useEffect(() => {
    const isVisible = animationState === 'sliding-in' || animationState === 'visible';
    onVisibilityChange?.(isVisible);
  }, [animationState, onVisibilityChange]);

  const handleAnimationEnd = () => {
    setAnimationState(prev => {
      if (prev === 'sliding-in') return 'visible';
      if (prev === 'sliding-out') return 'hidden';
      return prev;
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Don't render when fully hidden
  if (animationState === 'hidden') return null;

  const animationClass = animationState === 'sliding-in' || animationState === 'visible' 
    ? 'animate-slide-in-left' 
    : 'animate-slide-out-left';

  return (
    <>
      <aside 
        className={`fixed top-99.5 -translate-y-1/2 left-4 z-40 hidden lg:block ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="hero-sidebar overflow-y-auto rounded-2xl shadow-xl">
          {/* Profile Picture */}
          <div className="flex justify-center mb-4">
            <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-shakespeare-700">
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Status indicator */}
          <div className="status-indicator justify-center mb-2">
            <span className="status-dot"></span>
            <span className="text-xs">Available</span>
          </div>

          {/* Name */}
          <h2 className="text-lg font-bold text-text-primary text-center mb-1 leading-tight">
            {name}
          </h2>

          {/* Title & Location */}
          <p className="text-sm text-shakespeare-500 text-center mb-3">
            {title} • {country}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-border/40 my-3" />

          {/* Email */}
          <button
            onClick={copyEmail}
            className="w-full text-xs text-shakespeare-400 hover:text-shakespeare-600 transition-colors text-center mb-3 break-all px-2"
            title="Click to copy email"
          >
            {email}
          </button>

          {/* About Me */}
          <p className="text-xs text-text-secondary text-center leading-relaxed mb-4 px-2">
            {aboutMe}
          </p>

          {/* Currently Learning */}
          {currentlyLearning?.show && (
            <div className="flex justify-center mb-4">
              <span className="currently-studying-pill text-[10px] px-2 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>{currentlyLearning.label}:</span>
                <span className="font-medium">{currentlyLearning.course}</span>
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-border/40 my-3" />

          {/* Download Resume Button */}
          <Link
            href="/portfolio/Resume.pdf"
            target="_blank"
            className="btn-primary text-sm py-2 px-4 w-full justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Resume
          </Link>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </aside>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-shakespeare-700 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Email copied to clipboard!
        </div>
      )}
    </>
  );
}
