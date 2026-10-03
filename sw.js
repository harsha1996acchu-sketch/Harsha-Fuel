const APP_CACHE = 'harsha-fuel-app-v4-gemma-1';
const ENGINE_CACHE = 'harsha-fuel-engine-0.10.27';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon.svg','./coach-local.js','./genai_bundle.mjs'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(APP_CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key === 'hf3' || (key.startsWith('harsha-fuel-app-') && key !== APP_CACHE)).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin === 'https://cdn.jsdelivr.net' && url.pathname.startsWith('/npm/@mediapipe/tasks-genai@0.10.27/wasm/')) {
    event.respondWith(caches.open(ENGINE_CACHE).then(async cache => (await cache.match(event.request)) || fetch(event.request)));
    return;
  }
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  // Try the network for fresh app releases, then the installed offline shell.
  event.respondWith(caches.open(APP_CACHE).then(async cache => {
    try {
      const response = await fetch(event.request);
      if (response.ok) { await cache.put(event.request, response.clone()); return response; }
      return (await cache.match(event.request)) || response;
    } catch (e) {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      if (event.request.mode === 'navigate') return cache.match('./index.html');
      return Response.error();
    }
  }));
});
