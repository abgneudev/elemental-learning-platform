import { clsx } from "clsx";
import type { ReactNode } from "react";

type WatchOutProps = {
  /** Summary label override. Defaults to "Watch out". */
  label?: string;
  /** Optional short heading rendered in the summary after the label. */
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Collapsed inline warning using `<details>`. Collapsed by default so
 * returning users skip past it; the summary always shows the label so the
 * warning is never invisible — only abbreviated.
 *
 * Per visual-direction.md: 3px vertical bar on the left (orange), reads
 * like a margin note in a textbook, not an alert.
 */
export function WatchOut({
  label = "Watch out",
  title,
  children,
  className,
}: WatchOutProps) {
  return (
    <details
      className={clsx(
        "rounded-sm border-l-[3px] border-brand-yellow bg-warning/5",
        className,
      )}
    >
      <summary className="flex items-center gap-3 px-4 py-2.5">
        <p className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-brand-yellow">
          {label}
        </p>
        {title && (
          <p className="font-heading text-sm font-semibold text-brand-navy">{title}</p>
        )}
        <span aria-hidden="true" className="disclosure-indicator ml-auto text-xs text-brand-yellow">
          ▶
        </span>
      </summary>
      <div className="px-4 pb-3 text-sm leading-relaxed text-brand-navy/70">
        {children}
      </div>
    </details>
  );
}
