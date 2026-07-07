'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';
import SectionHead from './SectionHead';

const CERT = {
  title: 'Oracle Cloud Infrastructure 2025 Certified Developer Professional',
  issuer: 'Oracle',
  issued: 'August 2025',
  logo: '/logo/Logo-Oracle-1.webp',
  images: ['/certs/ORACLE/OCI_Developer.jpg', '/certs/ORACLE/OCID25CP.jpg'],
};

export default function Proof() {
  const [open, setOpen] = useState(false);

  return (
    <section id="certs" data-sec>
      <SectionHead num="05" label="Certs" verb="Certified" />
      <div className="proof-plaque" data-reveal>
        <div className="proof-logo">
          <Image
            src={CERT.logo}
            alt="Oracle logo"
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>
        <div className="proof-text">
          <p className="proof-title">{CERT.title}</p>
          <p className="proof-meta">
            <span className="proof-star">★</span> professional level · issued{' '}
            {CERT.issued}
          </p>
        </div>
        <button
          type="button"
          className="proof-view"
          onClick={() => setOpen(true)}
        >
          view credential
        </button>
      </div>

      <ImageModal
        isOpen={open}
        onClose={() => setOpen(false)}
        images={CERT.images}
        title={CERT.title}
        description={`${CERT.issuer} · issued ${CERT.issued}`}
      />
    </section>
  );
}
