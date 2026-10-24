import React from "react";
import { ComponentColor } from "./Button";

export type ProgressColor =
  | ComponentColor
  | "pine"
  | "citron"
  | "spring"
  | "subtle";

export type ProgressStyle = "flat" | "tonal" | "striped" | "gradient";
export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressRounded = "none" | "sm" | "md" | "full";

// Backward compatible with existing variant="citron" | "pine" etc.
export type ProgressVariant = ProgressColor | ProgressStyle;

export interface ProgressBarProps {
  value?: number; // 0 to 100
  max?: number;
  bufferValue?: number; // Streaming buffer bar
  label?: string;
  showValue?: boolean;
  color?: ProgressColor;
  variant?: ProgressVariant;
  styleVariant?: ProgressStyle;
  size?: ProgressSize;
  rounded?: ProgressRounded;
  indeterminate?: boolean;
  striped?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  primary: "bg-[#003922]",
  pine: "bg-[#003922]",
  secondary: "bg-[#a7ff6d]",
  citron: "bg-[#a7ff6d]",
  tertiary: "bg-[#8ef74e]",
  spring: "bg-[#8ef74e]",
  success: "bg-[#10b981]",
  warning: "bg-[#f59e0b]",
  danger: "bg-[#ef4444]",
  error: "bg-[#ef4444]",
  destructive: "bg-[#ef4444]",
  info: "bg-[#3b82f6]",
  neutral: "bg-[#5e665d]",
  surface: "bg-[#5e665d]",
  subtle: "bg-[#5e665d]",
};

const sizeHeights: Record<ProgressSize, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
  xl: "h-5",
};

const roundedMap: Record<ProgressRounded, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-sm",
  full: "rounded-full",
};

export function ProgressBar({
  value = 0,
  max = 100,
  bufferValue,
  label,
  showValue = false,
  color,
  variant = "primary",
  styleVariant = "flat",
  size = "md",
  rounded = "full",
  indeterminate = false,
  striped = false,
  className = "",
}: ProgressBarProps) {
  // Determine effective color
  const effectiveColor = color || (variant in colorMap ? (variant as ProgressColor) : "primary");
  const fillColor = colorMap[effectiveColor] || colorMap.primary;

  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const bufferPercent = bufferValue !== undefined ? Math.min(100, Math.max(0, Math.round((bufferValue / max) * 100))) : undefined;

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
          {label && <span className="font-bold text-[#003922] uppercase">{label}</span>}
          {showValue && !indeterminate && (
            <span className="text-[#5e665d] font-bold">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-[#E2DDD0] relative overflow-hidden ${roundedMap[rounded]} ${sizeHeights[size]}`}
      >
        {/* Buffer stream bar */}
        {bufferPercent !== undefined && (
          <div
            className={`absolute top-0 bottom-0 left-0 bg-[#003922]/20 transition-all duration-300 ${roundedMap[rounded]}`}
            style={{ width: `${bufferPercent}%` }}
          />
        )}

        {/* Primary value bar */}
        {indeterminate ? (
          <div
            className={`h-full w-1/3 ${fillColor} rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]`}
          />
        ) : (
          <div
            className={`h-full transition-all duration-300 ${fillColor} ${roundedMap[rounded]} ${
              striped || styleVariant === "striped"
                ? "bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                : ""
            }`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
