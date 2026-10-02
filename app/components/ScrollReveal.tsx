"use client";

import { useLayoutEffect } from "react";

const revealGroups = [
  [".feature-strip article", "up"],
  [".featured-project-card", "zoom"],
  [".project-invitation", "left"],
  [".capability-grid article", "up"],
  [".service-grid article", "up"],
  [".comparison-board > *", "up"],
  [".process-grid article", "up"],
  [".about-section > *", "zoom"],
  [".brief-section > *", "up"],
  [".detail-summary > div", "up"],
  [".detail-story > *", "up"],
  [".detail-feature-grid article", "up"],
  [".detail-process article", "up"],
  [".detail-cta > div", "zoom"],
  [".detail-footer > *", "up"],
] as const;

const revealBlocks = [
  ".hero-copy > *",
  ".hero-visual",
  ".section-heading",
  ".quote-intro",
  ".quote-builder",
  ".comparison-heading",
  ".detail-section-heading",
];

export default function ScrollReveal() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = new Set<HTMLElement>();
    let frame = 0;

    const updateScrollProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        const progress = distance > 0 ? Math.min(Math.max(window.scrollY / distance, 0), 1) : 0;
        document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      });
    };

    revealBlocks.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.dataset.reveal = "up";
        element.style.setProperty("--reveal-delay", `${Math.min(index * 85, 340)}ms`);
        elements.add(element);
      });
    });

    revealGroups.forEach(([selector, variant]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.dataset.reveal = variant;
        element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
        elements.add(element);
      });
    });

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => {
        window.removeEventListener("scroll", updateScrollProgress);
        cancelAnimationFrame(frame);
      };
    }

    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollProgress);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("reveal-ready");
      document.documentElement.style.removeProperty("--scroll-progress");
    };
  }, []);

  return <span className="scroll-progress" data-scroll-reveal-controller aria-hidden="true" />;
}
