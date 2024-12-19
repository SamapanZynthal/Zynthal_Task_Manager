"use client";

import { Todo } from '@/types/todo';
import { TodoItem } from '../todo/TodoItem';

interface ListViewProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Todo['priority']) => void;
}

export function ListView({ todos, onToggle, onDelete, onPriorityChange }: ListViewProps) {
  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </div>
  );
}