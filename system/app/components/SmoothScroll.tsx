'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with options to prevent scrolling inside modals
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      prevent: (node) => {
        // Prevent Lenis from handling scroll on elements with these classes
        return (
          node.classList.contains('modal-backdrop') ||
          node.closest('.modal-backdrop') !== null ||
          node.classList.contains('overflow-y-auto') ||
          node.closest('.overflow-y-auto') !== null
        );
      },
    });

    // Expose for programmatic anchor scrolling (nav links)
    window.__lenis = lenisRef.current;

    // Animation frame loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
