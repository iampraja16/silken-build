import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionConfig,
} from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/praja-cutout.png";
import { MarqueeRow, ROW_ONE, ROW_TWO } from "./LogoMarquee";

const EASE = [0.22, 1, 0.36, 1] as const;

function ScrollExpandPortrait() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "center center"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.45 });
  const clip = useTransform(smooth, [0, 1], ["inset(8% 12% 0% 12%)", "inset(0% 0% 0% 0%)"]);
  const imgScale = useTransform(smooth, [0, 1], [1.08, 1]);
  const imgY = useTransform(smooth, [0, 1], [18, 0]);
  const gridY = useTransform(smooth, [0, 1], [26, 0]);

  return (
    <div ref={wrap} className="relative h-full min-h-[360px] overflow-hidden bg-secondary">
      <div className="pointer-events-none absolute inset-x-[-35%] top-[31%] z-0 -rotate-2 opacity-50">
        <MarqueeRow items={ROW_ONE} variant="back" />
      </div>
      <motion.div
        style={{ clipPath: clip }}
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <motion.div aria-hidden style={{ y: gridY }} className="technical-grid absolute inset-0 opacity-70" />

        <motion.img
          src={portrait}
          alt="Portrait of Praja, IoT & AI Engineer"
          loading="lazy"
          style={{ scale: imgScale, y: imgY }}
          className="relative z-10 h-full w-full object-contain object-bottom grayscale transition-[filter] duration-700 hover:grayscale-0"
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-border bg-background/70 px-4 py-3 backdrop-blur-md">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">West Java · Indonesia</span>
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-soft" /> Active research
        </span>
      </div>
    </div>
  );
}

export function About() {
  return (
    <MotionConfig reducedMotion="user">
    <section id="about" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
          (01) — About
        </motion.p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: EASE }} className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-lg border border-border bg-card/65 p-7 md:col-span-8 md:p-10">
            <div className="technical-grid absolute inset-0 opacity-25" aria-hidden />
            <div className="relative z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">Profile / 001</p>
              <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.04] text-ink md:text-6xl">
                Engineering the bridge between <span className="italic text-gradient">physical signals</span> and intelligent systems.
              </h2>
            </div>
            <div className="relative z-10 grid gap-6 pt-12 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-sm leading-7 text-ink-muted md:text-base">
                I build field-ready IoT and AI systems across sensing, edge computing, machine learning, and industrial vehicle telemetry—turning raw signals into decisions where connectivity and compute are constrained.
              </p>
              <div className="grid grid-cols-2 gap-x-7 gap-y-2 border-l border-border pl-5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                <span>Edge AI</span><span>IoT</span><span>Telemetry</span><span>Vision</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: EASE, delay: 0.08 }} className="min-h-[430px] overflow-hidden rounded-lg border border-border md:col-span-4">
            <ScrollExpandPortrait />
          </motion.div>

          <div className="overflow-hidden rounded-lg border border-border bg-card/65 md:col-span-12">
            <div className="flex items-center border-b border-border px-4 py-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">Technology index</span>
            </div>
            <MarqueeRow items={[...ROW_ONE, ...ROW_TWO]} variant="front" />
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
