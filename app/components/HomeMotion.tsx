"use client";

import { useEffect } from "react";

/** Progressive enhancement: all content stays visible without JavaScript. */
export default function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector(".ssd-site");
    if (!root) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    function connect() {
      observer?.disconnect();
      if (motionPreference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      root?.querySelectorAll("[data-reveal]").forEach((element) => observer?.observe(element));
    }

    connect();
    motionPreference.addEventListener("change", connect);

    const menu = root.querySelector<HTMLDetailsElement>(".mobile-menu");
    const closeMenu = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("a") && menu) menu.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    menu?.addEventListener("click", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener("change", connect);
      menu?.removeEventListener("click", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return null;
}
