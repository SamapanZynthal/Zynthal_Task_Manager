"use client";

import { CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface TaskNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskNotes({ value, onChange }: TaskNotesProps) {
  return (
    <CardContent className="space-y-2">
      <label className="text-sm font-medium">Additional Notes</label>
      <Textarea
        placeholder="Add more details about this task..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[150px]"
      />
    </CardContent>
  );
}