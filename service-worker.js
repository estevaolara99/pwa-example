var cacheName = 'notes-son-v.1.0.0.0.0.0';

var filesToCache = [
    './',
    'index.html',
    'css/bootstrap.css',
    'css/bootstrap.min.css',
    'css/styles.css',
    'js/array.observe.pollyfill.js',
    'js/bootstrap.js',
    'js/bootstrap.min.js',
    'js/jquery-3.2.1.min.js',
    'js/npm.js',
    'js/object.observe.pollyfill.js',
    'js/scripts.js'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Instaler');

    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching App shell');
            return cache.addAll(filesToCache);
        })
    )
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if(key !== cacheName){
                    console.log('[ServiceWorker] Removing old cache');
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);

    e.respondWith(
        caches.match(e.request).then(function (response) {
          return response || fetch(e.request);
        })
    )
});