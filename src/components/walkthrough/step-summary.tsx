import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import { SlashNumber } from "../primitives/slash-number";

export type StepSummaryItem = {
  /** The summary line — one short imperative sentence. */
  text: ReactNode;
  /** Optional time per item, e.g. "~5 min" — rendered as mono caption. */
  time?: string;
  /** Optional anchor — when present, the row is rendered as a link. */
  href?: string;
};

type StepSummaryProps = {
  /** Eyebrow override. */
  label?: string;
  /** Headline. */
  title?: ReactNode;
  items: StepSummaryItem[];
  /** Optional total-time mono caption rendered next to the title. */
  totalTime?: string;
  /** Optional one-line context under the title. */
  description?: ReactNode;
  className?: string;
};

/**
 * Per visual-direction.md §StepSummary: "Not a card. A vertical list. Each
 * item: slash-number left (`/01`), then headline-weight short phrase, then
 * optional one-line detail in muted text. Hairline rule between items,
 * full-width. No fill, no border around the list itself."
 */
export function StepSummary({
  label = "Steps at a glance",
  title = "Steps at a glance",
  items,
  totalTime,
  description,
  className,
}: StepSummaryProps) {
  return (
    <section
      aria-label={typeof title === "string" ? title : label}
      className={clsx("flex flex-col gap-5", className)}
    >
      <Eyebrow tone="blue" size="md" withRule>
        {label}
      </Eyebrow>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
          {title}
        </h2>
        {totalTime && (
          <span className="font-mono text-xs uppercase tracking-eyebrow text-brand-blue">
            {totalTime}
          </span>
        )}
      </div>
      {description && (
        <p className="max-w-measure text-base leading-relaxed text-brand-navy/70">
          {description}
        </p>
      )}
      <ol className="mt-2 flex flex-col">
        {items.map((item, i) => {
          const inner = (
            <>
              <SlashNumber n={i + 1} tone="blue" className="pt-1" />
              <span className="font-heading text-lg font-semibold leading-snug text-brand-navy sm:text-xl">
                {item.text}
              </span>
              {item.time && (
                <span className="self-start pt-1.5 text-right font-mono text-xs uppercase tracking-eyebrow text-brand-blue">
                  {item.time}
                </span>
              )}
            </>
          );

          const rowClass = clsx(
            "grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-5 gap-y-1 border-t border-hairline py-5",
            i === items.length - 1 && "border-b",
            item.href &&
              "transition-colors duration-200 hover:bg-brand-blue/5",
          );

          return (
            <li key={i}>
              {item.href ? (
                <a
                  href={item.href}
                  className={clsx(
                    rowClass,
                    "outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
                  )}
                >
                  {inner}
                </a>
              ) : (
                <div className={rowClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}