import React from "react";
import { Container, ContainerSize } from "./Container";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  containerSize?: ContainerSize;
  background?: "canvas" | "white" | "pine" | "subtle";
  withGrid?: boolean;
}

const bgClasses = {
  canvas: "bg-[#F7F5EC] text-[#003c2d]",
  white: "bg-white text-[#003c2d]",
  pine: "bg-[#00271d] text-white",
  subtle: "bg-[#FAF9F5] text-[#003c2d]",
};

export function Section({
  badge,
  title,
  subtitle,
  actions,
  containerSize = "xl",
  background = "canvas",
  withGrid = false,
  className = "",
  children,
  ...props
}: SectionProps) {
  const isDark = background === "pine";

  return (
    <section
      className={`py-12 sm:py-16 md:py-20 ${bgClasses[background]} ${
        withGrid ? (isDark ? "bg-grid-dark" : "bg-grid-pine") : ""
      } ${className}`}
      {...props}
    >
      <Container size={containerSize}>
        {(badge || title || subtitle || actions) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div className="max-w-2xl">
              {badge && (
                <div className="mb-2">
                  <span
                    className={`inline-block font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isDark
                        ? "bg-[#BCF63C] text-[#003c2d]"
                        : "bg-[#003c2d] text-[#BCF63C]"
                    }`}
                  >
                    {badge}
                  </span>
                </div>
              )}
              {title && (
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
                    isDark ? "text-white" : "text-[#003c2d]"
                  }`}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                    isDark ? "text-white/70" : "text-[#5e665d]"
                  }`}
                >
                  {subtitle}
                </p>
              )}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}

export default Section;
