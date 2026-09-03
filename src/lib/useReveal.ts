import { useEffect } from "react";

/** Adds the `reveal-in` class to any `[data-reveal]` and `.reveal` elements scrolled into view. */
export function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const revealAll = (el: Element) => {
      el.classList.add("reveal-in");
      el.querySelectorAll(".reveal, [data-reveal]").forEach((c) => c.classList.add("reveal-in"));
    };

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], .reveal"));
    
    // Check elements already visible in viewport immediately
    nodes.forEach((n) => {
      const rect = n.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        revealAll(n);
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAll(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "60px 0px 60px 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [enabled]);
}
