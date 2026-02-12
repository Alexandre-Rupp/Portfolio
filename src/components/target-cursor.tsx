"use client";

import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

type TargetCursorProps = {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
};

const DEFAULT_TARGET_SELECTOR =
  ".stat-card, .logo-card, .devops-card";

const CURSOR_CLASSNAME = "target-cursor-enabled";

export default function TargetCursor({
  targetSelector = DEFAULT_TARGET_SELECTOR,
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTlRef = useRef<gsap.core.Timeline | null>(null);
  const targetCornerPositionsRef = useRef<Array<{ x: number; y: number }> | null>(null);
  const activeStrengthRef = useRef({ current: 0 });
  const tickerFnRef = useRef<(() => void) | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const getNumericProp = useCallback((target: gsap.TweenTarget, prop: string) => {
    return Number(gsap.getProperty(target, prop));
  }, []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) {
      return;
    }

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
      overwrite: "auto"
    });
  }, []);

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const smallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileAgent =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    setIsMobile((touch && smallScreen) || mobileAgent);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || isMobile || !cursorRef.current) {
      return;
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner");

    const borderWidth = 3;
    const cornerSize = 12;

    let activeTarget: HTMLElement | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: HTMLElement) => {
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    const hideCursorOverlay = () => {
      if (!cursorRef.current) {
        return;
      }
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    };

    const setInitialCorners = () => {
      if (!cornersRef.current) {
        return;
      }
      const positions = [
        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
        { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
      ];
      Array.from(cornersRef.current).forEach((corner, index) => {
        gsap.set(corner, positions[index]);
      });
    };

    const createSpinTimeline = () => {
      spinTlRef.current?.kill();
      spinTlRef.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    if (hideDefaultCursor) {
      document.body.classList.add(CURSOR_CLASSNAME);
    }

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0
    });
    setInitialCorners();
    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current.current;
      if (strength === 0) {
        return;
      }

      const cursorX = getNumericProp(cursorRef.current, "x");
      const cursorY = getNumericProp(cursorRef.current, "y");

      Array.from(cornersRef.current).forEach((corner, index) => {
        const currentX = getNumericProp(corner, "x");
        const currentY = getNumericProp(corner, "y");

        const targetX = targetCornerPositionsRef.current![index].x - cursorX;
        const targetY = targetCornerPositionsRef.current![index].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration,
          ease: duration === 0 ? "none" : "power1.out",
          overwrite: "auto"
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const handleMove = (event: MouseEvent) => {
      moveCursor(event.clientX, event.clientY);

      const hoveredTarget = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest(targetSelector) as HTMLElement | null;

      if (!hoveredTarget) {
        if (activeTarget && currentLeaveHandler) {
          currentLeaveHandler();
          return;
        }

        hideCursorOverlay();
      }
    };
    const handleDown = () => {
      if (!dotRef.current || !cursorRef.current) {
        return;
      }
      gsap.to(dotRef.current, { scale: 0.72, duration: 0.2, ease: "power2.out" });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2, ease: "power2.out" });
    };
    const handleUp = () => {
      if (!dotRef.current || !cursorRef.current) {
        return;
      }
      gsap.to(dotRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const leaveTarget = (target: HTMLElement) => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }

      targetCornerPositionsRef.current = null;
      gsap.set(activeStrengthRef.current, { current: 0, overwrite: true });

      if (cornersRef.current) {
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
        ];

        Array.from(cornersRef.current).forEach((corner, index) => {
          gsap.to(corner, {
            x: positions[index].x,
            y: positions[index].y,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto"
          });
        });
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }

      resumeTimeout = setTimeout(() => {
        if (activeTarget || !cursorRef.current) {
          return;
        }

        const currentRotation = getNumericProp(cursorRef.current, "rotation");
        const normalized = ((currentRotation % 360) + 360) % 360;

        spinTlRef.current?.kill();
        spinTlRef.current = gsap
          .timeline({ repeat: -1 })
          .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });

        gsap.to(cursorRef.current, {
          rotation: normalized + 360,
          duration: spinDuration * (1 - normalized / 360),
          ease: "none",
          onComplete: () => spinTlRef.current?.restart()
        });
      }, 50);

      cleanupTarget(target);
    };

    const handleEnter = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(targetSelector) as
        | HTMLElement
        | null;
      if (!target || !cursorRef.current || !cornersRef.current) {
        return;
      }
      if (activeTarget === target) {
        return;
      }

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.12, ease: "power2.out" });

      spinTlRef.current?.pause();
      gsap.to(cursorRef.current, { rotation: 0, duration: 0.2, ease: "power2.out" });

      const rect = target.getBoundingClientRect();
      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        {
          x: rect.right + borderWidth - cornerSize,
          y: rect.bottom + borderWidth - cornerSize
        },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
      ];

      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
        gsap.ticker.add(tickerFnRef.current);
      }

      gsap.to(activeStrengthRef.current, {
        current: 1,
        duration: hoverDuration,
        ease: "power2.out",
        overwrite: "auto"
      });

      const cursorX = getNumericProp(cursorRef.current, "x");
      const cursorY = getNumericProp(cursorRef.current, "y");

      Array.from(cornersRef.current).forEach((corner, index) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current![index].x - cursorX,
          y: targetCornerPositionsRef.current![index].y - cursorY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      const onLeave = () => {
        if (!activeTarget) {
          return;
        }
        const leavingTarget = activeTarget;
        activeTarget = null;
        hideCursorOverlay();
        leaveTarget(leavingTarget);
      };

      currentLeaveHandler = onLeave;
      target.addEventListener("mouseleave", onLeave);
    };

    const handleScroll = () => {
      if (!activeTarget || !cursorRef.current) {
        return;
      }

      const x = getNumericProp(cursorRef.current, "x");
      const y = getNumericProp(cursorRef.current, "y");
      const hovered = document.elementFromPoint(x, y);
      const stillInTarget =
        hovered && (hovered === activeTarget || hovered.closest(targetSelector) === activeTarget);

      if (!stillInTarget && currentLeaveHandler) {
        currentLeaveHandler();
      }
    };

    const handleWindowLeave = () => {
      if (activeTarget && currentLeaveHandler) {
        currentLeaveHandler();
        return;
      }
      hideCursorOverlay();
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleEnter, { passive: true });
    window.addEventListener("mouseleave", handleWindowLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }

      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleEnter);
      window.removeEventListener("mouseleave", handleWindowLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTlRef.current?.kill();
      if (hideDefaultCursor) {
        document.body.classList.remove(CURSOR_CLASSNAME);
      }
    };
  }, [
    getNumericProp,
    hideDefaultCursor,
    hoverDuration,
    isMobile,
    isReady,
    moveCursor,
    parallaxOn,
    spinDuration,
    targetSelector
  ]);

  if (!isReady || isMobile) {
    return null;
  }

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
}
