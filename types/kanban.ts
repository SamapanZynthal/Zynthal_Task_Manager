import { Priority } from './priority';
import { Todo } from './todo';

export interface KanbanColumnData {
  id: Priority;
  label: string;
  todos: Todo[];
}

export interface KanbanStats {
  total: number;
  completed: number;
  inProgress: number;
}