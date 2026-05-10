import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";

export type StepSummaryItem = {
  /** The summary line — one short imperative sentence. */
  text: ReactNode;
  /** Optional time per item, e.g. "~5 min" — rendered as mono caption. */
  time?: string;
  /** Optional anchor — when present, the row is rendered as a link. */
  href?: string;
};

type StepSummaryProps = {
  label?: string;
  title?: ReactNode;
  items: StepSummaryItem[];
  totalTime?: string;
  description?: ReactNode;
  tone?: "light" | "dark";
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
  tone = "light",
  className,
}: StepSummaryProps) {
  const isDark = tone === "dark";
  return (
    <section
      aria-label={typeof title === "string" ? title : label}
      className={clsx("flex flex-col gap-4", className)}
    >
      <Eyebrow tone={isDark ? "cream" : "blue"} size="md">
        {label}
      </Eyebrow>
      <ol className="flex flex-col">
        {items.map((item, i) => {
          const inner = (
            <>
              <span
                aria-hidden="true"
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-red font-heading text-sm font-bold text-white"
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className={clsx("text-xs font-normal leading-snug sm:text-sm", isDark ? "text-white" : "text-brand-navy")}>
                {item.text}
              </span>
              {item.time && (
                <span className={clsx("self-start pt-1.5 text-right font-mono text-xs uppercase tracking-eyebrow", isDark ? "text-white/60" : "text-brand-blue")}>
                  {item.time}
                </span>
              )}
            </>
          );

          const rowClass = clsx(
            "grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-5 gap-y-1 border-t py-5",
            isDark ? "border-white/15" : "border-hairline",
            i === items.length - 1 && "border-b",
            item.href &&
              "transition-colors duration-200 hover:bg-white/5",
          );

          return (
            <li key={i}>
              {item.href ? (
                <a
                  href={item.href}
                  className={clsx(
                    rowClass,
                    "outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2",
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