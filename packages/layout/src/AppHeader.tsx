import React from "react";
import { Monogram } from "./Monogram";

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  appName: string;
  appIcon?: React.ReactNode;
  category?: string;
  badge?: string;
  description?: string;
  accountSwitcherSlot?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
  blur?: boolean;
  maxWidth?: "default" | "6xl" | "7xl" | "full";
}

export function AppHeader({
  appName,
  appIcon,
  category,
  badge,
  description,
  accountSwitcherSlot,
  actions,
  sticky = false,
  blur = false,
  maxWidth = "7xl",
  className = "",
  ...props
}: AppHeaderProps) {
  const maxWidthClass = {
    default: "max-w-7xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <header
      className={`border-b border-[#DDE3D9] px-4 sm:px-8 py-6 sm:py-8 transition-all z-40 ${
        sticky ? "sticky top-0" : "relative"
      } ${blur ? "bg-white/90 backdrop-blur-md" : "bg-white"} ${className}`}
      {...props}
    >
      <div
        className={`${maxWidthClass} mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6`}
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#003922] text-[#a7ff6d] flex items-center justify-center font-black shadow-xs shrink-0 p-2">
            {appIcon || <Monogram variant="lime" className="w-full h-full" />}
          </div>

          <div>
            {(category || badge) && (
              <div className="inline-flex items-center gap-2 mb-1.5 flex-wrap">
                {category && (
                  <span className="font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#003922]">
                    {category}
                  </span>
                )}
                {badge && (
                  <span className="bg-[#a7ff6d] text-[#003922] text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg shadow-2xs">
                    {badge}
                  </span>
                )}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#003922]">
              {appName}
            </h1>

            {description && (
              <p className="text-xs sm:text-sm text-[#687368] mt-1 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Workspace / Account Switcher & Actions */}
        {(accountSwitcherSlot || actions) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {accountSwitcherSlot && <div>{accountSwitcherSlot}</div>}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
