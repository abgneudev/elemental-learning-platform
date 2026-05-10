"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { clsx } from "clsx";

export interface TimelineSection {
  id: string;
  label: string;
}

interface PageTimelineProps {
  sections: TimelineSection[];
}

// Each dot slot = h-7 button (28 px) + gap-4 (16 px) = 44 px.
// The guide line runs from the centre of the first dot to the centre of the
// last dot, so its top offset = 14 px (half of 28) and its height =
// (n − 1) × 44 px.
const SLOT_PX = 44;
const DOT_HALF = 14; // half of h-7 = 28 px

export function PageTimeline({ sections }: PageTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // ── Scroll spy ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (sections.length === 0) return;

    const compute = () => {
      const threshold = window.innerHeight * 0.35;
      let next = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          next = i;
        } else {
          break;
        }
      }
      setActiveIndex(next);
      activeIndexRef.current = next;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        compute();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [sections]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const scrollToSection = useCallback(
    (index: number) => {
      if (index === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(sections[index].id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [sections],
  );

  const scrollPrev = useCallback(() => scrollToSection(activeIndexRef.current - 1), [scrollToSection]);
  const scrollNext = useCallback(() => scrollToSection(activeIndexRef.current + 1), [scrollToSection]);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < sections.length - 1;

  if (sections.length === 0) return null;

  const lineFullHeight = (sections.length - 1) * SLOT_PX;
  const lineActiveHeight = activeIndex * SLOT_PX;

  return (
    <>
      {/* ── Right-margin dot timeline (lg+ only) ──────────────────────── */}
      <nav
        aria-label="Page sections"
        className="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        {/* Dot column with a single absolute guide line */}
        <div className="relative flex flex-col items-center gap-4">
          {/* Full-height guide line (faint track) */}
          {sections.length > 1 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 w-px -translate-x-1/2 bg-brand-blue/15"
              style={{ top: DOT_HALF, height: lineFullHeight }}
            />
          )}

          {/* Progress line (visited segments) */}
          {sections.length > 1 && lineActiveHeight > 0 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 w-px -translate-x-1/2 bg-brand-blue/50 transition-all duration-500"
              style={{ top: DOT_HALF, height: lineActiveHeight }}
            />
          )}

          {/* Dots */}
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(i)}
              aria-label={`Jump to: ${section.label}`}
              className="group relative z-10 flex h-7 w-7 items-center justify-center"
            >
              <span
                className={clsx(
                  "block rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "h-2.5 w-2.5 bg-brand-blue shadow-sm"
                    : "h-1.5 w-1.5 bg-brand-blue/25 group-hover:bg-brand-blue/50",
                )}
              />
              {/* Label tooltip */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded border border-brand-blue/10 bg-white/95 px-2 py-1 text-xs text-brand-blue opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
              >
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── Bottom-right arrow buttons ─────────────────────────────────── */}
      <div className="fixed bottom-6 right-5 z-20 flex flex-col gap-2">
        <NavArrow
          direction="up"
          disabled={!canPrev}
          aria-label="Previous section"
          onClick={scrollPrev}
        />
        <NavArrow
          direction="down"
          disabled={!canNext}
          aria-label="Next section"
          onClick={scrollNext}
        />
      </div>
    </>
  );
}

// ── Arrow button ─────────────────────────────────────────────────────────────

function NavArrow({
  direction,
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: {
  direction: "up" | "down";
  disabled: boolean;
  onClick: () => void;
  "aria-label": string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200",
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
        disabled
          ? "cursor-not-allowed border-brand-blue/15 text-brand-blue/20"
          : "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
      )}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        {direction === "up" ? (
          <path
            d="M1.5 8.5 L6 3.5 L10.5 8.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M1.5 3.5 L6 8.5 L10.5 3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
