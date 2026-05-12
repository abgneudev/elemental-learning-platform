import { clsx } from "clsx";

export type WistiaAspect = "16x9" | "9x16" | "4x3" | "1x1";

const aspects: Record<WistiaAspect, string> = {
  "16x9": "aspect-video",
  "9x16": "aspect-[9/16]",
  "4x3": "aspect-[4/3]",
  "1x1": "aspect-square",
};

type WistiaPlayerProps = {
  mediaId: string;
  title: string;
  aspect?: WistiaAspect;
  autoPlay?: boolean;
  playerColor?: string;
  className?: string;
  /**
   * When true, the video crops to fill its container instead of
   * letterboxing. Use when the player sits inside a parent whose
   * aspect doesn't match the source video.
   */
  fillContainer?: boolean;
};

export function WistiaPlayer({
  mediaId,
  title,
  aspect = "16x9",
  autoPlay = false,
  playerColor,
  className,
  fillContainer = false,
}: WistiaPlayerProps) {
  const params = new URLSearchParams({
    seo: "true",
  });
  if (autoPlay) params.set("autoPlay", "true");
  if (playerColor) params.set("playerColor", playerColor.replace(/^#/, ""));
  if (fillContainer) params.set("fitStrategy", "cover");

  const src = `https://fast.wistia.net/embed/iframe/${mediaId}?${params.toString()}`;

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden rounded-md bg-black",
        aspects[aspect],
        className,
      )}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
