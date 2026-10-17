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
          description="Три приклади сайтів для різних задач: ресторан морепродуктів, сервіс кондиціонування і вебстудія."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {PORTFOLIO.map((project, index) => (
            <MotionReveal key={project.id} delay={index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] backdrop-blur-xl">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
                  <img
                    src={project.image}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
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
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
