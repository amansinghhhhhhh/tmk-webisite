/**
 * Verifies that third-party tracking (connect.facebook.net, googletagmanager)
 * is NOT requested during the initial page load, and IS requested after a
 * user interaction.
 *
 * Usage: node scripts/check-tracking.mjs <url>
 */

import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const URL = process.argv[2] || "http://localhost:4192/";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9335;
const THIRD_PARTY = ["connect.facebook.net", "googletagmanager.com", "facebook.com/tr"];

const chrome = spawn(CHROME, [
  // Headful on purpose: the tracking script intentionally skips headless
  // clients (the UA contains "HeadlessChrome"), so the interaction path can
  // only be verified in a normal browser.
  "--no-sandbox",
  "--disable-gpu",
  "--window-position=-3000,-3000",
  `--remote-debugging-port=${PORT}`,
  "--window-size=1280,900",
  "--user-data-dir=C:\\Users\\A2DIGI\\AppData\\Local\\Temp\\opencode\\cdp-profile3",
  "about:blank",
]);

async function waitForDevtools() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("DevTools endpoint never came up");
}
await waitForDevtools();

const tab = await (
  await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent("about:blank")}`, { method: "PUT" })
).json();

const ws = new WebSocket(tab.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const thirdParty = [];

ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
    return;
  }
  if (msg.method === "Network.requestWillBeSent") {
    const u = msg.params.request.url;
    if (THIRD_PARTY.some((t) => u.includes(t))) {
      thirdParty.push({ url: u, t: Math.round(msg.params.timestamp * 1000) });
    }
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
await send("Network.enable");
await send("Page.navigate", { url: URL });

console.log("… waiting 12s after load (no interaction)");
await sleep(12000);
const afterLoad = thirdParty.length;
console.log(`third-party requests during initial load: ${afterLoad}`);
for (const r of thirdParty) console.log(`   ${r.url}`);

console.log("… simulating a user interaction (pointerdown)");
await send("Runtime.evaluate", {
  expression:
    "window.dispatchEvent(new Event('pointerdown', {bubbles:true})); 'dispatched'",
});
await sleep(6000);

console.log(`third-party requests after interaction: ${thirdParty.length - afterLoad}`);
for (const r of thirdParty.slice(afterLoad)) console.log(`   ${r.url}`);

console.log(
  afterLoad === 0
    ? "\nPASS: no third-party tracking during the initial load."
    : "\nFAIL: third-party tracking ran during the initial load.",
);

ws.close();
chrome.kill();
process.exit(0);
