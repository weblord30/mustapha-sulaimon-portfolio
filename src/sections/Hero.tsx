import { motion } from "framer-motion";
import { MeshGradient } from "../components/MeshGradient";
import { profile } from "../data/content";

const NAME_CHARS = profile.name.split("");

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <MeshGradient />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-mono text-xs tracking-[0.3em] text-muted uppercase"
        >
          Available for select work
        </motion.p>

        <h1 className="font-display text-6xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-7xl md:text-8xl">
          {NAME_CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-6 max-w-xl font-body text-lg text-muted sm:text-xl"
        >
          {profile.role}. {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-text px-7 py-3 font-mono text-sm text-ground transition-transform hover:scale-[1.03]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-7 py-3 font-mono text-sm text-text transition-colors hover:bg-white/5"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-muted uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}
