"use client";

import { useMemo } from 'react';
import { getPrioritySuggestion } from '@/lib/priority-utils';

export function usePrioritySuggestion(text: string) {
  return useMemo(() => getPrioritySuggestion(text), [text]);
}