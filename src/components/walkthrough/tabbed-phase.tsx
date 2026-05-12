"use client";

import { useState } from "react";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { VideoDialog } from "../primitives/video-dialog";

export type TabbedPhaseStep = {
  /** The imperative — the line clinicians actually read. */
  title: ReactNode;
  /** Optional supporting bullets shown beneath the title on the active tab. */
  bullets?: ReactNode[];
  /** Optional callouts (pro-tip / watch-out) — shown below bullets on the active tab. */
  callouts?: ReactNode;
  /** Optional Wistia video — rendered as a circular play-icon CTA. */
  video?: { mediaId: string; title: string };
  /** Optional preview image. Receives an aspect-[4/3] container. */
  image?: ReactNode;
  /** Placeholder caption rendered when `image` is omitted. */
  imageLabel?: string;
};

type TabbedPhaseProps = {
  /** Phase index inside the Form step. */
  phaseNumber: number;
  /** Phase title, e.g. "Heat the material". */
  title: ReactNode;
  /** Optional time chip on the header, e.g. "~1 min". */
  time?: string;
  /** Optional one-line description under the title. */
  description?: ReactNode;
  /**
   * Optional overview tab — renders as the first item in the tab list
   * ("Overview") with the supplied media shown in the right preview pane.
   * Numbered micro-steps continue at 1.1, 1.2, ...
   */
  overview?: {
    label?: string;
    image: ReactNode;
  };
  /** Tab list. The first step is active by default. */
  steps: TabbedPhaseStep[];
  /** Optional "to finish" card rendered after the panel. */
  beforeCheck?: ReactNode;
  /** Optional closing block (e.g. QuickCheck) rendered below the panel. */
  children?: ReactNode;
  className?: string;
};

function toDateTime(time?: string): string | undefined {
  if (!time) return undefined;
  const m = time.match(/~?(\d+)\s*min/);
  return m ? `PT${m[1]}M` : undefined;
}

/**
 * Phase variant for short, image-led steps (used by Phase 1: Heat).
 *
 * Layout: full-width brand-blue panel. Left column is a tab list of micro-steps;
 * right column is a thumbnail that swaps with the active tab. Each step exposes
 * a circular play-icon CTA that opens the per-step video in a modal — there is
 * no inline video splash.
 */
type InternalStep = TabbedPhaseStep & { isOverview?: boolean };

export function TabbedPhase({
  phaseNumber,
  title,
  time,
  description,
  overview,
  steps,
  beforeCheck,
  children,
  className,
}: TabbedPhaseProps) {
  const allSteps: InternalStep[] = overview
    ? [
        {
          title: overview.label ?? "Overview",
          image: overview.image,
          isOverview: true,
        },
        ...steps,
      ]
    : steps;
  const [active, setActive] = useState(0);
  const headingId = `phase-${phaseNumber}-title`;
  const dateTime = toDateTime(time);
  const activeStep = allSteps[active];

  return (
    <div className={clsx("flex flex-col gap-10", className)}>
      {/* Header — same shape as PhaseSection for visual continuity */}
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-red font-heading text-xl font-bold text-white"
            >
              {String.fromCharCode(64 + phaseNumber)}
            </span>
            <h2
              id={headingId}
              className="font-heading font-bold leading-[1.05] tracking-tighter text-brand-navy text-3xl sm:text-card lg:text-section-mobile"
            >
              {title}
            </h2>
          </div>
          {time && (
            <time
              dateTime={dateTime}
              className="font-mono text-xs uppercase tracking-eyebrow text-brand-blue"
            >
              {time}
            </time>
          )}
        </div>
        {description && (
          <div className="max-w-measure text-base leading-relaxed text-brand-navy/70">
            {description}
          </div>
        )}
      </header>

      {/* Full-width brand-blue panel: tab list on the left, preview on the right */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-[#222525]/15"
        />
        <div className="relative grid grid-cols-1 gap-6 rounded-2xl bg-brand-blue p-4 sm:p-6 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-10 lg:p-8">
          <ol
            role="tablist"
            aria-label={typeof title === "string" ? title : "Phase steps"}
            className="flex flex-col gap-1"
          >
            {allSteps.map((step, i) => {
              const isActive = i === active;
              const tabId = `phase-${phaseNumber}-tab-${i}`;
              const panelId = `phase-${phaseNumber}-panel-${i}`;
              const microIndex = overview ? i - 1 : i;
              const stepNumber = step.isOverview
                ? null
                : `${phaseNumber}.${microIndex + 1}`;
              return (
                <li key={i}>
                  <div
                    className={clsx(
                      "flex flex-col gap-2 rounded-xl px-4 py-4 transition-colors sm:px-5 sm:py-5",
                      isActive ? "bg-white/10" : "hover:bg-white/[0.04]",
                    )}
                    style={
                      i > 0 && !isActive
                        ? {
                            backgroundImage:
                              "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 5px, transparent 5px, transparent 14px)",
                            backgroundSize: "100% 1px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top",
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        role="tab"
                        id={tabId}
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        className="grid flex-1 grid-cols-[auto_1fr] items-baseline gap-x-4 rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:gap-x-6"
                      >
                        <span
                          aria-hidden="true"
                          className={clsx(
                            "inline-flex flex-none items-baseline font-mono text-xs font-semibold tracking-eyebrow",
                            isActive ? "text-white" : "text-cream/70",
                          )}
                        >
                          {stepNumber ? `/ ${stepNumber}` : ""}
                        </span>
                        <p
                          className={clsx(
                            "font-heading text-base font-medium leading-snug sm:text-lg",
                            isActive ? "text-white" : "text-white/85",
                          )}
                        >
                          {step.title}
                        </p>
                      </button>
                      {step.video && (
                        <VideoDialog
                          variant="icon"
                          mediaId={step.video.mediaId}
                          title={step.video.title}
                        />
                      )}
                    </div>

                    {isActive && step.bullets && step.bullets.length > 0 && (
                      <ul className="ml-12 flex list-disc flex-col gap-1 pl-4 text-sm leading-snug text-white/70 marker:text-white/35 sm:ml-14">
                        {step.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {isActive && step.callouts && (
                      <div className="ml-12 flex flex-col gap-2 sm:ml-14">
                        {step.callouts}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            id={`phase-${phaseNumber}-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`phase-${phaseNumber}-tab-${active}`}
            className="relative overflow-hidden rounded-xl bg-white/5 lg:sticky lg:top-24"
          >
            <div className="relative aspect-[4/3] w-full">
              {activeStep.image ? (
                <div className="absolute inset-0 [&>*]:!aspect-auto [&>*]:!h-full [&>*]:!w-full [&>*]:!rounded-none">
                  {activeStep.image}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center px-6 text-center font-mono text-xs uppercase tracking-eyebrow text-white/40">
                  {activeStep.imageLabel ?? `step ${phaseNumber}.${active + 1}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {beforeCheck && <div>{beforeCheck}</div>}
      {children && <div>{children}</div>}
    </div>
  );
}
