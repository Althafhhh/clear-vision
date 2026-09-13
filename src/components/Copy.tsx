"use client";

import { useSiteContent } from "@/context/SiteContentContext";

export default function Copy({
  path,
  fallback,
  as: As = "span",
}: {
  path: string;
  fallback: string;
  /** Element to wrap the text in. Defaults to a plain inline span. */
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const overrides = useSiteContent();
  const field = overrides[path];
  const text = field?.value ?? fallback;

  if (!field?.color && As === "span") {
    // Common case: no color override, no need for an extra wrapper element.
    return <>{text}</>;
  }

  return <As style={field?.color ? { color: field.color } : undefined}>{text}</As>;
}

/** Plain string version, for props that need text rather than JSX (e.g. StickyHero's title prop). */
export function useCopyText(path: string, fallback: string): string {
  const overrides = useSiteContent();
  return overrides[path]?.value ?? fallback;
}

/** For fields stored in Notion as newline-separated lists (services, announcements). */
export function useCopyList(path: string, fallback: string[]): string[] {
  const overrides = useSiteContent();
  const field = overrides[path];
  if (!field?.value) return fallback;
  return field.value.split("\n").filter(Boolean);
}
