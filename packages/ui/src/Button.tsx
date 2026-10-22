import React from "react";
import { Loader2 } from "lucide-react";

export type ComponentColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "error"
  | "destructive"
  | "info"
  | "neutral"
  | "surface"
  // Legacy aliases
  | "pine"
  | "citron"
  | "spring";

export type ComponentVariantStyle =
  | "elevated"
  | "flat"
  | "tonal"
  | "outlined"
  | "text"
  | "plain";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "icon";
export type ButtonDensity = "default" | "comfortable" | "compact";
export type ButtonRounded = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full" | "pill";

// Support both new Vuetify-style orthogonal props and legacy variant names
export type ButtonVariant =
  | ComponentVariantStyle
  | "pine"
  | "citron"
  | "spring"
  | "outline"
  | "ghost"
  | "destructive";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ComponentColor;
  variant?: ButtonVariant;
  styleVariant?: ComponentVariantStyle;
  size?: ButtonSize;
  density?: ButtonDensity;
  rounded?: ButtonRounded;
  block?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  loading?: boolean;
  loadingText?: string;
  active?: boolean;
  ripple?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

// Normalized color key
type NormalizedColor = "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "info" | "neutral";

function normalizeColor(color?: ComponentColor, variant?: ButtonVariant): NormalizedColor {
  if (color === "secondary" || color === "citron" || variant === "citron") return "secondary";
  if (color === "tertiary" || color === "spring" || variant === "spring") return "tertiary";
  if (color === "success") return "success";
  if (color === "warning") return "warning";
  if (color === "danger" || color === "error" || color === "destructive" || variant === "destructive") return "danger";
  if (color === "info") return "info";
  if (color === "neutral" || color === "surface" || variant === "ghost") return "neutral";
  return "primary";
}

function normalizeStyle(variant?: ButtonVariant, styleVariant?: ComponentVariantStyle): ComponentVariantStyle {
  if (styleVariant) return styleVariant;
  if (variant === "outline") return "outlined";
  if (variant === "ghost") return "text";
  if (variant === "flat") return "flat";
  if (variant === "tonal") return "tonal";
  if (variant === "outlined") return "outlined";
  if (variant === "text") return "text";
  if (variant === "plain") return "plain";
  return "elevated";
}

// 2D Style Matrix: Style x Color
const styleMatrix: Record<ComponentVariantStyle, Record<NormalizedColor, string>> = {
  elevated: {
    primary: "bg-[#003D28] text-[#F6FFE9] hover:bg-[#00271D] shadow-sm border border-transparent focus-visible:ring-[#003D28]",
    secondary: "bg-[#A5FF70] text-[#003D28] hover:bg-[#8CFF50] shadow-sm border border-transparent focus-visible:ring-[#A5FF70] font-bold",
    tertiary: "bg-[#8CFF50] text-[#003D28] hover:bg-[#A5FF70] shadow-sm border border-transparent focus-visible:ring-[#8CFF50] font-bold",
    success: "bg-[#15803D] text-white hover:bg-[#166534] shadow-sm border border-transparent focus-visible:ring-[#15803D]",
    warning: "bg-[#B45309] text-white hover:bg-[#92400E] shadow-sm border border-transparent focus-visible:ring-[#B45309] font-bold",
    danger: "bg-[#B91C1C] text-white hover:bg-[#991B1B] shadow-sm border border-transparent focus-visible:ring-[#B91C1C]",
    info: "bg-[#1D4ED8] text-white hover:bg-[#1E40AF] shadow-sm border border-transparent focus-visible:ring-[#1D4ED8]",
    neutral: "bg-white text-[#003D28] border border-[#DDE3D9] hover:bg-[#F6FFE9] shadow-xs focus-visible:ring-[#003D28]",
  },
  flat: {
    primary: "bg-[#003D28] text-[#F6FFE9] hover:bg-[#00271D] border border-transparent focus-visible:ring-[#003D28]",
    secondary: "bg-[#A5FF70] text-[#003D28] hover:bg-[#8CFF50] border border-transparent focus-visible:ring-[#A5FF70] font-bold",
    tertiary: "bg-[#8CFF50] text-[#003D28] hover:bg-[#A5FF70] border border-transparent focus-visible:ring-[#8CFF50] font-bold",
    success: "bg-[#15803D] text-white hover:bg-[#166534] border border-transparent focus-visible:ring-[#15803D]",
    warning: "bg-[#B45309] text-white hover:bg-[#92400E] border border-transparent focus-visible:ring-[#B45309] font-bold",
    danger: "bg-[#B91C1C] text-white hover:bg-[#991B1B] border border-transparent focus-visible:ring-[#B91C1C]",
    info: "bg-[#1D4ED8] text-white hover:bg-[#1E40AF] border border-transparent focus-visible:ring-[#1D4ED8]",
    neutral: "bg-[#F6FFE9] text-[#003D28] border border-[#DDE3D9] hover:bg-[#EAEFE7] focus-visible:ring-[#003D28]",
  },
  tonal: {
    primary: "bg-[#003D28]/10 text-[#003D28] hover:bg-[#003D28]/20 border border-transparent focus-visible:ring-[#003D28] font-semibold",
    secondary: "bg-[#A5FF70]/35 text-[#003D28] hover:bg-[#A5FF70]/55 border border-transparent focus-visible:ring-[#A5FF70] font-bold",
    tertiary: "bg-[#8CFF50]/30 text-[#003D28] hover:bg-[#8CFF50]/50 border border-transparent focus-visible:ring-[#8CFF50] font-bold",
    success: "bg-[#15803D]/15 text-[#166534] hover:bg-[#15803D]/25 border border-transparent focus-visible:ring-[#15803D] font-semibold",
    warning: "bg-[#B45309]/15 text-[#92400E] hover:bg-[#B45309]/25 border border-transparent focus-visible:ring-[#B45309] font-semibold",
    danger: "bg-[#B91C1C]/15 text-[#991B1B] hover:bg-[#B91C1C]/25 border border-transparent focus-visible:ring-[#B91C1C] font-semibold",
    info: "bg-[#1D4ED8]/15 text-[#1E40AF] hover:bg-[#1D4ED8]/25 border border-transparent focus-visible:ring-[#1D4ED8] font-semibold",
    neutral: "bg-[#DDE3D9]/40 text-[#687368] hover:bg-[#DDE3D9]/70 border border-transparent focus-visible:ring-[#003D28]",
  },
  outlined: {
    primary: "bg-transparent border border-[#003D28] text-[#003D28] hover:bg-[#003D28] hover:text-[#F6FFE9] focus-visible:ring-[#003D28]",
    secondary: "bg-transparent border border-[#003D28] text-[#003D28] hover:bg-[#A5FF70] focus-visible:ring-[#A5FF70]",
    tertiary: "bg-transparent border border-[#003D28] text-[#003D28] hover:bg-[#8CFF50] focus-visible:ring-[#8CFF50]",
    success: "bg-transparent border border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white focus-visible:ring-[#15803D]",
    warning: "bg-transparent border border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white focus-visible:ring-[#B45309]",
    danger: "bg-transparent border border-[#B91C1C] text-[#B91C1C] hover:bg-[#B91C1C] hover:text-white focus-visible:ring-[#B91C1C]",
    info: "bg-transparent border border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white focus-visible:ring-[#1D4ED8]",
    neutral: "bg-transparent border border-[#DDE3D9] text-[#687368] hover:border-[#003D28] hover:text-[#003D28] focus-visible:ring-[#003D28]",
  },
  text: {
    primary: "bg-transparent text-[#003D28] hover:bg-[#003D28]/10 border border-transparent focus-visible:ring-[#003D28]",
    secondary: "bg-transparent text-[#003D28] hover:bg-[#A5FF70]/30 border border-transparent focus-visible:ring-[#A5FF70] font-bold",
    tertiary: "bg-transparent text-[#003D28] hover:bg-[#8CFF50]/30 border border-transparent focus-visible:ring-[#8CFF50] font-bold",
    success: "bg-transparent text-[#15803D] hover:bg-[#15803D]/15 border border-transparent focus-visible:ring-[#15803D]",
    warning: "bg-transparent text-[#B45309] hover:bg-[#B45309]/15 border border-transparent focus-visible:ring-[#B45309]",
    danger: "bg-transparent text-[#B91C1C] hover:bg-[#B91C1C]/15 border border-transparent focus-visible:ring-[#B91C1C]",
    info: "bg-transparent text-[#1D4ED8] hover:bg-[#1D4ED8]/15 border border-transparent focus-visible:ring-[#1D4ED8]",
    neutral: "bg-transparent text-[#687368] hover:text-[#003D28] hover:bg-[#F6FFE9] border border-transparent focus-visible:ring-[#003D28]",
  },
  plain: {
    primary: "bg-transparent text-[#003D28] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#003D28]",
    secondary: "bg-transparent text-[#003D28] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#A5FF70]",
    tertiary: "bg-transparent text-[#003D28] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#8CFF50]",
    success: "bg-transparent text-[#15803D] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#15803D]",
    warning: "bg-transparent text-[#B45309] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#B45309]",
    danger: "bg-transparent text-[#B91C1C] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#B91C1C]",
    info: "bg-transparent text-[#1D4ED8] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#1D4ED8]",
    neutral: "bg-transparent text-[#687368] opacity-70 hover:opacity-100 border border-transparent focus-visible:ring-[#003D28]",
  },
};

const sizeStyles: Record<ButtonSize, Record<ButtonDensity, string>> = {
  xs: {
    compact: "px-2 py-0.5 text-[10px] gap-1",
    comfortable: "px-2.5 py-1 text-[10px] gap-1",
    default: "px-3 py-1 text-[11px] font-mono gap-1.5",
  },
  sm: {
    compact: "px-2.5 py-1 text-xs gap-1",
    comfortable: "px-3 py-1.5 text-xs gap-1.5",
    default: "px-3.5 py-1.5 text-xs font-mono gap-1.5",
  },
  md: {
    compact: "px-3.5 py-1.5 text-xs gap-1.5",
    comfortable: "px-4 py-2 text-xs font-bold gap-2",
    default: "px-5 py-2.5 text-xs font-bold gap-2",
  },
  lg: {
    compact: "px-4 py-2 text-sm gap-2",
    comfortable: "px-5 py-2.5 text-sm font-bold gap-2",
    default: "px-6 py-3 text-sm font-bold gap-2.5",
  },
  xl: {
    compact: "px-5 py-2.5 text-base gap-2",
    comfortable: "px-6 py-3 text-base font-bold gap-2.5",
    default: "px-8 py-3.5 text-base font-bold gap-3",
  },
  icon: {
    compact: "w-7 h-7 p-0 gap-0",
    comfortable: "w-8 h-8 p-0 gap-0",
    default: "w-9 h-9 p-0 gap-0",
  },
};

const roundedStyles: Record<ButtonRounded, string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
  pill: "rounded-full",
};

export function Button({
  color,
  variant = "elevated",
  styleVariant,
  size = "md",
  density = "default",
  rounded = "lg",
  block = false,
  fullWidth = false,
  isLoading = false,
  loading = false,
  loadingText,
  active = false,
  ripple = true,
  leftIcon,
  rightIcon,
  prependIcon,
  appendIcon,
  href,
  target,
  rel,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const effectiveLoading = isLoading || loading;
  const effectiveFullWidth = block || fullWidth;
  const leadIcon = prependIcon || leftIcon;
  const trailIcon = appendIcon || rightIcon;

  const normalizedColor = normalizeColor(color, variant);
  const normalizedStyle = normalizeStyle(variant, styleVariant);

  const baseClasses = `inline-flex items-center justify-center font-medium transition-all duration-150 select-none active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 ${
    styleMatrix[normalizedStyle][normalizedColor]
  } ${sizeStyles[size][density]} ${roundedStyles[rounded]} ${
    effectiveFullWidth ? "w-full" : ""
  } ${active ? "ring-2 ring-offset-1 ring-current" : ""} ${
    disabled || effectiveLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"
  } ${className}`;

  const content = (
    <>
      {effectiveLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
      ) : (
        leadIcon && <span className="shrink-0">{leadIcon}</span>
      )}
      {effectiveLoading && loadingText ? (
        <span>{loadingText}</span>
      ) : (
        children && <span>{children}</span>
      )}
      {!effectiveLoading && trailIcon && <span className="shrink-0">{trailIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled || effectiveLoading} {...props}>
      {content}
    </button>
  );
}

export default Button;
