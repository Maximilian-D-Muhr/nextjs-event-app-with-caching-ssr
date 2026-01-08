import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/Navigation';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Event Timeline",
  description: "Event management with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base-200 flex flex-col`}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-base-100 border-t border-base-300 py-6">
          <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <Link href="/about" className="link link-hover opacity-70">
                About
              </Link>
              <Link href="/contact" className="link link-hover opacity-70">
                Contact
              </Link>
            </div>
            <p className="opacity-70 text-center sm:text-right">
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/maximilianmuhr/"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                Maximilian D. Muhr
              </a>{" "}
              as part of WBS Coding School
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
