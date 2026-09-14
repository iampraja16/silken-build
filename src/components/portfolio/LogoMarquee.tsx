export const ROW_ONE = [
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

export const ROW_TWO = [
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

export function MarqueeRow({
  items,
  reverse,
  variant = "back",
}: {
  items: string[];
  reverse?: boolean;
  variant?: "back" | "front";
}) {
  const loop = [...items, ...items];
  const band =
    variant === "front"
      ? "bg-background/45 backdrop-blur-md"
      : "border-y border-border/60 bg-secondary/45";
  const text =
    variant === "front"
      ? "text-ink-muted opacity-70 hover:text-ink hover:opacity-100"
      : "text-ink-muted opacity-45 hover:opacity-90";

  const track = (keyPrefix: string, hidden = false) => (
    <div
      key={keyPrefix}
      aria-hidden={hidden}
      className={`marquee-track flex shrink-0 items-center gap-10 py-3.5 pr-10 ${
        reverse ? "marquee-track-reverse" : ""
      }`}
    >
      {loop.map((name, i) => (
        <span
          key={`${keyPrefix}-${name}-${i}`}
          className={`select-none whitespace-nowrap font-mono text-xs uppercase tracking-[0.22em] transition-opacity duration-300 md:text-sm ${text}`}
        >
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee group relative flex w-full overflow-hidden ${band}`}>
      {track("a")}
      {track("b", true)}
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
      <MarqueeRow items={ROW_ONE} />
      <MarqueeRow items={ROW_TWO} reverse />
    </div>
  );
}
