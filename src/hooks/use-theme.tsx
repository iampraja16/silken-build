import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";
const KEY = "praja-theme";

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  // Read on mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) as Theme | null;
      const prefersDark =
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
      const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
      setTheme(initial);
      applyTheme(initial);
    } catch {
      /* noop */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* noop */
      }
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}
