import { BroadcastAdapter } from './broadcastAdapter';
import { PusherAdapter } from './pusherAdapter';
import { RealtimeEventCallback, RealtimeSyncPayload } from '@/types/realtime';

export class RealtimeManager {
  private static instance: RealtimeManager | null = null;
  private broadcastAdapter: BroadcastAdapter;
  private pusherAdapter: PusherAdapter;
  private listeners: Set<RealtimeEventCallback> = new Set();

  private constructor() {
    this.broadcastAdapter = new BroadcastAdapter();
    this.pusherAdapter = new PusherAdapter();

    // Listen to local BroadcastChannel events
    this.broadcastAdapter.subscribe((payload) => {
      this.notifyListeners(payload);
    });

    // Listen to cloud Pusher events
    this.pusherAdapter.subscribe((payload) => {
      this.notifyListeners(payload);
    });
  }

  public static getInstance(): RealtimeManager {
    if (!RealtimeManager.instance) {
      RealtimeManager.instance = new RealtimeManager();
    }
    return RealtimeManager.instance;
  }

  public publish(payload: RealtimeSyncPayload): void {
    // Notify local subscribers in current window
    this.notifyListeners(payload);
    // Broadcast to other tabs
    this.broadcastAdapter.publish(payload);
    // Push to cloud if configured
    this.pusherAdapter.publish(payload);
  }

  public subscribe(callback: RealtimeEventCallback): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(payload: RealtimeSyncPayload): void {
    this.listeners.forEach((cb) => cb(payload));
  }
}
