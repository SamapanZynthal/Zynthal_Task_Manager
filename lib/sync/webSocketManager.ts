import { SyncEvent } from './syncTypes';
import { DeviceManager } from './deviceManager';
import { toast } from 'sonner';

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private deviceManager: DeviceManager;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private messageHandlers: ((event: SyncEvent) => void)[] = [];

  constructor() {
    this.deviceManager = new DeviceManager();
  }

  connect(serverUrl: string): void {
    try {
      this.ws = new WebSocket(serverUrl);
      
      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.sendAuthentication();
      };

      this.ws.onmessage = (event) => {
        try {
          const syncEvent: SyncEvent = JSON.parse(event.data);
          this.notifyHandlers(syncEvent);
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        this.handleDisconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.handleDisconnect();
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      this.handleDisconnect();
    }
  }

  private handleDisconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }
      
      this.reconnectTimeout = setTimeout(() => {
        this.connect(this.ws?.url || '');
      }, delay);

      toast.error('Lost connection to sync service. Attempting to reconnect...');
    } else {
      toast.error('Unable to connect to sync service. Please check your connection and refresh the page.');
    }
  }

  private sendAuthentication(): void {
    this.sendMessage({
      type: 'auth',
      deviceId: this.deviceManager.getDeviceId(),
      timestamp: Date.now(),
    });
  }

  sendMessage(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  addMessageHandler(handler: (event: SyncEvent) => void): void {
    this.messageHandlers.push(handler);
  }

  private notifyHandlers(event: SyncEvent): void {
    this.messageHandlers.forEach(handler => handler(event));
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}