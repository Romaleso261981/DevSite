import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal } from "@/components/MotionReveal";
import { PORTFOLIO } from "@/lib/constants";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.12),_transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Портфоліо"
          title="Наші проєкти"
          description="Нижче — демонстраційні концепти, що показують підхід до дизайну та розробки. Це не кейси реальних клієнтів."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {PORTFOLIO.map((project, index) => (
            <MotionReveal key={project.id} delay={index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] backdrop-blur-xl">
                <div
                  className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]"
                  aria-hidden
                >
                  <div
                    className={`absolute inset-0 ${
                      index === 0
                        ? "bg-[linear-gradient(145deg,#2563EB55,#06B6D433,var(--secondary))]"
                        : index === 1
                          ? "bg-[linear-gradient(145deg,#7C3AED55,#2563EB33,var(--secondary))]"
                          : "bg-[linear-gradient(145deg,#06B6D455,#7C3AED33,var(--secondary))]"
                    }`}
                  />
                  <div className="absolute inset-0 geo-grid opacity-30" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[var(--border-strong)] bg-[var(--browser-chrome)] p-3 backdrop-blur-md">
                    <div className="mb-2 flex gap-1">
                      <span className="size-1.5 rounded-full bg-[var(--subtle)]" />
                      <span className="size-1.5 rounded-full bg-[var(--subtle)]" />
                      <span className="size-1.5 rounded-full bg-[var(--subtle)]" />
                    </div>
                    <div className="h-1.5 w-2/3 rounded bg-[var(--glass-hover)]" />
                    <div className="mt-2 h-1.5 w-1/3 rounded bg-[var(--glass)]" />
                  </div>
                  <span className="absolute right-3 top-3 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-soft)]">
                    Demo
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--subtle)]">
                    {project.type}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[var(--fg)]">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[var(--border)] bg-[var(--glass)] px-2 py-1 text-xs text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-500">
                    Демонстраційний макет
                    <ArrowUpRight className="size-3.5 opacity-70" aria-hidden />
                  </p>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
