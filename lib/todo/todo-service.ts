import { Todo } from '@/types/todo';
import { SyncManager } from '../sync/syncManager';

export class TodoService {
  private static instance: TodoService;
  private syncManager: SyncManager | null = null;

  private constructor() {}

  static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }

  private async getSyncManager(): Promise<SyncManager> {
    if (!this.syncManager) {
      this.syncManager = new SyncManager();
      await this.syncManager.init();
    }
    return this.syncManager;
  }

  async getAllTodos(): Promise<Todo[]> {
    try {
      if (typeof window === 'undefined') {
        return [];
      }
      
      const manager = await this.getSyncManager();
      return manager.getAllTodos();
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  }

  async saveTodo(todo: Todo): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      
      const manager = await this.getSyncManager();
      await manager.updateTodo(todo);
    } catch (error) {
      console.error('Error saving todo:', error);
      throw error;
    }
  }

  async addTodo(todo: Todo): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      
      const manager = await this.getSyncManager();
      await manager.addTodo(todo);
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      
      const manager = await this.getSyncManager();
      await manager.deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}