"use client";

import { useEffect } from 'react';
import { Todo } from '@/types/todo';
import { ReminderManager } from '@/lib/reminders/reminderManager';

export function useReminders(todos: Todo[]) {
  useEffect(() => {
    const reminderManager = ReminderManager.getInstance();

    // Clear all existing reminders
    reminderManager.clearAllReminders();

    // Schedule reminders for all incomplete todos with deadlines
    todos.forEach(todo => {
      if (!todo.completed && todo.deadline) {
        reminderManager.scheduleReminder(todo);
      }
    });

    // Cleanup on unmount
    return () => {
      reminderManager.clearAllReminders();
    };
  }, [todos]);
}