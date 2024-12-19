"use client";

import { cn } from '@/lib/utils';

export function useProgressStyles(value: number) {
  return {
    className: cn(
      "h-2",
      value >= 80 ? "bg-emerald-100 dark:bg-emerald-900" :
      value >= 50 ? "bg-amber-100 dark:bg-amber-900" :
      "bg-rose-100 dark:bg-rose-900"
    ),
    indicatorClassName: cn(
      value >= 80 ? "bg-emerald-600 dark:bg-emerald-400" :
      value >= 50 ? "bg-amber-600 dark:bg-amber-400" :
      "bg-rose-600 dark:bg-rose-400"
    )
  };
}