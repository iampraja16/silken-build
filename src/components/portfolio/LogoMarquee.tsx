const ROW_ONE = [
  "C",
  "C++",
  "Python",
  "PyTorch",
  "TensorFlow",
  "Keras",
  "scikit-learn",
  "OpenCV",
  "YOLO",
  "Detectron2",
  "NVIDIA CUDA",
];

const ROW_TWO = [
  "NVIDIA DeepStream",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "neo4j",
  "Qdrant",
  "Docker",
  "Podman",
  "systemd",
  "Ubuntu",
  "Anaconda",
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee group flex w-full overflow-hidden">
      <div
        className={`marquee-track flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? "marquee-track-reverse" : ""
        }`}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="select-none whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-ink-muted opacity-60 transition-opacity duration-300 hover:text-ink hover:opacity-100"
          >
            {name}
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className={`marquee-track flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? "marquee-track-reverse" : ""
        }`}
      >
        {loop.map((name, i) => (
          <span
            key={`dup-${name}-${i}`}
            className="select-none whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-ink-muted opacity-60 transition-opacity duration-300 hover:text-ink hover:opacity-100"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="relative w-full space-y-6 py-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <Row items={ROW_ONE} />
      <Row items={ROW_TWO} reverse />
    </div>
  );
}
