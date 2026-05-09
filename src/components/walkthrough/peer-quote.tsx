import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";

export type PeerQuoteAuthor = {
  /** Full attribution name, e.g. "Prof. Dr. Anton Sculean". */
  name: string;
  /** One-line role / affiliation. */
  role?: string;
  /** Headshot slot. Falls back to an initials avatar placeholder. */
  photo?: ReactNode;
};

type PeerQuoteProps = {
  /** Eyebrow override. Defaults to "Peer voice". */
  label?: string;
  quote: ReactNode;
  author?: PeerQuoteAuthor;
  className?: string;
};

/**
 * In-context peer voice. Flat block — no card frame, no fill. Eyebrow,
 * large quoted blockquote in heading-weight, hairline above the attribution.
 */
export function PeerQuote({
  label = "Peer voice",
  quote,
  author,
  className,
}: PeerQuoteProps) {
  const hasAuthor = author !== undefined;

  return (
    <figure className={clsx("flex flex-col gap-6 py-8", className)}>
      <Eyebrow tone="blue" size="md" withRule>
        {label}
      </Eyebrow>
      <div className="flex items-start gap-5 sm:gap-6">
        {hasAuthor && (
          <div className="flex-none">
            {author.photo !== undefined ? (
              <div className="h-12 w-12 overflow-hidden rounded-full bg-[#222525]/4 sm:h-14 sm:w-14">
                {author.photo}
              </div>
            ) : (
              <InitialsAvatar name={author.name} />
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <blockquote className="font-heading text-2xl font-bold leading-snug tracking-tight text-brand-navy sm:text-3xl">
            <span aria-hidden="true" className="mr-1 text-brand-blue/40">
              “
            </span>
            {quote}
            <span aria-hidden="true" className="ml-1 text-brand-blue/40">
              ”
            </span>
          </blockquote>
          {hasAuthor && (
            <figcaption className="mt-5 flex flex-col gap-0.5 border-t border-hairline pt-4">
              <span className="font-heading text-sm font-semibold text-brand-navy">
                {author.name}
              </span>
              {author.role && (
                <span className="text-xs leading-snug text-brand-navy/55">
                  {author.role}
                </span>
              )}
            </figcaption>
          )}
        </div>
      </div>
    </figure>
  );
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .replace(/^(Prof\.?|Dr\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy font-heading text-sm font-semibold text-[#f1fdff] sm:h-14 sm:w-14 sm:text-base"
    >
      {initials || "—"}
    </span>
  );
}
