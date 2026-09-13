"use client";

import { usePathname } from "next/navigation";

export default function PageOffset({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return <div className={isHome ? "" : "page-offset"}>{children}</div>;
}
