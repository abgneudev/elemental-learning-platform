import Link from "next/link";
import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * TextLink — the primary CTA per visual-direction.md §Buttons:
 *   "large underlined text link with arrow `Walk through making one →`,
 *    22px weight 600, navy. The arrow translates 6px right on hover."
 *
 * No filled-button background. This replaces filled-button CTAs as the
 * primary call-to-action across the site.
 */
export type TextLinkSize = "sm" | "md" | "lg";
export type TextLinkTone = "ink" | "cream" | "muted";

const sizes: Record<TextLinkSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lede",     // 22px primary CTA
};

const tones: Record<TextLinkTone, string> = {
  ink: "text-ink-900 decoration-ink-900/50 hover:decoration-ink-900",
  cream: "text-cream decoration-cream/60 hover:decoration-cream",
  muted: "text-ink-700 decoration-ink-700/40 hover:decoration-ink-900",
};

type CommonProps = {
  size?: TextLinkSize;
  tone?: TextLinkTone;
  /** Append a `→` arrow that translates 6px right on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "children" | "className"> & {
    href: string;
  };

function classes(
  size: TextLinkSize,
  tone: TextLinkTone,
  className?: string,
) {
  return clsx(
    "inline-flex items-baseline gap-2 font-heading font-semibold underline underline-offset-[6px] decoration-1 transition-colors duration-200",
    "[&_.arrow]:transition-transform [&_.arrow]:duration-200 [&_.arrow]:ease-out hover:[&_.arrow]:translate-x-1.5",
    sizes[size],
    tones[tone],
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-900",
    className,
  );
}

export function TextLink({
  href,
  size = "md",
  tone = "ink",
  arrow = false,
  className,
  children,
  ...rest
}: AnchorProps) {
  return (
    <Link href={href} className={classes(size, tone, className)} {...rest}>
      <span>{children}</span>
      {arrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </Link>
  );
}