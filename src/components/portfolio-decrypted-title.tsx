"use client";

import { useEffect, useState } from "react";
import DecryptedText from "@/components/decrypted-text";

const INTRO_EVENT = "intro-gate-done";

export default function PortfolioDecryptedTitle() {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const startAfterDelay = () => {
      timerId = window.setTimeout(() => setCanAnimate(true), 20);
    };

    if (document.documentElement.dataset.introComplete === "1") {
      startAfterDelay();
    } else {
      const onIntroDone = () => startAfterDelay();
      window.addEventListener(INTRO_EVENT, onIntroDone, { once: true });
      return () => {
        window.removeEventListener(INTRO_EVENT, onIntroDone);
        if (timerId) window.clearTimeout(timerId);
      };
    }

    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  if (!canAnimate) {
    return <span className="decrypt-title decrypt-encrypted">Portfolio Alexandre Rupp</span>;
  }

  return (
    <DecryptedText
      text="Portfolio Alexandre Rupp"
      animateOn="view"
      revealDirection="start"
      sequential
      speed={34}
      maxIterations={7}
      useOriginalCharsOnly={false}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      className="decrypt-revealed"
      parentClassName="decrypt-title"
      encryptedClassName="decrypt-encrypted"
    />
  );
}
