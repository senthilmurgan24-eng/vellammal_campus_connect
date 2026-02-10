/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any };

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 7 * 24 * 60 * 60 })]
  })
);

registerRoute(
  ({ url, request }) => url.pathname.startsWith('/api') && request.method === 'GET',
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 6,
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })]
  })
);

const bgSyncPlugin = new BackgroundSyncPlugin('api-post-queue', {
  maxRetentionTime: 24 * 60 // minutes
});

registerRoute(
  ({ url, request }) => url.pathname.startsWith('/api') && request.method === 'POST',
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

registerRoute(
  ({ request }) => ['script', 'style', 'font'].includes(request.destination),
  new StaleWhileRevalidate({ cacheName: 'assets-cache' })
);

// Fallback for navigation when offline
const navigationRoute = new Route(
  ({ request }) => request.mode === 'navigate',
  async () => {
    return fetch('/').catch(async () => {
      const cached = await caches.match('/index.html');
      return cached ?? Response.error();
    });
  }
);
registerRoute(navigationRoute);
