import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState } from "react";
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

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectRow({
  p,
  isOpen,
  onToggle,
  isAnyOpen,
}: {
  p: Project;
  isOpen: boolean;
  onToggle: () => void;
  isAnyOpen: boolean;
}) {
  const [hover, setHover] = useState(false);
  const dim = isAnyOpen && !isOpen;

  return (
    <motion.li
      layout
      transition={{ layout: { duration: 0.9, ease } }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative border-t border-ink/10 transition-colors duration-700 dark:border-white/10"
      style={{ borderBottomWidth: p.index === "04" ? 1 : 0 }}
    >
      {/* Liquid accent reveal */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          opacity: isOpen ? 1 : hover ? 0.55 : 0,
          scaleX: isOpen || hover ? 1 : 0.2,
        }}
        transition={{ duration: 0.9, ease }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left"
        style={{
          background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
          filter: "blur(0.5px)",
        }}
      />

      <motion.button
        layout
        onClick={onToggle}
        animate={{ opacity: dim ? 0.42 : 1 }}
        transition={{ duration: 0.6, ease }}
        className="group relative grid w-full grid-cols-12 items-baseline gap-4 py-7 text-left md:py-10"
        aria-expanded={isOpen}
      >
        {/* index */}
        <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted md:col-span-1">
          {p.index}
        </span>

        {/* title */}
        <motion.span
          layout="position"
          className="col-span-10 md:col-span-8"
        >
          <h3 className="font-display text-3xl leading-[1.02] tracking-tight text-ink md:text-5xl lg:text-6xl">
            <motion.span
              className="inline-block"
              animate={{ x: hover && !isOpen ? 14 : 0 }}
              transition={{ duration: 0.7, ease }}
            >
              {p.title}
            </motion.span>
          </h3>
        </motion.span>

        {/* right meta */}
        <span className="col-span-12 mt-1 flex items-center justify-end gap-3 md:col-span-3 md:mt-0">
          {p.status && (
            <span className="hidden items-center gap-1.5 rounded-full border border-ink/10 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink backdrop-blur-md md:inline-flex dark:border-white/10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.7_0.15_150)]" />
              {p.status}
            </span>
          )}
          <motion.span
            aria-hidden
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.6, ease }}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink dark:border-white/15"
          >
            <span className="relative block h-3 w-3">
              <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
              <motion.span
                animate={{ scaleX: isOpen ? 0 : 1 }}
                transition={{ duration: 0.5, ease }}
                className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current"
              />
            </span>
          </motion.span>
        </span>
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`panel-${p.index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.8, ease },
              opacity: { duration: 0.5, ease, delay: 0.05 },
            }}
            className="overflow-hidden"
          >
            <div className="relative grid grid-cols-12 gap-6 pb-12 md:gap-10">
              {/* liquid background wash */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease }}
                className="pointer-events-none absolute -inset-x-6 -top-6 -z-10 h-[120%] rounded-[40px] blur-3xl"
                style={{
                  background: `radial-gradient(60% 80% at 20% 30%, ${p.accent}55, transparent 70%), radial-gradient(50% 70% at 80% 70%, ${p.accent}33, transparent 70%)`,
                }}
              />

              <div className="col-span-12 md:col-span-4">
                {p.subtitle && (
                  <motion.p
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease, delay: 0.1 }}
                    className="text-base tracking-tight text-ink md:text-lg"
                  >
                    {p.subtitle}
                  </motion.p>
                )}
                <motion.div
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease, delay: 0.18 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-ink/85 px-3 py-1.5 text-[11px] font-medium tracking-wide text-background backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>
                {p.status && (
                  <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink backdrop-blur-md md:hidden dark:border-white/10">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.7_0.15_150)]" />
                    {p.status}
                  </span>
                )}
              </div>

              <div className="col-span-12 md:col-span-8">
                <motion.p
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.14 }}
                  className="max-w-3xl text-[15px] leading-[1.8] text-ink-muted md:text-base"
                >
                  {p.body}
                </motion.p>

                <motion.button
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease, delay: 0.26 }}
                  className="group/btn mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink"
                >
                  <span className="relative">
                    Case study
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-x-100" />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function Works() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

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

        <LayoutGroup>
          <motion.ul layout className="relative">
            {projects.map((p) => (
              <ProjectRow
                key={p.index}
                p={p}
                isOpen={openIndex === p.index}
                isAnyOpen={openIndex !== null}
                onToggle={() =>
                  setOpenIndex((cur) => (cur === p.index ? null : p.index))
                }
              />
            ))}
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
