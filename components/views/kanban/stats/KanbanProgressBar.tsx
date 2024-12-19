"use client";

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useProgressStyles } from '@/hooks/useProgressStyles';

interface KanbanProgressBarProps {
  value: number;
}

export function KanbanProgressBar({ value }: KanbanProgressBarProps) {
  const { className, indicatorClassName } = useProgressStyles(value);
  
  return (
    <Progress
      value={value}
      className={className}
      indicatorClassName={indicatorClassName}
    />
  );
}