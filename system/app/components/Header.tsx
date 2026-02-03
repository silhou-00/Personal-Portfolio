'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Profile', href: '/' },
    { name: 'Projects', href: '/projects' },
  ];

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-text-primary'
                    : 'text-shakespeare-500 hover:text-text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
