import React from "react";

export type GridVariant = "none" | "pine" | "dark";

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  grid?: GridVariant;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const gridClasses: Record<GridVariant, string> = {
  none: "",
  pine: "bg-grid-pine",
  dark: "bg-[#00271d] text-white bg-grid-dark",
};

export function PageShell({
  grid = "none",
  header,
  footer,
  children,
  className = "",
  ...props
}: PageShellProps) {
  const isDark = grid === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#00271d] text-white" : "bg-[#F7F5EC] text-[#003c2d]"
      } font-sans ${gridClasses[grid]} ${className}`}
      {...props}
    >
      {header && <div className="sticky top-0 z-40 w-full">{header}</div>}
      <main className="flex-1 w-full">{children}</main>
      {footer && <div className="w-full mt-auto">{footer}</div>}
    </div>
  );
}

export default PageShell;
