"use client";

import Link from "next/link";
import SmartImage from "@/components/SmartImage";

type StickyHeroProps = {
  eyebrow: string;
  title: string;
  cta: { label: string; href: string };
  /** Filename inside /public/images, e.g. "hero-new-arrivals.jpg" */
  image: string;
  /** Extra scroll room (vh) the hero stays pinned for before releasing. */
  pinAmount?: number;
  /** Set true only for the first hero on the page (visible on load). */
  eager?: boolean;
};

// How this works: the OUTER wrapper is taller than the viewport (100vh + pinAmount).
// The INNER frame (image + text) is `position: sticky; top: 0; height: 100vh`.
// While the page scrolls through that extra height, the sticky frame stays pinned
// to the top of the viewport, image and text move together, not apart. Once the
// wrapper's bottom edge reaches the viewport top, the sticky frame un-pins and
// scrolls away normally with the rest of the page. Scrolling back up reverses this.
export default function StickyHero({
  eyebrow,
  title,
  cta,
  image,
  pinAmount = 40,
  eager = false,
}: StickyHeroProps) {
  return (
    <div className="sticky-hero-wrap" style={{ height: `calc(100vh + ${pinAmount}vh)` }}>
      <div className="sticky-hero-frame">
        {/*
          Aspect ratio: full-bleed, fills the viewport (a tall/vertical crop
          works better than a wide landscape shot since this fills 100vh).
        */}
        <div className="sticky-hero-photo">
          <SmartImage src={`/images/${image}`} alt={eyebrow} fallbackLabel={eyebrow} eager={eager} />
        </div>

        <div className="sticky-hero-copy">
          <span className="sticky-hero-eyebrow">{eyebrow}</span>
          <h1 className="sticky-hero-title">{title}</h1>
          <Link href={cta.href} className="btn--hero">
            {cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
