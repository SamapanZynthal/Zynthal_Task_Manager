// Manages device-specific information and sync state
export class DeviceManager {
  private deviceId: string;

  constructor() {
    this.deviceId = this.getOrCreateDeviceId();
  }

  private getOrCreateDeviceId(): string {
    const stored = localStorage.getItem('device_id');
    if (stored) return stored;

    const newId = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('device_id', newId);
    return newId;
  }

  getDeviceId(): string {
    return this.deviceId;
  }

  getLastSyncTimestamp(): number {
    const stored = localStorage.getItem('last_sync');
    return stored ? parseInt(stored, 10) : 0;
  }

  setLastSyncTimestamp(timestamp: number): void {
    localStorage.setItem('last_sync', timestamp.toString());
  }
}