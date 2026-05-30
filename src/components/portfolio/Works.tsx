import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  index: string;
  title: string;
  tag: string;
  body: string;
  accent: string;
  visual: "road" | "graph" | "can";
};

const projects: Project[] = [
  {
    index: "01",
    title: "Intelligent Road Surface Monitoring",
    tag: "Vibration sensing · Random Forest",
    body: "An embedded vibration-sensing platform that classifies road surface conditions in real time. Accelerometer data from vehicle-mounted IMUs is windowed, feature-extracted, and passed to a Random Forest classifier deployed on-device—enabling fleet-scale surface monitoring without uploading raw streams.",
    accent: "oklch(0.86 0.08 220)",
    visual: "road",
  },
  {
    index: "02",
    title: "Competitive Intelligence Engine",
    tag: "GraphRAG · LLMs · Knowledge Graphs",
    body: "A multi-stage reasoning architecture for heavy equipment market analysis. The pipeline combines GraphRAG over a curated industry knowledge graph with LLM-driven synthesis, producing structured competitor briefs, capability deltas, and pricing context from heterogeneous public sources.",
    accent: "oklch(0.88 0.08 75)",
    visual: "graph",
  },
  {
    index: "03",
    title: "Heavy Vehicle Data Logging",
    tag: "Scania SESAMM 7 · CAN bus · Telemetry",
    body: "End-to-end data acquisition for heavy vehicles built around the Scania SESAMM 7 logger and CAN bus telemetry. Includes signal selection, in-cab harnessing, ingestion to a time-series backend, and a real-time monitoring interface used by engineers in the field.",
    accent: "oklch(0.84 0.05 250)",
    visual: "can",
  },
];

function Visual({ kind, accent }: { kind: Project["visual"]; accent: string }) {
  if (kind === "road") {
    return (
      <svg viewBox="0 0 400 300" className="h-full w-full">
        <defs>
          <linearGradient id="rg" x1="0" x2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.7" />
            <stop offset="1" stopColor={accent} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 20 + i * 17;
          const h = 40 + Math.sin(i * 0.9) * 30 + Math.cos(i * 0.4) * 20;
          return (
            <motion.line
              key={i}
              x1={x}
              x2={x}
              y1={150}
              y2={150 - h}
              stroke="url(#rg)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
        <line x1="0" y1="200" x2="400" y2="200" stroke="oklch(0.85 0.01 270)" strokeDasharray="6 8" />
        <line x1="0" y1="220" x2="400" y2="220" stroke="oklch(0.9 0.01 270)" strokeDasharray="3 10" />
      </svg>
    );
  }
  if (kind === "graph") {
    const nodes = [
      [80, 80], [200, 50], [320, 90], [120, 180], [240, 200], [340, 220], [60, 220],
    ] as [number, number][];
    const edges = [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,1]];
    return (
      <svg viewBox="0 0 400 300" className="h-full w-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            stroke={accent} strokeOpacity="0.55" strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r={i % 3 === 0 ? 9 : 5}
            fill={accent}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>
    );
  }
  // can
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      {Array.from({ length: 5 }).map((_, row) => (
        <g key={row}>
          {Array.from({ length: 32 }).map((_, col) => {
            const on = (col + row * 3) % 7 < 3;
            return (
              <motion.rect
                key={col}
                x={20 + col * 11}
                y={60 + row * 38}
                width={8}
                height={on ? 22 : 6}
                rx={1.5}
                fill={on ? accent : "oklch(0.88 0.01 270)"}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: row * 0.1 + col * 0.015 }}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const reverse = i % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-12 items-center gap-6 ${reverse ? "md:[direction:rtl]" : ""}`}
    >
      <motion.div
        style={{ y }}
        className={`col-span-12 md:col-span-6 ${reverse ? "md:[direction:ltr]" : ""}`}
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-6"
          style={{
            boxShadow: `0 30px 80px -30px ${p.accent}, 0 2px 6px rgba(15,23,42,0.04), inset 0 1px 0 rgba(255,255,255,0.7)`,
          }}
        >
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background: `radial-gradient(120% 80% at 100% 0%, ${p.accent}33, transparent 60%)`,
            }}
          />
          <div className="aspect-[4/3] w-full">
            <Visual kind={p.visual} accent={p.accent} />
          </div>
        </motion.div>
      </motion.div>

      <div className={`col-span-12 md:col-span-5 ${reverse ? "md:[direction:ltr] md:col-start-2" : "md:col-start-8"}`}>
        <p className="mb-4 font-mono text-xs tracking-widest text-ink-muted">
          PROJECT — {p.index}
        </p>
        <h3 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
          {p.title}
        </h3>
        <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ink-muted">{p.tag}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{p.body}</p>
        <button className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">
          Case study
          <ArrowUpRight
            size={16}
            className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </motion.div>
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
            03 projects
          </span>
        </div>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectCard p={p} i={i} key={p.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
