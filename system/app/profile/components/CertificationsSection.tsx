'use client';

import { useState } from 'react';
import Image from 'next/image';
import certificationsData from '../../data/certifications.json';
import ImageModal from '../../components/ImageModal';

interface Certification {
  id: string;
  category: string;
  title: string;
  issuer: string;
  date: string;
  logo: string;
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
                      className="w-full text-left text-text-secondary hover:text-text-primary transition-colors py-2 px-2 rounded-lg hover:bg-surface-elevated/30"
                    >
                      <div className="flex items-center gap-3">
                        {/* Issuer Logo */}
                        <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-white/10 border border-border/30">
                          <Image
                            src={cert.logo}
                            alt={cert.issuer}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        {/* Certification Info */}
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-base block truncate">{cert.title}</span>
                          <span className="block text-sm text-text-muted mt-0.5">
                            {cert.issuer} • {cert.date}
                          </span>
                        </div>
                      </div>
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
                        className="w-full text-left text-text-secondary hover:text-text-primary transition-colors py-2 px-2 rounded-lg hover:bg-surface-elevated/30"
                      >
                        <div className="flex items-center gap-3">
                          {/* Issuer Logo */}
                          <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-white/10 border border-border/30">
                            <Image
                              src={cert.logo}
                              alt={cert.issuer}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          {/* Certification Info */}
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-base block truncate">{cert.title}</span>
                            <span className="block text-sm text-text-muted mt-0.5">
                              {cert.issuer} • {cert.date}
                            </span>
                          </div>
                        </div>
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
