"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type ThemeToggleProps = {
  className?: string;
  /** Larger hit target for mobile menu row */
  compact?: boolean;
};

export function ThemeToggle({ className = "", compact = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={
        compact
          ? `inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass)] text-[var(--fg)] transition hover:bg-[var(--glass-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${className}`
          : `inline-flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--glass)] px-3 py-3 text-sm font-medium text-[var(--fg)] transition hover:bg-[var(--glass-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${className}`
      }
      aria-label={
        isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему"
      }
      title={isDark ? "Світла тема" : "Темна тема"}
      suppressHydrationWarning
    >
      <span className={compact ? "sr-only" : undefined}>
        {isDark ? "Світла тема" : "Темна тема"}
      </span>
      <span aria-hidden className="inline-flex items-center" suppressHydrationWarning>
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </span>
    </button>
  );
}
