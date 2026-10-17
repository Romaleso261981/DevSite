"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PORTFOLIO } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

function pagesFor(perView: number) {
  return Math.max(1, PORTFOLIO.length - perView + 1);
}

export function Portfolio() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(2);
  const reduced = usePrefersReducedMotion();
  const pageCount = pagesFor(perView);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(media.matches ? 2 : 1);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "auto" });
    setPage(0);
  }, [perView]);

  const syncPage = useCallback(() => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-portfolio-card]");
    if (!el || !card) return;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card.offsetWidth + gap;
    if (step <= 0) return;
    const next = Math.round(el.scrollLeft / step);
    setPage(Math.max(0, Math.min(next, pagesFor(perView) - 1)));
  }, [perView]);

  const scrollToPage = useCallback(
    (index: number) => {
      const el = scrollerRef.current;
      const card = el?.querySelector<HTMLElement>("[data-portfolio-card]");
      if (!el || !card) return;
      const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = card.offsetWidth + gap;
      const next = Math.max(0, Math.min(index, pagesFor(perView) - 1));
      el.scrollTo({
        left: next * step,
        behavior: reduced ? "auto" : "smooth",
      });
      setPage(next);
    },
    [perView, reduced],
  );

  return (
    <section id="portfolio" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.12),_transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Портфоліо"
          title="Наші проєкти"
          description="Три приклади сайтів для різних задач: ресторан морепродуктів, сервіс кондиціонування і вебстудія."
        />

        <div className="relative">
          <div
            ref={scrollerRef}
            onScroll={syncPage}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            tabIndex={0}
            aria-label="Галерея прикладів робіт"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollToPage(page + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollToPage(page - 1);
              }
            }}
          >
            {PORTFOLIO.map((project) => (
              <article
                key={project.id}
                data-portfolio-card
                className="flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] backdrop-blur-xl sm:w-[calc((100%-1.25rem)/2)]"
              >
                <div className="relative aspect-video overflow-hidden border-b border-[var(--border)]">
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
            ))}
          </div>

          <button
            type="button"
            className="absolute left-3 top-[22%] z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card-strong)] text-[var(--fg)] shadow-[var(--shadow)] backdrop-blur-xl transition hover:bg-[var(--glass-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:pointer-events-none disabled:opacity-35"
            aria-label="Попередні роботи"
            disabled={page === 0}
            onClick={() => scrollToPage(page - 1)}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            className="absolute right-3 top-[22%] z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card-strong)] text-[var(--fg)] shadow-[var(--shadow)] backdrop-blur-xl transition hover:bg-[var(--glass-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:pointer-events-none disabled:opacity-35"
            aria-label="Наступні роботи"
            disabled={page >= pageCount - 1}
            onClick={() => scrollToPage(page + 1)}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Сторінки галереї">
          {Array.from({ length: pageCount }, (_, index) => {
            const active = index === page;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-label={`Показати роботи, сторінка ${index + 1}`}
                aria-selected={active}
                className={`h-2 rounded-full transition-[width,background-color] ${
                  active ? "w-6 bg-[var(--primary)]" : "w-2 bg-[var(--faint)] hover:bg-[var(--subtle)]"
                }`}
                onClick={() => scrollToPage(index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
