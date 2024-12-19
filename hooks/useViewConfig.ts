"use client";

import { useMemo } from 'react';
import { LayoutList, Calendar } from 'lucide-react';
import { ViewType } from '@/types/view';

const views = [
  { id: 'list' as const, label: 'List View', Icon: LayoutList },
  { id: 'calendar' as const, label: 'Calendar View', Icon: Calendar },
];

export function useViewConfig(currentView: ViewType, isMobile: boolean) {
  return useMemo(() => {
    // Only show list view on mobile
    const availableViews = isMobile ? views.filter(v => v.id === 'list') : views;
    const currentViewConfig = availableViews.find(v => v.id === currentView) || availableViews[0];

    return {
      availableViews,
      currentViewConfig,
    };
  }, [currentView, isMobile]);
}