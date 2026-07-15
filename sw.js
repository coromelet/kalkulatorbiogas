// 1. SETIAP KALI KAMU UPDATE WEB, CUKUP GANTI VERSI DI BAWAH INI (misal dari v1 ke v2, v3, dst.)
const CACHE_NAME = 'biogas-calc-v1'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Icon-192.png',
  './Icon-512.png'
];

// Proses Install: Menyimpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Paksa SW baru langsung aktif tanpa menunggu tab ditutup
  );
});

// Proses Aktivasi: Menghapus cache versi lama secara otomatis di latar belakang
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache usang:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Langsung ambil alih halaman begitu aktif
  );
});

// Proses Fetch: Mengambil data dari cache jika ada, jika tidak ada baru ambil dari internet
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Menerima sinyal skipWaiting dari kode JS di index.html
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
