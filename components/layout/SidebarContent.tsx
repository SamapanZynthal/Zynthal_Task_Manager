"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TodoFilters } from "@/components/todo/TodoFilters";
import { ViewSelector } from "@/components/views/ViewSelector";

export function SidebarContent() {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-6 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Views</h2>
            <ViewSelector />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
            <TodoFilters />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}