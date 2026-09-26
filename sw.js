const CACHE = "kruaworld-v1";
const FILES = ["./", "./index.html", "./style.css", "./recipes.js", "./app.js", "./manifest.json", "./icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(net => {
      if (e.request.method === "GET" && net.ok) {
        const clone = net.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return net;
    }).catch(() => caches.match("./index.html")))
  );
});
