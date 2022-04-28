const cacheName = "v1";
const urlToCache = ["/", "index.html"];
const runTime = "runtime";
const self = this ;
self.addEventListener("install",(e) => {
console.log(e)
     e.waitUntil(
	caches.open(urlToCache)
	.then((cache) =>{
	  console.log("file cache success")
	 return cache.addAll(urlToCache)
	})
	.then(() => self.skipWaiting());
     )
})

self.addEventListener("activate",(e) =>{
	let currentCaches =[cacheName,runTime];
	e.waitUntil(
	  caches.keys().then(cachesName => {
		return cachesName.filter(cacheName => !currentCaches.includes(cacheName))
	  })
	  .then(cachesToDelete => {
		return Promise.all(cachesToDelete.map(cacheToDelete => {
	        	return caches.delete(cacheToDelete);
		})
	  })
	  .then(() => self.clients.claim());
	)
})

self.addEventListener("fetch",e=>{
  if(e.request.url.startsWith(self.location.origin)){
     e.respondWith(
	caches.match(e.request).then(cachedResponse,=>{
	   if(cachedResponse){return cachedResponse}
	   return caches.open(runTime).then(cache => {
		return fetch(e.request).then(response => {
			return cache.put(e.request, response.clone()).then(() =>{
			  return response
			})
		})
	   })
        })
     )
  }
})
