"use client";
import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  message: string;
  href?: string;
  linkText?: string;
  statusDot?: boolean;
  pulse?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  variant?: "pine" | "citron" | "canvas" | "white";
}

export function AnnouncementBar({
  badge,
  message,
  href,
  linkText,
  statusDot = true,
  pulse = true,
  dismissible = false,
  onDismiss,
  variant = "pine",
  className = "",
  ...props
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const variantStyles = {
    pine: "bg-[#003c2d] text-[#F7F5EC] border-b border-[#00271d]",
    citron: "bg-[#BCF63C] text-[#003c2d] border-b border-[#a9e42c]",
    canvas: "bg-[#F7F5EC] text-[#003c2d] border-b border-[#E2DDD0]",
    white: "bg-white text-[#003c2d] border-b border-[#E2DDD0]",
  }[variant];

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      className={`px-4 py-2 sm:py-2.5 text-xs font-mono transition-all z-50 ${variantStyles} ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 mx-auto flex-wrap justify-center text-center">
          {statusDot && (
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                variant === "pine" ? "bg-[#BCF63C]" : "bg-[#003c2d]"
              } ${pulse ? "animate-ping" : ""}`}
            />
          )}

          {badge && (
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                variant === "pine"
                  ? "bg-[#BCF63C] text-[#003c2d]"
                  : "bg-[#003c2d] text-[#BCF63C]"
              }`}
            >
              {badge}
            </span>
          )}

          <span className="font-medium">{message}</span>

          {href && (
            <a
              href={href}
              className={`inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 transition-opacity ${
                variant === "pine" ? "text-[#BCF63C]" : "text-[#003c2d]"
              }`}
            >
              <span>{linkText || "Learn more"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="p-1 rounded hover:opacity-80 transition-opacity cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default AnnouncementBar;
