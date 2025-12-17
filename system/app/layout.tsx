import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './context/ThemeContext';

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
    url: "https://mbalanlay-portfolio.vercel.app/", // Put your actual deployed link here
    siteName: "Mathew Portfolio",
    images: [
      {
        url: "/Profile.jpg", // The image in your public folder
        width: 1200,
        height: 630,
        alt: "Mathew Angelo Balanlay Profile and Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Add Twitter Card (specifically for X/Twitter)
  twitter: {
    card: "summary_large_image", // Makes the image big
    title: "Mathew Portfolio",
    description: "This is my Portfolio.",
    images: ["/Profile.jpg"], // Same image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            <ParticleBackground />
            <Header />
            <main className="content-wrapper">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
