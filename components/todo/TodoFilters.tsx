"use client";

import { Button } from "@/components/ui/button";
import { Priority, PRIORITY_COLORS, PRIORITY_LABELS } from "@/types/priority";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TodoFiltersProps {
  selectedPriority: Priority | 'all';
  onPriorityChange: (priority: Priority | 'all') => void;
}

export function TodoFilters({ selectedPriority, onPriorityChange }: TodoFiltersProps) {
  const priorities: (Priority | 'all')[] = ['all', 'high', 'medium', 'low'];

  const getFilterLabel = () => {
    if (selectedPriority === 'all') return 'All Tasks';
    return PRIORITY_LABELS[selectedPriority];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "flex items-center gap-2",
            selectedPriority !== 'all' && PRIORITY_COLORS[selectedPriority].text,
          )}
        >
          {selectedPriority !== 'all' && <Flag className="h-4 w-4" />}
          {getFilterLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {priorities.map((priority) => (
          <DropdownMenuItem
            key={priority}
            onClick={() => onPriorityChange(priority)}
            className={cn(
              "flex items-center gap-2",
              selectedPriority === priority && "bg-accent",
              priority !== 'all' && PRIORITY_COLORS[priority].text,
            )}
          >
            {priority !== 'all' && <Flag className="h-4 w-4" />}
            {priority === 'all' ? 'All Tasks' : PRIORITY_LABELS[priority]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}