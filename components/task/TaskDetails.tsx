"use client";

import { Card } from '@/components/ui/card';
import { TaskHeader } from './TaskHeader';
import { TaskPriority } from './TaskPriority';
import { TaskDeadline } from './TaskDeadline';
import { TaskNotes } from './TaskNotes';
import { TaskActions } from './TaskActions';
import { useTodoDetails } from '@/lib/hooks/useTodoDetails';
import { useRouter } from 'next/navigation';

interface TaskDetailsProps {
  id: string;
}

export function TaskDetails({ id }: TaskDetailsProps) {
  const router = useRouter();
  const {
    todo,
    description,
    isSaving,
    setDescription,
    handleSave,
    handleDeadlineChange,
    handlePriorityChange,
  } = useTodoDetails(id);

  if (!todo) return null;

  return (
    <div className="container max-w-2xl py-8">
      <TaskHeader onBack={() => router.push('/')} />
      
      <Card>
        <TaskPriority
          todo={todo}
          onPriorityChange={handlePriorityChange}
        />
        
        <TaskDeadline
          deadline={todo.deadline}
          onDeadlineChange={handleDeadlineChange}
        />
        
        <TaskNotes
          value={description}
          onChange={setDescription}
        />
        
        <TaskActions
          onSave={handleSave}
          isSaving={isSaving}
        />
      </Card>
    </div>
  );
}