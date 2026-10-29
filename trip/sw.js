/* ============================================================================
   Service worker for the Japan Study Tour app.
   ----------------------------------------------------------------------------
   The whole point of this file: a student at Himeji with no data still gets
   the app. Nothing here needs a build step or a package. It is plain script.

   Two layers:
     1. INSTALL precaches the shell (page, content, icons) the moment the app
        is first opened, so the app itself always survives losing signal.
     2. FETCH is network-first for the app itself and cache-first for
        photos. That way an update reaches a phone the moment it has
        signal, while the big files still come off the phone instantly.
        The "save it all" button on the Places screen walks every photo
        deliberately, which is what students press on hotel wifi.

   Bump CACHE when the app changes, or phones will keep serving the old copy.
   ========================================================================== */

var CACHE = "japan-trip-v80";

var SHELL = [
  "./",
  "./index.html",
  "./data.js",
  "./map.js",
  "./gold-leaf.webp",
  "./kana-hiragana.svg",
  "./kana-katakana.svg",
  "./kana-hiragana-plus.svg",
  "./kana-katakana-plus.svg",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", function (e) {
  // addAll fails the whole install if any one file 404s, so add them
  // individually and let a missing optional file pass.
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () { /* optional file, keep going */ });
      }));
    })
    /* No skipWaiting here on purpose. A new worker waits until the page
       offers the update and somebody taps it, rather than replacing the app
       underneath a student halfway through reading something. The page
       cannot notice a waiting worker if it never waits. */
  );
});

self.addEventListener("message", function (e) {
  if (!e.data) return;
  if (e.data.type === "SKIP_WAITING") self.skipWaiting();
  // A waiting worker is the only thing that knows what the update is called,
  // so the page asks and the notice can name the version instead of saying
  // "new". Answered straight back to whichever page asked.
  if (e.data.type === "VERSION" && e.source){
    e.source.postMessage({ type: "VERSION", version: CACHE });
  }
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Photos never change once published and they are the big files, so they
   are served straight from the cache. Everything else asks the network
   first and falls back to the cache, which is what makes an update appear
   the moment a phone has signal instead of a reload or two later. Offline,
   the network call fails at once and the cache answers. */
function isPhoto(url){ return url.pathname.indexOf("/photos/") > -1; }

function offline(){
  return new Response("", { status: 504, statusText: "offline" });
}

/* The app itself, whichever of the two ways in survived. Deliberately does
   not consult the requested URL: for a navigation we always want the app. */
function navFallback(done){
  return caches.match("./index.html").then(function (p) {
    if (p) return done(p);
    return caches.match("./").then(function (q) { done(q || offline()); });
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isPhoto(url)){
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && res.ok){
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        }).catch(function () {
          return new Response("", { status: 504, statusText: "offline" });
        });
      })
    );
    return;
  }

  e.respondWith(
    // Do not let a stalled connection hold the app up: if the network has
    // not answered in a couple of seconds, use what is already saved.
    new Promise(function (resolve) {
      var settled = false;
      function done(r){ if (!settled && r){ settled = true; resolve(r); } }
      var timer = setTimeout(function () {
        if (req.mode === "navigate") return navFallback(done);
        caches.match(req).then(done);
      }, 2500);

      fetch(req).then(function (res) {
        clearTimeout(timer);
        if (res && res.ok){
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
          done(res);
        } else {
          caches.match(req).then(function (hit) { done(hit || res); });
        }
      }).catch(function () {
        clearTimeout(timer);
        /* A navigation anywhere inside this folder means "open the app".
           There is one page and it never changes its address, so a cache miss
           here is not a missing page, it is somebody arriving with no signal.
           Answer with the app rather than a 404 they cannot act on. */
        if (req.mode === "navigate") return navFallback(done);
        caches.match(req).then(function (hit) { done(hit || offline()); });
      });
    })
  );
});
