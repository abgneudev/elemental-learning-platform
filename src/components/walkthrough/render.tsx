import type { ReactNode } from "react";
import { WatchOut } from "./watch-out";
import type { CalloutContent } from "@/lib/content";

/**
 * Render the data-shaped quote from `/lib/content` into ReactNode.
 * Single string → one <p>; array of strings → stacked <p>s.
 */
export function renderQuote(quote: string | readonly string[]): ReactNode {
  if (typeof quote === "string") {
    return <p>{quote}</p>;
  }
  return quote.map((paragraph, i) => <p key={i}>{paragraph}</p>);
}

/**
 * Render the data-shaped callout list from `/lib/content` into ProTip /
 * WatchOut components. Used inside DetailSection micro-steps and PhaseSection
 * micro-steps so the same content shape composes either way.
 */
export function renderCallouts(callouts: readonly CalloutContent[]): ReactNode {
  return callouts
    .filter((c) => c.kind !== "pro-tip")
    .map((c, i) => (
      <WatchOut key={i} title={c.title}>
        {c.body}
      </WatchOut>
    ));
}

/**
 * Dark-background variant for use inside the brand-blue tabbed phase panel.
 * Same data shape, light-on-dark inline rendering. Pro-tip uses a green accent;
 * watch-out uses orange. No `<details>` collapse — the panel only shows the
 * active step's callout, so there's nothing to fold away.
 */
export function renderDarkCallouts(
  callouts: readonly CalloutContent[],
): ReactNode {
  return callouts.map((c, i) => {
    const accent =
      c.kind === "pro-tip"
        ? { border: "border-brand-green", label: "text-brand-green", labelText: "Pro tip" }
        : { border: "border-brand-yellow", label: "text-brand-yellow", labelText: "Watch out" };
    return (
      <div
        key={i}
        className={`rounded-sm border-l-[3px] bg-white/5 px-3 py-2 text-sm leading-relaxed text-white/85 ${accent.border}`}
      >
        <p
          className={`mb-1 font-mono text-xs font-semibold uppercase tracking-eyebrow ${accent.label}`}
        >
          {c.title ?? accent.labelText}
        </p>
        <p>{c.body}</p>
      </div>
    );
  });
}
