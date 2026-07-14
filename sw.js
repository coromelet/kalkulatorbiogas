const CACHE_NAME = 'biogas-calc-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Icon-192.png',
  './Icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
