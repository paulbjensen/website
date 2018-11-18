// Start
const CACHE_NAME = 'paulbjensendotcodotuk-3';
const urlsToCache = [
  '/',
  'android-chrome-512x512.png',
  'android-chrome-192x192.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  'mstile-150x150.png',
  'safari-pinned-tab.svg',
  'site.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache =>
        // Open a cache and cache our files
        cache.addAll(urlsToCache)
      )
      .then(() =>
        // skipWaiting() forces the waiting ServiceWorker to become the
        // active ServiceWorker, triggering the onactivate event.
        // Together with Clients.claim() this allows a worker to take effect
        // immediately in the client(s).
        self.skipWaiting()
      )
  );
});

self.addEventListener('fetch', event => {
  // console.log(event.request.url)
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});
