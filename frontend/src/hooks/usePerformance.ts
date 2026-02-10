import { useEffect } from 'react';

export default function usePerformance() {
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'longtask' && entry.duration > 50 && import.meta.env.DEV) {
          console.warn('[Long Task]', entry.name, entry.duration);
        }
      }
    });

    try {
      observer.observe({ type: 'longtask', buffered: true } as PerformanceObserverInit);
    } catch (_) {
      // ignore unsupported
    }

    return () => observer.disconnect();
  }, []);
}
