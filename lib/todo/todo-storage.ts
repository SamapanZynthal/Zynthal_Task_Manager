import { TodoService } from './todo-service';

const todoService = TodoService.getInstance();

export const getAllTodos = () => todoService.getAllTodos();
export const saveTodo = (todo: any) => todoService.saveTodo(todo);
export const addTodo = (todo: any) => todoService.addTodo(todo);
export const deleteTodo = (id: string) => todoService.deleteTodo(id);

// Keep loadTodos for backward compatibility
export const loadTodos = getAllTodos;