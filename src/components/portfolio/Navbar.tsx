import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";


const items = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme, toggle } = useTheme();


  // Sync active section with scroll using IntersectionObserver
  useEffect(() => {
    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = active;
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestRatio > 0) setActive(bestId);
      },
      {
        // Center band — section is "active" when its middle is near viewport center
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const indicatorId = hovered ?? active;

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      aria-label="Primary"
      className="
        fixed left-1/2 z-50 -translate-x-1/2
        bottom-4 top-auto
        md:bottom-auto md:top-6
      "
    >
      <div
        className="
          glass-strong flex items-center gap-0.5 rounded-full
          px-1.5 py-1.5
          sm:gap-1 sm:px-2 sm:py-2
        "
        onMouseLeave={() => setHovered(null)}
      >
        {items.map((item) => {
          const isActive = indicatorId === item.id;
          return (
            <button
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onClick={() => scrollTo(item.id)}
              className="
                relative rounded-full font-medium transition-colors
                px-3 py-1.5 text-[11px]
                sm:px-4 sm:py-2 sm:text-sm
                text-ink-muted hover:text-ink
              "
              style={isActive ? { color: "oklch(0.18 0.01 270)" } : undefined}
              aria-current={active === item.id ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-blob"
                  className="absolute inset-0 -z-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.92 0.04 220 / 0.95), oklch(0.94 0.06 75 / 0.9))",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.85), 0 6px 18px rgba(15,23,42,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.7 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}


        {/* Divider */}
        <span
          aria-hidden
          className="mx-1 hidden h-5 w-px bg-[var(--glass-border-strong)] sm:block"
        />

        {/* Theme toggle */}
        <motion.button
          onClick={toggle}
          onMouseEnter={() => setHovered(null)}
          whileTap={{ scale: 0.88, rotate: -10 }}
          transition={{ type: "spring", stiffness: 420, damping: 18, mass: 0.6 }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="
            relative grid place-items-center rounded-full
            h-7 w-7 sm:h-8 sm:w-8
            text-ink-muted hover:text-ink
            transition-colors
          "
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 180, scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 18, mass: 0.7 }}
              className="absolute inset-0 grid place-items-center"
            >
              {theme === "dark" ? (
                <Sun size={15} strokeWidth={1.9} />
              ) : (
                <Moon size={15} strokeWidth={1.9} />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
}

