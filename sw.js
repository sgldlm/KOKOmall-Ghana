// Service Worker for AFRICA Mall PWA - Android APK Version
const CACHE_VERSION = 'africa-mall-android-v39';
const IMAGE_CACHE = 'koko-images-android-v1';

const urlsToCache = [
  './',
  './index.html',
  './space-theme.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/fontsource/fonts/dseg7-classic@latest/latin-400-normal.woff2',
  'https://accounts.google.com/gsi/client',
  'https://connect.facebook.net/en_US/sdk.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_VERSION && cacheName !== IMAGE_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  const request = event.request;
  const url = new URL(request.url);

  // 图片专用缓存策略：Cache First
  if (url.pathname.includes('/images/') || 
      url.pathname.includes('/product-images-')) {
    event.respondWith(cacheImage(request));
    return;
  }

  // 其他资源：Network First with Cache Fallback
  event.respondWith(
    caches.match(request)
      .then(function(response) {
        return response || fetch(request).then(function(response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_VERSION)
            .then(function(cache) {
              cache.put(request, responseToCache);
            });

          return response;
        });
      })
      .catch(function(error) {
        console.log('Fetch failed:', error);
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

// 图片缓存专用函数：Cache First策略
async function cacheImage(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('Image fetch failed:', error);
    return new Response('Image not available', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}
