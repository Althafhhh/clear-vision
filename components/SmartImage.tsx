"use client";

import { useState } from "react";

export default function SmartImage({
  src,
  alt,
  fallbackLabel,
  eager = false,
  adaptiveBg = false,
}: {
  src: string;
  alt: string;
  fallbackLabel?: string;
  /** Set true only for above-the-fold images (e.g. the first sticky hero)
   *  so the browser fetches it immediately instead of deferring it. */
  eager?: boolean;
  /**
   * For product photos, which are never cropped (object-fit: contain).
   * When the photo's own aspect ratio doesn't match its box, this fills
   * the gap with a blurred, zoomed-in copy of the SAME photo instead of a
   * flat fallback color — so the backdrop always matches the image,
   * whatever its background happens to be.
   */
  adaptiveBg?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="smart-image-fallback">
        <span>{fallbackLabel ?? alt}</span>
      </div>
    );
  }

  return (
    <>
      {adaptiveBg && (
        // Purely decorative backdrop — hidden from screen readers, and
        // never the element that reports a load error (the real <img>
        // below already covers that).
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" aria-hidden="true" className="smart-image-backdrop" />
      )}
      {/* Plain <img>, not next/image: these are user-uploaded product/lifestyle
          photos of unknown dimensions dropped straight into /public/images,
          so there's no build-time size to optimize against. Actual file-size
          optimization happens via `npm run optimize-images` before upload. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={adaptiveBg ? "smart-image smart-image--contain" : "smart-image"}
        onError={() => setError(true)}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </>
  );
}
