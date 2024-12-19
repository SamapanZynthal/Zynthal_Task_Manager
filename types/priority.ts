export type Priority = 'low' | 'medium' | 'high';

export const PRIORITY_COLORS = {
  low: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    border: 'border-emerald-200 dark:border-emerald-800',
    hover: 'hover:bg-emerald-100 dark:hover:bg-emerald-900',
  },
  medium: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950',
    border: 'border-amber-200 dark:border-amber-800',
    hover: 'hover:bg-amber-100 dark:hover:bg-amber-900',
  },
  high: {
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950',
    border: 'border-rose-200 dark:border-rose-800',
    hover: 'hover:bg-rose-100 dark:hover:bg-rose-900',
  },
} as const;

export const PRIORITY_LABELS = {
  low: 'Low Priority',
  medium: 'Medium Priority',
  high: 'High Priority',
} as const;