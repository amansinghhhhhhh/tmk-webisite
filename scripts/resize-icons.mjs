import { readdirSync, statSync, readFileSync, rmSync, renameSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const dirs = [
  "public/service image",
  "public/service-img",
  "public/ICON 3D",
  "public/New folder (2)",
];

const targets = [];
for (const dir of dirs) {
  for (const f of readdirSync(dir)) {
    if (!f.toLowerCase().endsWith(".webp")) continue;
    targets.push(join(dir, f).replace(/\\/g, "/"));
  }
}
targets.push("public/flag/latam.webp");

const MAX = 300;
let saved = 0;

for (const file of targets) {
  const tmp = `${file}.new`;
  try {
    const inputBuffer = readFileSync(file);
    const meta = await sharp(inputBuffer).metadata();
    const longEdge = Math.max(meta.width, meta.height);
    if (longEdge <= MAX) continue;
    const before = statSync(file).size;

    const opts = {};
    if (meta.width >= meta.height) opts.width = MAX;
    else opts.height = MAX;
    opts.withoutEnlargement = true;

    await sharp(inputBuffer)
      .resize(opts)
      .webp({ quality: 90, alphaQuality: 90, effort: 4 })
      .toFile(tmp);

    const after = statSync(tmp).size;
    if (after >= before) {
      rmSync(tmp, { force: true });
      console.log(`${file}: resized but not smaller (${(before / 1024).toFixed(0)} -> ${(after / 1024).toFixed(0)} KB, skipped)`);
      continue;
    }

    let done = false;
    for (let attempt = 0; attempt < 5 && !done; attempt++) {
      try {
        rmSync(file, { force: true });
        renameSync(tmp, file);
        done = true;
      } catch (err) {
        if (attempt === 4) throw err;
        await new Promise((r) => setTimeout(r, 300));
      }
    }
    if (!done) throw new Error("rename failed");

    saved += before - after;
    console.log(`${file}\n  ${meta.width}x${meta.height} -> <=${MAX}px, saved ${((before - after) / 1024).toFixed(1)} KB (${(after / 1024).toFixed(0)} KB)`);
    rmSync(tmp, { force: true });
  } catch (err) {
    console.log("SKIP", file, err.message);
    rmSync(tmp, { force: true });
  }
}
console.log(`\nTotal saved: ${(saved / 1024).toFixed(1)} KB`);