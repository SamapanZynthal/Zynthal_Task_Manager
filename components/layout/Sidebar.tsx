"use client";

import { useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useTodos } from '@/components/todo/TodoProvider';
import { SidebarTasks } from './sidebar/SidebarTasks';
import { SidebarFilters } from './sidebar/SidebarFilters';
import { SidebarViews } from './sidebar/SidebarViews';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Close sidebar on route change on mobile
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        onClose();
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [onClose]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-r bg-background",
        "hidden md:block transition-transform duration-300",
        !isOpen && "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen && window.innerWidth < 768} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

function SidebarContent() {
  const { todos } = useTodos();

  return (
    <ScrollArea className="h-full py-6">
      <div className="space-y-6 px-4">
        <SidebarViews />
        <SidebarFilters />
        <SidebarTasks todos={todos} />
      </div>
    </ScrollArea>
  );
}