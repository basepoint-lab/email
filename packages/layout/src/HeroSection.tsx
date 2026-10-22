import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCta?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  visualContent?: React.ReactNode;
  glow?: boolean;
  centered?: boolean;
}

export function HeroSection({
  badge,
  badgeIcon,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  visualContent,
  glow = true,
  centered = true,
  className = "",
  children,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {/* Background Glow Blobs */}
      {glow && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#BCF63C]/15 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-[300px] right-0 w-[450px] h-[450px] bg-[#003c2d]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        </>
      )}

      <div
        className={`max-w-6xl mx-auto ${
          centered ? "text-center flex flex-col items-center" : "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        }`}
      >
        <div className={centered ? "max-w-3xl" : "lg:col-span-7"}>
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2DDD0] text-xs font-mono font-bold text-[#003c2d] mb-6 shadow-2xs">
              {badgeIcon || <span className="w-2 h-2 rounded-full bg-[#003c2d] animate-pulse" />}
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#003c2d] tracking-tight leading-[1.08]">
            {title}
          </h1>

          {subtitle && (
            <div className="mt-6 text-base sm:text-lg text-[#5e665d] leading-relaxed font-sans max-w-2xl">
              {subtitle}
            </div>
          )}

          {(primaryCta || secondaryCta) && (
            <div
              className={`mt-8 flex flex-col sm:flex-row items-center gap-3.5 ${
                centered ? "justify-center" : "justify-start"
              }`}
            >
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  onClick={primaryCta.onClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#003c2d] hover:bg-[#00271d] text-[#BCF63C] font-mono font-bold text-xs sm:text-sm tracking-wide shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{primaryCta.label}</span>
                  {primaryCta.icon || <ArrowRight className="w-4 h-4 text-[#BCF63C]" />}
                </a>
              )}

              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  onClick={secondaryCta.onClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F7F5EC] text-[#003c2d] font-mono font-bold text-xs sm:text-sm tracking-wide border border-[#E2DDD0] shadow-xs hover:border-[#003c2d]/40 transition-all cursor-pointer"
                >
                  <span>{secondaryCta.label}</span>
                  {secondaryCta.icon}
                </a>
              )}
            </div>
          )}

          {children}
        </div>

        {visualContent && (
          <div className={centered ? "mt-12 w-full" : "lg:col-span-5 flex justify-center"}>
            {visualContent}
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
