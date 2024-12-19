"use client";

import { format, isValid, parseISO } from 'date-fns';

export function createISODate(): string {
  return new Date().toISOString();
}

export function formatDateTime(dateString: string): string {
  if (!dateString) {
    return 'No date';
  }

  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return 'Invalid date';
    }
    return format(date, 'MMM d, yyyy h:mm a');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

export function formatDeadline(date: string, time: string): string {
  if (!date || !time) {
    return 'No deadline set';
  }

  try {
    const deadlineDate = parseISO(date);
    if (!isValid(deadlineDate)) {
      return 'Invalid deadline';
    }
    return `${format(deadlineDate, 'MMM d, yyyy')} at ${format(parseISO(`${date}T${time}`), 'h:mm a')}`;
  } catch (error) {
    console.error('Error formatting deadline:', error);
    return 'Invalid deadline';
  }
}

export function validateDateString(dateString: string): boolean {
  if (!dateString) return false;
  try {
    const date = parseISO(dateString);
    return isValid(date);
  } catch {
    return false;
  }
}