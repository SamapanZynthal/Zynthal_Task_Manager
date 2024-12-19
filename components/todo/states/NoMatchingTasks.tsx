"use client";

import { Card, CardContent } from '@/components/ui/card';

export function NoMatchingTasks() {
  return (
    <Card>
      <CardContent className="p-6 text-center text-muted-foreground">
        <p className="mb-2">No matching tasks</p>
        <p className="text-sm">Try adjusting your filters</p>
      </CardContent>
    </Card>
  );
}