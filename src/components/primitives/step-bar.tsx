"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Container } from "./container";

export type StepKey = "setup" | "form" | "apply";

const STEP_ORDER: readonly StepKey[] = ["setup", "form", "apply"] as const;

const STEP_LABEL: Record<StepKey, string> = {
  setup: "heat",
  form: "mould",
  apply: "apply",
};

const STEP_NUMBER: Record<StepKey, string> = {
  setup: "/01",
  form: "/02",
  apply: "/03",
};

/* Per-step background — keeps the StepBar in lockstep with the page tint.
   All blue family for a monochromatic finish (no mint / green). */
const STEP_BG: Record<StepKey, string> = {
  setup: "bg-[#f1fdff]/90 supports-[backdrop-filter]:bg-[#f1fdff]/75 border-[#03045e]/10",
  form:  "bg-[#f1fdff]/90 supports-[backdrop-filter]:bg-[#f1fdff]/75 border-[#03045e]/10",
  apply: "bg-[#f8f6f4]/90 supports-[backdrop-filter]:bg-[#f8f6f4]/75 border-[#222525]/10",
};

/* Steps whose hero section has a dark background — need white text when transparent */
const STEP_DARK_HERO: Record<StepKey, boolean> = {
  setup: false, // bg-azure = very light
  form: false,  // bg-azure = very light
  apply: false, // bg-azure = very light
};

type StepBarProps = {
  currentStep: StepKey;
  prevHref?: string;
  nextHref?: string;
  prevLabel?: string;
  nextLabel?: string;
  logoHref?: string;
  brand?: string;
  stepHrefs?: Partial<Record<StepKey, string>>;
  className?: string;
};

/**
 * StepBar — typographic progress per visual-direction.md §StepBar:
 *   "/01 setup · /02 form · /03 apply" — current in ink-900 weight 600,
 *   others in ink/40 weight 400. Arrow nav as outlined circular buttons
 *   (Nonstop reference). No fill bars, no pills.
 */
export function StepBar({
  currentStep,
  prevHref,
  nextHref,
  prevLabel = "Back",
  nextLabel = "Next",
  logoHref = "/",
  brand = "elemental",
  stepHrefs,
  className,
}: StepBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // sync on mount in case page is already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const totalSteps = STEP_ORDER.length;
  const isDark = STEP_DARK_HERO[currentStep];

  return (
    <header
      aria-label="Walkthrough"
      className={clsx(
        "fixed top-0 left-0 right-0 z-30 border-b backdrop-blur-sm transition-colors duration-300",
        scrolled ? STEP_BG[currentStep] : "border-transparent bg-transparent",
        className,
      )}
    >
      <Container
        size="xl"
        className="flex h-14 items-center sm:h-16"
      >
        <div className="flex flex-1 items-center">
          <Link
            href={logoHref}
            className={clsx(
              "font-heading text-base font-semibold lowercase tracking-tight transition-colors duration-200 sm:text-lg",
              scrolled || !isDark
                ? "text-brand-navy hover:text-brand-blue"
                : "text-white hover:text-white/80",
            )}
          >
            {brand}
          </Link>
        </div>

        {/* Mobile: current step only */}
        <span
          aria-hidden="true"
          className={clsx(
            "sm:hidden inline-flex items-baseline gap-1.5 text-sm font-semibold transition-colors duration-200",
            scrolled || !isDark ? "text-brand-navy" : "text-white",
          )}
        >
          <span className="font-mono text-xs">{STEP_NUMBER[currentStep]}</span>
          <span className="lowercase">{STEP_LABEL[currentStep]}</span>
        </span>

        {/* Desktop: full step list */}
        <nav
          aria-label="Walkthrough progress"
          className="hidden sm:flex items-center"
        >
          <ol className="flex items-center gap-5 text-sm">
            {STEP_ORDER.map((step, i) => {
              const isCurrent = i === currentIndex;
              const href = stepHrefs?.[step];

              const labelClass = clsx(
                "inline-flex items-baseline gap-1.5 transition-colors duration-200",
                isCurrent
                  ? clsx(
                      "font-semibold",
                      scrolled || !isDark ? "text-brand-navy" : "text-white",
                    )
                  : clsx(
                      "font-normal",
                      scrolled || !isDark
                        ? "text-brand-navy/40 hover:text-brand-blue"
                        : "text-white/40 hover:text-white",
                    ),
              );

              const content = (
                <>
                  <span aria-hidden="true" className="font-mono text-xs">
                    {STEP_NUMBER[step]}
                  </span>
                  <span className="lowercase">{STEP_LABEL[step]}</span>
                </>
              );

              return (
                <li key={step} className="flex items-center gap-5">
                  {href && !isCurrent ? (
                    <Link
                      href={href}
                      aria-label={`Go to ${STEP_LABEL[step]}`}
                      aria-current={isCurrent ? "step" : undefined}
                      className={clsx(labelClass, "outline-none focus-visible:underline focus-visible:underline-offset-4")}
                    >
                      {content}
                    </Link>
                  ) : (
                    <span className={labelClass} aria-current={isCurrent ? "step" : undefined}>
                      {content}
                    </span>
                  )}
                  {i < STEP_ORDER.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={scrolled || !isDark ? "text-ink-900/25" : "text-white/25"}
                    >
                      ·
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Step {currentIndex + 1} of {totalSteps}: {STEP_LABEL[currentStep]}.
        </p>

        <div className="flex flex-1 items-center justify-end gap-2">
          {prevHref && (
            <Link
              href={prevHref}
              aria-label={prevLabel}
              className={clsx(
                "inline-flex items-center justify-center gap-2 font-heading transition-colors duration-200",
                "outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
                "rounded-full border-2 bg-transparent",
                "h-9 min-w-[2.25rem] px-3 text-sm",
                scrolled || !isDark
                  ? "border-ink-900 text-ink-900 focus-visible:outline-ink-900"
                  : "border-white text-white focus-visible:outline-white",
              )}
            >
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3L5 8l5 5" />
              </svg>
            </Link>
          )}
          {nextHref && (
            <Link
              href={nextHref}
              aria-label={nextLabel}
              className={clsx(
                "inline-flex items-center justify-center gap-2 font-heading transition-colors duration-200",
                "outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
                "rounded-full border-2 bg-transparent",
                "h-9 min-w-[2.25rem] px-3 text-sm",
                scrolled || !isDark
                  ? "border-ink-900 text-ink-900 focus-visible:outline-ink-900"
                  : "border-white text-white focus-visible:outline-white",
              )}
            >
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
