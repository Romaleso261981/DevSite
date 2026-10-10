import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal } from "@/components/MotionReveal";
import { ABOUT_POINTS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <MotionReveal>
            <SectionHeading
              align="left"
              eyebrow="Про нас"
              title="Технології, дизайн та увага до деталей"
              description="Ми поєднуємо інженерну точність із виразним візуалом: продукт має бути швидким, масштабованим і приємним у використанні."
            />
            <p className="max-w-xl text-sm leading-relaxed text-[var(--subtle)]">
              DevSite — українська команда, яка допомагає бізнесу запускати
              цифрові продукти без зайвої складності й шаблонного вигляду.
            </p>
          </MotionReveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {ABOUT_POINTS.map((point, index) => (
              <MotionReveal key={point.title} delay={index * 0.04}>
                <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur-md">
                  <div className="mb-3 flex items-center gap-2 text-cyan-500">
                    <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                    <h3 className="font-display text-base font-semibold text-[var(--fg)]">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {point.description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
