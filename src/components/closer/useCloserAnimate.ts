"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTORS = [
  ".closer-pain-item",
  ".closer-what-card",
  ".closer-feature-card",
  ".closer-flow-step",
  ".closer-service-card",
  ".closer-pricing-card",
  ".closer-work-card",
].join(", ");

export function useCloserAnimate() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(SELECTORS);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    els.forEach((el) => el.classList.remove("in-view"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}
