"use client";

import { useMemo } from 'react';
import { Todo } from '@/types/todo';

export function useRecentTasks(todos: Todo[], limit: number = 5) {
  return useMemo(() => {
    return [...todos]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }, [todos, limit]);
}