"use client";

import { useLayoutEffect } from "react";
import { translations } from "../translations";

const revealGroups = [
  [".feature-strip article", "up"],
  [".featured-project-card", "zoom"],
  [".project-invitation", "left"],
  [".capability-grid article", "cascade"],
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

const waveTextBlocks = [
  ".hero-copy .eyebrow",
  ".hero-copy .lead",
  ".feature-strip strong",
  ".feature-strip p",
  ".section-heading > p",
  ".section-heading > span",
  ".featured-category",
  ".featured-description",
  ".project-invitation .concept-kicker",
  ".project-invitation .concept-copy > span",
  ".service-grid article > p",
  ".comparison-heading > p",
  ".comparison-column li",
  ".process-grid article > p",
  ".about-copy > p",
  ".about-card > small",
  ".about-card > strong",
  ".about-card > p",
  ".brief-copy > p",
  ".brief-copy > span",
  ".detail-hero-copy > p",
  ".detail-hero-copy > span",
  ".detail-story > div > p",
  ".detail-story > div > span",
  ".detail-section-heading > p",
  ".detail-section-heading > span",
  ".detail-feature-grid strong",
  ".detail-process article > span",
];

function prepareWaveText(element: HTMLElement, force = false) {
  if (element.dataset.waveReady === "true" && !force) return;

  const visibleLabel = element.textContent?.replace(/\s+/g, " ").trim();
  const sourceLabel = element.dataset.waveSource ?? visibleLabel;
  if (!sourceLabel) return;

  element.dataset.waveSource = sourceLabel;
  const english = document.documentElement.lang === "en";
  const label = english ? translations[sourceLabel] ?? sourceLabel : sourceLabel;
  element.textContent = label;

  element.dataset.waveReady = "true";
  element.classList.add("wave-text");
  element.classList.remove("wave-block");

  // English copy is usually longer and wraps more often. Animating it as one
  // block prevents individual words from crossing adjacent lines mid-motion.
  if (english || label.length > 160) {
    element.classList.add("wave-block");
    return;
  }

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let currentNode = walker.nextNode();

  while (currentNode) {
    textNodes.push(currentNode as Text);
    currentNode = walker.nextNode();
  }

  let wordIndex = 0;
  const delayStep = label.length > 180 ? 18 : label.length > 90 ? 24 : 34;

  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();

    (textNode.textContent ?? "").split(/(\s+)/).forEach((token) => {
      if (!token) return;

      if (/^\s+$/.test(token)) {
        fragment.append(document.createTextNode(token));
        return;
      }

      const word = document.createElement("span");
      word.className = "wave-word";
      word.style.setProperty("--word-delay", `${Math.min(wordIndex * delayStep, 520)}ms`);
      word.textContent = token;
      wordIndex += 1;

      fragment.append(word);
    });

    textNode.parentNode?.replaceChild(fragment, textNode);
  });
}

export default function ScrollReveal() {
  useLayoutEffect(() => {
    let cleanup: (() => void) | undefined;
    let started = false;
    const initialize = () => {
      if (started) return;
      started = true;
      cleanup = setup();
    };
    function setup() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = new Set<HTMLElement>();
    const progressElement = document.querySelector<HTMLElement>("[data-scroll-reveal-controller]");
    let frame = 0;

    const updateScrollProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        const progress = distance > 0 ? Math.min(Math.max(window.scrollY / distance, 0), 1) : 0;
        if (progressElement) progressElement.style.transform = `scaleX(${progress.toFixed(4)})`;
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

    waveTextBlocks.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach(prepareWaveText);
    });

    const updateWaveLanguage = () => {
      waveTextBlocks.forEach((selector) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((element) => prepareWaveText(element, true));
      });
    };

    window.addEventListener("cvf-language-change", updateWaveLanguage);

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => {
        window.removeEventListener("cvf-language-change", updateWaveLanguage);
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
      window.removeEventListener("cvf-language-change", updateWaveLanguage);
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollProgress);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("reveal-ready");
    };
    }
    // Keep text splitting and background entrance effects out of the intro.
    const waitForIntro = document.querySelector(".brand-intro") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !window.location.hash;
    window.addEventListener("cvf-intro-complete", initialize, { once: true });
    if (!waitForIntro) initialize();
    const safetyTimer = window.setTimeout(initialize, 3500);
    return () => {
      window.clearTimeout(safetyTimer);
      window.removeEventListener("cvf-intro-complete", initialize);
      cleanup?.();
    };
  }, []);

  return <span className="scroll-progress" data-scroll-reveal-controller aria-hidden="true" />;
}
