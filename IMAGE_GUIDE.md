# Images: naming guide + optimization workflow

## The workflow

1. Drop your original, full-size photos into **`raw-images/`**, using the
   exact filenames from the list below.
2. Run:
   ```bash
   npm run optimize-images
   ```
3. Optimized, resized, compressed versions land in **`public/images/`**
   with the same filenames — the site picks them up automatically, no code
   changes needed.

Re-run `npm run optimize-images` any time you add or replace a photo in
`raw-images/`. It's safe to run repeatedly.

Why this exists: the site's images use plain `<img>` tags (via
`components/SmartImage.tsx`), not `next/image`, so that a missing photo can
gracefully fall back to a placeholder box instead of a broken-image icon.
That means Next.js isn't auto-compressing anything here — this script is
the optimization step that `next/image` would otherwise have handled.

## Full filename list

**Homepage heroes** (tall/vertical crop — they fill the full screen height):
- `hero-new-arrivals.jpg`
- `hero-designer-eyewear.jpg`
- `hero-womens-exclusive.jpg`

**Categories** (square, 1:1) — used on the homepage, Collections page, and
the Shop mega menu:
`category-sunglasses.jpg`, `category-designer-eyewear.jpg`,
`category-mens-eyewear.jpg`, `category-womens-eyewear.jpg`,
`category-kids-eyewear.jpg`, `category-sports-eyewear.jpg`,
`category-metal.jpg`, `category-flexible.jpg`

**Products** (portrait, 3:4) — four per product, named by the product's id:
`product-{id}-main.jpg`, `product-{id}-a.jpg`, `product-{id}-b.jpg`,
`product-{id}-c.jpg`. Current ids: `classic-aviator`, `round-acetate`,
`slim-metal`, `cat-eye`, `flexible-kids`, `polarized-sports`,
`browline-classic`, `oversized-square` (new products added via Notion will
need their own set using their Product ID).

**Brands** (landscape, 4:3): `brand-ray-ban.jpg`, `brand-dolce-gabbana.jpg`

**Store**: `store-dehiwala.jpg` (4:3)

**About page** (4:3): `about-story.jpg`, `about-work.jpg`,
`about-store.jpg` (this last one is the homepage strip, different photo
from the About page's own two)

**Search dropdown** (portrait, 3:4): `search-look-1.jpg`,
`search-look-2.jpg`, `search-look-3.jpg`

That's every image slot on the site.

## What the script actually does

- Resizes down to a sensible max width per image type (heroes get more
  headroom since they're full-bleed; category/search thumbnails need much
  less) — never upscales a smaller source image
- Re-compresses at a quality level that's visually close to lossless but a
  fraction of the file size
- Strips EXIF/metadata bloat (camera model, GPS location, etc. — data you
  don't want floating around on a public site anyway)
- Keeps the original filename and extension, so it's a drop-in replacement
  and nothing in the code ever needs to change

## If you'd rather not use the script

Any image editor or online compressor works too, as long as you save the
result back into `public/images/` under the exact filename from the list
above. The script is just there so you don't have to think about it.
