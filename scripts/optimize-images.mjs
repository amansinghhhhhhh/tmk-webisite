import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
// WebP files larger than this will be lossy-re-encoded to trim weight
const WEBP_REENCODE_THRESHOLD = 80 * 1024;
const MAX_WIDTH = 1920;
const JPG_QUALITY = 75;
const WEBP_QUALITY = 72;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let originalBytes = 0;
let newBytes = 0;
const converted = [];
const skipped = [];

for (const file of walk(PUBLIC_DIR)) {
  const ext = extname(file);
  const isPhoto = IMAGE_EXTS.includes(ext);
  const isWebp = ext === '.webp';
  if (!isPhoto && !isWebp) continue;
  if (file.endsWith('.new')) continue;

  const inputSize = statSync(file).size;
  if (isWebp && inputSize < WEBP_REENCODE_THRESHOLD) {
    skipped.push({ file, reason: `small already (${(inputSize / 1024).toFixed(0)}KB)` });
    continue;
  }
  if (basename(file).startsWith('hero-poster')) {
    skipped.push({ file, reason: 'generated poster' });
    continue;
  }

  const isWebpInput = isWebp;
  const output = isWebpInput
    ? file
    : file.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp');

  try {
    const fs = await import('fs');
    // Read into memory first so the source file handle is released before we overwrite it (Windows lock)
    const inputBuffer = fs.readFileSync(file);
    const meta = await sharp(inputBuffer).metadata();
    const { width = 0, height = 0 } = meta;
    const scale = width > MAX_WIDTH ? MAX_WIDTH / width : 1;
    const w = Math.round(width * scale);
    const h = Math.round(height * scale);

    const wasPng = extname(file).match(/png/i);
    const quality = isWebpInput ? 70 : wasPng ? JPG_QUALITY : WEBP_QUALITY;
    // For in-place webp re-encode write to a temp then overwrite the original
    const tmp = isWebpInput ? `${file}.new` : output;

    await sharp(inputBuffer)
      .resize(w, h, { withoutEnlargement: true })
      .webp({ quality, alphaQuality: 90, effort: 4 })
      .toFile(tmp);

    const doneSize = statSync(tmp).size;
    if (isWebpInput) {
      let done = false;
      for (let attempt = 0; attempt < 5 && !done; attempt++) {
        try {
          fs.rmSync(file, { force: true });
          fs.renameSync(tmp, file);
          done = true;
        } catch (err) {
          if (attempt === 4) throw err;
          await new Promise((r) => setTimeout(r, 300));
        }
      }
    }

    originalBytes += inputSize;
    newBytes += doneSize;
    converted.push({
      file,
      out: output,
      from: `${width}x${height}`,
      to: `${w}x${h}`,
      before: inputSize,
      after: doneSize,
    });
  } catch (err) {
    console.warn(`⚠️  Failed: ${file} — ${err.message}`);
  }
}

console.log('\n=== Converted ===');
for (const c of converted.slice(0, 200)) {
  const pct = 100 - ((c.after / c.before) * 100).toFixed(1);
  console.log(
    `  [${pct.toFixed(1)}% smaller] ${c.file.replace(PUBLIC_DIR + '\\', '')} (${(c.before / 1024).toFixed(0)}KB -> ${(c.after / 1024).toFixed(0)}KB)`,
  );
}
if (converted.length > 200) console.log(`  ... and ${converted.length - 200} more`);
console.log(`\n=== Skipped ${skipped.length} ===`);
for (const s of skipped) console.log(`  ${basename(s.file)} — ${s.reason}`);

const saved = originalBytes - newBytes;
console.log(`\n✅ Done: ${converted.length} images optimized`);
console.log(`   Original:  ${(originalBytes / 1048576).toFixed(2)} MB`);
console.log(`   New total: ${(newBytes / 1048576).toFixed(2)} MB`);
console.log(`   Saved:     ${(saved / 1048576).toFixed(2)} MB`);