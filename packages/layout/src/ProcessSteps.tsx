import React from "react";
import { Container } from "./Container";

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ProcessStepsProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  steps: ProcessStepItem[];
  className?: string;
}

export function ProcessSteps({
  badge = "HOW IT WORKS",
  title = "Three simple steps to accelerate your execution",
  subtitle = "Our structured approach delivers working software and validated traction in weeks.",
  steps,
  className = "",
}: ProcessStepsProps) {
  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 ${className}`}>
      <Container size="xl">
        {(badge || title) && (
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            {badge && (
              <div className="inline-block mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-[#E2DDD0] text-[#003c2d] shadow-2xs">
                  {badge}
                </span>
              </div>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#003c2d] tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#5e665d] mt-2.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-6 sm:p-7 rounded-2xl bg-white border border-[#E2DDD0] shadow-2xs hover:border-[#003c2d]/40 hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#003c2d] text-[#BCF63C] flex items-center justify-center font-mono font-bold text-xs shadow-2xs">
                    {step.number}
                  </span>
                  {step.icon && <span className="text-[#003c2d]/60">{step.icon}</span>}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#003c2d] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5e665d] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProcessSteps;
