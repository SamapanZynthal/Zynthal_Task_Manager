"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useTheme } from "@/hooks/useTheme";
import { useOccasionTheme } from "@/hooks/useOccasionTheme";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { mode } = useTheme();
  // Initialize occasion theme system
  useOccasionTheme();

  return (
    <NextThemesProvider 
      {...props}
      forcedTheme={mode === 'system' ? undefined : mode}
    >
      {children}
    </NextThemesProvider>
  );
}