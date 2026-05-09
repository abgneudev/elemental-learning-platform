import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

/**
 * SlashNumber — `/01`, `/02`, `/03` slash-prefix sequence label per
 * visual-direction.md §Type system: "the slash is the move."
 *
 * Renders mono, weight 500, with reduced opacity. Used on cards, step
 * eyebrows, and any numbered sequence.
 */
export type SlashNumberTone = "ink" | "muted" | "cream" | "blue";

type SlashNumberProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  /** The number to render — 1 will become `/01`. Pass a string for custom (`01.2`). */
  n: number | string;
  tone?: SlashNumberTone;
  className?: string;
};

const tones: Record<SlashNumberTone, string> = {
  ink: "text-ink-900/60",
  muted: "text-ink-500",
  cream: "text-cream/70",
  blue: "text-brand-blue/70",
};

export function SlashNumber({
  n,
  tone = "ink",
  className,
  ...rest
}: SlashNumberProps) {
  const label = typeof n === "number" ? `/${String(n).padStart(2, "0")}` : `/${n}`;
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "font-mono text-sm font-medium tracking-tight",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {label}
    </span>
  );
}