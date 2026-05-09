"use client";
import { useRef } from "react";
import { WistiaPlayer } from "./wistia-player";

type VideoDialogProps = {
  mediaId: string;
  title: string;
  buttonLabel?: string;
};

export function VideoDialog({
  mediaId,
  title,
  buttonLabel = "Watch video",
}: VideoDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-eyebrow text-brand-blue transition-colors hover:text-brand-navy"
      >
        <span aria-hidden="true" className="text-[0.6rem]">▶</span>
        {buttonLabel}
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
