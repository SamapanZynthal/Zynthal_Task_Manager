"use client";

import { useCallback } from 'react';
import { Todo } from '@/types/todo';
import { Priority } from '@/types/priority';
import { saveTodo, deleteTodo as deleteTodoFromStorage } from '@/lib/todo/todo-storage';
import { useToast } from '@/hooks/use-toast';

export function useTodoOperations(
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) {
  const { toast } = useToast();

  const toggleTodo = useCallback(async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };
    setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));

    try {
      await saveTodo(updatedTodo);
    } catch (error) {
      console.error('Error toggling todo:', error);
      setTodos(prev => prev.map(t => t.id === id ? todo : t)); // Rollback on error
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    }
  }, [todos, setTodos, toast]);

  const deleteTodo = useCallback(async (id: string) => {
    const todoToDelete = todos.find(t => t.id === id);
    if (!todoToDelete) return;

    setTodos(prev => prev.filter(t => t.id !== id));

    try {
      await deleteTodoFromStorage(id);
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      setTodos(prev => [...prev, todoToDelete]); // Rollback on error
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
    }
  }, [todos, setTodos, toast]);

  const updatePriority = useCallback(async (id: string, priority: Priority) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, priority };
    setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));

    try {
      await saveTodo(updatedTodo);
    } catch (error) {
      console.error('Error updating priority:', error);
      setTodos(prev => prev.map(t => t.id === id ? todo : t)); // Rollback on error
      toast({
        title: 'Error',
        description: 'Failed to update priority',
        variant: 'destructive',
      });
    }
  }, [todos, setTodos, toast]);

  return {
    toggleTodo,
    deleteTodo,
    updatePriority,
  };
}