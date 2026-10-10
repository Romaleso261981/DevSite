"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[rgba(8,12,24,0.72)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Logo priority />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Основна навігація"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-xl bg-[linear-gradient(135deg,#2563EB,#7C3AED)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 sm:inline-flex"
          >
            Обговорити проєкт
          </a>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={reduced ? undefined : { opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10 bg-[rgba(8,12,24,0.96)] backdrop-blur-xl lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Мобільна навігація"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 rounded-xl bg-[linear-gradient(135deg,#2563EB,#7C3AED)] px-4 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Обговорити проєкт
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
