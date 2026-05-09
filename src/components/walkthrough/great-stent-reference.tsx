import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import { SlashNumber } from "../primitives/slash-number";
import { Hairline } from "../primitives/hairline";

export type GreatStentCriterion = {
  /** Short criterion name, e.g. "Bite function". */
  title: string;
  /** One-line caption describing what to look for. */
  caption: ReactNode;
  /** Reference photo / illustration. */
  image?: ReactNode;
  /** Placeholder label used when `image` is not provided. */
  imageLabel?: string;
};

type GreatStentReferenceProps = {
  /** Eyebrow override. Defaults to "Self-check". */
  label?: string;
  /** Headline. */
  title?: ReactNode;
  /** Optional supporting paragraph beneath the title. */
  description?: ReactNode;
  /** The four criteria. Locked at four per PRD §9 (Tier 3). */
  items: GreatStentCriterion[];
  className?: string;
};

/**
 * 4-criteria self-check at the end of the Form step. Flat — no card frame,
 * hairlines top and bottom of the section. Slash-numbered criteria.
 */
export function GreatStentReference({
  label = "Self-check",
  title = "What makes a great stent?",
  description,
  items,
  className,
}: GreatStentReferenceProps) {
  return (
    <section
      aria-label={typeof title === "string" ? title : label}
      className={clsx("flex flex-col gap-8 py-10 sm:py-12", className)}
    >
      <Hairline />
      <div className="flex flex-col gap-4">
        <Eyebrow tone="blue" size="md">
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
      <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={i} className="flex flex-col gap-4">
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
              <p className="text-sm leading-relaxed text-brand-navy/70">
                {item.caption}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <Hairline />
    </section>
  );
}
