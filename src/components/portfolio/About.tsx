import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  MotionConfig,
} from "framer-motion";
import { useRef, useState, useEffect, type PointerEvent } from "react";
import portrait from "@/assets/praja-cutout.png";
import unitedTractorsLogo from "@/assets/logo-united-tractors.png";
import jasaMargaLogo from "@/assets/logo-jasa-marga-clean.png";
import { MarqueeRow, ROW_ONE, ROW_TWO } from "./LogoMarquee";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PhysicsBadgeProps {
  name: string;
  image: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  type: "squircle" | "pill";
  initialAlign: "left" | "right";
  initialRotate: number;
}

function PhysicsCompanyBadge({
  name,
  image,
  containerRef,
  type,
  initialAlign,
  initialRotate,
}: PhysicsBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const [zIndex, setZIndex] = useState(30);
  const isDragging = useRef(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !badgeRef.current) return;
    const container = containerRef.current;
    const badge = badgeRef.current;

    const setupPos = () => {
      const cRect = container.getBoundingClientRect();
      const bRect = badge.getBoundingClientRect();
      const bWidth = bRect.width || (type === "squircle" ? 64 : 130);
      const bHeight = bRect.height || (type === "squircle" ? 64 : 40);
      const footerHeight = 46;
      const floorPadding = 10;

      const floorY = Math.max(10, cRect.height - footerHeight - bHeight - floorPadding);
      const startX =
        initialAlign === "left"
          ? 16
          : Math.max(16, cRect.width - bWidth - 16);

      x.set(startX);
      y.set(floorY);
      rotate.set(initialRotate);
      isInitialized.current = true;
    };

    if (!isInitialized.current) {
      setupPos();
    }

    const ro = new ResizeObserver(() => {
      if (!isDragging.current && containerRef.current && badgeRef.current && isInitialized.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const bRect = badgeRef.current.getBoundingClientRect();
        const footerHeight = 46;
        const floorPadding = 10;
        const bHeight = bRect.height || (type === "squircle" ? 64 : 40);
        const bWidth = bRect.width || (type === "squircle" ? 64 : 130);

        const maxX = Math.max(12, cRect.width - bWidth - 12);
        if (x.get() > maxX) x.set(maxX);

        const floorY = Math.max(10, cRect.height - footerHeight - bHeight - floorPadding);
        if (y.get() > floorY) y.set(floorY);
      }
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, [containerRef, initialAlign, initialRotate, type, x, y, rotate]);

  const handleDragStart = () => {
    isDragging.current = true;
    setZIndex(45);
  };

  const handleDrag = (_: unknown, info: { velocity: { x: number; y: number } }) => {
    // Subtle physical inertia tilt while dragging
    const tilt = Math.max(-14, Math.min(14, info.velocity.x * 0.03));
    rotate.set(tilt);
  };

  const handleDragEnd = (_: unknown, info: { velocity: { x: number; y: number } }) => {
    isDragging.current = false;
    setZIndex(30);

    if (!containerRef.current || !badgeRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const badgeRect = badgeRef.current.getBoundingClientRect();

    const currentX = x.get();
    const footerHeight = 46;
    const floorPadding = 10;
    const badgeHeight = badgeRect.height || (type === "squircle" ? 64 : 40);
    const badgeWidth = badgeRect.width || (type === "squircle" ? 64 : 130);

    // Default floor target above footer bar
    const floorY = Math.max(10, containerRect.height - footerHeight - badgeHeight - floorPadding);

    // Calculate landing X based on throw velocity with boundary clamping
    const paddingX = 14;
    const maxX = Math.max(paddingX, containerRect.width - badgeWidth - paddingX);
    const targetX = Math.max(paddingX, Math.min(maxX, currentX + info.velocity.x * 0.18));

    // Natural resting angle with slight randomized impact variation
    const landingRotate = Math.max(
      -10,
      Math.min(10, info.velocity.x * 0.02 + (Math.random() * 8 - 4))
    );

    // Slower, smooth gravity spring fall so the drop animation is clearly visible
    animate(y, floorY, {
      type: "spring",
      stiffness: 75,
      damping: 15,
      mass: 1.35,
      velocity: Math.max(0, info.velocity.y * 0.4),
    });

    // Horizontal slide with inertia friction
    animate(x, targetX, {
      type: "spring",
      stiffness: 70,
      damping: 18,
      velocity: info.velocity.x * 0.6,
    });

    // Rotation settling animation
    animate(rotate, landingRotate, {
      type: "spring",
      stiffness: 75,
      damping: 15,
    });
  };

  return (
    <motion.div
      ref={badgeRef}
      drag
      dragConstraints={containerRef}
      dragElastic={0.12}
      dragMomentum={false}
      style={{ x, y, rotate, zIndex }}
      whileDrag={{ scale: 1.08 }}
      whileHover={{ scale: 1.05 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      tabIndex={0}
      role="img"
      aria-label={`${name} — professional experience (draggable)`}
      title={`Drag ${name} to feel gravity`}
      className={`absolute left-0 top-0 cursor-grab active:cursor-grabbing touch-none select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
        type === "squircle"
          ? "h-14 w-14 md:h-16 md:w-16 rounded-2xl shadow-xl overflow-hidden filter drop-shadow-md"
          : "flex h-10 md:h-11 items-center justify-center rounded-xl bg-white px-3.5 py-2 shadow-xl border border-black/10 filter drop-shadow-md"
      }`}
    >
      {type === "squircle" ? (
        <img
          src={image}
          alt={`${name} logo`}
          draggable={false}
          className="h-full w-full object-cover pointer-events-none rounded-2xl"
        />
      ) : (
        <img
          src={image}
          alt={`${name} logo`}
          draggable={false}
          className="h-5 md:h-6 w-auto object-contain pointer-events-none"
        />
      )}
    </motion.div>
  );
}

function ScrollExpandPortrait() {
  const wrap = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "center center"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.45 });
  const clip = useTransform(smooth, [0, 1], ["inset(8% 12% 0% 12%)", "inset(0% 0% 0% 0%)"]);
  const imgScale = useTransform(smooth, [0, 1], [1.08, 1]);
  const imgY = useTransform(smooth, [0, 1], [18, 0]);
  const gridY = useTransform(smooth, [0, 1], [26, 0]);

  const updateCursor = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left + 14);
    cursorY.set(event.clientY - bounds.top + 14);
  };

  return (
    <div
      ref={wrap}
      className="relative h-full min-h-[360px] overflow-hidden bg-secondary md:cursor-none"
      onPointerMove={updateCursor}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
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

      {/* Physics & Gravity Draggable Company Logos */}
      <PhysicsCompanyBadge
        name="United Tractors"
        image={unitedTractorsLogo}
        containerRef={wrap}
        type="squircle"
        initialAlign="left"
        initialRotate={-4}
      />

      <PhysicsCompanyBadge
        name="Jasa Marga"
        image={jasaMargaLogo}
        containerRef={wrap}
        type="pill"
        initialAlign="right"
        initialRotate={3}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-40 hidden rounded border border-border bg-ink px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-background shadow-[var(--shadow-glass)] md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.92 }}
        transition={{ duration: 0.18 }}
      >
        sup folks!
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
