"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Handles scroll-to-top on route change and IntersectionObserver-based
// scroll reveal animations. Mobile always shows content immediately —
// prevents blank pages on iOS Safari where the observer can misfire.
export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.innerWidth < 769) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
