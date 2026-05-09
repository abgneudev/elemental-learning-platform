import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl";

const widths: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

type ContainerProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  size?: ContainerSize;
  children: ReactNode;
};

export function Container({
  size = "md",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widths[size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}