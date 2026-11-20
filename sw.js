const C="mess-menu-v6",F=["./","./index.html","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
/* network first so updates show up straight away; cache is the offline fallback. The sheet (another site) is handled by the app itself. */
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 if(new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));
});