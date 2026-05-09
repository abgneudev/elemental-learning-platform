"use client";

import { useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";

type Card = {
  title: string;
  sub: string;
  image?: string;
};

type ExpandableCardsProps = {
  cards: Card[];
};

/**
 * Horizontal accordion card strip. One card is active at a time — it
 * expands to fill available space while siblings contract. Interaction is
 * driven by hover + focus so keyboard users can reach every card.
 */
export function ExpandableCards({ cards }: ExpandableCardsProps) {
  const [active, setActive] = useState(0);

  return (
    <ul
      className="flex flex-col gap-2 md:flex-row"
      aria-label="Key benefits"
      onMouseLeave={() => setActive(0)}
    >
      {cards.map((card, i) => {
        const isActive = i === active;
        return (
          <li
            key={card.title}
            className={clsx(
              "relative flex flex-col gap-4 overflow-hidden rounded-md p-5 outline-none",
              "min-h-[14rem] md:h-96",
              "md:transition-[flex-grow] md:duration-400 md:ease-[cubic-bezier(0.4,0,0.2,1)]",
              // Mobile: every card is shown as active (border + bg) so its content is legible.
              // md+: horizontal accordion — the focused/hovered card expands.
              "border border-brand-navy/20 bg-brand-navy",
              isActive
                ? "md:flex-[4_1_0%] md:border-brand-navy-deep/20 md:bg-brand-navy-deep"
                : "md:flex-[1_1_0%] md:cursor-pointer md:border-white/15 md:bg-white/15",
              "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue",
            )}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            {/* Top: title + description */}
            <div className="flex flex-col gap-1">
              {/* Letter badge */}
              <span
                aria-hidden="true"
                className="mb-2 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-orange font-heading text-xl font-bold text-brand-navy"
              >
                {String.fromCharCode(65 + i)}
              </span>
              <div className="flex items-start gap-3">
                <h3
                  className={clsx(
                    "font-heading text-xl font-bold leading-tight tracking-tight md:transition-colors md:duration-300",
                    "text-white",
                    isActive ? "md:text-white" : "md:text-white/75",
                  )}
                >
                  {card.title}
                </h3>
              </div>

              {/* Description — fades in just below the title (md+); always visible on mobile */}
              <p
                className={clsx(
                  "max-w-[32ch] text-sm leading-relaxed text-white/65",
                  "md:transition-[opacity,transform] md:duration-300 md:ease-out",
                  isActive
                    ? "md:translate-y-0 md:opacity-100"
                    : "md:pointer-events-none md:translate-y-1 md:opacity-0",
                )}
              >
                {card.sub}
              </p>
            </div>

            {/* Card image — absolutely pinned bottom-right */}
            <figure
              aria-hidden="true"
              className={clsx(
                "hidden md:block absolute bottom-4 right-4 w-110 overflow-hidden rounded",
                "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isActive
                  ? "translate-y-0 opacity-100 md:delay-[160ms]"
                  : "pointer-events-none translate-y-2 opacity-0 md:delay-0",
              )}
            >
              {card.image ? (
                <Image
                  src={card.image}
                  alt=""
                  width={440}
                  height={352}
                  className="aspect-[5/4] w-full rounded object-cover"
                />
              ) : (
                <div
                  className="aspect-[5/4] w-full rounded"
                  style={{
                    backgroundImage:
                      "repeating-conic-gradient(rgba(255,255,255,0.06) 0% 25%, transparent 0% 50%)",
                    backgroundSize: "14px 14px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                />
              )}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
