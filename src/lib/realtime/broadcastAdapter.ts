import { RealtimeEventCallback, RealtimeSyncPayload } from '@/types/realtime';

const CHANNEL_NAME = 'agnos_patient_sync_channel';

export class BroadcastAdapter {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<RealtimeEventCallback> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (event: MessageEvent<RealtimeSyncPayload>) => {
        if (event.data) {
          this.listeners.forEach((callback) => callback(event.data));
        }
      };
    }
  }

  public publish(payload: RealtimeSyncPayload): void {
    if (this.channel) {
      try {
        this.channel.postMessage(payload);
      } catch (err) {
        console.error('BroadcastChannel postMessage error:', err);
      }
    }
  }

  public subscribe(callback: RealtimeEventCallback): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public close(): void {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    this.listeners.clear();
  }
}
