export interface SyncEvent {
  type: 'add' | 'update' | 'delete';
  todoId: string;
  timestamp: number;
  data?: any;
}

export interface SyncState {
  lastSyncTimestamp: number;
  deviceId: string;
  pendingChanges: SyncEvent[];
}