// Service Worker for AFRICA-mall PWA
// 更新网站后把版本号 +1，手机上的 App 会自动拿到新版本
const CACHE_VERSION = 'africa-mall-pwa-v40';
const IMAGE_CACHE = 'koko-images-v1';

// 只预缓存本站文件；第三方脚本（Google/Facebook/Flutterwave）一律走网络，不缓存
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './space-theme.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      // 逐个缓存，某个文件缺失不影响整体安装
      return Promise.all(APP_SHELL.map(function (url) {
        return cache.add(url).catch(function (err) {
          console.log('跳过缓存:', url, err);
        });
      }));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        if (name !== CACHE_VERSION && name !== IMAGE_CACHE) return caches.delete(name);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // 第三方请求（登录、支付、CDN）不拦截
  if (url.origin !== self.location.origin) return;

  // 图片：缓存优先
  if (request.destination === 'image' || url.pathname.includes('/product-images-') || url.pathname.includes('/hero-featured-images/')) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // 页面和其他文件：网络优先，离线时用缓存
  event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const response = await fetch(request);
    if (response && response.status === 200) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await cache.match('./index.html');
      if (shell) return shell;
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) cache.put(request, response.clone());
    return response;
  } catch (err) {
    return new Response('', { status: 404, statusText: 'Not Found' });
  }
}
