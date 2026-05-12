import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import { SlashNumber } from "../primitives/slash-number";
import { Hairline } from "../primitives/hairline";

export type WhatToLookOutForItem = {
  /** Imperative warning headline. */
  title: ReactNode;
  /** Optional supporting one-liner. */
  detail?: ReactNode;
  /** Reference / anti-pattern photo. */
  image?: ReactNode;
  /** Placeholder label used when `image` is not provided. */
  imageLabel?: string;
};

type WhatToLookOutForProps = {
  /** Eyebrow override. Defaults to "Watch out for". */
  label?: string;
  /** Headline. */
  title?: ReactNode;
  /** Optional supporting paragraph. */
  description?: ReactNode;
  items: WhatToLookOutForItem[];
  className?: string;
};

/**
 * 4-card warning grid for the Form step. Per v-d.md, restrain orange to a
 * 3px left rule per item and the eyebrow — no orange-tinted backgrounds,
 * no orange-bordered cards. Photography does the heavy lifting.
 */
export function WhatToLookOutFor({
  label = "Watch out for",
  title = "What to look out for",
  description,
  items,
  className,
}: WhatToLookOutForProps) {
  return (
    <section
      aria-label={typeof title === "string" ? title : label}
      className={clsx("flex flex-col gap-8 py-10 sm:py-12", className)}
    >
      <div className="flex flex-col gap-4">
        <Eyebrow tone="orange" size="md">
          {label}
        </Eyebrow>
        <h3 className="font-heading text-3xl font-bold tracking-tight text-brand-navy sm:text-card">
          {title}
        </h3>
        {description && (
          <p className="max-w-measure text-base leading-relaxed text-brand-navy/70">
            {description}
          </p>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex flex-col gap-4 border-l-[3px] border-brand-yellow pl-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#222525]/4">
              {item.image ?? (
                <div className="flex h-full w-full items-center justify-center px-4 text-center font-mono text-xs text-brand-navy/40">
                  {item.imageLabel ?? "reference photo"}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <SlashNumber n={i + 1} tone="blue" />
              <p className="font-heading text-lg font-semibold leading-tight text-brand-navy">
                {item.title}
              </p>
              {item.detail && (
                <p className="text-sm leading-relaxed text-brand-navy/70">
                  {item.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
