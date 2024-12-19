import { Todo } from '@/types/todo';
import { TodoDB } from '../db/indexedDB';
import { DeviceManager } from './deviceManager';
import { SyncEvent } from './syncTypes';

export class SyncManager {
  private db: TodoDB;
  private deviceManager: DeviceManager;
  private pendingChanges: SyncEvent[] = [];

  constructor() {
    this.db = new TodoDB();
    this.deviceManager = new DeviceManager();
  }

  async init(): Promise<void> {
    await this.db.init();
    await this.processPendingChanges();
  }

  private async processPendingChanges(): Promise<void> {
    while (this.pendingChanges.length > 0) {
      const event = this.pendingChanges.shift();
      if (event) {
        await this.handleSyncEvent(event);
      }
    }
  }

  private async handleSyncEvent(event: SyncEvent): Promise<void> {
    try {
      switch (event.type) {
        case 'add':
        case 'update':
          if (event.data) {
            await this.db.updateTodo(event.data);
          }
          break;
        case 'delete':
          await this.db.deleteTodo(event.todoId);
          break;
      }
    } catch (error) {
      console.error('Error handling sync event:', error);
      this.pendingChanges.push(event);
    }
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.db.getAllTodos();
  }

  async addTodo(todo: Todo): Promise<void> {
    await this.db.addTodo(todo);
  }

  async updateTodo(todo: Todo): Promise<void> {
    await this.db.updateTodo(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.db.deleteTodo(id);
  }
}