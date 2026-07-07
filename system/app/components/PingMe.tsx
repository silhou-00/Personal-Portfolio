'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';

const EMAIL = 'balanlaymathewangelo@gmail.com';

export default function PingMe() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable — fall back to a mailto
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="ping" data-sec>
      <SectionHead num="06" label="Ping" verb="Ping me" />
      <div className="ping-status" data-reveal>
        <span className="status-dot" />
        status: reachable
      </div>
      <div data-reveal>
        <button type="button" className="ping-email" onClick={copy}>
          {EMAIL}
        </button>
        <p
          className={`ping-copy-hint${copied ? ' is-copied' : ''}`}
          role="status"
        >
          {copied ? 'copied ✓' : 'click to copy'}
        </p>
      </div>
      <div className="ping-links" data-reveal>
        <a
          href="https://github.com/silhou-00"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/mathew-14b703357/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>
        <a
          href="/portfolio/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          resume
        </a>
      </div>
      <p className="ping-wink">end of transmission · 0 errors</p>
    </section>
  );
}
