import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import { TextLink } from "../primitives/text-link";

export type ExtraInfoItem = {
  /** Term / heading for this row, e.g. "Steel cup". */
  term: ReactNode;
  /** Definition / value, e.g. "Autoclavable at 273 °F or 134 °C." */
  definition: ReactNode;
};

export type ExtraInfoCta = {
  href: string;
  label: string;
};

type ExtraInfoCardProps = {
  /** Summary eyebrow override. Defaults to "For reference". */
  label?: string;
  /** Headline shown in the summary — names what the card contains. */
  title: ReactNode;
  /** Optional one-line context under the title, shown when expanded. */
  description?: ReactNode;
  /** Body content as term/definition pairs, or free-form `children`. */
  items?: ExtraInfoItem[];
  children?: ReactNode;
  /** Optional CTA — typically a link to a `/reference/*` page. */
  cta?: ExtraInfoCta;
  className?: string;
};

/**
 * Dense reference card rendered as a `<details>` element. Collapsed by
 * default — appendix-level content that supports the procedure without
 * cluttering the reading flow.
 *
 * The `<summary>` always shows the eyebrow + title. Description, terms,
 * and CTA are inside the expandable area.
 */
export function ExtraInfoCard({
  label = "For reference",
  title,
  description,
  items,
  children,
  cta,
  className,
}: ExtraInfoCardProps) {
  return (
    <details
      aria-label={typeof title === "string" ? title : label}
      className={clsx("rounded-md bg-[#222525]/4", className)}
    >
      {/* ── Summary (always visible) ── */}
      <summary className="p-8 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Eyebrow tone="blue" size="md">{label}</Eyebrow>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
              {title}
            </h3>
          </div>
          <span aria-hidden="true" className="disclosure-indicator mt-1 flex-none text-sm text-brand-blue">
            ▶
          </span>
        </div>
      </summary>

      {/* ── Expanded content ── */}
      <div className="flex flex-col gap-6 px-8 pb-8 sm:px-10 sm:pb-10">
        {description && (
          <p className="max-w-measure text-base leading-relaxed text-brand-navy/70">
            {description}
          </p>
        )}

        {items && items.length > 0 && (
          <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-[minmax(8rem,12rem)_1fr]">
            {items.map((item, i) => (
              <div key={i} className="contents">
                <dt className="border-t border-hairline pt-4 font-heading text-sm font-semibold leading-snug text-brand-navy">
                  {item.term}
                </dt>
                <dd className="border-t-0 pb-4 text-sm leading-relaxed text-brand-navy/70 sm:border-t sm:border-hairline sm:pt-4 sm:pb-0">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {children && (
          <div className="text-sm leading-relaxed text-brand-navy/70">{children}</div>
        )}

        {cta && (
          <TextLink href={cta.href} size="sm" arrow>
            {cta.label}
          </TextLink>
        )}
      </div>
    </details>
  );
}

