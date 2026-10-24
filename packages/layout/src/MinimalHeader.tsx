import React from "react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";

export interface MinimalHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logoHref?: string;
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  maxWidth?: "default" | "6xl" | "7xl" | "full";
}

export function MinimalHeader({
  logoHref = "/",
  backHref,
  backLabel = "Back",
  onBack,
  rightAction,
  maxWidth = "6xl",
  className = "",
  ...props
}: MinimalHeaderProps) {
  const maxWidthClass = {
    default: "max-w-6xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <header
      className={`border-b border-[#E2DDD0] bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 z-40 ${className}`}
      {...props}
    >
      <div className={`${maxWidthClass} mx-auto flex items-center justify-between gap-4`}>
        {/* Left: Back Link or Brand */}
        <div className="flex items-center gap-4">
          {(backHref || onBack) && (
            <a
              href={backHref}
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#5e665d] hover:text-[#003922] transition-colors p-1 rounded-md hover:bg-[#f6ffe8]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{backLabel}</span>
            </a>
          )}

          <a
            href={logoHref}
            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity select-none"
            aria-label="Basepoint Home"
          >
            <Logo variant="primary" className="h-7 w-auto" />
          </a>
        </div>

        {/* Right Action */}
        {rightAction && <div className="flex items-center gap-2">{rightAction}</div>}
      </div>
    </header>
  );
}

export default MinimalHeader;
