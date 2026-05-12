import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Container } from "@/components/primitives";

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
 * Full-bleed warning band. Spans screen-edge to screen-edge with the
 * brand-yellow ("yellow") surface; mirrors the Starter Kit navy band's
 * shape so consecutive walkthrough sections share a rhythm.
 */
export function QuickCheck({
  title,
  label = "Quick check",
  items,
  className,
}: QuickCheckProps) {
  // Lock to a 3-up layout so 2-item grids don't stretch each image to half
  // the viewport. 4-item grids step up to 4 columns on large screens.
  const cols =
    items.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-3";

  return (
    <section
      aria-label={label}
      className={clsx("border-b border-white/10 bg-brand-yellow", className)}
    >
      <Container size="xl" className="py-20 sm:py-28">
        <div className="flex flex-col gap-8">
          {title && (
            <p className="font-heading text-lg font-bold text-white sm:text-xl">
              {title}
            </p>
          )}
          <ul className={clsx("grid w-full grid-cols-1 gap-4 sm:gap-4", cols)}>
            {items.map((item, i) => (
              <li key={i} className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white font-heading text-xs font-bold text-brand-yellow"
                  >
                    !
                  </span>
                  <p className="min-w-0 whitespace-nowrap font-heading text-xs font-bold leading-tight tracking-tight text-white sm:text-sm">
                    {item.caption}
                  </p>
                </div>
                <div className="relative aspect-[7/6] w-full overflow-hidden rounded-lg bg-white/15">
                  {item.image ? (
                    <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full [&>img]:object-cover">
                      {item.image}
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center font-mono text-xs text-white/55">
                      {item.imageLabel ?? "reference image"}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
