"use client";

import { useState, useEffect } from 'react';
import { ViewType } from '@/types/view';

const VIEW_PREFERENCE_KEY = 'todo-view-preference';

export function useViewPreference() {
  const [currentView, setCurrentView] = useState<ViewType>('list');

  useEffect(() => {
    const savedView = localStorage.getItem(VIEW_PREFERENCE_KEY) as ViewType;
    if (savedView) {
      setCurrentView(savedView);
    }
  }, []);

  const updateView = (view: ViewType) => {
    setCurrentView(view);
    localStorage.setItem(VIEW_PREFERENCE_KEY, view);
  };

  return {
    currentView,
    updateView,
  };
}