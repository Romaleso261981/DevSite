import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "", priority = false }: LogoProps) {
  return (
    <Link
      href="#hero"
      className={`inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${className}`}
      aria-label="DevSite — на головну"
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={43}
        height={32}
        priority={priority}
        className="h-8 w-auto shrink-0"
        aria-hidden
      />
      <span className="font-display text-[1.15rem] font-semibold leading-none tracking-tight sm:text-[1.2rem]">
        <span className="text-[var(--fg)]">Dev</span>
        <span className="bg-gradient-to-r from-cyan-500 to-[#2563EB] bg-clip-text text-transparent">
          Site
        </span>
      </span>
    </Link>
  );
}
