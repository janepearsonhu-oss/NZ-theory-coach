const CACHE_NAME = "nz-theory-coach-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=558",
  "./app.js?v=558",
  "./official-bank.js?v=558",
  "./roadcode-expanded-bank.js?v=558",
  "./roadcode-drill-variants.js?v=558",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./sample-import.csv",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const networkFirst =
    event.request.mode === "navigate" ||
    [".html", ".js", ".css"].some((suffix) => url.pathname.endsWith(suffix));

  if (networkFirst) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    }),
  );
});
