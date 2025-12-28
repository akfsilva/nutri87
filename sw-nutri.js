const CACHE_NAME = 'nutri87-cache-unique-v1';
const ASSETS = [
  'index.html?v=87',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
  )));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
