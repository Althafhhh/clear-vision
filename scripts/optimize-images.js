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
 * Usage (default — the raw-images/ workflow):
 *   1. Drop your original, full-size photos into raw-images/
 *      (use the exact filenames from the image naming guide, e.g.
 *      hero-new-arrivals.jpg, product-classic-aviator-main.jpg, etc.
 *      .jpg, .png, .webp, and .avif are all accepted as input).
 *   2. Run: npm run optimize-images
 *   3. Optimized versions land in public/images/ as .jpg (AVIF/WebP inputs
 *      get converted to .jpg on the way out — everything else keeps its
 *      original extension) — no code changes needed, ever. SmartImage
 *      just picks them up.
 *
 * Usage (any other folder — e.g. images already sitting in public/images/,
 * or a folder that isn't part of this project at all):
 *   npm run optimize-images -- <source-folder> [output-folder]
 *
 *   If you omit <output-folder>, images are optimized IN PLACE — each file
 *   is overwritten by its own optimized version, same folder, same name
 *   (AVIF inputs still become .jpg, so e.g. photo.avif becomes photo.jpg
 *   sitting next to where photo.avif used to be, not replacing it in place).
 *
 *   Examples:
 *     npm run optimize-images -- public/images
 *     npm run optimize-images -- ~/Desktop/new-photos public/images
 *
 * What it does to each image:
 *   - Resizes down to a sensible max width (won't upscale a smaller image)
 *   - Re-compresses at a quality level that's visually near-identical but
 *     a fraction of the file size
 *   - Strips EXIF/metadata bloat (camera info, GPS tags, etc.)
 *
 * Safe to run repeatedly — it just re-processes whatever's in the source
 * folder each time.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const [, , argSource, argOutput] = process.argv;

const SOURCE_DIR = argSource
  ? path.resolve(process.cwd(), argSource)
  : path.join(__dirname, "..", "raw-images");

// No output folder given: optimize in place (same folder as the source).
const OUTPUT_DIR = argOutput
  ? path.resolve(process.cwd(), argOutput)
  : argSource
    ? SOURCE_DIR
    : path.join(__dirname, "..", "public", "images");

const OPTIMIZING_IN_PLACE = SOURCE_DIR === OUTPUT_DIR;

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
  if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) {
    console.log(`  skip (not an image): ${filename}`);
    return;
  }

  const inputPath = path.join(SOURCE_DIR, filename);
  // AVIF in, JPG out — .avif isn't part of the site's naming convention
  // and isn't as universally droppable into other tools (Notion included),
  // so it always gets normalized to .jpg on the way out.
  const outputFilename = ext === ".avif" ? filename.slice(0, -ext.length) + ".jpg" : filename;
  const outputPath = path.join(OUTPUT_DIR, outputFilename);
  const maxWidth = getMaxWidth(filename);

  // Optimizing in place with no extension change: write to a temp name
  // first so we never read and write the same file at once.
  const tempPath = outputPath + ".tmp";

  const beforeSize = fs.statSync(inputPath).size;

  let pipeline = sharp(inputPath).rotate(); // auto-orient from EXIF, then strip it
  pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });

  const outExt = path.extname(outputFilename).toLowerCase();
  if (outExt === ".png") {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  } else if (outExt === ".webp") {
    pipeline = pipeline.webp({ quality: JPEG_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  await pipeline.toFile(tempPath);
  fs.renameSync(tempPath, outputPath);

  // In-place AVIF input: the output filename differs (.avif -> .jpg), so
  // the original .avif is still sitting there once the .jpg exists next
  // to it. Remove it so you don't end up with both.
  if (OPTIMIZING_IN_PLACE && ext === ".avif" && outputPath !== inputPath) {
    fs.unlinkSync(inputPath);
  }

  const afterSize = fs.statSync(outputPath).size;
  const savedPct = Math.round((1 - afterSize / beforeSize) * 100);
  console.log(
    `  ${filename} -> ${outputFilename}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB (${savedPct}% smaller, max width ${maxWidth}px)`
  );
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    if (argSource) {
      console.error(`No such folder: ${SOURCE_DIR}`);
      process.exitCode = 1;
      return;
    }
    fs.mkdirSync(SOURCE_DIR, { recursive: true });
    console.log(`Created ${SOURCE_DIR} — drop your photos in there and run this again.`);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR).filter((f) => !f.startsWith(".") && !f.endsWith(".tmp"));

  if (files.length === 0) {
    console.log(`No files in ${SOURCE_DIR} — nothing to do.`);
    return;
  }

  console.log(
    `Optimizing ${files.length} image(s) from ${path.relative(process.cwd(), SOURCE_DIR) || "."}` +
      (OPTIMIZING_IN_PLACE ? " (in place)" : ` into ${path.relative(process.cwd(), OUTPUT_DIR)}`) +
      "...\n"
  );

  for (const file of files) {
    try {
      await optimizeOne(file);
    } catch (err) {
      console.error(`  FAILED on ${file}:`, err.message);
    }
  }

  console.log("\nDone.");
}

main();

