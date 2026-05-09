import { clsx } from "clsx";
import type { ReactNode } from "react";

type ProTipProps = {
  /** Summary label override. Defaults to "Pro tip". */
  label?: string;
  /** Optional short heading rendered in the summary after the label. */
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Collapsed inline tip using `<details>`. Collapsed by default so returning
 * users skip past it; first-timers expand on demand.
 *
 * Per visual-direction.md: 3px vertical bar on the left (green), no
 * background fill. The `<details>` default-closed state keeps the inline
 * reading flow clean without hiding safety information.
 */
export function ProTip({
  label = "Pro tip",
  title,
  children,
  className,
}: ProTipProps) {
  return (
    <details
      className={clsx(
        "rounded-sm border-l-[3px] border-brand-green bg-success/5",
        className,
      )}
    >
      <summary className="flex items-center gap-3 px-4 py-2.5">
        <p className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-brand-green">
          {label}
        </p>
        {title && (
          <p className="font-heading text-sm font-semibold text-brand-navy">{title}</p>
        )}
        <span aria-hidden="true" className="disclosure-indicator ml-auto text-xs text-brand-green">
          ▶
        </span>
      </summary>
      <div className="px-4 pb-3 text-sm leading-relaxed text-brand-navy/70">
        {children}
      </div>
    </details>
  );
}
