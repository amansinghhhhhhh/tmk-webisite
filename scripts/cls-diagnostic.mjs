/**
 * CLS diagnostic: launches headless Chrome via CDP, injects a
 * PerformanceObserver for 'layout-shift' and prints every shift with the
 * elements that moved (previousRect -> currentRect).
 *
 * Usage: node scripts/cls-diagnostic.mjs <url>
 */

import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const URL = process.argv[2] || "http://localhost:4180/";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;

const chrome = spawn(CHROME, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  `--remote-debugging-port=${PORT}`,
  "--window-size=412,823",
  "--user-data-dir=C:\\Users\\A2DIGI\\AppData\\Local\\Temp\\opencode\\cdp-profile",
  "about:blank",
]);

async function waitForDevtools() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return await res.json();
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("DevTools endpoint never came up");
}

await waitForDevtools();

const tab = await (await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(URL)}`, { method: "PUT" })).json();

const ws = new WebSocket(tab.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();

ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

await new Promise((r) => ws.addEventListener("open", r));

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 412,
  height: 823,
  deviceScaleFactor: 1.75,
  mobile: true,
});

await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `
    window.__shifts = [];
    window.__early = [];
    function snap(label) {
      try {
        var kids = [];
        for (var c of document.body.children) {
          var r = c.getBoundingClientRect();
          kids.push(c.nodeName + (c.id ? "#" + c.id : "") + " top=" + Math.round(r.top) + " h=" + Math.round(r.height) + " disp=" + getComputedStyle(c).display);
        }
        var root = document.getElementById("root");
        var rr = root ? root.getBoundingClientRect() : null;
        var nav = document.querySelector("nav");
        var navInfo = null;
        if (nav) {
          var cs = getComputedStyle(nav);
          var nr = nav.getBoundingClientRect();
          navInfo = { position: cs.position, top: Math.round(nr.top), h: Math.round(nr.height), cls: nav.className };
        }
        var bcs = getComputedStyle(document.body);
        var nodes = [];
        for (var i = 0; i < document.body.childNodes.length && i < 10; i++) {
          var n = document.body.childNodes[i];
          if (n.nodeType === 3) {
            nodes.push("TEXT(" + JSON.stringify((n.nodeValue || "").slice(0, 18)) + ")");
          } else {
            var r2 = n.getBoundingClientRect();
            var cs2 = getComputedStyle(n);
            nodes.push(n.nodeName + " top=" + Math.round(r2.top) + " h=" + Math.round(r2.height) + " disp=" + cs2.display + " mt=" + cs2.marginTop);
          }
        }
        window.__early.push({
          label: label,
          ready: document.readyState,
          sheets: document.styleSheets.length,
          rules: (function () { try { return document.styleSheets[0].cssRules.length; } catch (e) { return -1; } })(),
          bodyKids: kids,
          nodes: nodes,
          rootTop: rr ? Math.round(rr.top) : null,
          rootH: rr ? Math.round(rr.height) : null,
          bodyPadTop: bcs.paddingTop,
          bodyMarginTop: bcs.marginTop,
          bodyPos: bcs.position,
          nav: navInfo,
        });
      } catch (e) { window.__early.push({ label: label, err: String(e) }); }
    }
    document.addEventListener("DOMContentLoaded", function () { snap("DOMContentLoaded"); });
    setTimeout(function () { snap("t=150ms"); }, 150);
    setTimeout(function () { snap("t=600ms"); }, 600);
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__shifts.push({
          value: entry.value,
          time: entry.startTime,
          sources: (entry.sources || []).map((s) => {
            const n = s.node;
            return {
              tag: n ? n.nodeName : "?",
              cls: n ? (n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className) : "",
              id: n ? n.id : "",
              prev: s.previousRect ? [s.previousRect.x, s.previousRect.y, s.previousRect.width, s.previousRect.height] : null,
              cur: s.currentRect ? [s.currentRect.x, s.currentRect.y, s.currentRect.width, s.currentRect.height] : null,
            };
          }),
        });
      }
    }).observe({ type: "layout-shift", buffered: true });
  `,
});

await send("Page.navigate", { url: URL });
await sleep(9000);

const res = await send("Runtime.evaluate", {
  expression: "JSON.stringify(window.__shifts || [])",
  returnByValue: true,
});

const shifts = JSON.parse(res.result?.result?.value || "[]");
let total = 0;
console.log(`CLS total: ${shifts.reduce((a, s) => a + s.value, 0).toFixed(4)}  (${shifts.length} shift entries)\n`);
const early = await send("Runtime.evaluate", {
  expression: "JSON.stringify(window.__early || [])",
  returnByValue: true,
});
console.log("EARLY SNAPSHOTS:");
for (const e of JSON.parse(early.result?.result?.value || "[]")) {
  console.log(
    ` ${e.label} ready=${e.ready} rules=${e.rules} rootTop=${e.rootTop} rootH=${e.rootH} bodyPad=${e.bodyPadTop} bodyPos=${e.bodyPos}`,
  );
  console.log(`    nav: ${JSON.stringify(e.nav)}`);
  for (const n of e.nodes || []) console.log(`      ${n}`);
}

for (const s of shifts) {
  total += s.value;
  if (s.value > 0.004) {
    console.log(`shift value=${s.value.toFixed(5)} @${Math.round(s.time)}ms`);
    for (const src of s.sources) {
      console.log(
        `   ${src.tag}${src.id ? "#" + src.id : ""}${src.cls ? "." + String(src.cls).split(" ")[0] : ""}  prev=${JSON.stringify(src.prev)} -> cur=${JSON.stringify(src.cur)}`,
      );
    }
  }
}
console.log(`\nSUM: ${total.toFixed(4)}`);

ws.close();
chrome.kill();
process.exit(0);
