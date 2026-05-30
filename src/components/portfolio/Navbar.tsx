import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [hovered, setHovered] = useState<string | null>("home");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
      aria-label="Primary"
    >
      <div
        className="glass-strong flex items-center gap-1 rounded-full px-2 py-2"
        onMouseLeave={() => setHovered(null)}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onClick={() => scrollTo(item.id)}
            className="relative rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            {hovered === item.id && (
              <motion.span
                layoutId="nav-blob"
                className="absolute inset-0 -z-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.04 220 / 0.9), oklch(0.94 0.06 75 / 0.85))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 18px rgba(15,23,42,0.06)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.7 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
