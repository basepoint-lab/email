import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
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

export function TestimonialCard({
  name,
  company,
  program,
  rating = 5,
  date,
  quote,
  stat,
  avatarText,
  avatarSrc,
  verified = true,
  className = "",
  ...props
}: TestimonialCardProps) {
  const initials = avatarText || name.split(" ").map((n) => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

  return (
    <div
      className={`bg-white border border-[#E2DDD0] rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-[#003c2d] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between ${className}`}
      {...props}
    >
      <div>
        {/* Rating and Date Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < rating ? "fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          {date && <span className="text-[11px] font-mono text-[#5e665d]">{date}</span>}
        </div>

        {/* Quote Content */}
        <div className="relative mb-6">
          <Quote className="w-6 h-6 text-[#003c2d]/10 absolute -top-2 -left-1 pointer-events-none" />
          <p className="text-xs sm:text-sm text-[#003c2d] leading-relaxed relative z-10 font-medium">
            "{quote}"
          </p>
        </div>
      </div>

      {/* Author and Impact Metric Footer */}
      <div className="pt-4 border-t border-[#F7F5EC] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {avatarSrc ? (
            <img src={avatarSrc} alt={name} className="w-9 h-9 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#003c2d] text-[#BCF63C] font-mono font-bold text-xs flex items-center justify-center shrink-0">
              {initials}
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#003c2d]">{name}</span>
              {verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </div>
            {(company || program) && (
              <span className="block text-[10px] font-mono text-[#5e665d]">
                {company} {program ? `· ${program}` : ""}
              </span>
            )}
          </div>
        </div>

        {stat && (
          <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-[#003c2d] bg-[#BCF63C]/40 px-2 py-0.5 rounded shrink-0">
            {stat}
          </span>
        )}
      </div>
    </div>
  );
}

export default TestimonialCard;
