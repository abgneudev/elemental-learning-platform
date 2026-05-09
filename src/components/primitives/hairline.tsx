import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Hairline — 1px horizontal rule used as a section divider, card border,
 * or eyebrow underline. Solid by default, dotted variant for the editorial
 * "leader" treatment under eyebrows (Nervana reference).
 */
export type HairlineVariant = "solid" | "dotted";

type HairlineProps = Omit<ComponentPropsWithoutRef<"hr">, "children"> & {
  variant?: HairlineVariant;
  className?: string;
};

export function Hairline({
  variant = "solid",
  className,
  ...rest
}: HairlineProps) {
  return (
    <hr
      className={clsx(
        "block h-px w-full border-0",
        variant === "solid" ? "bg-hairline" : "hairline-dotted",
        className,
      )}
      {...rest}
    />
  );
}