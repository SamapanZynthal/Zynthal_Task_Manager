"use client";

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Todo } from '@/types/todo';
import { TodoItem } from '../todo/TodoItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { EmptyCalendarState } from './EmptyCalendarState';

interface CalendarTaskListProps {
  selectedDate: Date | undefined;
  tasks: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Todo['priority']) => void;
}

export function CalendarTaskList({ 
  selectedDate, 
  tasks, 
  onToggle, 
  onDelete, 
  onPriorityChange 
}: CalendarTaskListProps) {
  if (!selectedDate) return null;

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Clock className="h-6 w-6" />
          Tasks for {format(selectedDate, 'MMMM d, yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "p-4",
        tasks.length > 0 && "p-0"
      )}>
        {tasks.length === 0 ? (
          <EmptyCalendarState />
        ) : (
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-3 p-4">
              {tasks.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onPriorityChange={onPriorityChange}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </>
  );
}