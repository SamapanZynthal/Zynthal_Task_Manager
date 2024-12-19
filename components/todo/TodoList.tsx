"use client";

import { TodoForm } from './TodoForm';
import { TodoProvider, useTodos } from './TodoProvider';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";
import { sortTodosByPriorityAndDeadline, filterTodosByPriority } from '@/lib/utils/todoUtils';
import { ViewSelector } from '../views/ViewSelector';
import { ListView } from '../views/ListView';
import { CalendarView } from '../views/CalendarView';
import { EmptyState } from './states/EmptyState';
import { NoMatchingTasks } from './states/NoMatchingTasks';
import { TodoFilters } from './TodoFilters';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

function TodoListContent() {
  const { 
    todos, 
    toggleTodo, 
    deleteTodo, 
    addTodo, 
    updatePriority, 
    isOffline,
    filterPriority,
    currentView,
    setFilterPriority,
    setCurrentView
  } = useTodos();

  const isMobile = useMediaQuery('(max-width: 768px)');

  const filteredAndSortedTodos = sortTodosByPriorityAndDeadline(
    filterTodosByPriority(todos, filterPriority)
  );

  // Force list view on mobile
  const effectiveView = isMobile ? 'list' : currentView;

  const viewProps = {
    todos: filteredAndSortedTodos,
    onToggle: toggleTodo,
    onDelete: deleteTodo,
    onPriorityChange: updatePriority,
  };

  return (
    <div className="space-y-6">
      {isOffline && (
        <Alert variant="warning" className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're currently offline. Changes will be synchronized when you're back online.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <TodoForm onAdd={addTodo} />

        <Card className="p-4">
          <div className={cn(
            "flex flex-col gap-4",
            "sm:flex-row sm:items-center sm:justify-between"
          )}>
            <TodoFilters
              selectedPriority={filterPriority}
              onPriorityChange={setFilterPriority}
            />
            <ViewSelector
              currentView={effectiveView}
              onViewChange={setCurrentView}
            />
          </div>
        </Card>

        {todos.length === 0 ? (
          <EmptyState />
        ) : filteredAndSortedTodos.length === 0 ? (
          <NoMatchingTasks />
        ) : effectiveView === 'calendar' ? (
          <CalendarView {...viewProps} />
        ) : (
          <ListView {...viewProps} />
        )}
      </div>
    </div>
  );
}

export default function TodoList() {
  return (
    <TodoProvider>
      <TodoListContent />
    </TodoProvider>
  );
}