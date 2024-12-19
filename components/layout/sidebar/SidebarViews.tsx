"use client";

import { LayoutList, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useViewPreference } from '@/hooks/useViewPreference';
import { ViewType } from '@/types/view';
import { cn } from '@/lib/utils';

const views: { id: ViewType; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'list', label: 'List View', Icon: LayoutList },
  { id: 'calendar', label: 'Calendar View', Icon: Calendar },
];

export function SidebarViews() {
  const { currentView, updateView } = useViewPreference();

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight">Views</h2>
      <div className="space-y-1">
        {views.map(({ id, label, Icon }) => (
          <Button
            key={id}
            variant={currentView === id ? 'secondary' : 'ghost'}
            className={cn(
              "w-full justify-start gap-2",
              currentView === id && "bg-secondary"
            )}
            onClick={() => updateView(id)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}