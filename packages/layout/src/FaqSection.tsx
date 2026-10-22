"use client";
import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqSectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  supportCta?: {
    label: string;
    description?: string;
    buttonText: string;
    onClick?: () => void;
    href?: string;
  };
  visualContent?: React.ReactNode;
}

export function FaqSection({
  badge = "FREQUENTLY ASKED QUESTIONS",
  title = "Everything You Need to Know",
  subtitle,
  items = [],
  supportCta,
  visualContent,
  className = "",
  ...props
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className={`w-full max-w-6xl mx-auto py-16 sm:py-24 px-4 sm:px-6 scroll-mt-16 ${className}`}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {visualContent && (
          <div className="lg:col-span-5 flex items-center justify-center p-2 sm:p-4">
            {visualContent}
          </div>
        )}

        <div className={visualContent ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl mx-auto w-full"}>
          <div className="mb-8 text-center lg:text-left">
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-[#E2DDD0] text-xs font-mono font-bold text-[#003c2d] shadow-2xs">
                <HelpCircle className="w-3.5 h-3.5 text-[#003c2d]" />
                <span>{badge}</span>
              </div>
            )}

            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#003c2d] mt-3 tracking-tight">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-2 text-xs sm:text-sm text-[#5e665d] max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm border border-[#E2DDD0] rounded-2xl overflow-hidden transition-all shadow-2xs hover:border-[#003c2d]/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-mono text-xs sm:text-sm font-bold text-[#003c2d] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#003c2d] transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5e665d] leading-relaxed border-t border-[#E2DDD0]/50 font-sans">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {supportCta && (
            <div className="mt-8 p-6 rounded-2xl bg-[#003c2d] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div>
                <h4 className="font-mono font-bold text-sm text-[#BCF63C]">{supportCta.label}</h4>
                {supportCta.description && (
                  <p className="text-xs text-white/80 mt-1">{supportCta.description}</p>
                )}
              </div>
              <a
                href={supportCta.href || "#"}
                onClick={supportCta.onClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BCF63C] text-[#003c2d] font-mono font-bold text-xs hover:bg-[#A3FB60] transition-colors cursor-pointer shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{supportCta.buttonText}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
