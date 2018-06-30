
	let staticCache = 'currency-static-v3';
	
	self.addEventListener('install', function(event) {
		event.waitUntil(
		caches.open(staticCache).then(function(cache) {
		  return cache.addAll([
			'/',
			'https://otichibueze.github.io/currencyWeb/index.html',
			'https://otichibueze.github.io/currencyWeb/mStyle.css',
			'https://otichibueze.github.io/currencyWeb/exchange.js',
			'https://otichibueze.github.io/currencyWeb/mdatabase.js',
			'https://free.currencyconverterapi.com/api/v5/currencies?'
		  ]);
		})
		);
		});
		
		
		self.addEventListener('activate', function(event) {
		event.waitUntil(
		caches.keys().then(function(cacheNames) {
		  return Promise.all(
			cacheNames.filter(function(cacheName) {
			  return cacheName.startsWith('currency-') &&
					 cacheName != staticCache;
			}).map(function(cacheName) {
			  return caches.delete(cacheName);
			})
		  );
		})
		);
		});
		
		
		self.addEventListener('fetch', function(event) {
		
		event.respondWith(
		caches.match(event.request).then(function(response) {
			//console.log(event.request);
		  return response || fetch(event.request);
		})
		);
		});

		self.addEventListener('message', function(event) {
		if (event.data.action === 'skipWaiting') {
		self.skipWaiting();
		}
		});
