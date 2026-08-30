"use client";

import { useEffect } from "react";

const revealGroups = [
  ".feature-strip article",
  ".featured-carousel",
  ".project-invitation",
  ".capability-grid article",
  ".service-grid article",
  ".comparison-board > *",
  ".process-grid article",
  ".about-section > *",
  ".brief-section > *",
  ".detail-summary > div",
  ".detail-story > *",
  ".detail-feature-grid article",
  ".detail-process article",
  ".detail-cta > div",
  ".detail-footer > *",
];

const revealBlocks = [
  ".section-heading",
  ".quote-intro",
  ".quote-builder",
  ".comparison-heading",
  ".detail-section-heading",
];

export default function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = new Set<HTMLElement>();

    revealBlocks.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.dataset.reveal = "up";
        elements.add(element);
      });
    });

    revealGroups.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        const isProject = element.matches(".project-card");
        element.dataset.reveal = isProject && index % 2 ? "right" : "up";
        element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
        elements.add(element);
      });
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0.01 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <span hidden data-scroll-reveal-controller aria-hidden="true" />;
}
