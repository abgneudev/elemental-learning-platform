import { clsx } from "clsx";
import type { ReactNode } from "react";

type StepHeroProps = {
  description: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

const DESC_TONE: Record<"light" | "dark", string> = {
  light: "text-brand-navy",
  dark: "text-white",
};

export function StepHero({
  description,
  tone = "light",
  className,
}: StepHeroProps) {
  return (
    <h1
      className={clsx(
        "text-2xl font-bold leading-snug sm:text-4xl",
        DESC_TONE[tone],
        className,
      )}
    >
      {description}
    </h1>
  );
}
