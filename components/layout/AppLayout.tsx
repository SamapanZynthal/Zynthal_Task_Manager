"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/signup'].includes(pathname);

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] pt-24 pb-8 px-4">
        <div className="container max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}