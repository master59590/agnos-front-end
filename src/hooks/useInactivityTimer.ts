'use client';

import { useEffect, useRef } from 'react';
import { DEFAULT_INACTIVITY_TIMEOUT_MS } from '@/config/constants';

interface UseInactivityTimerOptions {
  onInactive: () => void;
  onActive: () => void;
  timeoutMs?: number;
  enabled?: boolean;
}

export function useInactivityTimer({
  onInactive,
  onActive,
  timeoutMs = DEFAULT_INACTIVITY_TIMEOUT_MS,
  enabled = true,
}: UseInactivityTimerOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInactiveRef = useRef<boolean>(false);

  const resetTimer = () => {
    if (!enabled) return;

    if (isInactiveRef.current) {
      isInactiveRef.current = false;
      onActive();
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      isInactiveRef.current = true;
      onInactive();
    }, timeoutMs);
  };

  useEffect(() => {
    if (!enabled) return;

    // Activity triggers
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart', 'input'];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Start initial timer
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, timeoutMs]);

  return { resetTimer };
}
