"use client";

import { Card, CardContent } from '@/components/ui/card';

export function EmptyState() {
  return (
    <Card>
      <CardContent className="p-6 text-center text-muted-foreground">
        <p className="mb-2">No tasks yet</p>
        <p className="text-sm">Add your first task to get started!</p>
      </CardContent>
    </Card>
  );
}