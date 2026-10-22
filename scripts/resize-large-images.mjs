/**
 * Large image optimizer.
 *
 * The site serves a handful of very large WebP files (1920px wide) that are
 * displayed much smaller, which costs hundreds of KB on every page view.
 * This script downscales them to a sensible maximum for their rendered size
 * and (for the live-ads swiper) also emits a small "-600" variant that is
 * used via <img srcset> so mobile devices never download desktop graphics.
 *
 * Usage:  node scripts/resize-large-images.mjs
 * Safe to re-run (files already smaller than the target are skipped).
 */

import { readFileSync, writeFileSync, statSync, readdirSync, existsSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

// dir -> maximum width in px for the main file
const TARGETS = [
  { dir: "live-ads", max: 1200, quality: 82, extra: [{ suffix: "-600", max: 600 }] },
  { dir: "stock", max: 1600, quality: 82 },
  { dir: "case study", max: 1600, quality: 82 },
  { dir: "internal pages hero image", max: 1600, quality: 82 },
  { dir: "image", max: 1600, quality: 82 },
];

const IMG_EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);

async function resizeFile(file, maxWidth, quality) {
  const input = readFileSync(file);
  const meta = await sharp(input).metadata();
  if (!meta.width) return null;
  if (meta.width <= maxWidth) return null;

  const tmp = `${file}.tmp`;
  await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 90, effort: 5 })
    .toFile(tmp);

  const before = statSync(file).size;
  const after = statSync(tmp).size;
  if (after >= before) {
    // Never make a file bigger than it was.
    writeFileSync(file, input);
    return { before, after: before, skipped: true, from: meta.width };
  }
  writeFileSync(file, readFileSync(tmp));
  const { unlinkSync } = await import("node:fs");
  unlinkSync(tmp);
  return { before, after, skipped: false, from: meta.width, to: maxWidth };
}

async function main() {
  let totalSaved = 0;
  let files = 0;

  for (const target of TARGETS) {
    const dir = join(PUBLIC, target.dir);
    if (!existsSync(dir)) continue;

    for (const name of readdirSync(dir)) {
      if (!IMG_EXT.has(extname(name).toLowerCase())) continue;
      const file = join(dir, name);

      const res = await resizeFile(file, target.max, target.quality);
      if (res && !res.skipped) {
        totalSaved += res.before - res.after;
        files++;
        console.log(
          `  ${target.dir}/${name}: ${res.from}px -> ${res.to}px, saved ${(
            (res.before - res.after) / 1024
          ).toFixed(1)} KB`,
        );
      }

      // Extra (srcset) variants, e.g. "-600.webp" next to the main file.
      for (const extra of target.extra || []) {
        const ext = extname(name);
        const extraName = `${basename(name, ext)}${extra.suffix}${ext}`;
        const extraFile = join(dir, extraName);
        if (existsSync(extraFile)) continue;
        const input = readFileSync(file);
        const meta = await sharp(input).metadata();
        if (!meta.width || meta.width <= extra.max) continue;
        await sharp(input)
          .resize({ width: extra.max, withoutEnlargement: true })
          .webp({ quality: target.quality, alphaQuality: 90, effort: 5 })
          .toFile(extraFile);
        const size = statSync(extraFile).size;
        console.log(
          `  ${target.dir}/${extraName}: created (${extra.max}px, ${(
            size / 1024
          ).toFixed(1)} KB)`,
        );
      }
    }
  }

  console.log(
    `\n[Resize Large Images] Done — ${files} file(s) downscaled, ${(
      totalSaved / 1024
    ).toFixed(1)} KB saved.`,
  );
}

main().catch((err) => {
  console.error("[Resize Large Images] Failed:", err);
  process.exit(1);
});
