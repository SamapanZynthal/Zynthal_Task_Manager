"use client";

import { WifiOff, Wifi, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface SyncStatusProps {
  isOffline: boolean;
  isSyncing: boolean;
}

export function SyncStatus({ isOffline, isSyncing }: SyncStatusProps) {
  if (!isOffline && !isSyncing) return null;

  return (
    <Alert
      variant={isOffline ? "destructive" : "default"}
      className={cn(
        "border",
        isOffline
          ? "bg-destructive/10 dark:bg-destructive/20"
          : "bg-background"
      )}
    >
      {isOffline ? (
        <WifiOff className="h-4 w-4" />
      ) : (
        <Wifi className="h-4 w-4" />
      )}
      <AlertDescription className="flex items-center gap-2">
        {isOffline ? (
          "You're offline. Changes will sync when you're back online."
        ) : (
          <>
            <span>Syncing with other devices</span>
            <RefreshCw className={cn(
              "h-3 w-3 animate-spin",
              isSyncing && "animate-spin"
            )} />
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}