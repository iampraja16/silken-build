import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  index: string;
  title: string;
  subtitle?: string;
  body: string;
  tags: string[];
  accent: string;
  status?: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "R-SENSE",
    subtitle: "Road Condition Monitoring System",
    body:
      "In heavy-duty operational environments with constrained connectivity, proactive road maintenance requires robust monitoring. To address this, I developed an IoT-based road condition monitoring system. I implemented edge computing on a Raspberry Pi integrated with RTOS principles for deterministic processing, and utilized LoRa communication for reliable, low-power, long-range data transmission. By applying signal processing and multi-domain feature extraction combined with semi-supervised learning, the system successfully achieved high adaptability in road condition classification even with limited labeled data scenarios.",
    tags: ["LoRa", "Raspberry Pi", "freeRTOS", "Machine Learning"],
    accent: "oklch(0.86 0.08 220)",
  },
  {
    index: "02",
    title: "METRICS",
    subtitle: "Volume Estimation for Irregular Shapes",
    body:
      "Industrial environments require fast and reliable material measurement, particularly for irregular material loads in dump trucks where cloud dependency introduces unacceptable latency. I built an edge-based volume estimation system that utilizes a depth camera to capture 3D surface data. By engineering an on-device processing architecture and applying geometric modeling alongside spatial analysis, I minimized latency and significantly improved volume estimation accuracy under non-uniform surface conditions.",
    tags: ["Edge Computing", "Machine Learning", "Depth Sensing"],
    accent: "oklch(0.88 0.08 75)",
  },
  {
    index: "03",
    title: "CAN Bus Data Acquisition",
    subtitle: "Telemetry for Heavy Vehicles",
    body:
      "Extracting accurate vehicle telemetry data is critical for advanced diagnostics and performance monitoring in heavy vehicles. I engineered a robust CAN bus data acquisition architecture by thoroughly analyzing vehicle communication protocols and identifying key ECU interface specifications from technical datasheets. Using a DFRobot CAN bus shield, I established direct communication by interfacing CAN High (CANH) and CAN Low (CANL) lines, successfully enabling the structured acquisition of external ECU-based data for further analysis.",
    tags: ["CANbus", "Arduino", "Esp32"],
    accent: "oklch(0.84 0.05 250)",
  },
  {
    index: "04",
    title: "Edge AI Self-Diagnostic System",
    subtitle: "On-Device Predictive Maintenance",
    status: "On research",
    body:
      "To reduce dependency on cloud connectivity and enable intelligent predictive maintenance in heavy-duty vehicles, an on-device diagnostic solution is required. I am developing an edge-deployed AI system integrating lightweight LLM capabilities (≈7B scale) for real-time self-diagnostic analysis. By applying model quantization, parameter optimization, and implementing a Retrieval-Augmented Generation (RAG) pipeline with precise chunking strategies, the system effectively executes context-aware reasoning and fault detection directly within constrained edge hardware environments.",
    tags: ["LLM", "LangGraph", "graphRAG", "neo4j", "qdrant", "Nvidia Jetson Nano & Orin"],
    accent: "oklch(0.82 0.1 160)",
  },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax + entrance
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Pointer-tracked spotlight
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 200, damping: 30, mass: 0.4 });
  const smy = useSpring(my, { stiffness: 200, damping: 30, mass: 0.4 });
  const bg = useTransform(
    [smx, smy] as never,
    ([xv, yv]: number[]) =>
      `radial-gradient(420px circle at ${xv * 100}% ${yv * 100}%, ${p.accent}3D, transparent 55%)`,
  );

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
      style={{ y: yShift }}
      className="group relative"
    >
      <div
        className="glass-strong relative overflow-hidden rounded-[28px] p-7 md:p-10"
        style={{
          boxShadow: `0 40px 90px -40px ${p.accent}, 0 2px 6px rgba(15,23,42,0.04), inset 0 1px 0 rgba(255,255,255,0.7)`,
        }}
      >
        {/* spotlight overlay */}
        <motion.div
          aria-hidden
          style={{ background: bg }}
          className="pointer-events-none absolute inset-0 -z-0 opacity-90 transition-opacity duration-700"
        />
        {/* corner accent blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full opacity-50 blur-3xl"
          style={{ background: p.accent }}
        />

        <div className="relative z-10 flex flex-col gap-5 text-left">
          {/* index + status */}
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
              Project / {p.index}
            </p>
            {p.status && (
              <span className="flex items-center gap-1.5 rounded-full bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.7_0.15_150)]" />
                {p.status}
              </span>
            )}
          </div>

          {/* title + subtitle on same line on desktop */}
          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-baseline md:gap-x-4">
            <h3 className="font-display text-3xl leading-[1.02] tracking-tight text-ink md:text-4xl">
              {p.title}
            </h3>
            {p.subtitle && (
              <p className="text-sm tracking-tight text-ink-muted md:text-[15px]">
                — {p.subtitle}
              </p>
            )}
          </div>

          {/* description, left-aligned */}
          <p className="text-left text-[15px] leading-[1.75] text-ink-muted">
            {p.body}
          </p>

          {/* tags horizontal */}
          <div className="flex flex-row flex-wrap gap-2 pt-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-ink/85 px-3 py-1.5 text-[11px] font-medium tracking-wide text-background backdrop-blur-md"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button className="group/btn mt-2 inline-flex items-center gap-2 self-start text-sm font-medium text-ink">
            <span className="relative">
              Case study
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-x-100" />
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Works() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
              (02) — Selected works
            </p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-7xl">
              Engineering,
              <span className="block italic text-gradient">in the field.</span>
            </h2>
          </div>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-ink-muted md:block">
            04 projects
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard p={p} i={i} key={p.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
