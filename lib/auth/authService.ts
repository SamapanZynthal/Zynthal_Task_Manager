"use client";

import { User } from '@/types/auth';

export class AuthService {
  private static instance: AuthService;
  private readonly STORAGE_KEY = 'auth_user';

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    // In a real app, this would make an API call
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.setCurrentUser(user);
    return user;
  }

  async signup(email: string, password: string, name: string): Promise<User> {
    const users = this.getUsers();
    
    if (users.some(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.setCurrentUser(newUser);
    
    return newUser;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }
}