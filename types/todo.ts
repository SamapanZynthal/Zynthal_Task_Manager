import { Priority } from './priority';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  description?: string;
  createdAt: string;
  deadline?: {
    date: string;
    time: string;
  };
}