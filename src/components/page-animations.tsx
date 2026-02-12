"use client";

import { animate, stagger } from "animejs";
import type { AnimationParams } from "animejs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type AnimeLike = { pause?: () => void };

export default function PageAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const running: AnimeLike[] = [];
    const run = (selector: string, params: AnimationParams) => {
      const elements = Array.from(document.querySelectorAll(selector));
      if (!elements.length) return;
      running.push(animate(elements, params));
    };

    run(".dashboard-link", {
      opacity: [0, 1],
      y: [-8, 0],
      duration: 460,
      delay: stagger(60),
      ease: "out(3)"
    });

    run(".hero-panel, .section-hero", {
      opacity: [0, 1],
      y: [18, 0],
      duration: 720,
      ease: "out(3)"
    });

    run(".stat-card, .menu-card, .logo-card, .content-card, .devops-card, .timeline-entry", {
      opacity: [0, 1],
      y: [16, 0],
      duration: 680,
      delay: stagger(75, { start: 110 }),
      ease: "out(3)"
    });

    run(".motion-pill", {
      opacity: [0, 1],
      x: [12, 0],
      duration: 520,
      delay: stagger(24, { start: 180 }),
      ease: "out(3)"
    });

    run(".pipeline-strip div", {
      opacity: [0.55, 1],
      scale: [0.96, 1],
      duration: 520,
      delay: stagger(90, { start: 200 }),
      ease: "out(3)"
    });

    const pipelineSteps = Array.from(document.querySelectorAll(".pipeline-strip div"));
    if (pipelineSteps.length) {
      running.push(
        animate(pipelineSteps, {
          scale: [1, 1.04, 1],
          duration: 1800,
          delay: stagger(130),
          loop: true,
          ease: "inOutSine"
        })
      );
    }

    return () => {
      running.forEach((anim) => anim.pause?.());
    };
  }, [pathname]);

  return null;
}
