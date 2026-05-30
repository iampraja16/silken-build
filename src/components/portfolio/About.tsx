import { motion } from "framer-motion";

const stack = {
  "Edge AI & ML": [
    "Random Forest",
    "LLMs",
    "GraphRAG",
    "NVIDIA Jetson",
    "Machine Learning",
  ],
  "Hardware & IoT": [
    "LoRa",
    "ESP32",
    "Raspberry Pi",
    "CAN bus",
    "PCB Design",
  ],
};

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="mb-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
              (01) — About
            </p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl">
              Engineering at the
              <span className="block italic text-gradient">seam of two worlds.</span>
            </h2>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <div className="space-y-7 text-lg leading-relaxed text-ink-muted">
            <p>
              For two years I&rsquo;ve worked at the intersection of physical
              engineering and artificial intelligence—designing sensing
              hardware, deploying models to the edge, and turning raw signals
              from machinery into actionable insight.
            </p>
            <p>
              Most of my recent work lives in the heavy equipment sector:
              instrumenting vehicles, capturing CAN bus telemetry, and building
              the reasoning systems that interpret it. I care about systems
              that are <span className="text-ink">measurable</span>,{" "}
              <span className="text-ink">maintainable</span>, and quietly
              reliable in the field.
            </p>
          </div>

          <div className="mt-16 space-y-10">
            {Object.entries(stack).map(([group, tags], gi) => (
              <div key={group}>
                <p className="mb-5 text-xs uppercase tracking-[0.22em] text-ink-muted">
                  {group}
                </p>
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
                        delay: gi * 0.1 + i * 0.05,
                      }}
                      whileHover={{ y: -4, rotate: -1.2 }}
                      className="glass cursor-default rounded-full px-4 py-2 text-sm text-ink"
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
