import { Globe, Mail, Phone, Share2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--footer-bg)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--subtle)]">
            {SITE.tagline}. Створюємо сучасні цифрові продукти з акцентом на
            дизайн, продуктивність і чисту інженерію.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Навігація
          </h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--subtle)] transition hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Контакти
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--subtle)]">
            <li>
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" aria-hidden />
                {SITE.email}
              </span>
            </li>
            <li>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center gap-2 transition hover:text-[var(--fg)]"
              >
                <Phone className="size-4" aria-hidden />
                {SITE.phone}
              </a>
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Соцмережа (плейсхолдер)"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass)] text-[var(--muted)] transition hover:bg-[var(--glass-hover)] hover:text-[var(--fg)]"
            >
              <Share2 className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Вебпрофіль (плейсхолдер)"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass)] text-[var(--muted)] transition hover:bg-[var(--glass-hover)] hover:text-[var(--fg)]"
            >
              <Globe className="size-4" />
            </a>
          </div>
          <p className="mt-3 text-xs text-[var(--faint)]">
            Соцмережі — плейсхолдери до появи офіційних профілів.
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-[var(--faint)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {SITE.name}. Усі права захищено.
          </p>
          <p>Зроблено з фокусом на якість і доступність.</p>
        </div>
      </div>
    </footer>
  );
}
