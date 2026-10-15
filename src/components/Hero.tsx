"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

function FloatingWindow({
  className,
  title,
  delay,
  reduced,
  imageSrc,
}: {
  className: string;
  title: string;
  delay: number;
  reduced: boolean;
  imageSrc?: string;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute hidden overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--card-strong)] shadow-[var(--shadow)] backdrop-blur-xl md:block ${className}`}
      animate={
        reduced
          ? undefined
          : { y: [0, -14, 0], rotate: [0, 1.2, 0] }
      }
      transition={
        reduced
          ? undefined
          : { duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }
      }
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--card-strong)] px-3 py-2">
        <span className="size-2 rounded-full bg-rose-400/80" />
        <span className="size-2 rounded-full bg-amber-400/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate text-[10px] tracking-wide text-[var(--subtle)]">
          {title}
        </span>
      </div>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          className="h-24 w-full object-cover object-top"
        />
      ) : (
        <div className="space-y-2 p-3">
          <div className="h-2 w-3/4 rounded bg-gradient-to-r from-blue-500/50 to-cyan-400/30" />
          <div className="h-2 w-1/2 rounded bg-[var(--glass-hover)]" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="h-10 rounded-lg bg-purple-500/20" />
            <div className="h-10 rounded-lg bg-blue-500/20" />
            <div className="h-10 rounded-lg bg-cyan-500/15" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--hero-glow-a),_transparent_55%),radial-gradient(ellipse_at_80%_20%,_var(--hero-glow-b),_transparent_40%),radial-gradient(ellipse_at_20%_80%,_var(--hero-glow-c),_transparent_45%)]" />
        <div className="geo-grid absolute inset-0 opacity-40" />
        <motion.div
          className="absolute -left-24 top-24 size-72 rounded-full bg-blue-600/25 blur-3xl"
          animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -right-16 top-40 size-80 rounded-full bg-purple-600/20 blur-3xl"
          animate={reduced ? undefined : { x: [0, -30, 0], y: [0, 35, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 14, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <div className="absolute left-1/2 top-1/3 h-px w-[120%] -translate-x-1/2 rotate-12 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
        <div className="absolute left-1/3 top-1/4 size-40 rotate-45 border border-[var(--border)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FloatingWindow
          className="right-0 top-8 w-48 lg:w-56"
          title="devsite.com.ua"
          delay={0}
          reduced={reduced}
          imageSrc="/hero/preview-home.png"
        />
        <FloatingWindow
          className="bottom-8 right-28 w-48 lg:right-40 lg:w-56"
          title="techno-ai.vercel.app"
          delay={1.2}
          reduced={reduced}
          imageSrc="/hero/preview-services.png"
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass)] px-3 py-1.5 text-xs font-medium tracking-wide text-[var(--accent-soft)] backdrop-blur-md">
            <Sparkles className="size-3.5" aria-hidden />
            DevSite · преміальна вебстудія
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--fg)] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
            Створюємо цифрові рішення, які розвивають ваш бізнес
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Сучасні сайти, інтернет-магазини та вебзастосунки з сильним
            дизайном, чистою інженерією й увагою до деталей — щоб ваш продукт
            виглядав і працював на рівні преміум.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563EB,#06B6D4)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(37,99,235,0.4)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              Обговорити проєкт
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--glass)] px-6 py-3.5 text-sm font-semibold text-[var(--fg)] backdrop-blur-md transition hover:bg-[var(--glass-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              Переглянути роботи
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
