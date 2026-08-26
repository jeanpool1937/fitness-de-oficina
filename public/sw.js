const CACHE_NAME = "fitness-oficina-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  "/icon-192.svg",
  "/icon-512.svg"
];

// Instalación y cacheo de recursos principales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación y limpieza de caches antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia Network First con fallback a Cache
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Ignorar peticiones a youtube o supabase para que no choquen con CORS de service worker
  const url = new URL(event.request.url);
  if (url.origin.includes("youtube.com") || url.origin.includes("ytimg.com") || url.origin.includes("supabase.co")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }
        });
      })
  );
});

// Manejo de notificaciones Push / Alarmas
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "¡Hora de tu sesión 6:00 AM!";
  const options = {
    body: data.body || "15 minutos de postura y energía antes de sentarte en el escritorio.",
    icon: "/icon-192.svg",
    badge: "/icon-192.svg",
    vibrate: [200, 100, 200, 100, 400],
    data: {
      url: "/"
    },
    actions: [
      { action: "start", title: "Empezar Rutina" }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});