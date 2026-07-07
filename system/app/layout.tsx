import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono, Archivo_Black } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const archivo = Archivo_Black({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mbalanlay-portfolio.vercel.app'),
  title: 'Mathew Balanlay · Assembling DevSecOps Engineer',
  description:
    'Assembling a DevSecOps career at the University of Makati, automating workflows and pipelines so teams ship faster without sacrificing security.',
  keywords: ['DevSecOps', 'DevOps', 'CI/CD', 'portfolio', 'IT', 'Philippines'],
  authors: [{ name: 'Mathew Angelo Balanlay' }],

  openGraph: {
    title: 'Mathew Balanlay · Assembling DevSecOps Engineer',
    description:
      'Automating workflows and pipelines so teams ship faster without sacrificing security.',
    url: 'https://mbalanlay-portfolio.vercel.app/',
    siteName: 'Mathew Balanlay Portfolio',
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
    title: 'Mathew Balanlay · Assembling DevSecOps Engineer',
    description:
      'Automating workflows and pipelines so teams ship faster without sacrificing security.',
    images: ['/Profile.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} ${archivo.variable}`}
    >
      <body className="antialiased">
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
