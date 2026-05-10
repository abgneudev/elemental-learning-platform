import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import { buttonStyles } from "../primitives/button";

export type ExtraInfoItem = {
  term: ReactNode;
  definition: ReactNode;
  /** Optional image/illustration for this item. */
  image?: ReactNode;
  /** Placeholder label shown when `image` is not provided. */
  imageLabel?: string;
};

export type ExtraInfoCta = {
  href: string;
  label: string;
};

type ExtraInfoCardProps = {
  /** Eyebrow override. Defaults to "For reference". */
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  items?: ExtraInfoItem[];
  children?: ReactNode;
  cta?: ExtraInfoCta;
  className?: string;
};

export function ExtraInfoCard({
  label = "For reference",
  title,
  description,
  items,
  children,
  cta,
  className,
}: ExtraInfoCardProps) {
  const cols =
    !items || items.length <= 1
      ? ""
      : items.length === 2
        ? "sm:grid-cols-2"
        : items.length >= 4
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "sm:grid-cols-3";

  return (
    <div className={clsx("flex flex-col gap-12", className)}>
      {/* ── Header: eyebrow + title left, CTA button right ── */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="cream" size="md">{label}</Eyebrow>
          <h3 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h3>
        </div>
        {cta && (
          <Link href={cta.href} className={buttonStyles("outline-light", "sm")}>
            {cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      {/* ── Item grid: bold term above image ── */}
      {items && items.length > 0 && (
        <ul className={clsx("grid grid-cols-1 gap-6 sm:gap-8", cols)}>
          {items.map((item, i) => (
            <li key={i} className="flex flex-col gap-3">
              <p className="font-heading text-base font-bold leading-snug text-white">
                {item.term}
              </p>
              <div className="relative aspect-[4/3] rounded-sm bg-[#F9F5F3]">
                {item.image ? (
                  <div className="absolute inset-8">
                    <div className="relative h-full w-full">
                      {item.image}
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-xs text-white/30">
                    {item.imageLabel ?? ""}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {children && (
        <div className="text-sm leading-relaxed text-white/70">{children}</div>
      )}
    </div>
  );
}
