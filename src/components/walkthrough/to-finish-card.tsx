import { clsx } from "clsx";
import type { ReactNode } from "react";

type ToFinishCardProps = {
  /** Eyebrow override. Defaults to "To finish". */
  label?: string;
  /** The closing instruction. */
  title: ReactNode;
  /** Optional supporting copy beneath the instruction. */
  children?: ReactNode;
  /** Optional duration mono caption (e.g. "1–2 min"). */
  duration?: string;
  className?: string;
};

/**
 * Terminal card marking the close of a phase or section. Matte green-matte
 * fill (desaturated brand-green for healthcare calm) — reads as a save point
 * at phase boundaries without the candy-colored saturation of the original.
 */
export function ToFinishCard({
  label = "To finish",
  title,
  children,
  duration,
  className,
}: ToFinishCardProps) {
  return (
    <section
      aria-label={label}
      className={clsx(
        "flex flex-col gap-4 rounded-md bg-brand-green-matte p-8 text-cream sm:p-10",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-cream/85">
          {label}
        </p>
        {duration && (
          <span className="font-mono text-xs uppercase tracking-eyebrow text-cream/70">
            {duration}
          </span>
        )}
      </div>
      <p className="font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
        {title}
      </p>
      {children && (
        <div className="text-base leading-relaxed text-cream/85">
          {children}
        </div>
      )}
    </section>
  );
}