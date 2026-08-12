(function () {
  if (window.__TMK_TRACKING_LOADED) return;
  window.__TMK_TRACKING_LOADED = true;

  function loadGA() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-GGBZBV71QZ";
    s.onload = function () {
      gtag("js", new Date());
      gtag("config", "G-GGBZBV71QZ");
    };
    document.head.appendChild(s);
  }

  function loadMetaPixel() {
    if (window.fbq) return;
    var PIXEL_IDS = [
      "1017392710883145",
      "1376166911106653",
      "2148960105669000",
      "2958751624457212",
    ];
    var f = window,
      b = document,
      e = "script",
      v = "https://connect.facebook.net/en_US/fbevents.js";
    var n = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    var t = b.createElement(e);
    t.async = !0;
    t.src = v;
    var s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
    for (var i = 0; i < PIXEL_IDS.length; i++) {
      f.fbq("init", PIXEL_IDS[i]);
      f.fbq("track", "PageView", { plugin: "deferred" });
    }
  }

  function loadAll() {
    loadGA();
    loadMetaPixel();
  }

  var done = false;
  function fire() {
    if (done) return;
    done = true;
    for (var i = 0; i < EVENTS.length; i++) {
      window.removeEventListener(EVENTS[i], fire);
    }
    window.removeEventListener("load", scheduleIdle);
    loadAll();
  }

  var EVENTS = ["touchstart", "scroll", "pointerdown", "mousedown", "wheel", "keydown"];
  for (var i = 0; i < EVENTS.length; i++) {
    window.addEventListener(EVENTS[i], fire, { once: true, passive: true });
  }

  function scheduleIdle() {
    if (done) return;
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(fire, { timeout: 3000 });
    } else {
      setTimeout(fire, 3000);
    }
  }

  window.addEventListener("load", scheduleIdle, { once: true });
})();