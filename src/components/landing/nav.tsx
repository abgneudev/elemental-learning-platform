"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Container } from "@/components/primitives";

const NAV_STEPS = [
  { num: "1.", label: "Heat",  href: "/walkthrough/setup" },
  { num: "2.", label: "Mould",  href: "/walkthrough/form"  },
  { num: "3.", label: "Apply", href: "/walkthrough/apply" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // sync on mount in case page is already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-30 border-b backdrop-blur-sm transition-colors duration-300",
        scrolled
          ? "border-[#222525]/8 bg-white/95 supports-[backdrop-filter]:bg-white/85"
          : "border-transparent bg-transparent",
      )}
    >
      <Container size="xl" className="flex h-14 items-center gap-4 sm:h-16 sm:gap-6">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/"
            className={clsx(
              "font-heading text-base font-bold tracking-tight transition-colors sm:text-lg",
              scrolled
                ? "text-brand-navy hover:text-brand-blue"
                : "text-white hover:text-white/80",
            )}
          >
            Elemental
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-4 sm:flex">
            <Link
              href="#evidence"
              className={clsx(
                "text-sm transition-colors",
                scrolled
                  ? "text-brand-navy/55 hover:text-brand-navy"
                  : "text-white/60 hover:text-white",
              )}
            >
              Evidence
            </Link>
            <Link
              href="#pricing"
              className={clsx(
                "text-sm transition-colors",
                scrolled
                  ? "text-brand-navy/55 hover:text-brand-navy"
                  : "text-white/60 hover:text-white",
              )}
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex-1" />

        {/* Right: step CTAs — no border */}
        <ol aria-label="Walkthrough steps" className="flex items-center gap-0.5 sm:gap-1">
          {NAV_STEPS.map(({ num, label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "inline-flex items-baseline gap-1 rounded-sm px-3 py-1.5 font-heading text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm",
                  scrolled
                    ? "text-brand-navy hover:bg-brand-navy/5 hover:text-brand-blue focus-visible:outline-brand-navy"
                    : "text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-white",
                )}
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    "font-mono text-[0.65rem]",
                    scrolled ? "text-brand-navy/35" : "text-white/40",
                  )}
                >
                  {num}
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </header>
  );
}
