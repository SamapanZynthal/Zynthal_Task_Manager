"use client";

import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Todo } from '@/types/todo';

interface CalendarGridProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  todos: Todo[];
}

export function CalendarGrid({ selectedDate, onSelect, todos }: CalendarGridProps) {
  // Get all dates that have tasks
  const datesWithTasks = todos
    .filter(todo => todo.deadline?.date)
    .map(todo => todo.deadline!.date);

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelect}
      modifiers={{
        hasTasks: (date) => 
          datesWithTasks.includes(format(date, 'yyyy-MM-dd'))
      }}
      modifiersStyles={{
        hasTasks: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          fontWeight: 'bold'
        }
      }}
      className="rounded-md border shadow-sm"
      classNames={{
        months: "space-y-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center gap-1",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
          "hover:bg-muted rounded-md",
          "flex items-center justify-center"
        ),
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          "flex-1 text-center"
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          "flex-1"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          "rounded-md transition-colors",
          "flex items-center justify-center",
          "hover:bg-muted"
        ),
        day_selected: cn(
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
        ),
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      components={{
        DayContent: ({ date }) => (
          <CalendarDayContent date={date} todos={todos} />
        ),
      }}
    />
  );
}

function CalendarDayContent({ date, todos }: { date: Date; todos: Todo[] }) {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const tasksForDay = todos.filter(todo => 
    todo.deadline?.date === formattedDate
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {date.getDate()}
      {tasksForDay.length > 0 && (
        <Badge 
          variant="secondary" 
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
        >
          {tasksForDay.length}
        </Badge>
      )}
    </div>
  );
}