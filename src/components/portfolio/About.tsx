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
import { LogoMarquee } from "./LogoMarquee";

const EASE = [0.22, 1, 0.36, 1] as const;

const stack = {
  AI: [
    "YOLO",
    "Detectron2",
    "Machine Learning",
    "LLM",
    "LangGraph",
    "graphRAG",
    "neo4j",
    "qdrant",
  ],
  IoT: [
    "Esp32",
    "Arduino",
    "Raspberry Pi",
    "Nvidia Jetson Nano & Orin",
    "freeRTOS",
    "CANbus",
    "LoRa",
    "MQTT",
    "HTTP/HTTPS",
  ],
};

function ScrollExpandPortrait() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["76%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 6]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
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
    <div ref={wrap} className="flex w-full justify-center md:justify-start">
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
    <section id="about" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-start gap-x-6 gap-y-16">
        {/* Portrait — left, larger */}
        <div className="col-span-12 md:col-span-6">
          <ScrollExpandPortrait />
          <p className="mt-4 ml-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Praja · Based in West Java, Indonesia
          </p>
        </div>

        {/* Text — right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="col-span-12 md:col-span-5 md:col-start-8 md:pt-10"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
            (01) — About
          </p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl">
            Engineering at the
            <span className="block italic text-gradient">seam of two worlds.</span>
          </h2>

          <div className="mt-10 space-y-7 text-lg leading-[1.85] text-ink-muted">
            <p>
              Two years in heavy equipment and industry, working where embedded
              hardware meets machine learning. I build deterministic, edge-deployed
              intelligence — robust telemetry over CAN bus, on-device LLMs, and
              semi-supervised models that hold up outside the lab.
            </p>
            <p>
              I don&rsquo;t just build systems that collect data. I engineer systems
              that understand it, in the most constrained physical environments.
            </p>
          </div>

          {/* Skill groups */}
          <div className="mt-16 space-y-12">
            {Object.entries(stack).map(([group, tags], gi) => (
              <div key={group}>
                <div className="mb-5 flex items-baseline gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink">
                    {group}
                  </p>
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-mono text-[10px] text-ink-muted">
                    {String(tags.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tags.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.7,
                        ease: EASE,
                        delay: gi * 0.08 + i * 0.03,
                      }}
                      className="border-glow glass cursor-default rounded-full px-4 py-2 text-sm text-ink"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Technologies marquee */}
      <div className="mt-32 md:mt-40">
        <div className="mx-auto mb-8 max-w-7xl px-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
            Technologies I work with
          </p>
        </div>
        <div className="-mx-6 md:-mx-12">
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
