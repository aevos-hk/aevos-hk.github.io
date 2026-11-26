// Aevos service worker. Caches same-origin static files only; never caches API responses or health data.
const V = '6c4088407e56', SHELL = 'aevos-shell-' + V, ASSET = 'aevos-asset-v2';
const FILES = ["./","manifest.webmanifest","icons/icon-192.png","assets/index-C2gBrqdc.js","assets/Assistant-BVmoTdzd.js","assets/Bio-DNg4Df0v.js","assets/Body-DRW65XsZ.js","assets/BodyPanel-q5LZ1eX1.js","assets/Connect-CPRG923c.js","assets/Hub-cUefkuiW.js","assets/Jarvis-Dm1ztVu1.js","assets/Reports-luwU-s54.js","assets/Settings-DZlPk_fn.js","assets/data-C-BCTMsx.js","assets/gateway-DPCdm0Oi.js","assets/kit-CHCse5vH.js","assets/scale-DYd7RSji.js","assets/store-Dr5XsqEO.js","assets/viewer-Ld3mX0CA.js","assets/index-Cbo0PlED.css"];
const BASE = new URL('./', self.location).pathname;
self.addEventListener('install', e => e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))));
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('aevos-') && k !== SHELL && k !== ASSET) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || !u.pathname.startsWith(BASE) || u.pathname.startsWith(BASE + 'blueprint')) return;
  const p = u.pathname.slice(BASE.length);
  if (r.mode === 'navigate') {
    // Network first so a new release shows immediately; cached shell only when offline.
    e.respondWith(fetch(r, { cache: 'no-cache' }).then(x => x.ok ? x : Promise.reject()).catch(async () => (await caches.match(BASE, { cacheName: SHELL, ignoreVary: true })) || Response.error()));
  } else if (/^(models|structures|vendor|assets|icons)\//.test(p)) {
    e.respondWith((async () => {
      const hit = await caches.match(r, { ignoreVary: true }); if (hit) return hit;
      const x = await fetch(r);
      if (x.ok && x.status === 200 && /^(models|structures|vendor)\//.test(p)) { const c = x.clone(); e.waitUntil(caches.open(ASSET).then(k => k.put(r, c)).catch(() => {})); }
      return x;
    })());
  }
});
