import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";

const timeline = [
  {
    year: "2024 — Present",
    role: "IoT & AI Engineer",
    org: "Heavy Equipment Distribution",
    body: "Leading data acquisition and edge-AI initiatives across the vehicle fleet. Designing CAN bus instrumentation, deploying ML models on Jetson and ESP32 targets, and integrating telemetry pipelines with internal analytics.",
  },
  {
    year: "2023 — 2024",
    role: "Embedded ML Engineer",
    org: "R&D, Hardware Prototyping",
    body: "Built end-to-end embedded ML prototypes: PCB design, firmware on ESP32 with LoRa uplink, on-device inference with Random Forest classifiers for industrial sensing applications.",
  },
  {
    year: "2023",
    role: "AI Research Contributor",
    org: "Independent / Academic",
    body: "Early work in retrieval-augmented reasoning and knowledge graph construction—foundations that later shaped the GraphRAG-based competitive intelligence engine.",
  },
];

function TimelineNode({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const at = (index + 0.5) / total;
  const [lit, setLit] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setLit(v >= at));

  return (
    <motion.div
      animate={{
        scale: lit ? 1 : 0.85,
        boxShadow: lit
          ? "0 0 0 4px oklch(0.92 0.06 220 / 0.35), 0 0 22px 6px oklch(0.78 0.16 220 / 0.55)"
          : "0 0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-white/80"
      style={{
        background: lit
          ? "linear-gradient(135deg, oklch(0.78 0.16 220), oklch(0.82 0.14 75))"
          : "oklch(0.92 0.01 270)",
        transition: "background 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    />
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.35"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const height = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="mb-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
            (03) — Experience
          </p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-7xl">
            A short
            <span className="italic text-gradient"> trajectory.</span>
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Global spine — absolute, runs vertically through node centers */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-2 bottom-2 left-[5.5px] w-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.88 0.012 270 / 0.9), oklch(0.84 0.015 270 / 0.7))",
            }}
          />
          <motion.div
            aria-hidden
            style={{ height }}
            className="pointer-events-none absolute top-2 left-[5.5px] w-[3px] overflow-hidden rounded-full"
          >
            <div
              className="h-full w-[3px]"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.72 0.18 220), oklch(0.78 0.16 75))",
                boxShadow:
                  "0 0 14px oklch(0.78 0.18 220 / 0.55), 0 0 28px oklch(0.78 0.18 220 / 0.25)",
              }}
            />
          </motion.div>

          <div className="space-y-20">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 items-start gap-6"
              >
                {/* Year gutter with inline node */}
                <div className="col-span-12 flex items-center gap-4 md:col-span-4">
                  <TimelineNode progress={smooth} index={i} total={timeline.length} />
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {t.year}
                  </p>
                </div>
                <div className="col-span-12 pl-[30px] md:col-span-8 md:pl-0">
                  <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                    {t.role}
                  </h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-ink-muted">
                    {t.org}
                  </p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                    {t.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
