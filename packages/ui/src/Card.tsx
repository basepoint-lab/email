import React from "react";
import { ArrowRight } from "lucide-react";

export type CardVariant = "elevated" | "flat" | "tonal" | "outlined";
export type CardColor = "surface" | "primary" | "neutral" | "dark";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  variant?: CardVariant;
  color?: CardColor;
  loading?: boolean;
}

const cardVariantStyles: Record<CardVariant, Record<CardColor, string>> = {
  elevated: {
    surface: "bg-white border border-[#DDE3D9] shadow-sm",
    primary: "bg-[#003922] text-white border border-[#002516] shadow-md",
    neutral: "bg-[#f6ffe8] border border-[#DDE3D9] shadow-xs",
    dark: "bg-[#002516] text-[#f6ffe8] border border-white/10 shadow-lg",
  },
  flat: {
    surface: "bg-white border border-transparent shadow-none",
    primary: "bg-[#003922] text-white border border-transparent shadow-none",
    neutral: "bg-[#f6ffe8] border border-transparent shadow-none",
    dark: "bg-[#002516] text-[#f6ffe8] border border-transparent shadow-none",
  },
  tonal: {
    surface: "bg-[#f6ffe8] border border-[#DDE3D9]/60 shadow-none",
    primary: "bg-[#003922]/10 text-[#003922] border border-[#003922]/15 shadow-none",
    neutral: "bg-[#DDE3D9]/30 border border-[#DDE3D9]/50 shadow-none",
    dark: "bg-white/5 text-[#f6ffe8] border border-white/10 shadow-none",
  },
  outlined: {
    surface: "bg-transparent border border-[#DDE3D9] shadow-none",
    primary: "bg-transparent border-2 border-[#003922] text-[#003922] shadow-none",
    neutral: "bg-transparent border border-[#687368]/40 shadow-none",
    dark: "bg-transparent border border-white/20 text-[#f6ffe8] shadow-none",
  },
};

export function Card({
  hoverable = true,
  variant = "elevated",
  color = "surface",
  loading = false,
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`relative rounded-xl p-5 transition-all duration-200 ${
        cardVariantStyles[variant][color]
      } ${
        hoverable
          ? "hover:border-[#003922] hover:-translate-y-0.5 hover:shadow-md"
          : ""
      } ${loading ? "opacity-60 pointer-events-none" : ""} ${className}`}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-xs flex items-center justify-center rounded-xl z-10">
          <div className="w-5 h-5 border-2 border-[#003922] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-3 flex justify-between items-start ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg sm:text-xl font-extrabold text-[#003922] tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-xs sm:text-sm text-[#687368] leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`my-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`pt-3 border-t border-[#f6ffe8] flex items-center justify-between text-xs font-mono ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  isPositive = true,
  subtext,
  icon,
  className = "",
}: MetricCardProps) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-[11px] font-mono text-[#5e665d] uppercase tracking-wider font-bold">
          {label}
        </span>
        {icon && (
          <div className="w-7 h-7 rounded-md bg-[#f6ffe8] text-[#003922] flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#003922]">
          {value}
        </span>
        {change && (
          <span
            className={`text-xs font-mono font-bold ${
              isPositive ? "text-[#10b981]" : "text-[#ef4444]"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      {subtext && (
        <p className="text-[11px] text-[#5e665d] mt-1 font-mono">{subtext}</p>
      )}
    </Card>
  );
}

export interface RealmCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  keyLabel?: string;
  className?: string;
}

export function RealmCard({
  number,
  title,
  subtitle,
  description,
  href,
  icon,
  keyLabel,
  className = "",
}: RealmCardProps) {
  return (
    <a href={href} className="block group">
      <Card className={`h-full flex flex-col justify-between ${className}`}>
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-xs font-bold text-[#5e665d]">
              {number} · {subtitle}
            </span>
            {icon && (
              <div className="w-8 h-8 rounded-lg bg-[#f6ffe8] group-hover:bg-[#a7ff6d] text-[#003922] flex items-center justify-center transition-colors">
                {icon}
              </div>
            )}
          </div>
          <CardTitle className="mb-1 group-hover:text-black">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <CardFooter className="mt-4">
          <span className="font-mono text-[10px] text-[#5e665d]">
            {keyLabel || "Explore"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#003922] group-hover:translate-x-1 transition-transform">
            Enter <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </CardFooter>
      </Card>
    </a>
  );
}

export interface SimpleIconCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  name: string;
  desc?: string;
  badge?: string;
  hoverable?: boolean;
}

export function SimpleIconCard({
  icon,
  name,
  desc,
  badge,
  hoverable = true,
  className = "",
  ...props
}: SimpleIconCardProps) {
  return (
    <div
      className={`bg-white border border-[#E2DDD0] rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between ${
        hoverable
          ? "hover:border-[#003922] hover:-translate-y-0.5 hover:shadow-xs group cursor-default"
          : ""
      } ${className}`}
      {...props}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-[#f6ffe8] text-[#003922] flex items-center justify-center shrink-0 group-hover:bg-[#003922] group-hover:text-[#a7ff6d] transition-colors">
            {icon}
          </div>
          {badge && (
            <span className="text-[10px] font-mono text-[#5e665d] uppercase tracking-wider block bg-[#f6ffe8] border border-[#E2DDD0] px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <h4 className="text-sm font-bold text-[#003922] group-hover:text-black leading-snug mb-1">
          {name}
        </h4>
        {desc && (
          <p className="text-xs text-[#5e665d] leading-relaxed">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}
