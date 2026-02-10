import { Workbox } from 'workbox-window';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const wb = new Workbox('/sw.js');

      wb.addEventListener('waiting', () => {
        wb.messageSkipWaiting();
      });

      wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      wb.register().catch((err) => {
        if (import.meta.env.DEV) console.error('SW registration failed', err);
      });
    });
  }
}
