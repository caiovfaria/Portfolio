"use client";

import { useEffect, useRef, useState } from "react";
import "../brand-intro.css";

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const layer = useRef<HTMLDivElement>(null);
  const mark = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let closing = false;
    const timers: number[] = [];
    const animations: Animation[] = [];
    const hide = () => {
      if (!disposed) {
        setVisible(false);
        window.dispatchEvent(new Event("cvf-intro-complete"));
      }
    };
    const exit = () => {
      if (closing || disposed) return;
      closing = true;
      layer.current?.classList.add("is-departing");
      const target = document.querySelector(".site-header .brand-mark");
      if (preference.matches || !target || !mark.current || !layer.current) {
        hide();
        return;
      }
      const from = mark.current.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      animations.push(mark.current.animate([
        { transform: "translate(0, 0) scale(1)" },
        { transform: `translate(${to.left + to.width / 2 - from.left - from.width / 2}px, ${to.top + to.height / 2 - from.top - from.height / 2}px) scale(${to.width / from.width}, ${to.height / from.height})` },
      ], { duration: 650, easing: "cubic-bezier(.65,0,.25,1)", fill: "forwards" }));
      const backdrop = layer.current.querySelector(".brand-intro-backdrop");
      if (backdrop) animations.push(backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, fill: "forwards" }));
      timers.push(window.setTimeout(hide, 670));
    };
    if (preference.matches || window.location.hash) {
      hide();
      return;
    }
    const onPreference = () => { if (preference.matches) exit(); };
    preference.addEventListener("change", onPreference);
    // The model loads in parallel; a slow GPU/network must not hold the page hostage.
    timers.push(window.setTimeout(exit, 2050));
    return () => {
      disposed = true;
      timers.forEach(window.clearTimeout);
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", onPreference);
    };
  }, []);

  if (!visible) return null;
  return (
    <div className="brand-intro" ref={layer}>
      <div className="brand-intro-backdrop" aria-hidden="true">
        <div className="intro-halo" />
      </div>
      <div className="intro-details" aria-hidden="true" data-no-translate>
        <span className="intro-corner intro-corner-top">CVF <i /> DIGITAL STUDIO</span>
        <div className="intro-signature"><span>SOLUÇÕES DIGITAIS</span><div className="intro-progress"><i /></div></div>
        <span className="intro-corner intro-corner-bottom">CLAREZA · PERFORMANCE · CONVERSÃO</span>
      </div>
      <svg ref={mark} className="brand-intro-mark" viewBox="0 0 1111 892" aria-hidden="true">
        <defs>
          <path id="intro-monogram" d="M 25 451 L 32 401 L 49 342 L 76 283 L 107 234 L 142 191 L 182 151 L 217 122 L 268 88 L 319 62 L 370 43 L 421 31 L 474 25 L 526 25 L 576 31 L 633 47 L 682 70 L 712 90 L 717 95 L 714 99 L 662 69 L 615 52 L 549 40 L 503 39 L 441 49 L 399 65 L 356 88 L 289 139 L 233 201 L 203 246 L 180 290 L 165 326 L 150 379 L 111 395 L 80 417 L 54 448 L 38 488 L 36 527 L 39 527 L 42 503 L 50 479 L 72 445 L 105 419 L 122 411 L 156 402 L 225 401 L 259 404 L 358 430 L 412 439 L 394 447 L 384 460 L 383 481 L 387 495 L 429 564 L 544 729 L 562 750 L 694 564 L 702 548 L 710 516 L 709 244 L 704 227 L 689 203 L 670 188 L 653 181 L 959 181 L 987 177 L 1021 166 L 1055 147 L 1071 132 L 1086 109 L 1087 114 L 1081 137 L 1061 179 L 1036 215 L 1006 248 L 1006 234 L 1002 230 L 989 227 L 818 227 L 802 231 L 782 245 L 776 255 L 772 273 L 772 420 L 799 400 L 820 393 L 933 392 L 970 385 L 1008 365 L 1027 347 L 1036 334 L 1038 336 L 1031 358 L 999 413 L 956 461 L 954 460 L 957 446 L 952 439 L 937 432 L 923 430 L 830 432 L 809 440 L 787 459 L 775 488 L 775 538 L 781 555 L 799 564 L 760 579 L 728 607 L 545 868 L 308 511 L 281 477 L 255 452 L 230 435 L 197 422 L 153 418 L 135 424 L 121 438 L 113 459 L 112 524 L 126 581 L 151 632 L 175 665 L 203 692 L 229 711 L 282 736 L 335 747 L 362 747 L 384 743 L 412 731 L 430 715 L 435 719 L 437 725 L 425 736 L 393 752 L 350 763 L 299 765 L 235 755 L 181 735 L 138 710 L 93 670 L 56 617 L 38 572 L 26 515 Z" />
          <mask id="intro-draw" maskUnits="userSpaceOnUse" x="0" y="0" width="1111" height="892">
          <g fill="none" stroke="white" strokeWidth="180" strokeLinecap="round" strokeLinejoin="round">
            <path className="intro-stroke intro-c" pathLength="1" d="M720 100 C400 -80 40 180 70 490 C60 700 290 830 440 715" />
            <path className="intro-stroke intro-v" pathLength="1" d="M110 440 Q220 330 320 490 L548 820 L750 545" />
            <path className="intro-stroke intro-f" pathLength="1" d="M680 195 L1030 195 L1090 110 M750 215 L750 580 M750 450 L1025 350" />
          </g>
        </mask></defs>
        <use href="#intro-monogram" fill="white" mask="url(#intro-draw)" />
        <use className="intro-complete" href="#intro-monogram" fill="white" />
      </svg>
    </div>
  );
}
