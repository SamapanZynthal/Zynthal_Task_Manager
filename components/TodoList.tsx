"use client";

import { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      toast.error('Please enter a task');
      return;
    }
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
    toast.success('Task added successfully');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Task deleted successfully');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </form>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No tasks yet. Add one to get started!
            </CardContent>
          </Card>
        ) : (
          todos.map(todo => (
            <Card key={todo.id} className={`transition-all ${todo.completed ? 'bg-muted' : ''}`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}