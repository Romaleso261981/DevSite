import { Zap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal } from "@/components/MotionReveal";
import { WHY_US } from "@/lib/constants";

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Переваги"
          title="Чому DevSite?"
          description="Коротко про те, чим ми керуємося в кожному проєкті."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, index) => (
            <MotionReveal key={item.title} delay={index * 0.04}>
              <li className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur-md">
                <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/25 to-purple-500/20 text-cyan-500">
                  <Zap className="size-4" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
              </li>
            </MotionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
