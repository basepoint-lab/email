"use client";
import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@basepoint-lab/ui";
import { CenteredHeader, CenteredHeaderProps } from "./CenteredHeader";
import { AppHeader, AppHeaderProps } from "./AppHeader";
import { MinimalHeader, MinimalHeaderProps } from "./MinimalHeader";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
  badge?: string;
}

export type HeaderVariant = "standard" | "centered" | "app" | "minimal";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: HeaderVariant;
  logoHref?: string;
  navItems?: NavItem[];
  actions?: React.ReactNode;
  monogram?: string;
  statusText?: string;
  // Centered variant props
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  // App variant props
  appName?: string;
  appIcon?: React.ReactNode;
  category?: string;
  badge?: string;
  description?: string;
  accountSwitcherSlot?: React.ReactNode;
  // Minimal variant props
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function Header({
  variant = "standard",
  logoHref = "/",
  navItems = [],
  actions,
  monogram = "b.",
  statusText = "Ecosystem Online",
  leftContent,
  rightContent,
  appName = "Basepoint App",
  appIcon,
  category,
  badge,
  description,
  accountSwitcherSlot,
  backHref,
  backLabel,
  onBack,
  rightAction,
  className = "",
  ...props
}: HeaderProps) {
  if (variant === "centered") {
    return (
      <CenteredHeader
        logoHref={logoHref}
        leftContent={leftContent}
        rightContent={rightContent || actions}
        className={className}
        {...props}
      />
    );
  }

  if (variant === "app") {
    return (
      <AppHeader
        appName={appName}
        appIcon={appIcon}
        category={category}
        badge={badge}
        description={description}
        accountSwitcherSlot={accountSwitcherSlot}
        actions={actions}
        className={className}
        {...props}
      />
    );
  }

  if (variant === "minimal") {
    return (
      <MinimalHeader
        logoHref={logoHref}
        backHref={backHref}
        backLabel={backLabel}
        onBack={onBack}
        rightAction={rightAction || actions}
        className={className}
        {...props}
      />
    );
  }

  // Standard Navigation Header
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`border-b border-[#E2DDD0] bg-white/95 backdrop-blur-md sticky top-0 z-40 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logotype */}
        <div className="flex items-center gap-3">
          <a
            href={logoHref}
            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity select-none"
            aria-label="Basepoint Home"
          >
            <Logo variant="primary" className="h-7 w-auto" />
          </a>

          {monogram && (
            <span className="hidden sm:inline-flex items-center justify-center font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#003922] text-[#a7ff6d] uppercase tracking-wider">
              {monogram}
            </span>
          )}

          {statusText && (
            <div className="hidden lg:flex items-center gap-1.5 ml-2 pl-3 border-l border-[#E2DDD0] text-[11px] font-mono text-[#5e665d]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>{statusText}</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        {navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1 ${
                  item.active
                    ? "text-[#003922] bg-[#f6ffe8] border border-[#E2DDD0]"
                    : "text-[#5e665d] hover:text-[#003922] hover:bg-[#FAF9F5]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#a7ff6d] text-[#003922] rounded">
                    {item.badge}
                  </span>
                )}
                {item.external && <ArrowUpRight className="w-3 h-3 text-[#5e665d]" />}
              </a>
            ))}
          </nav>
        )}

        {/* Right Actions Slot & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {actions && <div className="hidden sm:flex items-center gap-2">{actions}</div>}

          {navItems.length > 0 && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-lg text-[#003922] hover:bg-[#f6ffe8] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && navItems.length > 0 && (
        <div className="md:hidden border-t border-[#E2DDD0] bg-white px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-xs font-mono font-bold rounded-lg ${
                item.active
                  ? "bg-[#003922] text-[#a7ff6d]"
                  : "text-[#003922] hover:bg-[#f6ffe8]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                {item.external && <ArrowUpRight className="w-3.5 h-3.5" />}
              </div>
            </a>
          ))}
          {actions && <div className="pt-3 border-t border-[#E2DDD0] sm:hidden">{actions}</div>}
        </div>
      )}
    </header>
  );
}

export default Header;
