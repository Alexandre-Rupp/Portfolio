"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";

type CrosshairProps = {
  color?: string;
  containerRef?: RefObject<HTMLElement | null>;
};

const lerp = (a: number, b: number, amount: number) => (1 - amount) * a + amount * b;

function getMousePos(event: MouseEvent, container?: HTMLElement | null) {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };
  }

  return { x: event.clientX, y: event.clientY };
}

export default function Crosshair({ color = "#ffffff", containerRef }: CrosshairProps) {
  const lineHorizontalRef = useRef<HTMLDivElement | null>(null);
  const lineVerticalRef = useRef<HTMLDivElement | null>(null);
  const filterXRef = useRef<SVGFETurbulenceElement | null>(null);
  const filterYRef = useRef<SVGFETurbulenceElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const target = containerRef?.current ?? window;
    const container = containerRef?.current ?? null;

    const rendered = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 }
    };

    const setCrosshairOpacity = (value: number) => {
      if (!lineHorizontalRef.current || !lineVerticalRef.current) return;
      gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
        opacity: value,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = getMousePos(event, container);

      if (container) {
        const bounds = container.getBoundingClientRect();
        const isInside =
          event.clientX >= bounds.left &&
          event.clientX <= bounds.right &&
          event.clientY >= bounds.top &&
          event.clientY <= bounds.bottom;
        setCrosshairOpacity(isInside ? 1 : 0);
        return;
      }

      setCrosshairOpacity(1);
    };

    const primitiveValues = { turbulence: 0 };
    const distortionTimeline = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = "url(#intro-filter-noise-x)";
            lineVerticalRef.current.style.filter = "url(#intro-filter-noise-y)";
          }
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute("baseFrequency", String(primitiveValues.turbulence));
            filterYRef.current.setAttribute("baseFrequency", String(primitiveValues.turbulence));
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = "none";
            lineVerticalRef.current.style.filter = "none";
          }
        }
      })
      .to(primitiveValues, {
        duration: 0.45,
        ease: "power1.out",
        startAt: { turbulence: 1 },
        turbulence: 0
      });

    const hoverTargets = container
      ? Array.from(container.querySelectorAll<HTMLElement>(".crosshair-target"))
      : Array.from(document.querySelectorAll<HTMLElement>(".crosshair-target"));

    const handleEnterTarget = () => distortionTimeline.restart();
    hoverTargets.forEach((item) => item.addEventListener("mouseenter", handleEnterTarget));

    if (lineHorizontalRef.current && lineVerticalRef.current) {
      gsap.set([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });
    }

    const render = () => {
      rendered.tx.current = mouseRef.current.x;
      rendered.ty.current = mouseRef.current.y;

      rendered.tx.previous = lerp(rendered.tx.previous, rendered.tx.current, rendered.tx.amt);
      rendered.ty.previous = lerp(rendered.ty.previous, rendered.ty.current, rendered.ty.amt);

      if (lineVerticalRef.current && lineHorizontalRef.current) {
        gsap.set(lineVerticalRef.current, { x: rendered.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: rendered.ty.previous });
      }

      rafId = window.requestAnimationFrame(render);
    };

    let rafId = window.requestAnimationFrame(render);
    target.addEventListener("mousemove", handleMouseMove as EventListener);

    return () => {
      target.removeEventListener("mousemove", handleMouseMove as EventListener);
      hoverTargets.forEach((item) => item.removeEventListener("mouseenter", handleEnterTarget));
      distortionTimeline.kill();
      window.cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20
      }}
      aria-hidden="true"
    >
      <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
        <defs>
          <filter id="intro-filter-noise-x">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterXRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="intro-filter-noise-y">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterYRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>

      <div
        ref={lineHorizontalRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          background: color,
          transform: "translateY(50%)",
          opacity: 0
        }}
      />
      <div
        ref={lineVerticalRef}
        style={{
          position: "absolute",
          height: "100%",
          width: "1px",
          background: color,
          transform: "translateX(50%)",
          opacity: 0
        }}
      />
    </div>
  );
}
