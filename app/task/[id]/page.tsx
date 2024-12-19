"use client";

import { Suspense } from 'react';
import { TaskDetails } from '@/components/task/TaskDetails';
import { useRouter } from 'next/navigation';
import { useTodos } from '@/components/todo/TodoProvider';

interface TaskPageProps {
  params: { id: string };
}

export default function TaskPage({ params }: TaskPageProps) {
  const router = useRouter();
  const { todos } = useTodos();
  const todo = todos.find(t => t.id === params.id);

  // If todo doesn't exist, redirect to home page
  if (!todo) {
    router.push('/');
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Suspense fallback={<TaskDetailsSkeleton />}>
        <TaskDetails id={params.id} />
      </Suspense>
    </main>
  );
}

function TaskDetailsSkeleton() {
  return (
    <div className="container max-w-2xl py-8 animate-pulse">
      <div className="h-10 w-32 bg-muted rounded mb-6" />
      <div className="space-y-4">
        <div className="h-[500px] bg-card rounded-lg border" />
      </div>
    </div>
  );
}