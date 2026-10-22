import React from "react";

export type HeadingBadgeVariant =
  | "pine"
  | "citron"
  | "spring"
  | "dark"
  | "subtle"
  | "outline";

export type HeadingSize = "sm" | "md" | "lg" | "xl";

export interface PageHeadingProps {
  /** Top mono category badge label (e.g., "01 · ACADEMY", "FINANCIAL ARCHITECTURE") */
  badge?: React.ReactNode;
  /** Badge color variant */
  badgeVariant?: HeadingBadgeVariant;
  /** Optional icon rendered inside the badge */
  badgeIcon?: React.ReactNode;
  /** Main title */
  title: React.ReactNode;
  /** Optional colored accent (e.g. citron dot or highlight) */
  titleAccent?: React.ReactNode;
  /** HTML heading tag to render */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Font size scale */
  size?: HeadingSize;
  /** Subtitle or explanatory paragraph */
  description?: React.ReactNode;
  /** Action buttons/controls slot */
  actions?: React.ReactNode;
  /** Breadcrumb link or component above heading */
  breadcrumbs?: React.ReactNode;
  /** Bottom structural dividing border */
  withDivider?: boolean;
  /** Text alignment */
  align?: "left" | "center";
  /** Additional container classes */
  className?: string;
  /** Children rendered below description */
  children?: React.ReactNode;
}

const badgeVariantStyles: Record<HeadingBadgeVariant, string> = {
  pine: "bg-[#003c2d] text-[#BCF63C] border border-[#00281e]",
  citron: "bg-[#BCF63C] text-[#003c2d] border border-[#aef026]",
  spring: "bg-[#A3FB60] text-[#003c2d] border border-[#8ceb44]",
  dark: "bg-[#1A2421] text-[#BCF63C] border border-[#263531]",
  subtle: "bg-white text-[#003c2d] border border-[#E2DDD0]",
  outline: "bg-transparent text-[#003c2d] border border-[#003c2d]",
};

const sizeStyles: Record<HeadingSize, string> = {
  sm: "text-lg sm:text-xl font-bold",
  md: "text-xl sm:text-2xl font-extrabold",
  lg: "text-3xl md:text-4xl font-extrabold",
  xl: "text-4xl md:text-5xl font-extrabold",
};

export function PageHeading({
  badge,
  badgeVariant = "pine",
  badgeIcon,
  title,
  titleAccent,
  as: Component = "h1",
  size = "lg",
  description,
  actions,
  breadcrumbs,
  withDivider = false,
  align = "left",
  className = "",
  children,
}: PageHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-8 ${withDivider ? "border-b border-[#E2DDD0] pb-6" : ""} ${className}`}
    >
      {breadcrumbs && (
        <div className={`mb-2 text-xs font-mono text-[#5e665d] ${isCenter ? "text-center" : ""}`}>
          {breadcrumbs}
        </div>
      )}

      <div
        className={`flex flex-col ${
          actions ? "md:flex-row md:items-end md:justify-between gap-4" : ""
        }`}
      >
        <div className={`flex-1 ${isCenter ? "text-center mx-auto max-w-3xl" : ""}`}>
          {badge && (
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2 py-0.5 rounded mb-2.5 transition-colors ${
                badgeVariantStyles[badgeVariant]
              }`}
            >
              {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
              <span>{badge}</span>
            </div>
          )}

          <Component
            className={`${sizeStyles[size]} text-[#003c2d] tracking-tight text-balance`}
          >
            {title}
            {titleAccent && (
              <span className="text-[#BCF63C] ml-0.5 select-none">{titleAccent}</span>
            )}
          </Component>

          {description && (
            <div
              className={`text-sm text-[#5e665d] mt-2 leading-relaxed ${
                isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
              }`}
            >
              {description}
            </div>
          )}
        </div>

        {actions && (
          <div
            className={`flex items-center gap-2.5 shrink-0 ${
              isCenter ? "justify-center mt-4" : "mt-4 md:mt-0"
            }`}
          >
            {actions}
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default PageHeading;
