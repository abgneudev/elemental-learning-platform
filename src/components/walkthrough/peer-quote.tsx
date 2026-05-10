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
  /**
   * `"light"` (default) -- navy text, for use on pale/cream backgrounds.
   * `"dark"` -- cream/white text, for use on brand-navy sections.
   */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * In-context peer voice. Flat block -- no card frame, no fill. Eyebrow,
 * large quoted blockquote in heading-weight, hairline above the attribution.
 */
export function PeerQuote({
  label = "Peer voice",
  quote,
  author,
  tone = "light",
  className,
}: PeerQuoteProps) {
  const hasAuthor = author !== undefined;
  const isLight = tone === "light";

  return (
    <figure className={clsx("flex flex-col gap-6 py-8", className)}>
      <Eyebrow tone={isLight ? "blue" : "cream"} size="md" withRule>
        {label}
      </Eyebrow>
      <div className="flex items-start gap-5 sm:gap-6">
        {hasAuthor && (
          <div className="flex-none">
            {author.photo !== undefined ? (
              <div className={clsx("h-12 w-12 overflow-hidden rounded-full sm:h-14 sm:w-14", isLight ? "bg-[#222525]/4" : "bg-white/10")}>
                {author.photo}
              </div>
            ) : (
              <InitialsAvatar name={author.name} tone={tone} />
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <blockquote className={clsx("font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl", isLight ? "text-brand-navy" : "text-cream")}>
            <span aria-hidden="true" className={isLight ? "mr-1 text-brand-blue/40" : "mr-1 text-cream/30"}>
              {'"'}
            </span>
            {quote}
            <span aria-hidden="true" className={isLight ? "ml-1 text-brand-blue/40" : "ml-1 text-cream/30"}>
              {'"'}
            </span>
          </blockquote>
          {hasAuthor && (
            <figcaption className={clsx("mt-5 flex flex-col gap-0.5 border-t pt-4", isLight ? "border-hairline" : "border-white/15")}>
              <span className={clsx("font-heading text-sm font-semibold", isLight ? "text-brand-navy" : "text-cream")}>
                {author.name}
              </span>
              {author.role && (
                <span className={clsx("text-xs leading-snug", isLight ? "text-brand-navy/55" : "text-cream/55")}>
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

function InitialsAvatar({ name, tone = "light" }: { name: string; tone?: "light" | "dark" }) {
  const initials = name
    .replace(/^(Prof\.?|Dr\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "inline-flex h-12 w-12 items-center justify-center rounded-full font-heading text-sm font-semibold sm:h-14 sm:w-14 sm:text-base",
        tone === "light"
          ? "bg-brand-navy text-[#f1fdff]"
          : "bg-white/15 text-cream",
      )}
    >
      {initials || "---"}
    </span>
  );
}