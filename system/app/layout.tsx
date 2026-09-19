import type { Metadata } from 'next';
import { Archivo, Martian_Mono } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const martian = Martian_Mono({
  variable: '--font-martian',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const DESCRIPTION =
  'Assembling a DevSecOps career at the University of Makati, automating pipelines so teams ship faster without losing security.';

export const metadata: Metadata = {
  metadataBase: new URL('https://matportfolio.vercel.app'),
  title: 'Mathew Angelo Balanlay · Assembling DevSecOps Engineer',
  description: DESCRIPTION,
  keywords: ['DevSecOps', 'DevOps', 'CI/CD', 'portfolio', 'IT', 'Philippines'],
  authors: [{ name: 'Mathew Angelo Balanlay' }],

  openGraph: {
    title: 'Mathew Angelo Balanlay · Assembling DevSecOps Engineer',
    description: DESCRIPTION,
    url: 'https://matportfolio.vercel.app/',
    siteName: 'Mathew Angelo Balanlay Portfolio',
    images: [
      {
        url: '/Profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Mathew Angelo Balanlay Profile and Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mathew Angelo Balanlay · Assembling DevSecOps Engineer',
    description: DESCRIPTION,
    images: ['/Profile.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(archivo.variable, martian.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
