'use client';

import site from '../data/site.json';

export default function Contact() {
  const [user, domain] = site.email.split('@');

  return (
    <section className="shell band" id="contact">
      <div className="well g12">
        <h2 className="band-title">
          <span className="bn">04</span>Contact
        </h2>

        <button
          className="addr"
          data-reveal
          onClick={() => {
            window.location.href = `mailto:${site.email}`;
          }}
        >
          {/* <wbr> so the address breaks at the @ on narrow screens instead of
              overflowing the well. */}
          {user}
          <wbr />@{domain}
          <span className="caret" aria-hidden="true" />
        </button>

        <div className="c-links" data-reveal>
          <a href={site.links.github} target="_blank" rel="noreferrer noopener">
            github
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            linkedin
          </a>
          <a href={site.resume} target="_blank" rel="noreferrer noopener">
            resume
          </a>
        </div>
      </div>
    </section>
  );
}
