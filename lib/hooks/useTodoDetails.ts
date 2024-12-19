"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTodos } from '@/components/todo/TodoProvider';
import { Todo } from '@/types/todo';
import { toast } from 'sonner';

export function useTodoDetails(id: string) {
  const router = useRouter();
  const { todos, updatePriority, saveTodo } = useTodos();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const foundTodo = todos.find(t => t.id === id);
    if (foundTodo) {
      setTodo(foundTodo);
      setDescription(foundTodo.description || '');
    } else {
      toast.error('Task not found');
      router.push('/');
    }
  }, [id, todos, router]);

  const handleSave = async () => {
    if (!todo) return;
    
    setIsSaving(true);
    try {
      const updatedTodo = {
        ...todo,
        description,
      };
      await saveTodo(updatedTodo);
      toast.success('Changes saved successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeadlineChange = (date: string | undefined, time: string | undefined) => {
    if (!todo) return;
    
    const updatedTodo = {
      ...todo,
      deadline: date && time ? { date, time } : undefined,
    };
    saveTodo(updatedTodo).catch(() => {
      toast.error('Failed to update deadline');
    });
  };

  const handlePriorityChange = (priority: Todo['priority']) => {
    if (!todo) return;
    updatePriority(todo.id, priority);
  };

  return {
    todo,
    description,
    isSaving,
    setDescription,
    handleSave,
    handleDeadlineChange,
    handlePriorityChange,
  };
}