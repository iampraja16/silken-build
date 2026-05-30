import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
          (04) — Contact
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl leading-[1] tracking-tight text-ink md:text-7xl"
        >
          Let&rsquo;s build
          <span className="block italic text-gradient">
            intelligent systems together.
          </span>
        </motion.h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
          Open to collaborations in edge AI, embedded systems, and industrial
          intelligence. Reach out—short notes welcome.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="glass-strong mx-auto mt-14 max-w-xl rounded-3xl p-6 text-left"
        >
          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2 md:col-span-1">
              <span className="mb-2 block text-xs uppercase tracking-widest text-ink-muted">
                Name
              </span>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-white/70 bg-white/40 px-4 py-3 text-sm text-ink outline-none transition focus:border-white focus:bg-white/70"
                placeholder="Your name"
              />
            </label>
            <label className="col-span-2 md:col-span-1">
              <span className="mb-2 block text-xs uppercase tracking-widest text-ink-muted">
                Email
              </span>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-white/70 bg-white/40 px-4 py-3 text-sm text-ink outline-none transition focus:border-white focus:bg-white/70"
                placeholder="you@studio.com"
              />
            </label>
            <label className="col-span-2">
              <span className="mb-2 block text-xs uppercase tracking-widest text-ink-muted">
                Message
              </span>
              <textarea
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-white/70 bg-white/40 px-4 py-3 text-sm text-ink outline-none transition focus:border-white focus:bg-white/70"
                placeholder="Tell me about the project…"
              />
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-3.5 text-sm font-medium text-background"
          >
            {sent ? "Sent — thank you" : "Send message"}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </motion.button>
        </motion.form>

        <div className="mt-14 flex items-center justify-center gap-3">
          {[
            { Icon: Linkedin, label: "LinkedIn", href: "#" },
            { Icon: Github, label: "GitHub", href: "#" },
            { Icon: Mail, label: "Email", href: "mailto:hello@praja.dev" },
          ].map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ y: -3, rotate: -2 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              aria-label={label}
              className="glass grid h-12 w-12 place-items-center rounded-full text-ink"
            >
              <Icon size={18} strokeWidth={1.8} />
            </motion.a>
          ))}
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-[oklch(0.9_0.01_270)] pt-8 text-xs uppercase tracking-[0.18em] text-ink-muted md:flex-row">
          <span>© 2026 Praja</span>
          <span>Crafted with intent · IoT × AI</span>
        </footer>
      </div>
    </section>
  );
}
