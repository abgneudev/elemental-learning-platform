import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";

export type WhatYouWillLearnItem = {
  /** Tile title — the major sub-section the link jumps to. */
  title: ReactNode;
  /** Anchor href. Required: the item is a link. */
  href: string;
  /** Optional one-line elaboration (unused in the inline-link layout). */
  detail?: ReactNode;
};

type WhatYouWillLearnProps = {
  /** Eyebrow override. */
  label?: string;
  /** Headline override. */
  title?: ReactNode;
  /** 2–4 anchor links per PRD §10. */
  items: WhatYouWillLearnItem[];
  className?: string;
};

/**
 * Per visual-direction.md §StepHero: "WhatYouWillLearn as plain inline links
 * separated by ` · `, not as tiles." Reads as part of the page typography
 * rather than as a card grid.
 */
export function WhatYouWillLearn({
  label = "What you will learn",
  title = "What you will learn",
  items,
  className,
}: WhatYouWillLearnProps) {
  return (
    <section
      aria-label={typeof title === "string" ? title : label}
      className={clsx("flex flex-col gap-4", className)}
    >
      <Eyebrow tone="blue" size="md">
        {label}
      </Eyebrow>
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-heading text-xl font-semibold leading-snug text-brand-navy sm:text-2xl">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-baseline">
            <a
              href={item.href}
              className={clsx(
                "underline underline-offset-[6px] decoration-1 decoration-brand-blue/40 transition-colors duration-200",
                "hover:decoration-brand-blue",
                "outline-none focus-visible:decoration-brand-blue",
              )}
            >
              {item.title}
            </a>
            {i < items.length - 1 && (
              <span aria-hidden="true" className="ml-2 text-brand-blue/40">
                ·
              </span>
            )}
          </span>
        ))}
      </p>
    </section>
  );
}