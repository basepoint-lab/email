import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export type StatTrend = "up" | "down" | "neutral";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: StatTrend;
  trendValue?: string;
  trendLabel?: string;
  variant?: "surface" | "primary" | "tonal" | "outline";
  loading?: boolean;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  trendLabel,
  variant = "surface",
  loading = false,
  className = "",
  ...props
}: StatCardProps) {
  const variantStyles = {
    surface: "bg-white border-[#E2DDD0] text-[#003922]",
    primary: "bg-[#003922] border-[#002516] text-white",
    tonal: "bg-[#f6ffe8] border-[#E2DDD0] text-[#003922]",
    outline: "bg-transparent border-[#E2DDD0] text-[#003922]",
  }[variant];

  const isDark = variant === "primary";

  return (
    <div
      className={`rounded-2xl border p-5 transition-all shadow-xs ${variantStyles} ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span
          className={`font-mono text-xs uppercase tracking-wider font-bold ${
            isDark ? "text-emerald-200" : "text-[#5e665d]"
          }`}
        >
          {title}
        </span>
        {icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isDark ? "bg-white/10 text-[#a7ff6d]" : "bg-[#f6ffe8] text-[#003922] border border-[#E2DDD0]"
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        {loading ? (
          <div className="h-8 w-24 bg-current/10 animate-pulse rounded" />
        ) : (
          <div className="text-2xl sm:text-3xl font-black tracking-tight">{value}</div>
        )}

        {trend && trendValue && (
          <div
            className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
              trend === "up"
                ? "bg-emerald-50 text-emerald-700"
                : trend === "down"
                ? "bg-rose-50 text-rose-700"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {trend === "up" && <ArrowUpRight className="w-3 h-3" />}
            {trend === "down" && <ArrowDownRight className="w-3 h-3" />}
            {trend === "neutral" && <Minus className="w-3 h-3" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      {(subtitle || trendLabel) && (
        <div
          className={`mt-1.5 text-xs font-sans ${
            isDark ? "text-emerald-100/70" : "text-[#5e665d]"
          }`}
        >
          {trendLabel || subtitle}
        </div>
      )}
    </div>
  );
}

export default StatCard;
