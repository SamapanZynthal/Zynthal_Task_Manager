"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Todo } from '@/types/todo';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarHeader } from '../calendar/CalendarHeader';
import { CalendarGrid } from '../calendar/CalendarGrid';
import { CalendarTaskList } from '../calendar/CalendarTaskList';

interface CalendarViewProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Todo['priority']) => void;
}

export function CalendarView({ todos, onToggle, onDelete, onPriorityChange }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const todosForDate = selectedDate 
    ? todos.filter(todo => todo.deadline?.date === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  return (
    <div className={cn(
      "grid gap-6",
      "grid-cols-1",
      "lg:grid-cols-[400px,1fr]"
    )}>
      <Card className="bg-gradient-to-br from-card to-muted">
        <CalendarHeader selectedDate={selectedDate} />
        <CardContent className="p-3">
          <CalendarGrid
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            todos={todos}
          />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-muted">
        <CalendarTaskList
          selectedDate={selectedDate}
          tasks={todosForDate}
          onToggle={onToggle}
          onDelete={onDelete}
          onPriorityChange={onPriorityChange}
        />
      </Card>
    </div>
  );
}