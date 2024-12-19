"use client";

import { CardContent } from '@/components/ui/card';
import { DeadlineSelect } from '@/components/todo/DeadlineSelect';
import { Todo } from '@/types/todo';

interface TaskDeadlineProps {
  deadline?: Todo['deadline'];
  onDeadlineChange: (date: string | undefined, time: string | undefined) => void;
}

export function TaskDeadline({ deadline, onDeadlineChange }: TaskDeadlineProps) {
  return (
    <CardContent className="space-y-2">
      <label className="text-sm font-medium">Deadline</label>
      <DeadlineSelect
        date={deadline?.date}
        time={deadline?.time}
        onSelect={onDeadlineChange}
        className="w-[200px]"
      />
    </CardContent>
  );
}