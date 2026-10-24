import React from "react";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Container } from "./Container";

export interface CtaBannerProps {
  badge?: string;
  badgeNote?: string;
  title: React.ReactNode;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  guaranteeText?: string;
  ratingText?: string;
  className?: string;
}

export function CtaBanner({
  badge = "TAKE ACTION",
  badgeNote = "Initial audit & consultation 100% complimentary",
  title = "Transform your vision into a scalable, revenue-generating venture.",
  description = "Join ambitious founders and engineering leaders building with Basepoint frameworks. Accelerate your roadmap in rapid production sprints.",
  primaryCtaText = "Estimate Your Project",
  primaryCtaHref = "/contact",
  secondaryCtaText = "Schedule Architecture Call",
  secondaryCtaHref = "/contact",
  guaranteeText = "Guaranteed response within 24 hours",
  ratingText = "4.9/5 verified client satisfaction",
  className = "",
}: CtaBannerProps) {
  return (
    <div className={`py-16 sm:py-20 ${className}`}>
      <Container size="xl">
        <div className="bg-[#003922] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl border-2 border-[#002516]">
          {/* Ambient Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#a7ff6d]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl">
            {/* Header Badge */}
            {(badge || badgeNote) && (
              <div className="inline-flex items-center gap-2 mb-4">
                {badge && (
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#a7ff6d] text-[#003922]">
                    {badge}
                  </span>
                )}
                {badgeNote && (
                  <span className="text-xs font-mono text-[#f6ffe8]/70 hidden sm:inline">
                    {badgeNote}
                  </span>
                )}
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base text-[#f6ffe8]/85 max-w-2xl leading-relaxed mb-8">
                {description}
              </p>
            )}

            {/* Dual Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {primaryCtaText && (
                <a
                  href={primaryCtaHref}
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[#a7ff6d] hover:bg-[#8ef74e] text-[#003922] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-transparent hover:bg-white hover:text-[#003922] text-[#f6ffe8] border border-[#f6ffe8] font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>

            {/* Trust Footnote */}
            {(guaranteeText || ratingText) && (
              <div className="pt-6 border-t border-[#f6ffe8]/15 flex flex-wrap items-center gap-6 text-xs font-mono text-[#f6ffe8]/70">
                {guaranteeText && (
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#a7ff6d] shrink-0" />
                    <span>{guaranteeText}</span>
                  </div>
                )}
                {ratingText && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-white font-bold">{ratingText}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CtaBanner;
