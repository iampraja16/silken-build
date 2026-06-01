import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const rotating = [
  "Bridging hardware and intelligence.",
  "Edge AI on embedded systems.",
  "Sensors, signals, and reasoning.",
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 3600);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-24 md:px-12 md:pb-0"
    >
      {/* abstract mesh */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[720px] w-[720px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg, oklch(0.9 0.08 220 / 0.7), oklch(0.92 0.08 75 / 0.55), oklch(0.92 0.04 250 / 0.6), oklch(0.9 0.08 220 / 0.7))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.92 0.06 75 / 0.55), transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-10 md:col-start-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-ink-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.15_150)]" />
            Chronicling my journey in hardware and intelligence.
          </motion.div>

          <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.88] tracking-[-0.05em] text-ink">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="block italic"
            >
              Praja<span className="text-gradient">.</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="block text-[clamp(1.75rem,4.4vw,4.5rem)] font-sans font-light not-italic text-ink-muted"
            >
              Engineering the space where physical systems meet artificial intelligence.
            </motion.span>
          </h1>

          <div className="mt-10 flex flex-col gap-y-8 md:mt-8 md:grid md:grid-cols-12 md:gap-6">
            <div className="col-span-12 md:col-span-5 md:col-start-7">
              <div className="relative h-7 overflow-hidden">
                {rotating.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={false}
                    animate={{
                      y: i === idx ? 0 : i < idx ? -28 : 28,
                      opacity: i === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 text-base text-ink-muted"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-muted">
                Transforming raw physical data into intelligent action. I architect edge systems that give heavy machinery and infrastructure the ability to sense, reason, and adapt in real-time.
              </p>

              <motion.button
                whileHover={{ scale: 1.03, rotate: 0.4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                onClick={() => scrollTo("work")}
                className="group mt-8 inline-flex items-center gap-3 rounded-full glass-strong py-3.5 pl-6 pr-3 text-sm font-medium text-ink"
              >
                Explore my work
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-background transition-transform duration-500 group-hover:rotate-45">
                  <ArrowDownRight size={16} strokeWidth={2.2} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* corner meta */}
      <div className="absolute bottom-8 left-6 right-6 z-10 mx-auto flex max-w-7xl items-end justify-between text-xs uppercase tracking-[0.18em] text-ink-muted md:left-12 md:right-12">
        <span>Portfolio · 2024 — 26</span>
        <span className="hidden md:inline">Based in West Java, Indonesia</span>
      </div>
    </section>
  );
}
