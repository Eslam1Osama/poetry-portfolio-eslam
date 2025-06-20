// Basic Service Worker for offline support
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('poetbeloved-v1').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(networkResponse) {
          if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    })
  );
});
