"use client";

import { CardHeader, CardTitle } from '@/components/ui/card';
import { PrioritySelect } from '@/components/todo/PrioritySelect';
import { Priority } from '@/types/priority';
import { Todo } from '@/types/todo';
import { usePrioritySuggestion } from '@/hooks/use-priority-suggestion';
import { Badge } from '@/components/ui/badge';

interface TaskPriorityProps {
  todo: Todo;
  onPriorityChange: (priority: Priority) => void;
}

export function TaskPriority({ todo, onPriorityChange }: TaskPriorityProps) {
  const suggestion = usePrioritySuggestion(todo.text);

  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold mb-4">{todo.text}</CardTitle>
      <div className="space-y-2">
        <label className="text-sm font-medium">Priority</label>
        <div className="flex items-center gap-4">
          <PrioritySelect
            value={todo.priority}
            onChange={onPriorityChange}
            className="w-[200px]"
          />
          <Badge variant="secondary" className="h-auto py-1">
            {suggestion}
          </Badge>
        </div>
      </div>
    </CardHeader>
  );
}