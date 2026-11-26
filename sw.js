// Aevos service worker. Caches same-origin static files only; never caches API responses or health data.
const V = '6b074d37f662', SHELL = 'aevos-shell-' + V, ASSET = 'aevos-asset-v2';
const FILES = ["./","manifest.webmanifest","icons/icon-192.png","assets/index-D35xN0Bn.js","assets/Assistant-CGPWXrwh.js","assets/Bio-Cth_RZVD.js","assets/Body-BcG8rRLe.js","assets/BodyPanel-DmZyaY3v.js","assets/Connect-BfBenN8Q.js","assets/Hub-459Yt7TH.js","assets/Jarvis-CdBV1Im2.js","assets/Records-CwoLpsY_.js","assets/Reports-CQnjI3US.js","assets/Settings-7bj11D3o.js","assets/data-C-BCTMsx.js","assets/gateway-CxGGWNXh.js","assets/importers-DHRFrSd9.js","assets/kit-2iPpYjFb.js","assets/scale-DYd7RSji.js","assets/store-D6Z3k6GG.js","assets/viewer-B9zTOaWv.js","assets/index-DwwBJoTw.css"];
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
