/* ============================================================================
   Service worker for the oral examination practice app.
   ----------------------------------------------------------------------------
   The point of this file: a student practising on a tram with no signal still
   gets the whole app. No build step, no package, plain script.

   INSTALL precaches the shell, which here is the page plus the five data
   files. FETCH is network-first with a short timeout and falls back to the
   cache, so an update reaches a phone the moment it has signal while an
   offline phone is never left waiting.

   There is deliberately no skipWaiting on install: a new worker waits until
   the page offers the update and somebody taps it, rather than replacing the
   app underneath a student halfway through a mock examination.

   Bump CACHE when anything in SHELL changes, or phones keep the old copy.
   ========================================================================== */

var CACHE = "oral-exam-v34";

var SHELL = [
  "./",
  "./index.html",
  "./data/criteria.js",
  "./data/readings.js",
  "./data/audio.js",
  "./data/report_insights.js",
  "./data/questions.js",
  "./data/phrases.js",
  "./data/errors.js",
  "./data/topics.js",
  "./data/flow.js",
  "./data/qwords.js",
  "./data/particles.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", function (e) {
  // addAll fails the whole install if one file 404s, so add them one at a
  // time and let a missing optional file pass.
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () { /* optional file, keep going */ });
      }));
    })
  );
});

self.addEventListener("message", function (e) {
  if (!e.data) return;
  if (e.data.type === "SKIP_WAITING") self.skipWaiting();
  // A waiting worker is the only thing that knows what the update is called,
  // so the page asks and the notice can name the version instead of saying
  // "new". Answer whichever port or page asked.
  if (e.data.type === "VERSION") {
    var reply = { type: "VERSION", version: CACHE };
    if (e.ports && e.ports[0]) e.ports[0].postMessage(reply);
    else if (e.source) e.source.postMessage(reply);
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

function offline() {
  return new Response("", { status: 504, statusText: "offline" });
}

/* The recorded clips. They are the big files and they never change once
   generated: a new recording gets a new name, because the name is taken from
   the line it speaks. So they are served from the cache and only fetched the
   first time a student plays one, which means the ones they actually use end
   up on the phone and the ones they never touch cost nothing. */
function isClip(url){ return url.pathname.indexOf("/audio/") > -1; }

/* The app itself, whichever of the two ways in survived. Deliberately ignores
   the requested URL: for a navigation we always want the app. */
function navFallback(done) {
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

  if (isClip(url)) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        }).catch(offline);
      })
    );
    return;
  }

  e.respondWith(
    // Do not let a stalled connection hold the app up: if the network has not
    // answered in a couple of seconds, use what is already saved.
    new Promise(function (resolve) {
      var settled = false;
      function done(r) { if (!settled && r) { settled = true; resolve(r); } }
      var timer = setTimeout(function () {
        if (req.mode === "navigate") return navFallback(done);
        caches.match(req).then(done);
      }, 2500);

      fetch(req).then(function (res) {
        clearTimeout(timer);
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
          done(res);
        } else {
          caches.match(req).then(function (hit) { done(hit || res); });
        }
      }).catch(function () {
        clearTimeout(timer);
        /* A navigation anywhere inside this folder means "open the app". There
           is one page and it never changes its address, so a cache miss here
           is somebody arriving with no signal, not a missing page. */
        if (req.mode === "navigate") return navFallback(done);
        caches.match(req).then(function (hit) { done(hit || offline()); });
      });
    })
  );
});
