'use client';

import { useState } from 'react';
import certificationsData from '../../data/certifications.json';
import ImageModal from '../../components/ImageModal';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string[];
}

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certifications = certificationsData as Certification[];

  return (
    <section className="section-container">
      <div className="glass-section p-6 sm:p-8">
        <h2 className="section-title">Certifications</h2>

        <div className="max-h-[400px] overflow-y-auto pr-2">
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="clickable-bullet w-full text-left text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  <span className="font-medium text-base">{cert.title}</span>
                  <span className="block text-sm text-text-muted mt-0.5">
                    {cert.issuer} • {cert.date}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Certification Modal */}
      <ImageModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        images={selectedCert?.image || []}
        title={selectedCert?.title || ''}
        description={`${selectedCert?.issuer} • ${selectedCert?.date}`}
      />
    </section>
  );
}
