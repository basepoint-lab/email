import React from "react";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumbs({
  items,
  separator,
  className = "",
  ...props
}: BreadcrumbsProps) {
  const defaultSeparator = <ChevronRight className="w-3.5 h-3.5 text-[#5e665d]/50 shrink-0" />;

  return (
    <nav aria-label="Breadcrumbs" className={`flex items-center text-xs font-mono ${className}`} {...props}>
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="flex items-center" aria-hidden="true">
                  {separator || defaultSeparator}
                </span>
              )}

              {isLast || !item.href ? (
                <span className="text-[#003c2d] font-bold" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-[#5e665d] hover:text-[#003c2d] hover:underline transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
