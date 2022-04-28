const cacheName = "cache-version";
const urlToCache = ["index.html","offline.html", "favicon.png","App.js","img/esewa.png","img/googleIcon.png","img/Login-illustration.svg"];

//install

const self = this;
self.addEventListener("install",(e) => {
    e.waitUntil(
        caches.open(cacheName)
        .then((cache) => {

            console.log("opened cache",cache)
            return cache.addAll(urlToCache);
        }).catch((err) => console.log("installation error", err))
    )
})

//fetch
self.addEventListener("fetch",(e) => {
     if (!(e.request.url.indexOf('http') === 0)) return; 
    // if (!(e.request.url.indexOf('http') === 0) ) return; 

    e.respondWith(
        caches.match(e.request)
        .then((res) => {
            if(res){
                return res
            }
                return  fetch(e.request)
                .then((res) => {
                    //check if we recieved a valid response
                    if(!res || res.status !== 200 || res.type !== "basic"){
                        return res
                    }
                    //important: clone  the response . a response is a stream
                    //and because  we want the browser to consume the response
                    //as well as the  cache  consuming the response we need 
                    //to clone it  so we have two stream
                    var resToCache =  res.clone();
                    return caches.open(cacheName)
                    .then((cache) => {
                       return  cache.put(e.request.url, resToCache
			.then(() => return res)
			);
                       
                    })
                })
                .catch(() => caches.match("offline.html"))
        })
    )
})

self.addEventListener("activate",(e) => {
    const cacheLists = [];
    cacheLists.push(cacheName);
    e.waitUntil(
        caches.keys()
        .then((cacheNames) =>  Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheLists.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})
