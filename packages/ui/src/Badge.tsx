import React from "react";
import { X } from "lucide-react";
import { ComponentColor, ComponentVariantStyle } from "./Button";

export type BadgeColor =
  | ComponentColor
  | "learn"
  | "build"
  | "launch"
  | "operations";

export type BadgeVariantStyle = ComponentVariantStyle;

export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgeRounded = "none" | "xs" | "sm" | "md" | "lg" | "full" | "pill";

// Support both new orthogonal props and legacy variant names
export type BadgeVariant =
  | BadgeVariantStyle
  | "pine"
  | "citron"
  | "spring"
  | "subtle"
  | "outline"
  | "live"
  | "kbd"
  | "learn"
  | "build"
  | "launch"
  | "operations"
  | "destructive"
  | "warning"
  | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  variant?: BadgeVariant;
  styleVariant?: BadgeVariantStyle;
  size?: BadgeSize;
  rounded?: BadgeRounded;
  icon?: React.ReactNode;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  pulse?: boolean;
  dot?: boolean;
  dotColor?: string;
  onRemove?: () => void;
}

type NormalizedBadgeColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "learn"
  | "build"
  | "launch"
  | "operations"
  | "kbd";

function normalizeBadgeColor(color?: BadgeColor, variant?: BadgeVariant): NormalizedBadgeColor {
  if (color === "secondary" || color === "citron" || variant === "citron") return "secondary";
  if (color === "tertiary" || color === "spring" || variant === "spring") return "tertiary";
  if (color === "success") return "success";
  if (color === "warning" || variant === "warning") return "warning";
  if (color === "danger" || color === "error" || color === "destructive" || variant === "destructive") return "danger";
  if (color === "info" || variant === "info") return "info";
  if (color === "learn" || variant === "learn") return "learn";
  if (color === "build" || variant === "build") return "build";
  if (color === "launch" || variant === "launch") return "launch";
  if (color === "operations" || variant === "operations") return "operations";
  if (variant === "kbd") return "kbd";
  if (color === "neutral" || color === "surface" || variant === "subtle" || variant === "live") return "neutral";
  return "primary";
}

function normalizeBadgeStyle(variant?: BadgeVariant, styleVariant?: BadgeVariantStyle): BadgeVariantStyle {
  if (styleVariant) return styleVariant;
  if (variant === "outline" || variant === "outlined") return "outlined";
  if (variant === "flat") return "flat";
  if (variant === "tonal") return "tonal";
  if (variant === "text") return "text";
  if (variant === "plain") return "plain";
  return "elevated";
}

const badgeMatrix: Record<BadgeVariantStyle, Record<NormalizedBadgeColor, string>> = {
  elevated: {
    primary: "bg-[#003D28] text-[#A5FF70] border border-[#00271D] shadow-2xs",
    secondary: "bg-[#A5FF70] text-[#003D28] border border-[#8CFF50] shadow-2xs",
    tertiary: "bg-[#8CFF50] text-[#003D28] border border-[#6FE633] shadow-2xs",
    success: "bg-[#15803D] text-white border border-[#166534] shadow-2xs",
    warning: "bg-[#B45309] text-white border border-[#92400E] shadow-2xs",
    danger: "bg-[#B91C1C] text-white border border-[#991B1B] shadow-2xs",
    info: "bg-[#1D4ED8] text-white border border-[#1E40AF] shadow-2xs",
    neutral: "bg-white text-[#003D28] border border-[#DDE3D9] shadow-2xs",
    learn: "bg-[#1E40AF] text-[#DBEAFE] border border-[#1D4ED8] shadow-2xs",
    build: "bg-[#92400E] text-[#FEF3C7] border border-[#B45309] shadow-2xs",
    launch: "bg-[#065F46] text-[#D1FAE5] border border-[#047857] shadow-2xs",
    operations: "bg-[#334155] text-[#F1F5F9] border border-[#475569] shadow-2xs",
    kbd: "bg-[#F6FFE9] text-[#687368] border border-[#DDE3D9] font-mono shadow-xs",
  },
  flat: {
    primary: "bg-[#003D28] text-[#A5FF70] border border-transparent",
    secondary: "bg-[#A5FF70] text-[#003D28] border border-transparent",
    tertiary: "bg-[#8CFF50] text-[#003D28] border border-transparent",
    success: "bg-[#15803D] text-white border border-transparent",
    warning: "bg-[#B45309] text-white border border-transparent",
    danger: "bg-[#B91C1C] text-white border border-transparent",
    info: "bg-[#1D4ED8] text-white border border-transparent",
    neutral: "bg-[#F6FFE9] text-[#003D28] border border-transparent",
    learn: "bg-[#1E40AF] text-[#DBEAFE] border border-transparent",
    build: "bg-[#92400E] text-[#FEF3C7] border border-transparent",
    launch: "bg-[#065F46] text-[#D1FAE5] border border-transparent",
    operations: "bg-[#334155] text-[#F1F5F9] border border-transparent",
    kbd: "bg-[#F6FFE9] text-[#687368] border border-[#DDE3D9]",
  },
  tonal: {
    primary: "bg-[#003D28]/10 text-[#003D28] border border-[#003D28]/15",
    secondary: "bg-[#A5FF70]/35 text-[#003D28] border border-[#A5FF70]/50",
    tertiary: "bg-[#8CFF50]/30 text-[#003D28] border border-[#8CFF50]/45",
    success: "bg-[#15803D]/15 text-[#166534] border border-[#15803D]/25",
    warning: "bg-[#B45309]/15 text-[#92400E] border border-[#B45309]/25",
    danger: "bg-[#B91C1C]/15 text-[#991B1B] border border-[#B91C1C]/25",
    info: "bg-[#1D4ED8]/15 text-[#1E40AF] border border-[#1D4ED8]/25",
    neutral: "bg-[#F6FFE9] text-[#687368] border border-[#DDE3D9]",
    learn: "bg-[#DBEAFE] text-[#1E40AF] border border-[#BFDBFE]",
    build: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
    launch: "bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]",
    operations: "bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0]",
    kbd: "bg-[#F6FFE9] text-[#687368] border border-[#DDE3D9]",
  },
  outlined: {
    primary: "bg-transparent text-[#003D28] border border-[#003D28]",
    secondary: "bg-transparent text-[#003D28] border border-[#003D28]",
    tertiary: "bg-transparent text-[#003D28] border border-[#003D28]",
    success: "bg-transparent text-[#15803D] border border-[#15803D]",
    warning: "bg-transparent text-[#B45309] border border-[#B45309]",
    danger: "bg-transparent text-[#B91C1C] border border-[#B91C1C]",
    info: "bg-transparent text-[#1D4ED8] border border-[#1D4ED8]",
    neutral: "bg-transparent text-[#687368] border border-[#DDE3D9]",
    learn: "bg-transparent text-[#1E40AF] border border-[#BFDBFE]",
    build: "bg-transparent text-[#92400E] border border-[#FDE68A]",
    launch: "bg-transparent text-[#065F46] border border-[#A7F3D0]",
    operations: "bg-transparent text-[#334155] border border-[#E2E8F0]",
    kbd: "bg-transparent text-[#5e665d] border border-[#E2DDD0]",
  },
  text: {
    primary: "bg-transparent text-[#003c2d] border border-transparent",
    secondary: "bg-transparent text-[#003c2d] border border-transparent font-bold",
    tertiary: "bg-transparent text-[#003c2d] border border-transparent font-bold",
    success: "bg-transparent text-[#10b981] border border-transparent",
    warning: "bg-transparent text-[#d97706] border border-transparent",
    danger: "bg-transparent text-[#ef4444] border border-transparent",
    info: "bg-transparent text-[#3b82f6] border border-transparent",
    neutral: "bg-transparent text-[#5e665d] border border-transparent",
    learn: "bg-transparent text-[#1E40AF] border border-transparent",
    build: "bg-transparent text-[#92400E] border border-transparent",
    launch: "bg-transparent text-[#065F46] border border-transparent",
    operations: "bg-transparent text-[#334155] border border-transparent",
    kbd: "bg-transparent text-[#5e665d] border border-transparent",
  },
  plain: {
    primary: "bg-transparent text-[#003c2d] opacity-70 border border-transparent",
    secondary: "bg-transparent text-[#003c2d] opacity-70 border border-transparent",
    tertiary: "bg-transparent text-[#003c2d] opacity-70 border border-transparent",
    success: "bg-transparent text-[#10b981] opacity-70 border border-transparent",
    warning: "bg-transparent text-[#d97706] opacity-70 border border-transparent",
    danger: "bg-transparent text-[#ef4444] opacity-70 border border-transparent",
    info: "bg-transparent text-[#3b82f6] opacity-70 border border-transparent",
    neutral: "bg-transparent text-[#5e665d] opacity-70 border border-transparent",
    learn: "bg-transparent text-[#1E40AF] opacity-70 border border-transparent",
    build: "bg-transparent text-[#92400E] opacity-70 border border-transparent",
    launch: "bg-transparent text-[#065F46] opacity-70 border border-transparent",
    operations: "bg-transparent text-[#334155] opacity-70 border border-transparent",
    kbd: "bg-transparent text-[#5e665d] opacity-70 border border-transparent",
  },
};

const badgeSizeStyles: Record<BadgeSize, string> = {
  xs: "text-[9px] px-1 py-0.2 tracking-wider",
  sm: "text-[10px] px-1.5 py-0.5 tracking-wider",
  md: "text-xs px-2.5 py-1 tracking-wider",
  lg: "text-xs px-3.5 py-1.5 font-bold tracking-widest",
};

const badgeRoundedStyles: Record<BadgeRounded, string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
  pill: "rounded-full",
};

export function Badge({
  color,
  variant = "elevated",
  styleVariant,
  size = "md",
  rounded = "md",
  icon,
  prependIcon,
  appendIcon,
  pulse = false,
  dot = false,
  dotColor,
  onRemove,
  children,
  className = "",
  ...props
}: BadgeProps) {
  const isLive = variant === "live" || pulse;
  const leadIcon = prependIcon || icon;

  const normalizedColor = normalizeBadgeColor(color, variant);
  const normalizedStyle = normalizeBadgeStyle(variant, styleVariant);

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-bold select-none uppercase ${
        badgeMatrix[normalizedStyle][normalizedColor]
      } ${badgeSizeStyles[size]} ${badgeRoundedStyles[rounded]} ${className}`}
      {...props}
    >
      {(isLive || dot) && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColor
              ? dotColor
              : normalizedColor === "danger"
              ? "bg-[#ef4444]"
              : normalizedColor === "warning"
              ? "bg-[#f59e0b]"
              : normalizedColor === "secondary"
              ? "bg-[#003c2d]"
              : normalizedColor === "primary"
              ? "bg-[#BCF63C]"
              : "bg-[#10b981]"
          } ${pulse ? "animate-pulse" : ""}`}
        />
      )}
      {leadIcon && <span className="shrink-0">{leadIcon}</span>}
      <span>{children}</span>
      {appendIcon && <span className="shrink-0">{appendIcon}</span>}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 p-0.5 hover:bg-black/15 rounded cursor-pointer transition-colors"
          aria-label="Remove badge"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

export default Badge;
