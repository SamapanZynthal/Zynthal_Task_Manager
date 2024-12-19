"use client";

import { Todo } from '@/types/todo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TodoItem } from '../todo/TodoItem';
import { Priority, PRIORITY_COLORS } from '@/types/priority';
import { cn } from '@/lib/utils';

interface KanbanViewProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Todo['priority']) => void;
}

const columns: { id: Priority; label: string }[] = [
  { id: 'high', label: 'High Priority' },
  { id: 'medium', label: 'Medium Priority' },
  { id: 'low', label: 'Low Priority' },
];

export function KanbanView({ todos, onToggle, onDelete, onPriorityChange }: KanbanViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(column => {
        const columnTodos = todos.filter(todo => todo.priority === column.id);
        
        return (
          <Card key={column.id} className={cn(
            "border-t-4",
            PRIORITY_COLORS[column.id].border
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-medium",
                PRIORITY_COLORS[column.id].text
              )}>
                {column.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {columnTodos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No tasks in this column
                </p>
              ) : (
                columnTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onPriorityChange={onPriorityChange}
                  />
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}