"use client";

import type { CSSProperties } from "react";
import styles from "./reflective-card.module.css";

type ReflectiveCardProps = {
  blurStrength?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  overlayColor?: string;
  noiseScale?: number;
  grayscale?: number;
  className?: string;
};

export default function ReflectiveCard({
  blurStrength = 12,
  color = "#ffffff",
  metalness = 1,
  roughness = 0.75,
  overlayColor = "rgba(0, 0, 0, 0.2)",
  noiseScale = 1,
  grayscale = 0.15,
  className = ""
}: ReflectiveCardProps) {
  const saturation = Math.max(0, 1 - grayscale);

  return (
    <div
      className={`${styles.container} ${className}`.trim()}
      style={
        {
          "--blur-strength": `${blurStrength}px`,
          "--metalness": metalness,
          "--roughness": roughness * noiseScale,
          "--overlay-color": overlayColor,
          "--text-color": color,
          "--saturation": saturation
        } as CSSProperties
      }
    >
      <div className={styles.backdrop} />
      <div className={styles.noise} />
      <div className={styles.sheen} />
      <div className={styles.border} />

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.badge}>Secure Access</span>
          <span className={styles.status} />
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>External User</h2>
          <p className={styles.subtitle}>Temporary Session</p>
        </div>

        <div className={styles.footer}>
          <div>
            <span className={styles.idLabel}>Session ID</span>
            <span className={styles.idValue}>EXT-2026-AR</span>
          </div>
          <div className={styles.fingerprint}>◎</div>
        </div>
      </div>
    </div>
  );
}
