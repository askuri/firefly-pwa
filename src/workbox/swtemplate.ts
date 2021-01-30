import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute, cleanupOutdatedCaches} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate, CacheFirst, NetworkFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';

declare const self: ServiceWorkerGlobalScope;

skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */


precacheAndRoute(self.__WB_MANIFEST);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 31,
      }),
    ],
  })
);

// cache the data request so that, if the network is off we get the last good response
// TODO this is not working / cached yet
registerRoute(
  /^https+:\/\/firefly\.askuri\.de\/api\/*/,
  new NetworkFirst({
    cacheName: 'static-resources',
  })
);

// cache the root - needed to get PWA accreditation
registerRoute(
  '/',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// cache any external libraries
registerRoute(
  /http.*\.(?:js|css|mjs)$/,
  new CacheFirst({
    cacheName: 'libraries',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

//cache any external images
registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
