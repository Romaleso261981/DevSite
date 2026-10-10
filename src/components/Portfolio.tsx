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
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(17,24,39,0.7)] backdrop-blur-xl">
                <div
                  className="relative aspect-[16/10] overflow-hidden border-b border-white/10"
                  aria-hidden
                >
                  <div
                    className={`absolute inset-0 ${
                      index === 0
                        ? "bg-[linear-gradient(145deg,#2563EB55,#06B6D433,#111827)]"
                        : index === 1
                          ? "bg-[linear-gradient(145deg,#7C3AED55,#2563EB33,#111827)]"
                          : "bg-[linear-gradient(145deg,#06B6D455,#7C3AED33,#111827)]"
                    }`}
                  />
                  <div className="absolute inset-0 geo-grid opacity-30" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/30 p-3 backdrop-blur-md">
                    <div className="mb-2 flex gap-1">
                      <span className="size-1.5 rounded-full bg-white/40" />
                      <span className="size-1.5 rounded-full bg-white/40" />
                      <span className="size-1.5 rounded-full bg-white/40" />
                    </div>
                    <div className="h-1.5 w-2/3 rounded bg-white/30" />
                    <div className="mt-2 h-1.5 w-1/3 rounded bg-white/15" />
                  </div>
                  <span className="absolute right-3 top-3 rounded-md border border-cyan-300/30 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                    Demo
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    {project.type}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300/90">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-300">
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
