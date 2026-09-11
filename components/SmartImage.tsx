"use client";

import { useState } from "react";

export default function SmartImage({
  src,
  alt,
  fallbackLabel,
  eager = false,
}: {
  src: string;
  alt: string;
  fallbackLabel?: string;
  /** Set true only for above-the-fold images (e.g. the first sticky hero)
   *  so the browser fetches it immediately instead of deferring it. */
  eager?: boolean;
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
    // Plain <img>, not next/image: these are user-uploaded product/lifestyle
    // photos of unknown dimensions dropped straight into /public/images,
    // so there's no build-time size to optimize against. Actual file-size
    // optimization happens via `npm run optimize-images` before upload.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="smart-image"
      onError={() => setError(true)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}
