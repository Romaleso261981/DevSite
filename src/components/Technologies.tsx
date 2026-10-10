"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { TECHNOLOGIES } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function Technologies() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="technologies" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Стек"
          title="Технології"
          description="Сучасний інструментарій для швидких інтерфейсів, надійного бекенду та зручної підтримки."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {TECHNOLOGIES.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-6 text-center backdrop-blur-md"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
              whileHover={reduced ? undefined : { y: -4 }}
            >
              <motion.div
                className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-gradient-to-br from-blue-500/25 via-transparent to-purple-500/25 font-display text-sm font-bold tracking-tight text-[var(--fg)]"
                animate={
                  reduced
                    ? undefined
                    : { boxShadow: ["0 0 0 rgba(6,182,212,0)", "0 0 24px rgba(6,182,212,0.25)", "0 0 0 rgba(6,182,212,0)"] }
                }
                transition={
                  reduced
                    ? undefined
                    : { duration: 3.6, repeat: Infinity, delay: index * 0.2 }
                }
                aria-hidden
              >
                {tech.short}
              </motion.div>
              <p className="text-sm font-medium text-[var(--muted)]">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
