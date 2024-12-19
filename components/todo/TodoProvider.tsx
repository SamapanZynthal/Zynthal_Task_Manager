"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Todo } from '@/types/todo';
import { Priority } from '@/types/priority';
import { ViewType } from '@/types/view';
import { loadTodos, addTodo as addTodoToStorage } from '@/lib/todo/todo-storage';
import { toast } from 'sonner';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { createTodo } from '@/lib/todo/todoFactory';
import { useTodoOperations } from '@/lib/hooks/useTodoOperations';
import { useReminders } from '@/hooks/useReminders';
import { NotificationService } from '@/lib/notifications/notificationService';

interface TodoContextType {
  todos: Todo[];
  filterPriority: Priority | 'all';
  currentView: ViewType;
  setFilterPriority: (priority: Priority | 'all') => void;
  setCurrentView: (view: ViewType) => void;
  addTodo: (text: string, priority: Priority, deadline?: { date: string; time: string }) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updatePriority: (id: string, priority: Priority) => void;
  isOffline: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [isInitialized, setIsInitialized] = useState(false);
  const isOffline = useOnlineStatus();
  const { toggleTodo, deleteTodo, updatePriority } = useTodoOperations(todos, setTodos);

  // Initialize reminders system
  useReminders(todos);

  useEffect(() => {
    const initializeApp = async () => {
      if (isInitialized) return;
      
      try {
        // Request notification permission on first load
        await NotificationService.getInstance().requestPermission();
        
        const loadedTodos = await loadTodos();
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
        toast.error('Failed to load tasks');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [isInitialized]);

  const addTodo = useCallback(async (text: string, priority: Priority, deadline?: { date: string; time: string }) => {
    const newTodo = createTodo(text, priority, deadline);

    setTodos(prev => [...prev, newTodo]);
    try {
      await addTodoToStorage(newTodo);
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
      setTodos(prev => prev.filter(todo => todo.id !== newTodo.id));
      toast.error('Failed to save task');
    }
  }, []);

  const value = {
    todos,
    filterPriority,
    currentView,
    setFilterPriority,
    setCurrentView,
    addTodo,
    toggleTodo,
    deleteTodo,
    updatePriority,
    isOffline,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}