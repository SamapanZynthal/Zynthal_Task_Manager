"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Priority } from '@/types/priority';
import { PrioritySelect } from './PrioritySelect';
import { DeadlineSelect } from './DeadlineSelect';
import { Card, CardContent } from '@/components/ui/card';

interface TodoFormProps {
  onAdd: (text: string, priority: Priority, deadline?: { date: string; time: string }) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [priority, setPriority] = useState<Priority>('medium');
  const [deadline, setDeadline] = useState<{ date?: string; time?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const text = formData.get('todo') as string;

    if (!text.trim()) {
      toast.error('Please enter a task');
      return;
    }

    const deadlineData = deadline.date && deadline.time 
      ? { date: deadline.date, time: deadline.time }
      : undefined;

    onAdd(text.trim(), priority, deadlineData);
    form.reset();
    setDeadline({});
  };

  const handleDeadlineSelect = (date: string | undefined, time: string | undefined) => {
    setDeadline({ date, time });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              name="todo"
              placeholder="Add a new task..."
              className="h-10 flex-1"
            />
            
            <Button type="submit" className="h-10 whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <PrioritySelect 
              value={priority} 
              onChange={setPriority}
              className="h-10 w-full sm:w-[200px]"
            />
            
            <DeadlineSelect
              date={deadline.date}
              time={deadline.time}
              onSelect={handleDeadlineSelect}
              className="h-10 w-full sm:w-[200px]"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}