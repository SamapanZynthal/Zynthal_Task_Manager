"use client";

import { useState, useEffect } from 'react';
import { Theme, ThemeMode } from '@/types/theme';
import { themes } from '@/lib/themes/themeRegistry';

const THEME_KEY = 'app-theme';
const MODE_KEY = 'app-theme-mode';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    // Load saved theme and mode
    const savedThemeName = localStorage.getItem(THEME_KEY);
    const savedMode = localStorage.getItem(MODE_KEY) as ThemeMode;

    if (savedThemeName) {
      const theme = themes.find(t => t.name === savedThemeName);
      if (theme) setCurrentTheme(theme);
    }

    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const updateTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem(THEME_KEY, theme.name);
    applyTheme(theme, mode);
  };

  const updateMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem(MODE_KEY, newMode);
    applyTheme(currentTheme, newMode);
  };

  const applyTheme = (theme: Theme, themeMode: ThemeMode) => {
    const root = document.documentElement;
    const isDark = 
      themeMode === 'dark' || 
      (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Apply theme colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply gradients if available
    if (theme.gradients) {
      root.style.setProperty('--gradient-background', theme.gradients.background);
      root.style.setProperty('--gradient-card', theme.gradients.card);
      root.style.setProperty('--gradient-primary', theme.gradients.primary);
      root.classList.add('theme-gradient');
    } else {
      root.style.setProperty('--gradient-background', 'none');
      root.style.setProperty('--gradient-card', 'none');
      root.style.setProperty('--gradient-primary', 'none');
      root.classList.remove('theme-gradient');
    }

    // Update color scheme
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  return {
    currentTheme,
    mode,
    themes,
    updateTheme,
    updateMode,
  };
}