"use client";

interface KanbanStatCardProps {
  label: string;
  value: number | string;
  valueClassName?: string;
}

export function KanbanStatCard({ label, value, valueClassName }: KanbanStatCardProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className={cn("text-2xl font-bold", valueClassName)}>{value}</p>
    </div>
  );
}