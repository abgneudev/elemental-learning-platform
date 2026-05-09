import { clsx } from "clsx";
import type { ElementType, ReactNode } from "react";

/**
 * Card — flat-card paradigm per visual-direction.md §3.
 *
 * No shadows. Hairline borders OR soft fills (never both). Corner radius
 * capped at 6px. Generous internal padding (40–56px on lg). One filled
 * tone per viewport — the rest are `plain` (cream-on-cream w/ hairline).
 */
export type CardTone =
  | "plain"          // cream-on-cream with hairline border
  | "white"          // white surface with hairline border
  | "inset"          // muted ink-100 fill, no border (a quiet block)
  | "cyan"           // brand-cyan block — Setup
  | "mint"           // brand-mint block — Apply
  | "blue"           // brand-blue block — Form (the one bold accent)
  | "navy"           // navy block — type-on-dark
  // Matte variants — desaturated, healthcare-calm
  | "cyan-matte"
  | "mint-matte"
  | "blue-matte";

export type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

const tones: Record<CardTone, string> = {
  plain: "bg-cream border border-hairline text-ink-900",
  white: "bg-white border border-hairline text-ink-900",
  inset: "bg-ink-100 text-ink-900",
  cyan: "bg-brand-cyan text-ink-900",
  mint: "bg-brand-mint text-ink-900",
  blue: "bg-brand-blue text-cream",
  navy: "bg-brand-navy text-cream",
  "cyan-matte": "bg-brand-cyan-matte text-ink-900",
  "mint-matte": "bg-brand-mint-matte text-ink-900",
  "blue-matte": "bg-brand-blue-matte text-cream",
};

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
  xl: "p-10 sm:p-14",        // 56px — matches v-d.md card padding spec
};

type CardProps = {
  as?: ElementType;
  tone?: CardTone;
  padding?: CardPadding;
  /** When true, card translates up 4px on hover (no shadow change). */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({
  as: Tag = "div",
  tone = "plain",
  padding = "md",
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={clsx(
        "rounded-md",                    // 6px (capped per v-d.md)
        tones[tone],
        paddings[padding],
        interactive &&
          "transition-transform duration-240 ease-out-quart hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}