"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark" ? storedTheme : getSystemTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  function handleToggle(nextChecked: boolean) {
    const nextTheme: Theme = nextChecked ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <label className="switch" title="Basculer clair/sombre">
      <input
        type="checkbox"
        checked={theme === "light"}
        onChange={(event) => handleToggle(event.target.checked)}
        aria-label={theme === "dark" ? "Activer le theme clair" : "Activer le theme sombre"}
      />
      <span className="slider" />
    </label>
  );
}
