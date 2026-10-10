"use client";

import {
  AppWindow,
  Building2,
  LayoutTemplate,
  LifeBuoy,
  Palette,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal } from "@/components/MotionReveal";
import { SERVICES } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const ICONS: Record<(typeof SERVICES)[number]["icon"], LucideIcon> = {
  LayoutTemplate,
  Building2,
  ShoppingBag,
  AppWindow,
  Palette,
  LifeBuoy,
};

export function Services() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Послуги"
          title="Наші послуги"
          description="Повний цикл: від ідеї та дизайну до розробки, запуску й підтримки цифрового продукту."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <MotionReveal key={service.id} delay={reduced ? 0 : index * 0.05}>
                <motion.article
                  whileHover={reduced ? undefined : { y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--inset-shine)] backdrop-blur-xl"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-cyan-400/15"
                    aria-hidden
                  />
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-[var(--border)] bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-cyan-500">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--fg)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {service.description}
                  </p>
                </motion.article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
