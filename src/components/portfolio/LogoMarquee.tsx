import cLogo from "@/assets/tech/c.svg";
import cppLogo from "@/assets/tech/cplusplus.svg";
import cudaLogo from "@/assets/tech/cuda.svg";
import deepstreamLogo from "@/assets/tech/deepstream.svg";
import detectron2Logo from "@/assets/tech/detectron2.svg";
import yoloLogo from "@/assets/tech/yolo.svg";
import dockerLogo from "@/assets/tech/docker.svg";
import kerasLogo from "@/assets/tech/keras.svg";
import tensorflowLogo from "@/assets/tech/tensorflow.svg";
import langchainLogo from "@/assets/tech/langchain.svg";
import langgraphLogo from "@/assets/tech/langgraph.svg";
import llamaindexLogo from "@/assets/tech/llamaindex.svg";
import neo4jLogo from "@/assets/tech/neo4j.svg";
import qdrantLogo from "@/assets/tech/qdrant.svg";
import podmanLogo from "@/assets/tech/podman.svg";
import pythonLogo from "@/assets/tech/python.svg";
import pytorchLogo from "@/assets/tech/pytorch.svg";
import scikitLearnLogo from "@/assets/tech/scikit-learn.svg";
import systemdLogo from "@/assets/tech/systemd.svg";
import ubuntuLogo from "@/assets/tech/ubuntu.svg";
import anacondaLogo from "@/assets/tech/anaconda.svg";
import opencvLogo from "@/assets/tech/opencv.svg";
import vllmLogo from "@/assets/tech/vllm.svg";

export interface TechItem {
  name: string;
  logo: string;
}

export const ROW_ONE: TechItem[] = [
  { name: "C", logo: cLogo },
  { name: "C++", logo: cppLogo },
  { name: "Python", logo: pythonLogo },
  { name: "PyTorch", logo: pytorchLogo },
  { name: "TensorFlow", logo: tensorflowLogo },
  { name: "Keras", logo: kerasLogo },
  { name: "scikit-learn", logo: scikitLearnLogo },
  { name: "OpenCV", logo: opencvLogo },
  { name: "YOLO", logo: yoloLogo },
  { name: "Detectron2", logo: detectron2Logo },
  { name: "vLLM", logo: vllmLogo },
  { name: "NVIDIA CUDA", logo: cudaLogo },
];

export const ROW_TWO: TechItem[] = [
  { name: "NVIDIA DeepStream", logo: deepstreamLogo },
  { name: "LangChain", logo: langchainLogo },
  { name: "LangGraph", logo: langgraphLogo },
  { name: "LlamaIndex", logo: llamaindexLogo },
  { name: "neo4j", logo: neo4jLogo },
  { name: "Qdrant", logo: qdrantLogo },
  { name: "Docker", logo: dockerLogo },
  { name: "Podman", logo: podmanLogo },
  { name: "systemd", logo: systemdLogo },
  { name: "Ubuntu", logo: ubuntuLogo },
  { name: "Anaconda", logo: anacondaLogo },
];

export function MarqueeRow({
  items,
  reverse,
  variant = "back",
}: {
  items: TechItem[];
  reverse?: boolean;
  variant?: "back" | "front";
}) {
  const loop = [...items, ...items];
  const band =
    variant === "front"
      ? "bg-background/45 backdrop-blur-md"
      : "border-y border-border/60 bg-secondary/45";

  const track = (keyPrefix: string, hidden = false) => (
    <div
      key={keyPrefix}
      aria-hidden={hidden}
      className={`marquee-track flex shrink-0 items-center gap-8 py-3.5 pr-8 md:gap-10 md:pr-10 ${
        reverse ? "marquee-track-reverse" : ""
      }`}
    >
      {loop.map((item, i) => (
        <div
          key={`${keyPrefix}-${item.name}-${i}`}
          className="flex shrink-0 items-center gap-2.5 select-none opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-105"
        >
          <img
            src={item.logo}
            alt={`${item.name} logo`}
            draggable={false}
            className="h-4 w-4 md:h-5 md:w-5 object-contain pointer-events-none"
          />
          <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors duration-200 hover:text-ink md:text-sm">
            {item.name}
          </span>
        </div>
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
