import React from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padded?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[1440px]",
  full: "max-w-full",
};

export function Container({
  size = "xl",
  padded = true,
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${sizeClasses[size]} ${
        padded ? "px-4 sm:px-6 lg:px-8" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
