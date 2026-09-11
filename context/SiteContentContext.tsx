"use client";

import { createContext, useContext } from "react";
import type { CopyField } from "@/lib/site-content";

const SiteContentContext = createContext<Record<string, CopyField>>({});

export function SiteContentProvider({
  value,
  children,
}: {
  value: Record<string, CopyField>;
  children: React.ReactNode;
}) {
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
