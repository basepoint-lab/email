import React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export type AlertColor = "primary" | "success" | "warning" | "danger" | "info" | "neutral";
export type AlertVariant = "tonal" | "outlined" | "flat" | "elevated";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: AlertColor;
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

export function Alert({
  color = "primary",
  variant = "tonal",
  title,
  icon,
  closable = false,
  onClose,
  className = "",
  children,
  ...props
}: AlertProps) {
  const defaultIcons = {
    primary: <Info className="w-4 h-4 text-[#003922]" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    danger: <AlertCircle className="w-4 h-4 text-rose-600" />,
    info: <Info className="w-4 h-4 text-sky-600" />,
    neutral: <Info className="w-4 h-4 text-[#5e665d]" />,
  };

  const colorStyles: Record<AlertColor, Record<AlertVariant, string>> = {
    primary: {
      tonal: "bg-[#003922]/10 text-[#003922] border-[#003922]/20",
      outlined: "border-[#003922] text-[#003922] bg-transparent",
      flat: "bg-[#003922] text-white border-transparent",
      elevated: "bg-white text-[#003922] border-[#E2DDD0] shadow-md",
    },
    success: {
      tonal: "bg-emerald-50 text-emerald-900 border-emerald-200",
      outlined: "border-emerald-500 text-emerald-800 bg-transparent",
      flat: "bg-emerald-600 text-white border-transparent",
      elevated: "bg-white text-emerald-900 border-emerald-200 shadow-md",
    },
    warning: {
      tonal: "bg-amber-50 text-amber-900 border-amber-200",
      outlined: "border-amber-500 text-amber-800 bg-transparent",
      flat: "bg-amber-500 text-white border-transparent",
      elevated: "bg-white text-amber-900 border-amber-200 shadow-md",
    },
    danger: {
      tonal: "bg-rose-50 text-rose-900 border-rose-200",
      outlined: "border-rose-500 text-rose-800 bg-transparent",
      flat: "bg-rose-600 text-white border-transparent",
      elevated: "bg-white text-rose-900 border-rose-200 shadow-md",
    },
    info: {
      tonal: "bg-sky-50 text-sky-900 border-sky-200",
      outlined: "border-sky-500 text-sky-800 bg-transparent",
      flat: "bg-sky-600 text-white border-transparent",
      elevated: "bg-white text-sky-900 border-sky-200 shadow-md",
    },
    neutral: {
      tonal: "bg-[#f6ffe8] text-[#003922] border-[#E2DDD0]",
      outlined: "border-[#E2DDD0] text-[#003922] bg-transparent",
      flat: "bg-[#5e665d] text-white border-transparent",
      elevated: "bg-white text-[#003922] border-[#E2DDD0] shadow-md",
    },
  };

  const styleClass = colorStyles[color]?.[variant] || colorStyles.primary.tonal;
  const renderedIcon = icon !== undefined ? icon : defaultIcons[color];

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3 p-4 rounded-xl border text-xs leading-relaxed transition-all ${styleClass} ${className}`}
      {...props}
    >
      {renderedIcon && <div className="shrink-0 mt-0.5">{renderedIcon}</div>}
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-mono font-bold tracking-tight mb-1">{title}</h5>}
        <div className="font-sans">{children}</div>
      </div>
      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="shrink-0 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export default Alert;
