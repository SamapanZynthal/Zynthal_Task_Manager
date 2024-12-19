import { Todo } from '@/types/todo';
import { SyncManager } from './sync/syncManager';

let syncManager: SyncManager | null = null;

const getSyncManager = async () => {
  if (!syncManager) {
    syncManager = new SyncManager();
    await syncManager.init();
  }
  return syncManager;
};

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    // For static generation, return an empty array if window is undefined
    if (typeof window === 'undefined') {
      return [];
    }
    
    const manager = await getSyncManager();
    return manager.getAllTodos();
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};

// Keep loadTodos for backward compatibility
export const loadTodos = getAllTodos;

export const saveTodo = async (todo: Todo): Promise<void> => {
  try {
    if (typeof window === 'undefined') return;
    
    const manager = await getSyncManager();
    await manager.updateTodo(todo);
  } catch (error) {
    console.error('Error saving todo:', error);
    throw error;
  }
};

export const addTodo = async (todo: Todo): Promise<void> => {
  try {
    if (typeof window === 'undefined') return;
    
    const manager = await getSyncManager();
    await manager.addTodo(todo);
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    if (typeof window === 'undefined') return;
    
    const manager = await getSyncManager();
    await manager.deleteTodo(id);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};