"use client";

import { Todo } from '@/types/todo';
import { TodoItem } from '@/components/todo/TodoItem';

interface KanbanTaskCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Todo['priority']) => void;
}

export function KanbanTaskCard({ todo, onToggle, onDelete, onPriorityChange }: KanbanTaskCardProps) {
  return (
    <TodoItem
      todo={todo}
      onToggle={onToggle}
      onDelete={onDelete}
      onPriorityChange={onPriorityChange}
    />
  );
}