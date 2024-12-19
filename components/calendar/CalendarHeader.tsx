"use client";

import { CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  selectedDate: Date | undefined;
}

export function CalendarHeader({ selectedDate }: CalendarHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-2xl">
        <CalendarDays className="h-6 w-6" />
        Calendar
      </CardTitle>
    </CardHeader>
  );
}