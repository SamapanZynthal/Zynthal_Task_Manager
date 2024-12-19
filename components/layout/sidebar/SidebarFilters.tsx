"use client";

import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Priority, PRIORITY_COLORS, PRIORITY_LABELS } from '@/types/priority';
import { cn } from '@/lib/utils';
import { useTodos } from '@/components/todo/TodoProvider';

export function SidebarFilters() {
  const { filterPriority, setFilterPriority } = useTodos();
  const priorities: (Priority | 'all')[] = ['all', 'high', 'medium', 'low'];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
      <div className="space-y-1">
        {priorities.map((priority) => (
          <Button
            key={priority}
            variant={filterPriority === priority ? 'secondary' : 'ghost'}
            className={cn(
              "w-full justify-start gap-2",
              filterPriority === priority && "bg-secondary",
              priority !== 'all' && PRIORITY_COLORS[priority].text
            )}
            onClick={() => setFilterPriority(priority)}
          >
            {priority !== 'all' && <Flag className="h-4 w-4" />}
            {priority === 'all' ? 'All Tasks' : PRIORITY_LABELS[priority]}
          </Button>
        ))}
      </div>
    </div>
  );
}