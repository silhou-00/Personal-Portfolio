'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const particleCount = 120;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        moveX: (Math.random() - 0.5) * 60,
        moveY: (Math.random() - 0.5) * 60,
      });
    }

    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="particle-background fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-11 transition-opacity duration-300"
      // style={{ zIndex: 5 }}
    >
      {/* Twinkling stars layer */}
      {particles.slice(0, 60).map((particle) => (
        <div
          key={`star-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: 'rgba(168, 162, 176, 0.7)',
            boxShadow: `0 0 ${particle.size * 4}px rgba(168, 162, 176, 0.5), 0 0 ${particle.size * 2}px rgba(168, 162, 176, 0.8)`,
            animation: `twinkle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      {/* Floating dust layer */}
      {particles.slice(60).map((particle) => (
        <div
          key={`dust-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: `${particle.size * 0.7}px`,
            height: `${particle.size * 0.7}px`,
            backgroundColor: 'rgba(200, 195, 210, 0.6)',
            boxShadow: `0 0 ${particle.size * 3}px rgba(168, 162, 176, 0.4)`,
            animation: `floatDust ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            '--moveX': `${particle.moveX}px`,
            '--moveY': `${particle.moveY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
