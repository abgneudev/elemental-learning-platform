import type { ReactNode } from "react";
import { ProTip } from "./pro-tip";
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
  return callouts.map((c, i) => {
    if (c.kind === "pro-tip") {
      return (
        <ProTip key={i} title={c.title}>
          {c.body}
        </ProTip>
      );
    }
    return (
      <WatchOut key={i} title={c.title}>
        {c.body}
      </WatchOut>
    );
  });
}
