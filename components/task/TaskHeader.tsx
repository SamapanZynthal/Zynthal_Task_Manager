"use client";

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskHeaderProps {
  onBack: () => void;
}

export function TaskHeader({ onBack }: TaskHeaderProps) {
  return (
    <Button
      variant="ghost"
      className="mb-6"
      onClick={onBack}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Tasks
    </Button>
  );
}