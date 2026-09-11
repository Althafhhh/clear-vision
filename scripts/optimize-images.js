#!/usr/bin/env node
/**
 * Image optimization for Clear Vision.
 *
 * Why this exists: SmartImage (components/SmartImage.tsx) uses plain <img>
 * tags on purpose, not next/image, so it can gracefully fall back to a
 * placeholder box when a file hasn't been uploaded yet. That means Next.js
 * is NOT automatically compressing/resizing anything here — an
 * un-optimized photo dropped into public/images/ goes to the browser
 * exactly as uploaded, full size, full weight. This script is the
 * optimization step that next/image would otherwise have handled for you.
 *
 * Usage:
 *   1. Drop your original, full-size photos into raw-images/
 *      (use the exact filenames from the image naming guide, e.g.
 *      hero-new-arrivals.jpg, product-classic-aviator-main.jpg, etc.)
 *   2. Run: npm run optimize-images
 *   3. Optimized versions land in public/images/ with the SAME filenames
 *      and SAME extensions — no code changes needed, ever. SmartImage
 *      just picks them up.
 *
 * What it does to each image:
 *   - Resizes down to a sensible max width (won't upscale a smaller image)
 *   - Re-compresses at a quality level that's visually near-identical but
 *     a fraction of the file size
 *   - Strips EXIF/metadata bloat (camera info, GPS tags, etc.)
 *
 * Re-run any time you add or replace photos in raw-images/ — it's safe to
 * run repeatedly, it just re-processes whatever's sitting there.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SOURCE_DIR = path.join(__dirname, "..", "raw-images");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "images");

// Max width by rough image role, guessed from the filename. Everything
// else falls back to a safe general-purpose max. None of these upscale a
// smaller source image — sharp's withoutEnlargement handles that.
const MAX_WIDTH_RULES = [
  { pattern: /^hero-/, maxWidth: 2400 }, // full-bleed sticky heroes
  { pattern: /^store-|^about-|^brand-/, maxWidth: 1600 },
  { pattern: /^category-|^search-look-/, maxWidth: 1000 },
  { pattern: /^product-/, maxWidth: 1200 },
];
const DEFAULT_MAX_WIDTH = 1600;

const JPEG_QUALITY = 78;
const PNG_QUALITY = 78;

function getMaxWidth(filename) {
  const rule = MAX_WIDTH_RULES.find((r) => r.pattern.test(filename));
  return rule ? rule.maxWidth : DEFAULT_MAX_WIDTH;
}

async function optimizeOne(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    console.log(`  skip (not an image): ${filename}`);
    return;
  }

  const inputPath = path.join(SOURCE_DIR, filename);
  const outputPath = path.join(OUTPUT_DIR, filename);
  const maxWidth = getMaxWidth(filename);

  const beforeSize = fs.statSync(inputPath).size;

  let pipeline = sharp(inputPath).rotate(); // auto-orient from EXIF, then strip it
  pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: JPEG_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  await pipeline.toFile(outputPath + ".tmp");
  fs.renameSync(outputPath + ".tmp", outputPath);

  const afterSize = fs.statSync(outputPath).size;
  const savedPct = Math.round((1 - afterSize / beforeSize) * 100);
  console.log(
    `  ${filename}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB (${savedPct}% smaller, max width ${maxWidth}px)`
  );
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    fs.mkdirSync(SOURCE_DIR, { recursive: true });
    console.log(`Created ${SOURCE_DIR} — drop your photos in there and run this again.`);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR).filter((f) => !f.startsWith("."));

  if (files.length === 0) {
    console.log(`No files in ${SOURCE_DIR} — nothing to do.`);
    return;
  }

  console.log(`Optimizing ${files.length} image(s) from raw-images/ into public/images/...\n`);

  for (const file of files) {
    try {
      await optimizeOne(file);
    } catch (err) {
      console.error(`  FAILED on ${file}:`, err.message);
    }
  }

  console.log("\nDone. Optimized files are in public/images/, ready to commit.");
}

main();
