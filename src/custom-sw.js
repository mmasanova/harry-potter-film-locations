
const staticCacheName = 'harryPotterLocationsCachev1';

/* Delete previous cache when updated service worker activates */
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('harryPotterLocationsCache') &&
					cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				}));
		}));
});

self.addEventListener('fetch', function(event) {
	console.log('fetch detected', event.request.url, typeof event.request.url);

	// we will not cache google map tile and authentication requests
	const isGoogleMapRequest = (event.request.url.indexOf('maps.googleapis.com/maps') > -1 ||
		event.request.url.indexOf('maps.gstatic.com') > -1);

	if (isGoogleMapRequest) {
		event.respondWith(fetch(event.request));
	} else {
		event.respondWith(caches.match(event.request).then(function(response) {
			// caches.match() always resolves
			// but in case of success response will have value
			if (response !== undefined) {
				return response;
			} else {
				return fetch(event.request).then(function (response) {
					// only cache successful requests
					if (response.status === 200) {
						// response may be used only once
						// we need to save clone to put one copy in cache
						// and serve second one
						let responseClone = response.clone();

						caches.open(staticCacheName).then(function (cache) {
							cache.put(event.request, responseClone);
						});
					}

					return response;
				});
			}
		}));
	}
});