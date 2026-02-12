"use client";

import { useEffect, useRef, useState } from "react";
import Crosshair from "@/components/crosshair";
import DecryptedText from "@/components/decrypted-text";
import ReflectiveCard from "@/components/reflective-card";
import styles from "./intro-gate.module.css";

type Phase = "welcome" | "card" | "done";

export default function IntroGate() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>("welcome");
  const [isCardLeaving, setIsCardLeaving] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.introComplete = "0";
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    document.documentElement.dataset.introComplete = "1";
    window.dispatchEvent(new CustomEvent("intro-gate-done"));
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "card") return;

    const leaveTimer = window.setTimeout(() => setIsCardLeaving(true), 2200);
    const doneTimer = window.setTimeout(() => setPhase("done"), 2650);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase]);

  if (phase === "done") {
    return null;
  }

  return (
    <div ref={containerRef} className={styles.overlay}>
      <Crosshair containerRef={containerRef} color="#ffffff" />

      {phase === "welcome" ? (
        <div className={styles.welcomeWrap}>
          <button
            type="button"
            className={`${styles.welcomeTrigger} crosshair-target`}
            onClick={() => setPhase("card")}
          >
            <DecryptedText
              text="WELCOME"
              animateOn="view"
              revealDirection="start"
              sequential
              speed={95}
              maxIterations={9}
              useOriginalCharsOnly={false}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
              className={styles.decryptRevealed}
              parentClassName={styles.decryptParent}
              encryptedClassName={styles.decryptEncrypted}
            />
          </button>
        </div>
      ) : (
        <div className={`${styles.cardStage} ${isCardLeaving ? styles.cardExit : ""}`}>
          <ReflectiveCard
            overlayColor="rgba(0, 0, 0, 0.2)"
            blurStrength={12}
            metalness={1}
            roughness={0.75}
            noiseScale={1}
            grayscale={0.15}
            color="#ffffff"
          />
        </div>
      )}
    </div>
  );
}
