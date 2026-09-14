import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

type Project = {
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  body: string;
  tags: string[];
  status?: string;
  size: string;
  visual: "signal" | "depth" | "can" | "graph";
  metric: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "R-SENSE",
    subtitle: "Road Condition Monitoring System",
    summary: "Edge classification for heavy-duty roads using deterministic processing and long-range telemetry.",
    body: "An IoT road monitoring system designed for constrained field environments. Raspberry Pi edge processing, RTOS principles, LoRa communication, signal processing, and semi-supervised learning enable adaptable road-condition classification with limited labeled data.",
    tags: ["LoRa", "Raspberry Pi", "FreeRTOS", "Machine Learning"],
    size: "md:col-span-7 md:row-span-2",
    visual: "signal",
    metric: "EDGE / LORA / TERRAIN",
  },
  {
    index: "02",
    title: "METRICS",
    subtitle: "Volume Estimation for Irregular Shapes",
    summary: "On-device depth analysis for material loads with non-uniform surfaces.",
    body: "A depth-camera system that captures 3D surface data and performs geometric modeling and spatial analysis on-device, minimizing latency while improving volume estimation for irregular dump-truck loads.",
    tags: ["Edge Computing", "Depth Sensing", "Geometry"],
    size: "md:col-span-5",
    visual: "depth",
    metric: "DEPTH / POINT CLOUD",
  },
  {
    index: "03",
    title: "CAN Bus Data Acquisition",
    subtitle: "Telemetry for Heavy Vehicles",
    summary: "A robust acquisition architecture for structured external ECU telemetry.",
    body: "A CAN bus data acquisition architecture built by analyzing vehicle protocols and ECU interfaces, then directly interfacing CANH and CANL lines to produce structured telemetry for diagnostics and monitoring.",
    tags: ["CAN Bus", "Arduino", "ESP32"],
    size: "md:col-span-5",
    visual: "can",
    metric: "CANH / CANL / ECU",
  },
  {
    index: "04",
    title: "Edge AI Self-Diagnostic",
    subtitle: "On-Device Predictive Maintenance",
    summary: "Context-aware fault reasoning directly on constrained edge hardware.",
    body: "An ongoing edge-deployed diagnostic system integrating a lightweight LLM, quantization, model optimization, and a GraphRAG pipeline for context-aware fault detection without continuous cloud connectivity.",
    tags: ["LLM", "LangGraph", "GraphRAG", "NVIDIA Jetson"],
    status: "On research",
    size: "md:col-span-12",
    visual: "graph",
    metric: "DEVICE / RETRIEVAL / DIAGNOSIS",
  },
];

function SignalVisual() {
  return (
    <svg viewBox="0 0 700 270" className="h-full w-full" aria-label="Animated road signal and LoRa node diagram" role="img">
      <g className="text-border" stroke="currentColor" fill="none">
        {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M0 ${35 + i * 30}H700`} />)}
        {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${20 + i * 62} 0V270`} />)}
      </g>
      <motion.path d="M0 170 C45 165 72 188 110 168 S174 130 220 168 S294 208 340 160 S420 105 466 158 S545 196 590 142 S652 126 700 136" fill="none" stroke="var(--cyan-soft)" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: EASE }} />
      {[110, 340, 590].map((cx, i) => <motion.g key={cx} animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.5 }}><circle cx={cx} cy={[168,160,142][i]} r="18" fill="var(--background)" stroke="var(--amber-muted)"/><circle cx={cx} cy={[168,160,142][i]} r="4" fill="var(--amber-muted)"/></motion.g>)}
      <text x="24" y="32" fill="var(--ink-muted)" fontSize="10" fontFamily="monospace">ROAD PROFILE / STREAM 04</text>
    </svg>
  );
}

function DepthVisual() {
  const points = Array.from({ length: 45 }, (_, i) => ({ x: 25 + (i % 9) * 32, y: 38 + Math.floor(i / 9) * 29 + Math.sin(i * 1.7) * 9 }));
  return <svg viewBox="0 0 310 200" className="h-full w-full" aria-label="Animated depth point cloud diagram" role="img"><g stroke="var(--border)" fill="none"><path d="M18 168H292M18 128H292M18 88H292M18 48H292"/><path d="M52 22V178M104 22V178M156 22V178M208 22V178M260 22V178"/></g>{points.map((p,i)=><motion.circle key={i} cx={p.x} cy={p.y} r={i % 7 === 0 ? 3 : 1.7} fill={i % 4 === 0 ? "var(--amber-muted)" : "var(--cyan-soft)"} animate={{ y: [0, -4-(i%3), 0], opacity:[0.35, .95, .35] }} transition={{ duration: 3+(i%4)*.35, repeat:Infinity, delay:i*.035 }}/>)}</svg>;
}

function CanVisual() {
  return <svg viewBox="0 0 310 200" className="h-full w-full" aria-label="Animated CAN bus node diagram" role="img"><path d="M30 78H280M30 122H280" stroke="var(--ink-muted)" strokeWidth="2"/><text x="30" y="66" fill="var(--ink-muted)" fontSize="9" fontFamily="monospace">CAN HIGH</text><text x="30" y="141" fill="var(--ink-muted)" fontSize="9" fontFamily="monospace">CAN LOW</text>{[65,155,245].map((x,i)=><g key={x}><path d={`M${x} 78V48M${x} 122V152`} stroke="var(--border)"/><motion.rect x={x-20} y={i===1?18:152} width="40" height="24" rx="3" fill="var(--secondary)" stroke="var(--cyan-soft)" animate={{ opacity:[.45,1,.45] }} transition={{ duration:2.4,repeat:Infinity,delay:i*.45 }}/></g>)}<motion.circle r="4" fill="var(--amber-muted)" animate={{ cx:[32,278], cy:[78,78] }} transition={{duration:2.8,repeat:Infinity,ease:"linear"}}/></svg>;
}

function GraphVisual() {
  const nodes = [{x:70,y:100},{x:190,y:50},{x:190,y:150},{x:340,y:100},{x:490,y:55},{x:490,y:145},{x:620,y:100}];
  return <svg viewBox="0 0 690 210" className="h-full w-full" aria-label="Animated edge AI diagnostic graph" role="img"><g stroke="var(--border)" strokeWidth="1.5">{[[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]].map(([a,b])=><motion.line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} initial={{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:.8,delay:a*.08}}/>)}</g>{nodes.map((n,i)=><motion.g key={i} animate={{scale:[1,1.08,1]}} transition={{duration:3,repeat:Infinity,delay:i*.25}} style={{transformOrigin:`${n.x}px ${n.y}px`}}><circle cx={n.x} cy={n.y} r={i===0||i===6?22:13} fill="var(--background)" stroke={i===6?"var(--amber-muted)":"var(--cyan-soft)"}/><text x={n.x} y={n.y+3} textAnchor="middle" fill="var(--ink-muted)" fontSize="8" fontFamily="monospace">{i===0?"ECU":i===6?"DX":i.toString().padStart(2,"0")}</text></motion.g>)}</svg>;
}

function ProjectVisual({ type }: { type: Project["visual"] }) {
  const visuals: Record<Project["visual"], ReactNode> = { signal: <SignalVisual />, depth: <DepthVisual />, can: <CanVisual />, graph: <GraphVisual /> };
  return <div className="technical-grid relative h-48 overflow-hidden border-y border-border bg-secondary/45 md:h-full md:min-h-[210px]">{visuals[type]}</div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article layoutId={`card-${project.index}`} whileHover={reduceMotion ? undefined : { y: -4, rotateX: 0.6, rotateY: -0.6 }} transition={{ duration: .45, ease: EASE }} className={`${project.size} group relative flex min-h-[350px] flex-col overflow-hidden rounded-lg border border-border bg-card/65 [transform-style:preserve-3d] focus-within:ring-1 focus-within:ring-ring`}>
      <Button variant="ghost" onClick={onOpen} className="absolute inset-0 z-20 h-auto w-full rounded-lg p-0 opacity-0" aria-label={`Open ${project.title} project details`} />
      <div className="flex items-start justify-between gap-4 p-5 md:p-6">
        <div><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">{project.index} / {project.metric}</p><h3 className="mt-3 font-display text-2xl leading-tight text-ink md:text-3xl">{project.title}</h3><p className="mt-1 text-xs text-ink-muted">{project.subtitle}</p></div>
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
      <ProjectVisual type={project.visual} />
      <div className="flex flex-1 flex-col justify-between gap-5 p-5 md:p-6"><p className="max-w-xl text-sm leading-6 text-ink-muted">{project.summary}</p><div className="flex flex-wrap items-center gap-2">{project.tags.slice(0,3).map(tag=><span key={tag} className="rounded border border-border bg-background/55 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">{tag}</span>)}{project.status&&<span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-cyan-soft"/>{project.status}</span>}</div></div>
    </motion.article>
  );
}

export function Works() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="work" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-5"><div><p className="mb-5 text-xs uppercase tracking-[0.22em] text-ink-muted">(02) — Selected works</p><h2 className="font-display text-5xl leading-[.95] text-ink md:text-7xl">Engineering, <span className="italic text-gradient">made visible.</span></h2></div><span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted md:block">04 field systems</span></div>
        <LayoutGroup><motion.div layout className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[minmax(235px,auto)]">{projects.map(project=><ProjectCard key={project.index} project={project} onOpen={()=>setSelected(project)}/>)}</motion.div>
        <AnimatePresence>{selected&&<motion.div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.article layoutId={`card-${selected.index}`} role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e=>e.stopPropagation()} className="max-h-[88vh] w-full max-w-4xl overflow-auto rounded-lg border border-border bg-card shadow-[var(--shadow-lift)]"><div className="flex items-start justify-between gap-5 p-6 md:p-8"><div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-ink-muted">Project / {selected.index}</p><h3 id="project-title" className="mt-3 font-display text-4xl text-ink md:text-6xl">{selected.title}</h3><p className="mt-2 text-sm text-ink-muted">{selected.subtitle}</p></div><Button variant="outline" size="icon" onClick={()=>setSelected(null)} aria-label="Close project details"><X /></Button></div><ProjectVisual type={selected.visual}/><div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:p-8"><p className="text-base leading-8 text-ink-muted">{selected.body}</p><div className="flex max-w-xs flex-wrap content-start gap-2">{selected.tags.map(tag=><span key={tag} className="rounded border border-border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[.12em] text-ink-muted">{tag}</span>)}</div></div></motion.article></motion.div>}</AnimatePresence></LayoutGroup>
      </div>
    </section>
  );
}
