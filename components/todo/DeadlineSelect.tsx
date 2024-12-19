"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DeadlineSelectProps {
  date?: string;
  time?: string;
  onSelect: (date: string | undefined, time: string | undefined) => void;
  disabled?: boolean;
  className?: string;
}

export function DeadlineSelect({ date, time, onSelect, disabled, className }: DeadlineSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    onSelect(date ? format(date, "yyyy-MM-dd") : undefined, time);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(date, e.target.value || undefined);
  };

  const clearDeadline = () => {
    onSelect(undefined, undefined);
    setIsOpen(false);
  };

  const hasDeadline = date && time;
  const selectedDate = date ? new Date(date) : undefined;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 min-w-[140px] justify-start",
            hasDeadline && "text-primary",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <Calendar className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {hasDeadline
              ? `Due: ${format(new Date(date), "MMM d")} at ${time}`
              : "Set Deadline"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </div>
          <div className="space-y-2">
            <Input
              type="time"
              value={time || ""}
              onChange={handleTimeChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearDeadline}
              type="button"
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}