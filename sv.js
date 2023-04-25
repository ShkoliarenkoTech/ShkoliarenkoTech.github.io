self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function (cache) {
                console.log('precaching');
                cache.add('/index.html');
                cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
                cache.add('/images/logo.svg');
                cache.add('/');
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetching something ...', event);
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                else {
                    return fetch(event.request);
                }
            })
    );
});

self.addEventListener('push', event => {
    const notification = event.data.text();
    self.registration.showNotification(notification, {});
});


