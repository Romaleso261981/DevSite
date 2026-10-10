"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function Process() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="process" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Процес"
          title="Як ми працюємо"
          description="Прозорий шлях від першого брифу до запуску — з контрольованими ітераціями."
        />

        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="pointer-events-none absolute left-8 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-blue-500/50 via-cyan-400/30 to-purple-500/40 lg:left-1/2 lg:block lg:-translate-x-1/2"
            aria-hidden
          />

          {PROCESS_STEPS.map((item, index) => (
            <motion.li
              key={item.step}
              className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl"
              initial={reduced ? false : { opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <span className="font-display text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-[var(--fg)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
