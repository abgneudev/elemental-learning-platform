import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "../primitives/eyebrow";
import { buttonStyles } from "../primitives/button";

type SampleCalloutCta = {
  href: string;
  label: string;
};

type SampleCalloutProps = {
  /** Eyebrow override. Defaults to "Use the sample". */
  label?: string;
  /** Headline copy. */
  title?: ReactNode;
  /** Optional supporting body (one short paragraph). */
  children?: ReactNode;
  /** Optional CTA. */
  cta?: SampleCalloutCta;
  /** Slot for a product photo / illustration. */
  image?: ReactNode;
  className?: string;
};

/**
 * Top-of-Form-step affordance pairing the digital walkthrough with the
 * physical sample. Quiet ink-100 surface — the Form step's bold accent
 * lives elsewhere on the page.
 */
export function SampleCallout({
  label = "Use the sample",
  title = "Use the free sample to make your 1st stent.",
  children,
  cta,
  image,
  className,
}: SampleCalloutProps) {
  return (
    <aside
      aria-label={label}
      className={clsx(
        "flex flex-col gap-6 rounded-md p-8 sm:flex-row sm:items-stretch sm:gap-10 sm:p-10",
        className,
      )}
    >
      <div className="flex h-32 w-full flex-none items-center justify-center overflow-hidden rounded-sm sm:h-auto sm:w-40">
        {image ?? <BlisterPackIcon />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="font-heading text-2xl font-bold leading-snug tracking-tight text-cream sm:text-3xl">
          {title}
        </p>
        {children && (
          <div className="text-base leading-relaxed text-cream/70">
            {children}
          </div>
        )}
        {cta && (
          <div className="mt-2">
            <a href={cta.href} className={buttonStyles("outline-light", "sm")}>
              {cta.label}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13 L13 3 M6 3 H13 V10" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}

function BlisterPackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-16 w-16 text-brand-blue"
      fill="none"
    >
      <rect
        x="8"
        y="10"
        width="48"
        height="44"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="22" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="22" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="44" cy="22" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="40" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="40" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="44" cy="40" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
