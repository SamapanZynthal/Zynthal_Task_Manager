"use client";

import { Todo } from '@/types/todo';
import { KanbanColumn } from './KanbanColumn';
import { KanbanStats } from './KanbanStats';
import { useKanbanData } from '@/hooks/useKanbanData';

interface KanbanViewProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Todo['priority']) => void;
}

export function KanbanView({ todos, onToggle, onDelete, onPriorityChange }: KanbanViewProps) {
  const { columns, stats } = useKanbanData(todos);

  return (
    <div className="space-y-6">
      <KanbanStats stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            onToggle={onToggle}
            onDelete={onDelete}
            onPriorityChange={onPriorityChange}
          />
        ))}
      </div>
    </div>
  );
}