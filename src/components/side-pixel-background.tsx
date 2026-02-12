"use client";

import { useEffect, useState } from "react";
import PixelBlast from "@/components/pixel-blast";

export default function SidePixelBackground() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const resolveTheme = () => {
      const datasetTheme = root.dataset.theme;
      if (datasetTheme === "dark") {
        setIsDark(true);
        return;
      }
      if (datasetTheme === "light") {
        setIsDark(false);
        return;
      }
      setIsDark(media.matches);
    };

    resolveTheme();

    const observer = new MutationObserver(resolveTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    const onMediaChange = () => resolveTheme();
    media.addEventListener("change", onMediaChange);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  const blastColor = isDark ? "#ffffff" : "#101010";

  return (
    <div className="pixel-full-layer" aria-hidden="true">
      <PixelBlast
        className="pixel-full-canvas"
        variant="square"
        pixelSize={3}
        color={blastColor}
        patternScale={2}
        patternDensity={1}
        pixelSizeJitter={0}
        enableRipples={false}
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.5}
        edgeFade={0.25}
        transparent
      />
    </div>
  );
}
