"use client";

import { Todo } from '@/types/todo';
import { NotificationService } from '../notifications/notificationService';
import { formatDeadline } from '../utils/dateUtils';

export class ReminderManager {
  private static instance: ReminderManager;
  private notificationService: NotificationService;
  private reminders: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    this.notificationService = NotificationService.getInstance();
  }

  static getInstance(): ReminderManager {
    if (!ReminderManager.instance) {
      ReminderManager.instance = new ReminderManager();
    }
    return ReminderManager.instance;
  }

  scheduleReminder(todo: Todo): void {
    if (!todo.deadline) return;

    // Clear existing reminder if any
    this.clearReminder(todo.id);

    const deadlineDate = new Date(`${todo.deadline.date}T${todo.deadline.time}`);
    const now = new Date();

    // Calculate reminder times (30 minutes and 5 minutes before deadline)
    const thirtyMinsBefore = new Date(deadlineDate.getTime() - 30 * 60000);
    const fiveMinsBefore = new Date(deadlineDate.getTime() - 5 * 60000);

    // Schedule reminders if they're in the future
    if (thirtyMinsBefore > now) {
      this.scheduleNotification(todo, thirtyMinsBefore, '30 minutes');
    }
    
    if (fiveMinsBefore > now) {
      this.scheduleNotification(todo, fiveMinsBefore, '5 minutes');
    }
  }

  private scheduleNotification(todo: Todo, time: Date, timeText: string): void {
    const delay = time.getTime() - new Date().getTime();
    
    const timeout = setTimeout(() => {
      this.notificationService.showNotification(
        `Task Due Soon: ${todo.text}`,
        {
          body: `Your task is due in ${timeText}\nDue: ${formatDeadline(todo.deadline!.date, todo.deadline!.time)}`,
          icon: '/favicon.ico',
          tag: `todo-${todo.id}`,
          renotify: true
        }
      );
    }, delay);

    this.reminders.set(`${todo.id}-${timeText}`, timeout);
  }

  clearReminder(todoId: string): void {
    // Clear both 30-min and 5-min reminders
    ['30 minutes', '5 minutes'].forEach(timeText => {
      const key = `${todoId}-${timeText}`;
      const timeout = this.reminders.get(key);
      if (timeout) {
        clearTimeout(timeout);
        this.reminders.delete(key);
      }
    });
  }

  clearAllReminders(): void {
    this.reminders.forEach(timeout => clearTimeout(timeout));
    this.reminders.clear();
  }
}