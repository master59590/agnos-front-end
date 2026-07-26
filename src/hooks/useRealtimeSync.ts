'use client';

import { useEffect, useCallback } from 'react';
import { RealtimeManager } from '@/lib/realtime/realtimeManager';
import { RealtimeEventCallback, RealtimeSyncPayload } from '@/types/realtime';

export function useRealtimeSync(onPayloadReceived?: RealtimeEventCallback) {
  useEffect(() => {
    if (!onPayloadReceived) return;
    const manager = RealtimeManager.getInstance();
    const unsubscribe = manager.subscribe(onPayloadReceived);
    return () => {
      unsubscribe();
    };
  }, [onPayloadReceived]);

  const syncState = useCallback((payload: RealtimeSyncPayload) => {
    const manager = RealtimeManager.getInstance();
    manager.publish(payload);
  }, []);

  return { syncState };
}
