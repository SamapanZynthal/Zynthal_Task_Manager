"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { useTodos } from "@/components/todo/TodoProvider";
import { cn } from "@/lib/utils";
import { PRIORITY_COLORS } from "@/types/priority";
import { useRecentTasks } from "@/hooks/useRecentTasks";

export function TasksDropdown() {
  const { todos } = useTodos();
  const recentTasks = useRecentTasks(todos, 5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1">
          Tasks
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Recent Tasks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {recentTasks.length === 0 ? (
          <DropdownMenuItem disabled className="text-muted-foreground">
            No tasks yet
          </DropdownMenuItem>
        ) : (
          recentTasks.map((todo) => (
            <DropdownMenuItem key={todo.id} asChild>
              <Link
                href={`/task/${todo.id}`}
                className={cn(
                  "flex items-center gap-2",
                  todo.completed && "text-muted-foreground"
                )}
              >
                <span className="flex-shrink-0">
                  {todo.completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Circle className={cn(
                      "h-4 w-4",
                      PRIORITY_COLORS[todo.priority].text
                    )} />
                  )}
                </span>
                <span className="flex-1 truncate">
                  {todo.text}
                </span>
              </Link>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            href="/" 
            className="flex justify-center font-medium text-primary"
          >
            View All Tasks
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}