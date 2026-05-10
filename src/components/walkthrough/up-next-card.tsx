import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";

type UpNextCardProps = {
  href: string;
  /** Eyebrow above the title. Defaults to "Up next". */
  label?: string;
  /** Part number prepended before the title, e.g. 2 → "Part 2". */
  part?: number;
  /** Headline — the next module's hero title. */
  title: ReactNode;
  className?: string;
};

/**
 * Full-width navy CTA card that closes a walkthrough step by linking
 * to the next module. Mirrors the ExtraInfoCard summary surface so the
 * two read as a pair, but inverted onto brand-navy.
 */
export function UpNextCard({
  href,
  label = "Up next",
  part,
  title,
  className,
}: UpNextCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group block w-full rounded-md bg-brand-navy p-8 transition-colors hover:bg-brand-navy/90 sm:p-10",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="cream" size="md">
            {label}
          </Eyebrow>
          <h3 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {part != null ? `Part ${part}: ${title}` : title}
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="flex-none self-center text-3xl font-black leading-none text-white transition-transform group-hover:translate-x-2"
        >
          →
        </span>
      </div>
    </Link>
  );
}
