import { Todo } from '@/types/todo';

export function sortTodosByPriorityAndDeadline(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by deadline if both have one
    if (a.deadline && b.deadline) {
      const dateCompare = new Date(a.deadline.date + 'T' + a.deadline.time).getTime() -
                         new Date(b.deadline.date + 'T' + b.deadline.time).getTime();
      if (dateCompare !== 0) return dateCompare;
    }
    
    // Put todos with deadlines before those without
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    
    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityCompare = priorityOrder[a.priority] - priorityOrder[b.priority];
    
    if (priorityCompare !== 0) return priorityCompare;
    
    // If priority is the same, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function filterTodosByPriority(todos: Todo[], priority: Todo['priority'] | 'all'): Todo[] {
  return priority === 'all' ? todos : todos.filter(todo => todo.priority === priority);
}