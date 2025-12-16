'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Social media icons as inline SVGs
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface ProfileData {
  name: string;
  title: string;
  country: string;
  email: string;
  aboutMe: string;
  linkedIn: string;
  github: string;
  facebook: string;
}

export default function HeroSection() {
  const [showToast, setShowToast] = useState(false);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const profile: ProfileData = {
    name: 'Mathew Angelo T. Balanlay',
    title: 'IT Student',
    country: 'Philippines',
    email: 'balanlaymathewangelo@gmail.com',
    aboutMe:
      'Undergrad IT Student, Following the Cybersecurity Route',
    linkedIn: 'https://www.linkedin.com/in/mathew-14b703357/',
    github: 'https://github.com/silhou-00',
    facebook: 'https://www.facebook.com/MathewBalanlay/',
  };

  return (
    <section className="section-container pt-24 lg:pt-28">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center pt-20">
        {/* Profile Picture - Centered */}
        <div className="shrink-0 pt-10">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-2 border-venus-700">
            <Image
              src="/Profile.jpg"
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status indicator */}
          <div className="status-indicator justify-center lg:justify-start mb-3">
            <span className="status-dot"></span>
            <span>Available for Job and Internship Opportunities</span>
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-2 lg:w-200">
            {profile.name}
          </h1>

          {/* Title & Location */}
          <p className="text-lg sm:text-xl text-venus-500 mb-3">
            {profile.title} • {profile.country}
          </p>

          {/* Email - Click to copy */}
          <button
            onClick={() => copyEmail(profile.email)}
            className="inline-block text-venus-400 hover:text-accent transition-colors mb-4 cursor-pointer"
            title="Click to copy email"
          >
            {profile.email}
          </button>

          {/* Toast Notification */}
          {showToast && (
            <div className="fixed bottom-6 right-6 bg-venus-700 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
              ✓ Email copied to clipboard!
            </div>
          )}

          {/* About Me */}
          <p className="text-text-secondary leading-relaxed mb-5 max-w-2xl mx-auto lg:mx-0">
            {profile.aboutMe}
          </p>

          {/* Actions - Resume and Social Links */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            {/* Download Resume Button */}
            <Link
              href="/portfolio/MCS Resume Template (Bullet Points).pdf"
              target="_blank"
              className="btn-primary"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </Link>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
