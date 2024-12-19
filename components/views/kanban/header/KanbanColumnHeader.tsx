"use client";

import { CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRIORITY_COLORS } from '@/types/priority';
import { KanbanColumnData } from '@/types/kanban';

interface KanbanColumnHeaderProps {
  column: KanbanColumnData;
}

export function KanbanColumnHeader({ column }: KanbanColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className={cn(
        "text-lg font-medium flex items-center gap-2",
        PRIORITY_COLORS[column.id].text
      )}>
        <Flag className="h-4 w-4" />
        {column.label}
      </CardTitle>
      <Badge variant="secondary" className="font-normal">
        {column.todos.length}
      </Badge>
    </div>
  );
}