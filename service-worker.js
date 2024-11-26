var cacheName = 'petstore-v1';
var cacheFiles = [
    'app.js',
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'https://i.pinimg.com/736x/17/e1/51/17e151568275f7e63cf8524ee23879cb.jpg',
    'https://cdcssl.ibsrv.net/cimg/www.curatedcontent.smb/730x400_85/726/fennec-fox-626726.jpg',
    'https://m.media-amazon.com/images/I/71MwvIPsZ5L._AC_UF1000,1000_QL80_.jpg',
    'https://www.petboutique.ae/cdn/shop/products/KC-Tuna-Mackerel_1200x.jpg?v=1596539843',
    'https://m.media-amazon.com/images/I/71RcZ4E87FL._AC_UF894,1000_QL80_.jpg',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         // check if the cache has the file
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r 
//         })
//     );
// });

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache, 
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});