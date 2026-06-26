"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseCountdownOptions {
  seconds: number;
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
}

export function useCountdown(options: UseCountdownOptions) {
  const { seconds, onComplete, onTick } = options;
  const [remaining, setRemaining] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setRemaining(seconds);
    setIsRunning(true);
  }, [seconds]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setRemaining(seconds);
  }, [seconds, stop]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, onComplete, onTick]);

  return {
    remaining,
    isRunning,
    start,
    stop,
    reset,
  };
}
