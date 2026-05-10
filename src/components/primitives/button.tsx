import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Button — per visual-direction.md §Buttons:
 *   "Primary CTA: large underlined text link with arrow `Walk through making one →`"
 *
 * The default `primary` variant is now an underlined text link, not a filled
 * pill. `filled` remains for hard CTAs (forms) where a button shape is needed:
 * navy fill, white text, 4px radius, no shadow.
 */
export type ButtonVariant = "primary" | "filled" | "quiet" | "ghost" | "outline-light" | "filled-orange";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center gap-2 font-heading transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Underlined text-link CTA — the default per v-d.md
  primary:
    "font-semibold text-ink-900 underline underline-offset-[6px] decoration-1 decoration-ink-900/60 hover:decoration-ink-900 [&_.arrow]:transition-transform [&_.arrow]:duration-200 hover:[&_.arrow]:translate-x-1.5 focus-visible:outline-ink-900",
  // Hard CTA — filled navy block when a button shape is required
  filled:
    "justify-center rounded-sm bg-ink-900 text-cream font-semibold hover:bg-ink-800 focus-visible:outline-ink-900",
  // Outlined ink — used by step-bar arrow nav and similar
  quiet:
    "justify-center rounded-full border-2 border-ink-900 bg-transparent text-ink-900 focus-visible:outline-ink-900",
  // Ghost — bare text link, no underline (used for nav)
  ghost:
    "text-ink-700 hover:text-ink-900 focus-visible:outline-ink-900",
  // Outline pill for use on dark/blue backgrounds — matches landing page CTAs
  "outline-light":
    "justify-center rounded-full border-2 border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
  // Filled orange block — used for Back navigation
  "filled-orange":
    "justify-center rounded-md bg-brand-orange text-brand-navy font-bold hover:bg-brand-orange-matte focus-visible:outline-brand-orange",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lede",                // 22px primary CTA per v-d.md
};

const filledSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-9 text-base",     // 24/36 padding per v-d.md
};

const quietSizes: Record<ButtonSize, string> = {
  sm: "h-9 min-w-[2.25rem] px-3 text-sm",
  md: "h-11 min-w-[2.75rem] px-4 text-base",
  lg: "h-12 min-w-[3rem] px-5 text-lg",
};

const outlineLightSizes: Record<ButtonSize, string> = {
  sm: "gap-3 px-5 py-3 text-sm font-semibold",
  md: "gap-3 px-6 py-3.5 text-base font-semibold",
  lg: "gap-3 px-8 py-4 text-lede font-semibold",
};

// Padding-based (no fixed height) so items-stretch can drive height
const filledOrangeSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-9 py-4 text-base",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  // Filled and quiet variants need their own size scales (height-based)
  const sizeClass =
    variant === "filled"
      ? filledSizes[size]
      : variant === "filled-orange"
        ? filledOrangeSizes[size]
      : variant === "quiet"
        ? quietSizes[size]
        : variant === "outline-light"
          ? outlineLightSizes[size]
          : sizes[size];
  return clsx(base, variants[variant], sizeClass, className);
}

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, className)}
      {...rest}
    >
      {children}
    </button>
  );
}