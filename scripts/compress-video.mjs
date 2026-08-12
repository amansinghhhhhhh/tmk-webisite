import { spawnSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');
const INPUT = resolve(PUBLIC_DIR, 'hero section.mp4');
const OUTPUT = resolve(PUBLIC_DIR, 'hero.mp4');
const POSTER_WEBP = resolve(PUBLIC_DIR, 'hero-poster.webp');
const POSTER_TMP_JPG = resolve(PUBLIC_DIR, 'hero-poster.tmp.jpg');

if (!existsSync(INPUT)) {
  console.error(`❌ Input video not found: ${INPUT}`);
  process.exit(1);
}

if (!ffmpegPath) {
  console.error('❌ ffmpeg-static binary not resolvable');
  process.exit(1);
}

function run(args) {
  const r = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (r.error) throw r.error;
  if (r.status !== 0) {
    console.error(`❌ ffmpeg exited with code ${r.status}`);
    process.exit(r.status);
  }
}

const WIDTH = 1280;
const FPS = 30;

console.log('🎬 Encoding delivery MP4 (H.264, 30fps, max 1280px, no audio, faststart)...');
run([
  '-y',
  '-i',
  INPUT,
  '-vf',
  `scale=${WIDTH}:-2,fps=${FPS}`,
  '-c:v',
  'libx264',
  '-preset',
  'veryfast',
  '-crf',
  '30',
  '-an',
  '-movflags',
  '+faststart',
  '-pix_fmt',
  'yuv420p',
  OUTPUT,
]);

console.log('🖼  Extracting poster frame...');
run([
  '-y',
  '-i',
  INPUT,
  '-vf',
  `scale=${WIDTH}:-2`,
  '-frames:v',
  '1',
  '-q:v',
  '2',
  POSTER_TMP_JPG,
]);

await sharp(POSTER_TMP_JPG)
  .webp({ quality: 70 })
  .toFile(POSTER_WEBP);
rmSync(POSTER_TMP_JPG, { force: true });

const { default: fs } = await import('fs');
const mb = (p) => (fs.statSync(p).size / 1048576).toFixed(2);
console.log(`✅ Done:`);
console.log(`   ${OUTPUT}  ${mb(OUTPUT)} MB`);
console.log(`   ${POSTER_WEBP}  ${mb(POSTER_WEBP)} MB`);