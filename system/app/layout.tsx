import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import SmoothScroll from './components/SmoothScroll';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mbalanlay-portfolio.vercel.app'),
  title: 'Mathew Portfolio',
  description:
    'Personal portfolio showcasing projects, skills, and experiences as an IT Student from the Philippines.',
  keywords: ['portfolio', 'IT', 'web development', 'student', 'Philippines'],
  authors: [{ name: 'Mathew Angelo Balanlay' }],

  openGraph: {
    title: "Mathew Portfolio",
    description: "This is my Portfolio.",
    url: "https://mbalanlay-portfolio.vercel.app/",
    siteName: "Mathew Portfolio",
    images: [
      {
        url: "/Profile.jpg",
        width: 1200,
        height: 630,
        alt: "Mathew Angelo Balanlay Profile and Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mathew Portfolio",
    description: "This is my Portfolio.",
    images: ["/Profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>
          <ParticleBackground />
          <Header />
          <main className="content-wrapper">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
