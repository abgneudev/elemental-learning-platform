import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Eyebrow — 12px mono small-caps, letter-spacing 0.12em, weight 600.
 * Per v-d.md §Type system. Optional hairline rule directly below with
 * a dotted leader extending right (Nervana detail).
 */
export type EyebrowTone =
  | "ink"          // default — ink-700, the monochromatic choice
  | "navy"         // legacy alias for ink-700
  | "muted"        // ink-500 for low-emphasis
  | "cream"        // for use on dark/blue blocks
  | "blue"         // restrained brand accent
  | "green"        // ProTip
  | "orange";      // WatchOut

export type EyebrowSize = "sm" | "md";

const tones: Record<EyebrowTone, string> = {
  ink: "text-ink-700",
  navy: "text-ink-700",
  muted: "text-ink-500",
  cream: "text-cream/85",
  blue: "text-brand-blue-matte",
  green: "text-brand-green",
  orange: "text-brand-orange",
};

const sizes: Record<EyebrowSize, string> = {
  sm: "text-[11px]",
  md: "text-xs",     // 12px per v-d.md
};

type EyebrowProps = Omit<ComponentPropsWithoutRef<"p">, "children"> & {
  tone?: EyebrowTone;
  size?: EyebrowSize;
  /** When true, render a hairline rule with dotted leader directly below. */
  withRule?: boolean;
  children: ReactNode;
};

export function Eyebrow({
  tone = "ink",
  size = "md",
  withRule = false,
  className,
  children,
  ...rest
}: EyebrowProps) {
  const labelClass = clsx(
    "font-mono font-semibold uppercase tracking-eyebrow",
    sizes[size],
    tones[tone],
  );

  if (!withRule) {
    return (
      <p className={clsx(labelClass, className)} {...rest}>
        {children}
      </p>
    );
  }

  return (
    <div
      className={clsx("eyebrow-rule", className)}
      role="presentation"
    >
      <p className={labelClass} {...rest}>
        {children}
      </p>
      <span aria-hidden="true" className="hairline-dotted" />
    </div>
  );
}