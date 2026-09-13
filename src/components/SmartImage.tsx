"use client";

import { useState } from "react";

export default function SmartImage({
  src,
  alt,
  fallbackLabel,
  eager = false,
  contain = false,
  adaptiveBg = false,
}: {
  src: string;
  alt: string;
  fallbackLabel?: string;
  /** Set true only for above-the-fold images (e.g. the first sticky hero)
   *  so the browser fetches it immediately instead of deferring it. */
  eager?: boolean;
  /** Show the whole photo, never cropped/zoomed (object-fit: contain)
   *  instead of the default fill-and-crop behavior. Use for product
   *  photos, which are studio shots with their own built-in framing. */
  contain?: boolean;
  /**
   * Only meaningful alongside `contain`. Instead of a flat background
   * color filling the gaps left by an image whose aspect ratio doesn't
   * match its box, this fills the gap with a blurred, zoomed-in copy of
   * the SAME photo — so the backdrop matches the image itself.
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
        className={contain ? "smart-image smart-image--contain" : "smart-image"}
        onError={() => setError(true)}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </>
  );
}
