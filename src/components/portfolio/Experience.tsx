import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        <div ref={ref} className="relative grid grid-cols-12 gap-6">
          {/* Spine */}
          <div className="relative col-span-1 md:col-span-2">
            <div className="absolute left-3 top-0 h-full w-px bg-[oklch(0.9_0.01_270)] md:left-1/2" />
            <motion.div
              style={{ height }}
              className="absolute left-3 top-0 w-px md:left-1/2"
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.86 0.08 220), oklch(0.88 0.08 75))",
                }}
              />
            </motion.div>
          </div>

          <div className="col-span-11 space-y-20 md:col-span-10">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 gap-6"
              >
                <div className="col-span-12 md:col-span-4">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {t.year}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-8">
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
