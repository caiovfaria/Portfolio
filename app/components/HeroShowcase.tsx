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
    void import("@google/model-viewer").then(() => setViewerReady(true));

    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer || !viewerReady || reducedMotion) return;

    let frame = 0;
    let lastUpdate = 0;
    const animate = (time: number) => {
      if (time - lastUpdate > 32) {
        const angle = Math.sin(time / 1500) * 32;
        const height = 77 + Math.sin(time / 3000) * 3;
        viewer.setAttribute("camera-orbit", `${angle.toFixed(2)}deg ${height.toFixed(2)}deg 105%`);
        lastUpdate = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
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
