"use client";

import Image from "next/image";
import { createElement, useEffect, useRef, useState } from "react";

export default function HeroShowcase() {
  const [viewerReady, setViewerReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const modelViewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    let mounted = true;
    let started = false;
    const startViewer = () => {
      if (started || !mounted) return;
      started = true;
      void import("@google/model-viewer").then(() => { if (mounted) setViewerReady(true); }).catch(() => {
        modelViewerRef.current?.dispatchEvent(new Event("error"));
      });
    };
    // Fetch the model during the intro, but postpone parsing the viewer and
    // creating its WebGL context until the foreground animation has finished.
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "fetch";
    preload.href = "/brand/logo-cvf-3d.glb?v=2";
    preload.crossOrigin = "anonymous";
    document.head.append(preload);
    window.addEventListener("cvf-intro-complete", startViewer, { once: true });
    if (!document.querySelector(".brand-intro") || motionPreference.matches || window.location.hash) startViewer();
    const fallbackTimer = window.setTimeout(startViewer, 3500);

    return () => {
      mounted = false;
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("cvf-intro-complete", startViewer);
      preload.remove();
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer || !viewerReady || reducedMotion) return;

    let frame = 0;
    let lastUpdate = 0;
    let inView = true;
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
    observer.observe(viewer);
    const animate = (time: number) => {
      if (time - lastUpdate > 32 && inView && !document.hidden) {
        const angle = Math.sin(time / 1500) * 32;
        const height = 77 + Math.sin(time / 3000) * 3;
        viewer.setAttribute("camera-orbit", `${angle.toFixed(2)}deg ${height.toFixed(2)}deg 105%`);
        lastUpdate = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); };
  }, [reducedMotion, viewerReady]);

  const modelViewer = createElement("model-viewer", {
    class: "hero-logo-model",
    ref: modelViewerRef,
    src: "/brand/logo-cvf-3d.glb?v=2",
    poster: "/brand/cvf-monogram-white-clean-v1.png",
    alt: "Monograma tridimensional CVF",
    loading: "eager",
    reveal: "auto",
    exposure: "1.35",
    "tone-mapping": "commerce",
    "shadow-intensity": "0",
    "camera-orbit": "0deg 78deg 105%",
    "field-of-view": "26deg",
    "interaction-prompt": "none",
  });

  return (
    <div className="hero-visual hero-logo-stage" role="img" aria-label="Logo tridimensional CVF girando lentamente">
      <div className={`hero-logo-viewer${viewerReady ? " is-ready" : ""}`}>
        <Image
          className="hero-logo-fallback"
          src="/brand/cvf-monogram-white-clean-v1.png"
          alt=""
          width={520}
          height={520}
          priority
          aria-hidden="true"
        />
        {modelViewer}
      </div>
      <div className="hero-logo-caption" aria-hidden="true">
        <b>CVF</b>
        <span>SOLUÇÕES DIGITAIS</span>
      </div>
    </div>
  );
}
