import React from "react";
import { Logo } from "./Logo";

export interface CenteredHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logoHref?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  sticky?: boolean;
  blur?: boolean;
  maxWidth?: "default" | "6xl" | "7xl" | "full";
}

export function CenteredHeader({
  logoHref = "/",
  leftContent,
  rightContent,
  sticky = true,
  blur = true,
  maxWidth = "6xl",
  className = "",
  ...props
}: CenteredHeaderProps) {
  const maxWidthClass = {
    default: "max-w-6xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <header
      className={`border-b border-[#E2DDD0] px-4 sm:px-8 py-3.5 transition-all z-50 ${
        sticky ? "sticky top-0" : "relative"
      } ${blur ? "bg-[#f6ffe8]/90 backdrop-blur-md" : "bg-[#f6ffe8]"} ${className}`}
      {...props}
    >
      <div className={`${maxWidthClass} mx-auto grid grid-cols-3 items-center`}>
        {/* Left Section */}
        <div className="flex items-center justify-start gap-2">
          {leftContent}
        </div>

        {/* Center Section: Centered Brand Logotype */}
        <div className="flex items-center justify-center">
          <a
            href={logoHref}
            className="hover:opacity-90 transition-opacity select-none"
            aria-label="Basepoint Home"
          >
            <Logo variant="primary" className="h-7 w-auto" />
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          {rightContent}
        </div>
      </div>
    </header>
  );
}

export default CenteredHeader;
