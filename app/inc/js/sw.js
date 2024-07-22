const CACHE_NAME = 'WP_PWA_v1.1'; // Updated cache name to follow conventions
self.addEventListener('install', event => {
    self.skipWaiting(); // Forces the waiting service worker to become active
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                "../../../index.html", // Main HTML file
                "../../../browserconfig.xml", // IE11 icon configuration file
                "../../../manifest.json", // Manifest file
                "../js/main.js", // Main JavaScript file
                "../js/bootstrap.bundle.min.js", // Bootstrap JavaScript file
                "../js/jquery-3.7.1.min.js", // jQuery JavaScript file
                "../icons/safari-pinned-tab.svg", // Safari pinned tab icon
                "../css/all.min.css", // Main CSS file
                "../css/bootstrap.min.css", // Bootstrap CSS file
                "../css/site.css", // Site-specific CSS file
                "../icons/16x16.png", // Favicon
                "../icons/32x32.png", // Android Chrome M39+ with 0.75 screen density
                "../icons/70x70.png", // Android Chrome M39+ with 1.5 screen density
                "../icons/144x144.png", // Android Chrome M39+ with 3.0 screen density
                "../icons/150x150.png", // Android Chrome M39+ with 3.0 screen density
                "../icons/192x192.png", // Android Chrome M39+ with 4.0 screen density
                "../icons/310x310.png", // Android Chrome M47+ Splash screen
                "../icons/512x512.png", // Android Chrome M47+ Splash screen
                "../icons/apple-touch-icon.png", // Apple touch icon
                "../icons/favicon.ico", // Favicon for IE and fallback
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key); // Delete old caches
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(networkResponse => {
                    // Check if the request is valid before caching it
                    if (event.request.method === 'GET') {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Handle network errors
                    return cache.match('/fallback-page.html'); // Fallback page
                });
            });
        })
    );
});

// Optional: Add a listener for messages from the client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
