"use client";

import { LayoutList, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ViewType } from '@/types/view';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useViewConfig } from '@/hooks/useViewConfig';

interface ViewSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { availableViews, currentViewConfig } = useViewConfig(currentView, isMobile);
  const { Icon } = currentViewConfig;

  // Don't render selector on mobile if we only have one view
  if (isMobile) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Icon className="h-4 w-4" />
          {currentViewConfig.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableViews.map(({ id, label, Icon }) => (
          <DropdownMenuItem
            key={id}
            onClick={() => onViewChange(id)}
            className={cn(
              "gap-2",
              currentView === id && "bg-accent"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}