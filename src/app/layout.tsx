// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASIET Campus Store",
  description: "A Code4Campus Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative bg-white rounded-full p-1">
                <Image src="/logo.png" alt="ASIET Logo" width={40} height={40} />
              </div>
              <span className="text-xl font-bold hidden sm:block">
                ASIET Campus Store
              </span>
            </Link>
            <div className="text-lg">
              <Link href="/admin" className="font-semibold hover:text-accent transition-colors">
                Admin Panel
              </Link>
            </div>
          </nav>
        </header>
        <main className="bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}