const CACHE_NAME = 'icai-examiner-v4';
const OFFLINE_URL = './index.html';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './screenshot-mobile.png',
  './screenshot-wide.png'
];

// 1. Install & Pre-cache Offline App Shell
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
});

// 2. Activate & Clean Up Old Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// 3. Offline-Ready Network-First with Cache Fallback Strategy
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  // Bypass caching for live Gemini API calls
  if (url.hostname.includes('googleapis.com') && url.pathname.includes('/models')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});

// 4. Background Sync Support (for queued evaluations/history sync)
self.addEventListener('sync', event => {
  if (event.tag === 'icai-sync-evaluations') {
    event.waitUntil(
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'BACKGROUND_SYNC_COMPLETE' }));
      })
    );
  }
});

// 5. Periodic Background Sync Support (for daily RTP/MTP practice reminders)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'icai-daily-practice-check') {
    event.waitUntil(
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'PERIODIC_SYNC_PING' }));
      })
    );
  }
});

// 6. Push Notification Support
self.addEventListener('push', event => {
  let payload = {
    title: 'ICAI Examiner Studio',
    body: 'Ready for your next CA mock paper evaluation or MCQ drill!',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: { url: './index.html' }
  };

  if (event.data) {
    try {
      const parsed = event.data.json();
      payload = { ...payload, ...parsed };
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon,
      badge: payload.badge,
      data: payload.data
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
