import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import portrait from "@/assets/praja-cutout.png";
import { MarqueeRow, ROW_ONE, ROW_TWO } from "./LogoMarquee";

const EASE = [0.22, 1, 0.36, 1] as const;

function ScrollExpandPortrait() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["72%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 8]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0.15, 1], [0, 1]);
  const gridY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div ref={wrap} className="flex w-full justify-center">
      <motion.div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={handleMove}
        style={{ width, borderRadius: radius, cursor: hovering ? "none" : "default" }}
        className="relative aspect-[4/5] overflow-hidden"
      >
        {/* animated professional backdrop */}
        <motion.div
          aria-hidden
          style={{ opacity: bgOpacity }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-accent, transparent)", opacity: 0.35 }}
          />
          <div className="absolute inset-0 bg-secondary" style={{ opacity: 0.9 }} />
          <motion.div
            style={{ y: gridY }}
            className="absolute inset-[-20%] opacity-[0.5]"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse at 50% 45%, #000 30%, transparent 78%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 45%, #000 30%, transparent 78%)",
              }}
            />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-1/3 h-[70%] w-[70%] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.78 0.12 220 / 0.45), transparent 70%)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.img
          src={portrait}
          alt="Portrait of Praja, IoT & AI Engineer"
          loading="lazy"
          style={{
            scale: imgScale,
            filter: hovering ? "grayscale(0%)" : "grayscale(100%)",
            willChange: "transform",
          }}
          className="relative h-full w-full object-contain object-bottom transition-[filter] duration-700"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-border"
          style={{ borderRadius: "inherit" }}
        />

        <AnimatePresence>
          {hovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ x: sx, y: sy, translateX: "-50%", translateY: "-130%" }}
              className="pointer-events-none absolute left-0 top-0 z-10 select-none whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-medium tracking-wide text-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
            >
              hey, it&rsquo;s me
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-32 md:py-44">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto mb-16 flex max-w-7xl items-baseline justify-center gap-4 px-6 text-center md:px-12"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
          (01) — About
        </p>
      </motion.div>

      {/* Layered composition: back marquee / portrait / front marquee */}
      <div className="relative flex justify-center">
        {/* back marquee — passes behind the photo */}
        <div className="pointer-events-auto absolute inset-x-0 top-[8%] z-0 -rotate-1">
          <MarqueeRow items={ROW_ONE} variant="back" />
        </div>

        {/* front marquee — passes in front of the photo */}
        <div className="pointer-events-auto absolute inset-x-0 bottom-[6%] z-20 rotate-[0.75deg]">
          <MarqueeRow items={ROW_TWO} variant="front" reverse />
        </div>

        {/* portrait — moderate size, keeps scroll-expand */}
        <div className="relative z-10 w-[min(62vw,240px)] md:w-[min(36vw,320px)]">
          <ScrollExpandPortrait />
        </div>
      </div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted"
      >
        Praja · IoT &amp; AI Engineer · Based in West Java, Indonesia
      </motion.p>
    </section>
  );
}
