"use client";
import { useRef } from "react";
import { clsx } from "clsx";
import { WistiaPlayer } from "./wistia-player";

type VideoDialogProps = {
  mediaId: string;
  title: string;
  buttonLabel?: string;
  /** "text" (default) renders an inline mono CTA. "icon" renders a circular play-icon button. */
  variant?: "text" | "icon";
  className?: string;
};

export function VideoDialog({
  mediaId,
  title,
  buttonLabel = "Watch video",
  variant = "text",
  className,
}: VideoDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const ariaLabel = variant === "icon" ? `Watch: ${title}` : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label={ariaLabel}
        className={clsx(
          variant === "icon"
            ? "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white text-brand-blue shadow-sm transition hover:scale-105 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue"
            : "inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-eyebrow text-brand-blue transition-colors hover:text-brand-navy",
          className,
        )}
      >
        {variant === "icon" ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 10 12"
            className="h-3 w-3 translate-x-px fill-current"
          >
            <path d="M0 0l10 6-10 6V0z" />
          </svg>
        ) : (
          <>
            <span aria-hidden="true" className="text-[0.6rem]">▶</span>
            {buttonLabel}
          </>
        )}
      </button>

      <dialog
        ref={ref}
        aria-label={title}
        onClick={(e) => {
          if (e.target === ref.current) ref.current.close();
        }}
        className="m-auto w-full max-w-3xl rounded-lg bg-brand-navy p-0 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-5 py-3">
            <p className="font-heading text-sm font-semibold text-white">{title}</p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close video"
              className="rounded p-1 text-white/50 transition-colors hover:text-white"
            >
              ✕
            </button>
          </div>
          <WistiaPlayer mediaId={mediaId} title={title} aspect="16x9" autoPlay />
        </div>
      </dialog>
    </>
  );
}
