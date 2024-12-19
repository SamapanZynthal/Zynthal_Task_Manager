"use client";

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { TodoProvider } from '@/components/todo/TodoProvider';
import { Toaster } from '@/components/ui/sonner';
import { useAuthGuard } from '@/lib/auth/authGuard';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  // Check authentication status
  useAuthGuard();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TodoProvider>
        {children}
        <Toaster />
      </TodoProvider>
    </ThemeProvider>
  );
}