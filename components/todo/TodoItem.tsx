"use client";

import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Todo } from '@/types/todo';
import { PrioritySelect } from './PrioritySelect';
import { Priority, PRIORITY_COLORS } from '@/types/priority';
import { cn } from '@/lib/utils';
import { formatDateTime, formatDeadline } from '@/lib/utils/dateUtils';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onPriorityChange }: TodoItemProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const createdAtFormatted = formatDateTime(todo.createdAt);
  const deadlineFormatted = todo.deadline 
    ? formatDeadline(todo.deadline.date, todo.deadline.time)
    : null;

  return (
    <Card 
      className={cn(
        "transition-all border-l-4",
        todo.completed ? 'bg-muted' : PRIORITY_COLORS[todo.priority].bg,
        PRIORITY_COLORS[todo.priority].border
      )}
    >
      <CardContent className="p-4 flex flex-col gap-4">
        {/* Task Content */}
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={cn(
              "mt-1 transition-colors",
              todo.completed ? "text-muted-foreground" : PRIORITY_COLORS[todo.priority].text
            )}
          >
            {todo.completed ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <Link 
              href={`/task/${todo.id}`}
              className={cn(
                "text-base block hover:underline line-clamp-2",
                todo.completed 
                  ? 'line-through text-muted-foreground' 
                  : PRIORITY_COLORS[todo.priority].text
              )}
            >
              {todo.text}
            </Link>
            
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Created: {createdAtFormatted}
              </div>
              {deadlineFormatted && (
                <Badge variant="outline" className="font-normal">
                  Due: {deadlineFormatted}
                </Badge>
              )}
            </div>
          </div>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center pt-2 border-t">
          <PrioritySelect
            value={todo.priority}
            onChange={(priority) => onPriorityChange(todo.id, priority)}
            disabled={todo.completed}
            className="h-9 w-full sm:w-[200px]"
          />
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(todo.id)}
              className={cn(
                "w-full sm:w-10 h-9 text-destructive hover:text-destructive/90",
                "hover:bg-destructive/10 justify-center"
              )}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sm:hidden ml-2">Delete Task</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}