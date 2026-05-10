import { clsx } from "clsx";
import type { ReactNode } from "react";
import { SlashNumber } from "../primitives/slash-number";

export type PhaseMicroStep = {
  /** The imperative — the line clinicians actually read. */
  title: ReactNode;
  /** Optional supporting bullets shown beneath the title. */
  bullets?: ReactNode[];
  /**
   * Slot for a callout attached to this micro-step — typically a
   * `<ProTip>` or `<WatchOut>`. Renders directly below the bullets.
   */
  callout?: ReactNode;
};

type PhaseSectionProps = {
  /** Phase index inside the Form step. */
  phaseNumber: number;
  /** Phase title, e.g. "Heat the material". */
  title: ReactNode;
  /** Optional time chip on the header, e.g. "~2 min". */
  time?: string;
  /** Optional one-line description under the title. */
  description?: ReactNode;
  /** The micro-step list. Numbered as `/{phaseNumber}.{i + 1}` inside. */
  microSteps: PhaseMicroStep[];
  beforeCheck?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Derive an ISO-8601 duration string from a time string like "~3 min". */
function toDateTime(time?: string): string | undefined {
  if (!time) return undefined;
  const m = time.match(/~?(\d+)\s*min/);
  return m ? `PT${m[1]}M` : undefined;
}

export function PhaseSection({
  phaseNumber,
  title,
  time,
  description,
  microSteps,
  beforeCheck,
  children,
  className,
}: PhaseSectionProps) {
  const headingId = `phase-${phaseNumber}-title`;
  const dateTime = toDateTime(time);

  return (
    <div className={clsx("flex flex-col gap-10", className)}>
      {/* ── Header ── */}
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-red font-heading text-xl font-bold text-white"
            >
              {String.fromCharCode(64 + phaseNumber)}
            </span>
            <h2
              id={headingId}
              className="font-heading font-bold leading-[1.05] tracking-tighter text-brand-navy text-3xl sm:text-card lg:text-section-mobile"
            >
              {title}
            </h2>
          </div>
          {time && (
            <time
              dateTime={dateTime}
              className="font-mono text-xs uppercase tracking-eyebrow text-brand-blue"
            >
              {time}
            </time>
          )}
        </div>
        {description && (
          <div className="max-w-measure text-base leading-relaxed text-brand-navy/70">
            {description}
          </div>
        )}
      </header>

      {/* ── Micro-steps ── */}
      <ol className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
        {microSteps.map((step, i) => (
          <li
            key={i}
            className="flex flex-col gap-3 border-t border-hairline pt-5"
          >
            <div className="flex items-baseline gap-3">
              <SlashNumber n={`${phaseNumber}.${i + 1}`} tone="muted" />
            </div>
            <p className="font-heading text-lg font-semibold leading-snug text-brand-navy sm:text-xl">
              {step.title}
            </p>
            {step.bullets && step.bullets.length > 0 && (
              <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-brand-navy/70">
                {step.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand-blue">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {step.callout && <div className="mt-1">{step.callout}</div>}
          </li>
        ))}
      </ol>

      {beforeCheck && <div>{beforeCheck}</div>}
      {children && <div>{children}</div>}
    </div>
  );
}
