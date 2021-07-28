const cacheName = 'cache-v1'
const precacheResources = [
  '/'
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(precacheResources)))
})

self.addEventListener('activate', (event) => {
  
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', async event => {
    event.respondWith(new Promise(async (resolve, reject) => {
        if (navigator.onLine)
            resolve(fetch(event.request))
        else
            resolve(caches.match(event.request))
    }))
})


