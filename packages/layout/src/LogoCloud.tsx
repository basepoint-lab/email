import React from "react";
import { ExternalLink, Handshake, Sparkles } from "lucide-react";

export interface LogoItem {
  id: string;
  name: string;
  url: string;
  logoSrc: string;
  category?: string;
  description?: string;
  highlight?: string;
}

export interface LogoCloudProps {
  badge?: string;
  title?: string;
  logos: LogoItem[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function LogoCloud({
  badge = "ECOSYSTEM & ALLIANCES",
  title = "Our Strategic Partners & Ventures",
  logos,
  ctaText = "Interested in partnering with Basepoint? Submit an alliance proposal ↗",
  onCtaClick,
  className = "",
}: LogoCloudProps) {
  return (
    <div className={`py-12 sm:py-16 px-4 sm:px-6 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        {(badge || title) && (
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003922]/5 border border-[#003922]/15 text-xs font-mono font-bold text-[#003922] mb-3">
                <Handshake className="w-3.5 h-3.5 text-[#003922]" />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#003922] tracking-tight">
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Logos Row with Tooltip Cards */}
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 md:gap-24 pt-4">
          {logos.map((item) => (
            <div key={item.id} className="relative group flex flex-col items-center">
              {/* Tooltip Card on Hover */}
              {(item.description || item.category) && (
                <div
                  role="tooltip"
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 sm:w-80 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-40"
                >
                  <div className="relative rounded-2xl bg-[#003922] text-white p-4 sm:p-5 shadow-2xl border border-[#a7ff6d]/20 backdrop-blur-md">
                    {item.category && (
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#a7ff6d] bg-white/10 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#a7ff6d]/80" />
                      </div>
                    )}
                    <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight mb-1.5">
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-[#E2DDD0] leading-relaxed mb-3">
                        {item.description}
                      </p>
                    )}
                    {item.highlight && (
                      <div className="pt-2 border-t border-white/10 flex items-center gap-1 text-[11px] font-medium text-[#a7ff6d]">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.highlight}</span>
                      </div>
                    )}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#003922] rotate-45 border-r border-b border-[#a7ff6d]/20" />
                  </div>
                </div>
              )}

              {/* Clickable Logo */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-16 sm:h-20 flex items-center justify-center p-2 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <img
                  src={item.logoSrc}
                  alt={item.name}
                  className="h-12 sm:h-14 md:h-16 w-auto max-h-16 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 drop-shadow-xs"
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Action CTA */}
        {ctaText && (
          <div className="mt-10 sm:mt-12 text-center">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 hover:bg-white border border-[#E2DDD0] text-xs font-mono font-bold text-[#003922] hover:border-[#003922]/40 transition-all cursor-pointer shadow-2xs hover:scale-105"
            >
              <Handshake className="w-3.5 h-3.5 text-[#003922]" />
              <span>{ctaText}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogoCloud;
