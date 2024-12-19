import { Todo } from '@/types/todo';
import { Priority } from '@/types/priority';
import { createISODate } from '@/lib/utils/dateUtils';

export function createTodo(
  text: string,
  priority: Priority,
  deadline?: { date: string; time: string }
): Todo {
  return {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    priority,
    deadline,
    createdAt: createISODate(),
  };
}