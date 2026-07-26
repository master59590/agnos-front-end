import PusherClient from 'pusher-js';
import { RealtimeEventCallback, RealtimeSyncPayload } from '@/types/realtime';

export class PusherAdapter {
  private pusher: PusherClient | null = null;
  private listeners: Set<RealtimeEventCallback> = new Set();
  private channelName = 'patient-channel';
  private eventName = 'patient-update';

  constructor() {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1';

    if (key && typeof window !== 'undefined') {
      try {
        this.pusher = new PusherClient(key, {
          cluster,
        });

        const channel = this.pusher.subscribe(this.channelName);
        channel.bind(this.eventName, (data: RealtimeSyncPayload) => {
          this.listeners.forEach((callback) => callback(data));
        });
      } catch (e) {
        console.warn('Pusher initialization warning:', e);
      }
    }
  }

  public publish(payload: RealtimeSyncPayload): void {
    // If backend route exists for pusher trigger
    if (process.env.NEXT_PUBLIC_PUSHER_KEY) {
      fetch('/api/realtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn('Pusher trigger API error:', err));
    }
  }

  public subscribe(callback: RealtimeEventCallback): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public close(): void {
    if (this.pusher) {
      this.pusher.disconnect();
      this.pusher = null;
    }
    this.listeners.clear();
  }
}
