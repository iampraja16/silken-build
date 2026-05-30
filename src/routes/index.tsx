import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Works } from "@/components/portfolio/Works";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Praja — IoT & AI Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Praja, an IoT & AI Engineer bridging hardware and intelligence—edge ML, CAN bus telemetry, and reasoning systems for heavy equipment.",
      },
      { property: "og:title", content: "Praja — IoT & AI Engineer" },
      {
        property: "og:description",
        content:
          "Bridging hardware and intelligence. Edge AI, embedded systems, and industrial reasoning.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Experience />
      <Contact />
    </main>
  );
}
