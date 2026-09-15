import { AnimatePresence, LayoutGroup, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

type Project = {
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  body: ReactNode;
  tags: string[];
  status?: string;
  visual: "signal" | "depth" | "can" | "graph";
  metric: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "R-SENSE",
    subtitle: "Road Condition Monitoring System",
    summary: "Edge classification for heavy-duty roads using deterministic processing and long-range telemetry.",
    body: (
      <div className="space-y-4 text-base leading-8 text-ink-muted">
        <p>Unpaved hauling roads in remote mining sites face continuous degradation from heavy machinery, often leading to unmonitored chassis wear, fuel inefficiency, and severe safety hazards due to scarce network connectivity and minimal labeled terrain data.</p>
        <p>To overcome this, an autonomous edge-computing pipeline was built on <strong className="text-ink">Raspberry Pi</strong> utilizing <strong className="text-ink">FreeRTOS</strong> principles and IMU-based vibration signal processing. The architecture integrates <strong className="text-ink">semi-supervised machine learning</strong> to classify surface roughness patterns locally with limited training labels, transmitting classified telemetry via long-range <strong className="text-ink">LoRa radio</strong>.</p>
        <p>The deployed monitoring units operate reliably across active mining corridors, reducing telemetry data transmission overhead by <strong className="text-ink">up to 45%</strong> while delivering real-time road quality intelligence directly to maintenance crews.</p>
      </div>
    ),
    tags: ["LoRa", "Raspberry Pi", "FreeRTOS", "Machine Learning"],
    visual: "signal",
    metric: "EDGE / LORA / TERRAIN",
  },
  {
    index: "02",
    title: "METRICS",
    subtitle: "Volume Estimation for Irregular Shapes",
    summary: "On-device depth analysis for material loads with non-uniform surfaces in dump trucks.",
    body: (
      <div className="space-y-4 text-base leading-8 text-ink-muted">
        <p>Estimating volumetric payloads of irregular materials—such as raw gravel, sand, and crushed rocks—in haul dump trucks is notoriously inaccurate with manual inspection or standard 2D cameras, causing payload imbalances and inefficient hauling cycles.</p>
        <p>An on-device volume estimation system was engineered using <strong className="text-ink">3D point cloud reconstruction</strong> and <strong className="text-ink">OpenCV spatial modeling algorithms</strong>. The edge device reconstructs complex topological surface meshes directly inside an industrial-grade enclosure, eliminating cloud latency and bandwidth dependencies.</p>
        <p>The resulting depth-sensing pipeline operates with low latency directly in harsh field environments, significantly improving payload estimation accuracy on non-uniform cargo surfaces.</p>
      </div>
    ),
    tags: ["Edge Computing", "Depth Sensing", "OpenCV", "Geometry"],
    visual: "depth",
    metric: "DEPTH / POINT CLOUD",
  },
  {
    index: "03",
    title: "CAN Bus Data Acquisition",
    subtitle: "Telemetry for Heavy Vehicles",
    summary: "A robust acquisition architecture for structured external ECU telemetry on Scania heavy-duty vehicles.",
    body: (
      <div className="space-y-4 text-base leading-8 text-ink-muted">
        <p>Commercial heavy-duty fleets operating at remote job sites generate rich internal diagnostics within their Electronic Control Units (ECUs), yet accessing and structuring these low-level signals for real-time analytics presented a significant integration barrier.</p>
        <p>By reverse-engineering vehicle protocols and interfacing directly with the differential <strong className="text-ink">CANH and CANL</strong> lines, a dedicated embedded acquisition bridge was developed using <strong className="text-ink">ESP32 and Arduino</strong> microcontrollers. Custom firmware captures raw CAN frames in real time, decodes multi-byte parameter groups, and serializes the telemetry into a structured data schema.</p>
        <p>The system established a dependable on-vehicle telemetry acquisition bridge that now serves as the primary data ingestion layer for downstream predictive maintenance and edge diagnostic pipelines.</p>
      </div>
    ),
    tags: ["CAN Bus", "Arduino", "ESP32", "Telemetry"],
    visual: "can",
    metric: "CANH / CANL / ECU",
  },
  {
    index: "04",
    title: "Edge AI Self-Diagnostic",
    subtitle: "LLM-Powered Fault Analysis on Jetson Nano",
    summary: "On-device fault reasoning for heavy-duty vehicles using RAG-augmented lightweight LLM on constrained edge hardware.",
    body: (
      <div className="space-y-4 text-base leading-8 text-ink-muted">
        <p>Heavy-duty industrial vehicles in remote field environments generate continuous CAN Bus telemetry streams, but diagnostic expertise is rarely available on-site. When mechanical or electrical anomalies occur, waiting for remote technicians or cloud connectivity causes expensive operational downtime.</p>
        <p>To solve this, a quantized lightweight LLM was deployed directly onto an <strong className="text-ink">NVIDIA Jetson Nano</strong>, augmented with a localized <strong className="text-ink">RAG (Retrieval-Augmented Generation)</strong> pipeline backed by vector indices of fault codes, maintenance manuals, and historical failure symptoms. Operating as an autonomous <strong className="text-ink">diagnostic reasoning engine</strong> rather than a generic chatbot, the model analyzes incoming CAN Bus streams, retrieves relevant engineering context, and isolates the specific failing component along with root causes and corrective recommendations.</p>
        <p>The architecture runs stably on edge hardware with an extensive <strong className="text-ink">16,000-token context window</strong>, enabling deep multi-signal telemetry reasoning and generating structured diagnostic reports in seconds completely offline.</p>
      </div>
    ),
    tags: ["LLM", "RAG", "LlamaIndex", "NVIDIA Jetson", "CAN Bus", "Quantization"],
    visual: "graph",
    metric: "RAG / JETSON / DIAGNOSIS",
  },
  {
    index: "05",
    title: "Pothole Detection System",
    subtitle: "Vision-Based Road Defect Classification",
    summary: "Computer vision and depth sensing pipeline for automated pothole detection and severity classification across toll road surfaces.",
    body: (
      <div className="space-y-4 text-base leading-8 text-ink-muted">
        <p>Toll road maintenance operations struggled with periodic manual road inspections, which were hazardous, labor-intensive, and incapable of consistently quantifying pavement defect severity across extensive highway networks.</p>
        <p>An automated computer vision and depth-sensing pipeline was engineered using deep learning models (<strong className="text-ink">YOLO & Detectron2</strong>) fine-tuned on road defect datasets. By incorporating <strong className="text-ink">depth sensing</strong> alongside 2D optical detection, the system measures physical defect dimensions to classify potholes into <strong className="text-ink">small, medium, and large</strong> diameter categories from live camera footage.</p>
        <p>The system achieved defect detection and classification accuracy of <strong className="text-ink">up to 80%</strong>, providing toll maintenance teams with automated, quantified spatial logs to prioritize emergency asphalt repairs.</p>
      </div>
    ),
    tags: ["YOLO", "Detectron2", "OpenCV", "Depth Sensing", "Computer Vision"],
    visual: "depth",
    metric: "VISION / DEPTH / DEFECT",
  },
  {
    index: "06",
    title: "Traffic Counting System",
    subtitle: "Multi-Lane Vehicle Flow Analytics",
    summary: "Real-time computer vision pipeline for accurate vehicle counting across defined lanes and corridors for operational traffic analysis.",
    body: (
      <div className="space-y-4 text-base leading-8 text-ink-muted">
        <p>Tollway operators required precise, lane-by-lane vehicle flow metrics across distinct highway sections to optimize toll booth allocations, detect congestion anomalies, and support long-term capacity planning without costly sensor overhauls.</p>
        <p>A real-time computer vision pipeline was developed in <strong className="text-ink">Python using YOLO and OpenCV</strong>, integrating directly with existing roadside CCTV surveillance feeds. Dynamic virtual tripwires and lane bounding polygons track each vehicle trajectory across defined corridor boundaries to record directional passage counts with high temporal fidelity.</p>
        <p>The system attained a vehicle counting accuracy of <strong className="text-ink">up to 95%</strong> under variable traffic conditions, streaming structured throughput metrics directly into operational monitoring dashboards.</p>
      </div>
    ),
    tags: ["YOLO", "OpenCV", "Python", "Computer Vision", "Tracking"],
    visual: "signal",
    metric: "VISION / LANES / FLOW",
  },
  {
    index: "07",
    title: "TechCare-GPT",
    subtitle: "Agentic GraphRAG for Maintenance Intelligence",
    summary: "An agentic chatbot built on GraphRAG that transforms unstructured PPI and EMR maintenance records into structured operational intelligence.",
    body: (
      <div className="space-y-4 text-base leading-8 text-ink-muted">
        <p>Maintenance divisions generate thousands of free-text records across Periodic Performance Inspection (PPI) and Equipment Maintenance Report (EMR) documents. The data was completely unstructured and filled with non-standardized phrasing, preventing management from aggregating failure trends or discovering recurring machine issues across operational sites.</p>
        <p>An <strong className="text-ink">agentic GraphRAG platform</strong> was architected utilizing <strong className="text-ink">LangGraph, LlamaIndex, and Neo4j</strong>. Unstructured technical logs were parsed into an interconnected knowledge graph linking equipment models, component failure modes, operating sites, and verified technician remedies. An agentic reasoning layer navigates graph relations and vector indices to execute complex analytic queries—such as pivoting hydraulic oil leak frequencies by site, summarizing document contents, and synthesizing recurring defect solutions.</p>
        <p>The platform enables conversational intelligence over messy maintenance data, allowing engineering teams to dynamically aggregate failure metrics across any variable and automatically generate <strong className="text-ink">executive-level maintenance summaries</strong>.</p>
      </div>
    ),
    tags: ["GraphRAG", "LangGraph", "neo4j", "LlamaIndex", "LLM", "Python"],
    visual: "graph",
    metric: "GRAPH / AGENT / KNOWLEDGE",
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
  return <div className="technical-grid relative h-48 shrink-0 overflow-hidden border-y border-border bg-secondary/45 md:h-52">{visuals[type]}</div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article layoutId={`card-${project.index}`} whileHover={reduceMotion ? undefined : { y: -4, rotateX: 0.6, rotateY: -0.6 }} transition={{ duration: .45, ease: EASE }} className="group relative flex min-h-[470px] flex-col overflow-hidden rounded-lg border border-border bg-card/65 [transform-style:preserve-3d] focus-within:ring-1 focus-within:ring-ring md:col-span-6 md:h-[480px]">
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
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    closeButton.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return (
    <MotionConfig reducedMotion="user">
    <section id="work" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-5"><div><p className="mb-5 text-xs uppercase tracking-[0.22em] text-ink-muted">(02) — Selected works</p><h2 className="font-display text-5xl leading-[.95] text-ink md:text-7xl">Engineering, <span className="italic text-gradient">made visible.</span></h2></div><span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted md:block">07 field systems</span></div>
        <LayoutGroup><motion.div layout className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-12">{projects.map(project=><ProjectCard key={project.index} project={project} onOpen={()=>setSelected(project)}/>)}</motion.div>
        <AnimatePresence>{selected&&<motion.div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.article layoutId={`card-${selected.index}`} role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e=>e.stopPropagation()} className="max-h-[88vh] w-full max-w-4xl overflow-auto rounded-lg border border-border bg-card shadow-[var(--shadow-lift)]"><div className="flex items-start justify-between gap-5 p-6 md:p-8"><div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-ink-muted">Project / {selected.index}</p><h3 id="project-title" className="mt-3 font-display text-4xl text-ink md:text-6xl">{selected.title}</h3><p className="mt-2 text-sm text-ink-muted">{selected.subtitle}</p></div><Button ref={closeButton} variant="outline" size="icon" onClick={()=>setSelected(null)} aria-label="Close project details"><X /></Button></div><ProjectVisual type={selected.visual}/><div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:p-8"><div>{selected.body}</div><div className="flex max-w-xs flex-wrap content-start gap-2">{selected.tags.map(tag=><span key={tag} className="rounded border border-border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[.12em] text-ink-muted">{tag}</span>)}</div></div></motion.article></motion.div>}</AnimatePresence></LayoutGroup>
      </div>
    </section>
    </MotionConfig>
  );
}
