"use client";

import { useMemo } from 'react';
import { Todo } from '@/types/todo';
import { Priority } from '@/types/priority';
import { KanbanColumnData, KanbanStats } from '@/types/kanban';

const COLUMNS: { id: Priority; label: string }[] = [
  { id: 'high', label: 'High Priority' },
  { id: 'medium', label: 'Medium Priority' },
  { id: 'low', label: 'Low Priority' },
];

export function useKanbanData(todos: Todo[]) {
  return useMemo(() => {
    const columns: KanbanColumnData[] = COLUMNS.map(column => ({
      ...column,
      todos: todos.filter(todo => todo.priority === column.id),
    }));

    const stats: KanbanStats = {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      inProgress: todos.filter(todo => !todo.completed).length,
    };

    return { columns, stats };
  }, [todos]);
}