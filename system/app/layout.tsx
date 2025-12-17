import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './context/ThemeContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio | IT Student',
  description:
    'Personal portfolio showcasing projects, skills, and experiences as an IT Student from the Philippines.',
  keywords: ['portfolio', 'IT', 'web development', 'student', 'Philippines'],
  authors: [{ name: 'Mathew Angelo Balanlay' }],
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
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
