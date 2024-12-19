"use client";

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { KanbanColumnData } from '@/types/kanban';
import { PRIORITY_COLORS } from '@/types/priority';
import { KanbanColumnHeader } from './header/KanbanColumnHeader';
import { KanbanTaskCard } from './cards/KanbanTaskCard';
import { KanbanEmptyCard } from './cards/KanbanEmptyCard';

interface KanbanColumnProps {
  column: KanbanColumnData;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: KanbanColumnData['id']) => void;
}

export function KanbanColumn({ column, onToggle, onDelete, onPriorityChange }: KanbanColumnProps) {
  const isEmpty = column.todos.length === 0;

  return (
    <Card className={cn(
      "border-t-4 transition-colors",
      PRIORITY_COLORS[column.id].border,
      "hover:shadow-lg"
    )}>
      <CardHeader className="pb-3">
        <KanbanColumnHeader column={column} />
      </CardHeader>
      <CardContent className={cn(
        "space-y-3 min-h-[200px]",
        isEmpty && "flex items-center justify-center"
      )}>
        {isEmpty ? (
          <KanbanEmptyCard />
        ) : (
          column.todos.map(todo => (
            <KanbanTaskCard
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onPriorityChange={onPriorityChange}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}