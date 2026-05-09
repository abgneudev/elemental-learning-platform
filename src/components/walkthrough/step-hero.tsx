import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import type { StepKey } from "../primitives/step-bar";

type StepHeroProps = {
  /** Which walkthrough step this hero opens. Drives sizing and text-on-bg color. */
  step: StepKey;
  /** Eyebrow text — typically `/01 step one`. */
  eyebrow: ReactNode;
  /** Step title. Form step renders one tier larger than Setup / Apply. */
  title: ReactNode;
  /** One-line description sitting under the title. */
  lead: ReactNode;
  /** Time estimate, rendered inline as a mono caption (no chip). */
  time: string;
  /** Optional illustration. Renders to the right on ≥ lg. */
  illustration?: ReactNode;
  className?: string;
};

const TITLE_SIZE: Record<StepKey, string> = {
  setup: "text-step-mobile sm:text-step-desktop",
  form: "text-step-mobile-lg sm:text-step-desktop-lg",
  apply: "text-step-mobile sm:text-step-desktop",
};

const TEXT_TONE = "text-brand-navy";
const LEAD_TONE = "text-brand-navy/70";
const CAPTION_TONE = "text-brand-blue";

/**
 * Above-the-fold step header. Eyebrow with a hairline-dotted leader (Nervana
 * detail), then a 56–72px headline, then a 22px lede. Optional line-drawing
 * illustration on the right at lg breakpoints.
 */
export function StepHero({
  step,
  eyebrow,
  title,
  lead,
  time,
  illustration,
  className,
}: StepHeroProps) {
  const hasIllustration = illustration !== undefined;

  return (
    <header
      aria-label="Step header"
      className={clsx(
        "flex flex-col gap-10 sm:gap-12",
        hasIllustration && "lg:flex-row lg:items-start lg:gap-12",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-6 sm:gap-8">
        <Eyebrow tone="blue" size="md" withRule>
          {eyebrow}
        </Eyebrow>
        <h1
          className={clsx(
            "font-heading font-bold leading-[1.02] tracking-tighter",
            TITLE_SIZE[step],
            TEXT_TONE,
          )}
        >
          {title}
        </h1>
        <p
          className={clsx(
            "max-w-measure text-lede font-normal leading-relaxed",
            LEAD_TONE,
          )}
        >
          {lead}
        </p>
        <p
          className={clsx(
            "font-mono text-xs uppercase tracking-eyebrow",
            CAPTION_TONE,
          )}
        >
          read · {time}
        </p>
      </div>
      {hasIllustration && (
        <div className="flex flex-1 items-start text-brand-navy">
          <div className="aspect-[4/3] w-full">{illustration}</div>
        </div>
      )}
    </header>
  );
}