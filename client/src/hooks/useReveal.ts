import { useEffect } from "react";

/**
 * Adds 'is-visible' class to all elements with class 'reveal'
 * once they enter the viewport. Used by Western Public Academy
 * for editorial fade-up reveals.
 *
 * Strategy:
 *  - Reveal elements are visible by default (so server-side renders look correct).
 *  - On mount, we mark <body> with 'will-reveal'. CSS uses that to hide reveal
 *    elements that haven't been observed yet. The IntersectionObserver then
 *    flips them to 'is-visible' when they enter the viewport.
 *  - Respects prefers-reduced-motion.
 */
export function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const root = document.body;
    root.classList.add("will-reveal");

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    // Above-the-fold: mark immediately
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add("is-visible");
      } else {
        io.observe(el);
      }
    });

    return () => {
      io.disconnect();
      root.classList.remove("will-reveal");
    };
  }, []);
}
