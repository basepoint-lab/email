import React from "react";
import { Container } from "./Container";

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
}

export interface StatsSectionProps {
  badge?: string;
  narrativeTitle?: string;
  narrativeDescription?: string;
  guarantees?: string[];
  stats: StatItem[];
  className?: string;
}

export function StatsSection({
  badge = "AUTHORITY & IMPACT",
  narrativeTitle = "Empowering high-velocity builders with battle-tested architectures.",
  narrativeDescription = "Across our integrated pillars — Learn, Build, and Launch — we deliver complete venture continuity from ideation to production deployment.",
  guarantees = [
    "Agile Methodology & Rapid Delivery",
    "Dedicated Venture Partners",
    "Modern Stack (Next.js & AI)",
  ],
  stats,
  className = "",
}: StatsSectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <Container size="xl">
        {/* Authority Narrative Box */}
        {(badge || narrativeTitle) && (
          <div className="bg-white border-2 border-[#E2DDD0] rounded-3xl p-8 sm:p-14 shadow-2xs mb-12 text-center max-w-4xl mx-auto">
            {badge && (
              <div className="inline-block mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#003922] text-[#a7ff6d]">
                  {badge}
                </span>
              </div>
            )}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003922] tracking-tight leading-snug mb-4">
              {narrativeTitle}
            </h2>
            {narrativeDescription && (
              <p className="text-xs sm:text-sm text-[#5e665d] leading-relaxed max-w-2xl mx-auto">
                {narrativeDescription}
              </p>
            )}

            {/* Guarantees Row */}
            {guarantees.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#f6ffe8] flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#003922]">
                {guarantees.map((g, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2DDD0] rounded-2xl p-6 hover:border-[#003922] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {s.icon && (
                  <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] text-[#003922] flex items-center justify-center mb-3">
                    {s.icon}
                  </div>
                )}
                <div className="text-3xl sm:text-4xl font-black text-[#003922] font-mono tracking-tight mb-1">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-[#003922] mb-1">{s.label}</div>
              </div>
              {s.subtext && <div className="text-[10px] font-mono text-[#5e665d] mt-2">{s.subtext}</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default StatsSection;
