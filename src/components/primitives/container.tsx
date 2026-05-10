import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl";

const widths: Record<ContainerSize, string> = {
  sm: "max-w-[80%]",
  md: "max-w-[85%]",
  lg: "max-w-[90%]",
  xl: "max-w-[95%]",
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