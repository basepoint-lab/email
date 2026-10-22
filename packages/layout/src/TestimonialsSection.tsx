import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Container } from "./Container";

export interface TestimonialItem {
  name: string;
  company?: string;
  program?: string;
  rating?: number;
  date?: string;
  quote: string;
  stat?: string;
  avatarText?: string;
  avatarSrc?: string;
  verified?: boolean;
}

export interface TestimonialsSectionProps {
  scoreBadge?: string;
  rating?: number;
  title?: React.ReactNode;
  subtitle?: string;
  testimonials: TestimonialItem[];
  className?: string;
}

export function TestimonialsSection({
  scoreBadge = "Trustpilot · 4.9 on 5",
  rating = 4.9,
  title = "Trusted by ambitious builders and venture leaders.",
  subtitle = "Discover how founders scale faster with Basepoint frameworks.",
  testimonials,
  className = "",
}: TestimonialsSectionProps) {
  return (
    <section className={`py-16 sm:py-24 bg-[#FAF9F5] border-y border-[#E2DDD0] ${className}`}>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          {scoreBadge && (
            <div className="inline-flex items-center gap-1.5 p-1 px-3 rounded-full bg-white border border-[#E2DDD0] shadow-2xs mb-4">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-[#003c2d]">
                {scoreBadge}
              </span>
            </div>
          )}

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#003c2d] tracking-tight leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm sm:text-base text-[#5e665d] mt-3 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => {
            const initials =
              t.avatarText ||
              t.name
                .split(" ")
                .map((n) => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase();

            return (
              <div
                key={idx}
                className="bg-white border border-[#E2DDD0] rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-[#003c2d] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (t.rating || 5) ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {t.date && <span className="text-[11px] font-mono text-[#5e665d]">{t.date}</span>}
                  </div>

                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-[#003c2d]/10 absolute -top-2 -left-1 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-[#003c2d] leading-relaxed relative z-10 font-medium">
                      "{t.quote}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F7F5EC] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {t.avatarSrc ? (
                      <img
                        src={t.avatarSrc}
                        alt={t.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#003c2d] text-[#BCF63C] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#003c2d]">{t.name}</span>
                        {t.verified !== false && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      {(t.company || t.program) && (
                        <span className="block text-[10px] font-mono text-[#5e665d]">
                          {t.company} {t.program ? `· ${t.program}` : ""}
                        </span>
                      )}
                    </div>
                  </div>

                  {t.stat && (
                    <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-[#003c2d] bg-[#BCF63C]/40 px-2 py-0.5 rounded shrink-0">
                      {t.stat}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
