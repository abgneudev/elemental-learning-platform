"use client";

import { useCallback, useRef, type ReactNode } from "react";
import type { PeerReviewContent } from "@/lib/content";

type Props = {
  items: readonly PeerReviewContent[];
  /** Visible label that the carousel region announces to ATs. */
  ariaLabel?: string;
  /** Heading rendered beside the prev/next buttons. */
  heading?: ReactNode;
};

/**
 * Native scroll-snap carousel of vertical (9:16) peer-testimonial shorts.
 * Mirrors the keyboard/focus pattern used by the existing ExpandableCards —
 * no external library, every control is a real <button>.
 */
export function PeerVideoCarousel({
  items,
  ariaLabel = "Peer video testimonials",
  heading,
}: Props) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = useCallback((dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.querySelector<HTMLLIElement>(":scope > li");
    const slideWidth = firstSlide?.getBoundingClientRect().width ?? track.clientWidth * 0.8;
    // gap-6 = 24px, kept in sync with the gap class below.
    track.scrollBy({ left: dir * (slideWidth + 24), behavior: "smooth" });
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scroll(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scroll(-1);
      }
    },
    [scroll],
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        {heading ? <div className="min-w-0 flex-1">{heading}</div> : <div />}
        <div className="flex flex-none items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous slide"
            aria-controls="peer-carousel-track"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/15 bg-white font-heading text-base font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next slide"
            aria-controls="peer-carousel-track"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/15 bg-white font-heading text-base font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <ul
        id="peer-carousel-track"
        ref={trackRef}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="-mx-5 flex w-auto min-w-0 max-w-none flex-nowrap snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-px-5 px-5 pb-4 focus-visible:outline-none sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((review, i) => (
          <li
            key={`${review.name}-${i}`}
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${items.length}`}
            className="w-[85%] shrink-0 grow-0 basis-auto snap-center sm:w-[60%] lg:w-[45%]"
          >
            <figure className="flex h-full flex-col gap-4">
              <div className="relative aspect-[125/84] w-full overflow-hidden rounded-md bg-brand-navy/10">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  src={review.videoSrc || undefined}
                  poster={review.posterSrc || undefined}
                >
                  {/* TODO: replace `videoSrc` / `posterSrc` in content.ts with real assets. */}
                </video>
              </div>
              <figcaption className="flex flex-col gap-1">
                <p className="font-heading text-sm font-bold leading-tight text-brand-navy">
                  {review.name}
                </p>
                <p className="text-xs text-brand-navy/55">{review.role}</p>
                <blockquote className="mt-2">
                  <p className="text-base leading-relaxed text-brand-navy/85">
                    {review.pullQuote}
                  </p>
                </blockquote>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
