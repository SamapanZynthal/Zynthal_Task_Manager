"use client";

import { CalendarDays } from 'lucide-react';

export function EmptyCalendarState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
      <CalendarDays className="h-12 w-12 mb-4 opacity-20" />
      <p className="text-lg font-medium mb-1">No tasks scheduled</p>
      <p className="text-sm">Select a different date or add a new task</p>
    </div>
  );
}