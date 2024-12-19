"use client";

import { Check, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Priority, PRIORITY_COLORS, PRIORITY_LABELS } from "@/types/priority";
import { cn } from "@/lib/utils";

interface PrioritySelectProps {
  value: Priority;
  onChange: (priority: Priority) => void;
  disabled?: boolean;
  className?: string;
}

export function PrioritySelect({ value, onChange, disabled, className }: PrioritySelectProps) {
  const priorities: Priority[] = ['high', 'medium', 'low'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 flex items-center gap-2 min-w-[140px] justify-start",
            PRIORITY_COLORS[value].text,
            PRIORITY_COLORS[value].bg,
            PRIORITY_COLORS[value].border,
            !disabled && PRIORITY_COLORS[value].hover,
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <Flag className="h-4 w-4 shrink-0" />
          <span className="truncate">{PRIORITY_LABELS[value]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {priorities.map((priority) => (
          <DropdownMenuItem
            key={priority}
            onClick={() => onChange(priority)}
            className={cn(
              "flex items-center gap-2 h-9",
              PRIORITY_COLORS[priority].text,
              value === priority && "bg-accent",
              PRIORITY_COLORS[priority].hover
            )}
          >
            <Flag className="h-4 w-4 shrink-0" />
            <span className="flex-1">{PRIORITY_LABELS[priority]}</span>
            {value === priority && (
              <Check className="h-4 w-4 shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}