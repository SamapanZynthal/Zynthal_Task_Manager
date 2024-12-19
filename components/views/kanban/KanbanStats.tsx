"use client";

import { Card, CardContent } from '@/components/ui/card';
import { KanbanStats as KanbanStatsType } from '@/types/kanban';
import { KanbanStatCard } from './stats/KanbanStatCard';
import { KanbanProgressBar } from './stats/KanbanProgressBar';

interface KanbanStatsProps {
  stats: KanbanStatsType;
}

export function KanbanStats({ stats }: KanbanStatsProps) {
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <Card>
      <CardContent className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KanbanStatCard
            label="Total Tasks"
            value={stats.total}
          />
          <KanbanStatCard
            label="Completed"
            value={stats.completed}
            valueClassName="text-emerald-600 dark:text-emerald-400"
          />
          <KanbanStatCard
            label="In Progress"
            value={stats.inProgress}
            valueClassName="text-amber-600 dark:text-amber-400"
          />
          <div className="space-y-3">
            <KanbanStatCard
              label="Completion Rate"
              value={`${completionRate}%`}
            />
            <KanbanProgressBar value={completionRate} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}