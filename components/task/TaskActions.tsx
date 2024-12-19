"use client";

import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface TaskActionsProps {
  onSave: () => void;
  isSaving?: boolean;
}

export function TaskActions({ onSave, isSaving }: TaskActionsProps) {
  return (
    <CardContent className="pt-4">
      <Button 
        onClick={onSave} 
        disabled={isSaving}
      >
        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSaving ? 'Saving...' : 'Save Changes'}
      </Button>
    </CardContent>
  );
}