"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthService } from './authService';

const PUBLIC_PATHS = ['/login', '/signup'];

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const authService = AuthService.getInstance();

  useEffect(() => {
    const user = authService.getCurrentUser();
    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    if (!user && !isPublicPath) {
      router.push('/login');
    } else if (user && isPublicPath) {
      router.push('/');
    }
  }, [router, pathname]);

  return authService.getCurrentUser();
}