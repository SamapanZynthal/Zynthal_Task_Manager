"use client";

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TodoForm } from '../todo/TodoForm';
import { useTodos } from '../todo/TodoProvider';

export function FloatingNav() {
  const { addTodo } = useTodos();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[60vh]">
        <SheetHeader>
          <SheetTitle>Add New Task</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <TodoForm onAdd={addTodo} />
        </div>
      </SheetContent>
    </Sheet>
  );
}