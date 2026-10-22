/**
 * Image optimization codemod.
 *
 * For every <img> in src/**\/*.jsx it:
 *   - adds loading="lazy" (unless the tag already sets loading=) so
 *     off-screen images don't compete with the LCP element
 *   - adds decoding="async" so image decoding never blocks the main thread
 *   - adds width/height (intrinsic size, read with sharp) when missing, so
 *     the browser can reserve space and avoid cumulative layout shift
 *
 * Above-the-fold images must opt out explicitly: keep an existing
 * loading="eager" + fetchPriority="high" (the codemod never touches those).
 *
 * Usage:  node scripts/optimize-images.mjs
 * Safe to re-run (idempotent).
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

const IMG_EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif", ".avif", ".svg"]);

// ─── collect public assets ─────────────────────────────────────────
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const sizeCache = new Map();

async function intrinsicSize(relPath) {
  if (sizeCache.has(relPath)) return sizeCache.get(relPath);
  const abs = join(PUBLIC, relPath.replace(/^\//, ""));
  let result = null;
  if (existsSync(abs) && IMG_EXT.has(extname(abs).toLowerCase())) {
    try {
      const meta = await sharp(abs).metadata();
      if (meta.width && meta.height) {
        result = { width: meta.width, height: meta.height };
      }
    } catch {
      /* svg / unsupported -> no dimensions */
    }
  }
  sizeCache.set(relPath, result);
  return result;
}

// ─── JSX helpers ───────────────────────────────────────────────────
function getAttr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("[^"]*"|'[^']*'|\\{[^}]*\\})`));
  return m ? m[1] : null;
}

function localPathOf(srcAttr) {
  if (!srcAttr) return null;
  if (!srcAttr.startsWith('"') && !srcAttr.startsWith("'")) return null; // dynamic {expr}
  const raw = srcAttr.slice(1, -1);
  if (!raw.startsWith("/")) return null; // remote or relative
  if (raw.startsWith("//")) return null;
  if (/^https?:/i.test(raw)) return null;
  return raw;
}

// Images that must load eagerly (above the fold / LCP candidates).
// Matched against the raw src attribute value.
const CRITICAL = [
  { match: "/hero-poster.webp", priority: true },
  { match: "/tmk-logo-with-Brand-name.webp", priority: true },
  { match: "cdn.jsdelivr.net/gh/lipis/flag-icons", priority: false },
];

function isCritical(srcAttr) {
  if (!srcAttr) return null;
  const raw = srcAttr.replace(/^["']|["']$/g, "");
  for (const c of CRITICAL) {
    if (raw.includes(c.match)) return c;
  }
  return null;
}

function insertAttrs(tag, attrs, indent) {
  // Insert before the closing bracket of the tag, using the tag's own
  // indentation so the result stays consistent with the surrounding code.
  const selfClosing = /\/>$/.test(tag);
  let body = selfClosing ? tag.slice(0, -2) : tag.slice(0, -1);
  const suffix = selfClosing ? " />" : ">";
  // Drop the dangling newline/indentation that preceded the closing bracket.
  body = body.replace(/\s+$/, "");
  return `${body}\n${indent}  ${attrs.join(`\n${indent}  `)}${suffix}`;
}

async function processFile(file) {
  const original = readFileSync(file, "utf-8");
  const matches = [...original.matchAll(/<img\b[\s\S]*?>/g)];

  let changed = 0;
  let out = original;

  for (const m of matches) {
    const tag = m[0];
    const srcAttr = getAttr(tag, "src");
    const critical = isCritical(srcAttr);

    const add = [];

    const hasLoading = getAttr(tag, "loading") !== null;
    const hasDecoding = getAttr(tag, "decoding") !== null;
    const hasWidth = getAttr(tag, "width") !== null;
    const hasHeight = getAttr(tag, "height") !== null;

    if (!hasLoading) {
      add.push(critical ? 'loading="eager"' : 'loading="lazy"');
    }
    if (!hasDecoding) add.push('decoding="async"');
    if (critical && critical.priority && getAttr(tag, "fetchPriority") === null) {
      add.push('fetchPriority="high"');
    }

    if (!hasWidth || !hasHeight) {
      const rel = localPathOf(srcAttr);
      const size = rel ? await intrinsicSize(rel) : null;
      if (size) {
        if (!hasWidth) add.push(`width="${size.width}"`);
        if (!hasHeight) add.push(`height="${size.height}"`);
      }
    }

    if (add.length === 0) continue;

    // Indentation of the line the tag starts on.
    const lineStart = original.lastIndexOf("\n", m.index) + 1;
    const lineText = original.slice(lineStart, m.index);
    const indent = lineText.match(/^[ \t]*/)[0];

    const newTag = insertAttrs(tag, add, indent);
    out = out.replace(tag, newTag);
    changed++;
  }

  if (changed > 0) {
    writeFileSync(file, out, "utf-8");
    console.log(`  ${file.replace(ROOT + "\\", "")} — ${changed} img tag(s) updated`);
  }
  return changed;
}

async function main() {
  console.log("[Optimize Images] Scanning src/**/*.jsx ...");
  const files = walk(SRC).filter((f) => f.endsWith(".jsx"));
  let total = 0;
  for (const f of files) {
    total += await processFile(f);
  }
  console.log(`[Optimize Images] Done — ${total} img tag(s) updated.`);
}

main().catch((err) => {
  console.error("[Optimize Images] Failed:", err);
  process.exit(1);
});
