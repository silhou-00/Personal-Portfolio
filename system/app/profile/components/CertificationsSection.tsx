'use client';

import { useState } from 'react';
import certificationsData from '../../data/certifications.json';
import ImageModal from '../../components/ImageModal';

interface Certification {
  id: string;
  category: string;
  title: string;
  issuer: string;
  date: string;
  status: string;
  image: string[];
}

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certifications = certificationsData as Certification[];

  // Filter certifications by category
  const webDevCerts = certifications.filter(
    (cert) => cert.category === 'webdevelopment'
  );
  const networkingCerts = certifications.filter(
    (cert) => cert.category === 'networking'
  );

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const isCompleted = status === 'Completed';
    const statusClass = isCompleted ? 'status-completed' : 'status-in-progress';
    return (
      <span
        className={`${statusClass} inline-flex items-center px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
          isCompleted
            ? 'bg-green-600/20 text-green-400 border border-green-600/40'
            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
        }`}
      >
        {isCompleted ? (
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-3 h-3 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {status}
      </span>
    );
  };

  return (
    <section className="section-container-compact">
      <div className="glass-section p-6 sm:p-8">
        <h2 className="section-title">Certifications</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Web Development Certifications */}
          <div>
            <h3 className="text-sm font-semibold text-venus-400 mb-4 uppercase tracking-wide">
              Web Development
            </h3>
            <div className="max-h-[300px] overflow-y-auto pr-2">
              <ul className="space-y-3">
                {webDevCerts.map((cert) => (
                  <li key={cert.id}>
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="clickable-bullet w-full text-left text-text-secondary hover:text-text-primary transition-colors py-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-base">{cert.title}</span>
                        <StatusBadge status={cert.status} />
                      </div>
                      <span className="block text-sm text-text-muted mt-0.5">
                        {cert.issuer} • {cert.date}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Networking / Cybersecurity Certifications */}
          <div>
            <h3 className="text-sm font-semibold text-venus-400 mb-4 uppercase tracking-wide">
              Networking / Cybersecurity
            </h3>
            {networkingCerts.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto pr-2">
                <ul className="space-y-3">
                  {networkingCerts.map((cert) => (
                    <li key={cert.id}>
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="clickable-bullet w-full text-left text-text-secondary hover:text-text-primary transition-colors py-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-base">{cert.title}</span>
                          <StatusBadge status={cert.status} />
                        </div>
                        <span className="block text-sm text-text-muted mt-0.5">
                          {cert.issuer} • {cert.date}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex items-center justify-center h-36 bg-background/50 rounded-lg border border-border/30">
                <p className="text-text-muted italic text-sm">
                  Coming Soon
                </p>
              </div>
            )}
          </div>
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
