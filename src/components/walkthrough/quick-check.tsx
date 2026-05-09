import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import { Hairline } from "../primitives/hairline";

export type QuickCheckItem = {
  caption: ReactNode;
  /** Image content. If omitted, an `imageLabel` placeholder renders. */
  image?: ReactNode;
  /** Used for the placeholder slot when `image` is not provided. */
  imageLabel?: string;
};

type QuickCheckProps = {
  /** Optional heading, e.g. "When to trim?" */
  title?: string;
  /** Eyebrow override. Defaults to "Quick check". */
  label?: string;
  items: QuickCheckItem[];
  className?: string;
};

/**
 * Per visual-direction.md §QuickCheck: "Not a card with a fill. Small mono
 * caption left, then a 2-column row of photographs with one-line captions
 * below. Hairlines top and bottom of the block. Photography does the work."
 */
export function QuickCheck({
  title,
  label = "Quick check",
  items,
  className,
}: QuickCheckProps) {
  const cols =
    items.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : items.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <section
      aria-label={label}
      className={clsx("flex flex-col gap-6 py-8", className)}
    >
      <Hairline />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Eyebrow tone="blue" size="md">
          {label}
        </Eyebrow>
        {title && (
            <h3 className="font-heading text-xl font-semibold text-brand-navy sm:text-2xl">
            {title}
          </h3>
        )}
      </div>
      <ul className={clsx("grid grid-cols-1 gap-6 sm:gap-8", cols)}>
        {items.map((item, i) => (
          <li key={i} className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#222525]/4">
              {item.image ?? (
                <div className="flex h-full w-full items-center justify-center px-4 text-center font-mono text-xs text-brand-navy/40">
                  {item.imageLabel ?? "reference image"}
                </div>
              )}
            </div>
            <p className="text-sm leading-relaxed text-brand-navy/80">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>
      <Hairline />
    </section>
  );
}
