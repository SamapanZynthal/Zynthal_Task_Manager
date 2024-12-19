"use client";

import { CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PRIORITY_COLORS } from '@/types/priority';
import { Todo } from '@/types/todo';
import Link from 'next/link';
import { useRecentTasks } from '@/hooks/useRecentTasks';

interface SidebarTasksProps {
  todos: Todo[];
}

export function SidebarTasks({ todos }: SidebarTasksProps) {
  const recentTasks = useRecentTasks(todos, 5);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight">Recent Tasks</h2>
      <div className="space-y-1">
        {recentTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground px-3 py-2">
            No tasks yet
          </p>
        ) : (
          recentTasks.map((todo) => (
            <Button
              key={todo.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                todo.completed && "text-muted-foreground"
              )}
              asChild
            >
              <Link href={`/task/${todo.id}`}>
                {todo.completed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Circle className={cn(
                    "h-4 w-4",
                    PRIORITY_COLORS[todo.priority].text
                  )} />
                )}
                <span className="truncate">{todo.text}</span>
              </Link>
            </Button>
          ))
        )}
      </div>
    </div>
  );
}