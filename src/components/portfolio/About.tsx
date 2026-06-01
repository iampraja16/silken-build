import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import portrait from "@/assets/praja's_picture.jpeg";

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

function PortraitWithCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

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
    <div
      ref={wrap}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMove}
      className="group relative overflow-hidden rounded-[28px]"
      style={{ cursor: hovering ? "none" : "default" }}
    >
      <motion.img
        src={portrait}
        alt="Portrait of Praja, IoT & AI Engineer"
        width={1024}
        height={1024}
        loading="lazy"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full object-cover transition-[filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ filter: hovering ? "grayscale(0%)" : "grayscale(100%)" }}
      />
      {/* soft inner frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/60"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 30px 80px -40px rgba(15,23,42,0.25)" }}
      />

      {/* Custom floating cursor */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: sx,
              y: sy,
              translateX: "-50%",
              translateY: "-130%",
            }}
            className="pointer-events-none absolute left-0 top-0 z-10 select-none whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-medium tracking-wide text-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
          >
            hey, it&rsquo;s me
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-16">
        {/* Heading + portrait (asymmetric editorial) */}
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="mb-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
              (01) — About
            </p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl">
              Engineering at the
              <span className="block italic text-gradient">seam of two worlds.</span>
            </h2>

            <div className="mt-10 md:mt-14 md:-rotate-[1.2deg] max-w-[300px] md:max-w-[320px]">
              <PortraitWithCursor />
              <p className="mt-3 ml-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                Praja · Based in West Java, Indonesia
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <div className="space-y-7 text-lg leading-relaxed text-ink-muted">
            <p>
              With two years of hands-on experience in the heavy equipment and industrial sectors, my focus lies at the intersection of embedded hardware and machine learning. I specialize in building deterministic, edge-deployed intelligence—from extracting robust telemetry via CAN bus architectures to implementing on-device LLMs and semi-supervised learning models.
            </p>
            <p>
              I don&rsquo;t just build systems that collect data; I engineer solutions that understand it, designed to operate reliably in the most constrained and demanding physical environments.
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
                  <span className="h-px flex-1 bg-[oklch(0.88_0.01_270)]" />
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
                        ease: [0.16, 1, 0.3, 1],
                        delay: gi * 0.1 + i * 0.04,
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
        </div>
      </div>
    </section>
  );
}
