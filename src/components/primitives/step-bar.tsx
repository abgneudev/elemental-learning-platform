import Link from "next/link";
import { clsx } from "clsx";
import { Container } from "./container";
import { buttonStyles } from "./button";

export type StepKey = "setup" | "form" | "apply";

const STEP_ORDER: readonly StepKey[] = ["setup", "form", "apply"] as const;

const STEP_LABEL: Record<StepKey, string> = {
  setup: "setup",
  form: "form",
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
  form: "bg-white/90 supports-[backdrop-filter]:bg-white/75 border-[#222525]/10",
  apply: "bg-[#f8f6f4]/90 supports-[backdrop-filter]:bg-[#f8f6f4]/75 border-[#222525]/10",
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
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const totalSteps = STEP_ORDER.length;

  return (
    <header
      aria-label="Walkthrough"
      className={clsx(
        "sticky top-0 z-30 border-b backdrop-blur-sm transition-colors duration-300",
        STEP_BG[currentStep],
        className,
      )}
    >
      <Container
        size="xl"
        className="flex h-14 items-center gap-3 sm:h-16 sm:gap-6"
      >
        <Link
          href={logoHref}
          className="font-heading text-base font-semibold lowercase tracking-tight text-brand-navy transition-colors duration-200 hover:text-brand-blue sm:text-lg"
        >
          {brand}
        </Link>

        <nav
          aria-label="Walkthrough progress"
          className="flex flex-1 items-center justify-center"
        >
          <ol className="flex items-center gap-3 sm:gap-5 text-sm">
            {STEP_ORDER.map((step, i) => {
              const isCurrent = i === currentIndex;
              const href = stepHrefs?.[step];

              const labelClass = clsx(
                "inline-flex items-baseline gap-1.5 transition-colors duration-200",
                isCurrent
                  ? "text-brand-navy font-semibold"
                  : "text-brand-navy/40 font-normal hover:text-brand-blue",
              );

              const content = (
                <>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs"
                  >
                    {STEP_NUMBER[step]}
                  </span>
                  <span className="lowercase">{STEP_LABEL[step]}</span>
                </>
              );

              return (
                <li key={step} className="flex items-center gap-3 sm:gap-5">
                  {href && !isCurrent ? (
                    <Link
                      href={href}
                      aria-label={`Go to ${STEP_LABEL[step]}`}
                      aria-current={isCurrent ? "step" : undefined}
                      className={clsx(
                        labelClass,
                        "outline-none focus-visible:underline focus-visible:underline-offset-4",
                      )}
                    >
                      {content}
                    </Link>
                  ) : (
                    <span
                      className={labelClass}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      {content}
                    </span>
                  )}
                  {i < STEP_ORDER.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="text-ink-900/25"
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

        <nav
          aria-label="Step navigation"
          className="flex items-center gap-2"
        >
          {prevHref && (
            <Link
              href={prevHref}
              aria-label={prevLabel}
              className={buttonStyles("quiet", "sm")}
            >
              <span aria-hidden="true">←</span>
            </Link>
          )}
          {nextHref && (
            <Link
              href={nextHref}
              aria-label={nextLabel}
              className={buttonStyles("quiet", "sm")}
            >
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      </Container>
    </header>
  );
}