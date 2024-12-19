"use client";

import { useEffect, useState } from 'react';
import { OccasionManager } from '@/lib/themes/occasionManager';
import { useTheme } from './useTheme';

export function useOccasionTheme() {
  const { updateTheme } = useTheme();
  const [currentOccasion, setCurrentOccasion] = useState<string | null>(null);

  useEffect(() => {
    const checkOccasion = () => {
      const occasionManager = OccasionManager.getInstance();
      const occasion = occasionManager.getCurrentOccasion();

      if (occasion) {
        setCurrentOccasion(occasion.occasion);
        updateTheme({
          name: occasion.theme.name,
          label: occasion.theme.label,
          colors: occasion.theme.colors,
        });
      } else if (currentOccasion) {
        // Reset to default theme when occasion ends
        setCurrentOccasion(null);
      }
    };

    // Check immediately
    checkOccasion();

    // Check every day at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeToMidnight = tomorrow.getTime() - now.getTime();

    // Initial timeout to sync with midnight
    const initialTimeout = setTimeout(() => {
      checkOccasion();
      // Then set up daily interval
      const interval = setInterval(checkOccasion, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeToMidnight);

    return () => clearTimeout(initialTimeout);
  }, [updateTheme, currentOccasion]);

  return currentOccasion;
}